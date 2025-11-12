// script.js - frontend logic
const API = {
  list: '/api/list',
  park: '/api/park',
  leave: '/api/leave',
  reset: '/api/reset'
};

const regexBike = /^[0-9]{2}[A-Z]{2}-[0-9]{5}$/; // 89AA-11234
const regexCar  = /^[0-9]{2}[A-Z]-[0-9]{4,5}$/;  // 30A-12345

const plateIn = document.getElementById('plateIn');
const typeIn = document.getElementById('typeIn');
const timeIn = document.getElementById('timeIn');
const checkinForm = document.getElementById('checkinForm');
const clearBtn = document.getElementById('clearBtn');

const plateOut = document.getElementById('plateOut');
const calcBtn = document.getElementById('calcBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutInfo = document.getElementById('checkoutInfo');

const vehicleTableBody = document.querySelector('#vehicleTable tbody');
const countText = document.getElementById('countText');
const revenueText = document.getElementById('revenueText');
const slotsGrid = document.getElementById('slotsGrid');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const exportBtn = document.getElementById('exportBtn');
const resetBtn = document.getElementById('resetBtn');

let currentData = null;
let lastCalc = null; // store last checkout calc

// initialize timeIn to now
timeIn.value = new Date().toISOString().slice(0,16);

// load data from server
async function loadData(){
  const res = await fetch(API.list);
  const data = await res.json();
  currentData = data;
  renderTable(data.vehicles);
  renderSlotsPreview(data);
  countText.innerText = `Vehicles: ${data.vehicles.length} / ${data.slots}`;
  revenueText.innerText = `Revenue: ${data.revenue.toLocaleString()} VNĐ`;
}
function renderTable(vehicles){
  const q = searchInput.value.trim().toUpperCase();
  const typeFilter = filterType.value;
  vehicleTableBody.innerHTML = '';
  vehicles
    .filter(v => (!q || v.plate.includes(q)) && (typeFilter==='all' || v.type===typeFilter))
    .forEach((v,i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${v.plate}</td>
        <td>${v.type==='car' ? 'Ô tô' : 'Xe máy'}</td>
        <td>${new Date(v.in).toLocaleString()}</td>
        <td class="center">
          <button class="action-btn" data-plate="${v.plate}">Select</button>
        </td>
      `;
      vehicleTableBody.appendChild(tr);
    });
  // attach select handlers
  document.querySelectorAll('.action-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      plateOut.value = btn.dataset.plate;
      plateOut.focus();
    });
  });
}

function renderSlotsPreview(data){
  // preview first 40 slots for UX (not all 500)
  const total = data.slots || 500;
  const used = data.vehicles.length;
  const previewCount = Math.min(40, total);
  slotsGrid.innerHTML = '';
  for(let i=0;i<previewCount;i++){
    const div = document.createElement('div');
    div.className = 'slot ' + (i < used ? 'used' : 'free');
    div.textContent = i < used ? 'Occupied' : 'Free';
    slotsGrid.appendChild(div);
  }
}

// validate plate against selected type
function validPlateForType(plate, type){
  const p = plate.trim().toUpperCase();
  if(type==='bike') return regexBike.test(p);
  if(type==='car') return regexCar.test(p);
  return false;
}

checkinForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const plate = plateIn.value.trim().toUpperCase();
  const type = typeIn.value;
  const dt = timeIn.value;
  if(!plate){ alert('Enter plate'); plateIn.focus(); return; }
  if(!validPlateForType(plate,type)){
    alert('Plate format invalid for selected type. Bike example: 89AA-11234'); return;
  }
  // call API
  const res = await fetch(API.park, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ plate, type })
  });
  const j = await res.json();
  alert(j.msg);
  await loadData();
  plateIn.value = '';
});

clearBtn.addEventListener('click', ()=>{ plateIn.value=''; });

calcBtn.addEventListener('click', async ()=>{
  const plate = plateOut.value.trim().toUpperCase();
  if(!plate){ alert('Enter plate to calculate'); return; }
  // find in current data
  const found = (currentData && currentData.vehicles || []).find(v=>v.plate===plate);
  if(!found){ alert('Plate not found in parking'); return; }
  const inTime = new Date(found.in);
  const outTime = new Date();
  const mins = Math.ceil((outTime - inTime) / (1000*60));
  let hours = Math.floor(mins/60);
  if(mins%60) hours++;
  if(hours===0) hours=1;
  const rate = found.type==='car' ? 50000 : 5000;
  const fee = hours * rate;
  checkoutInfo.classList.remove('hidden');
  checkoutInfo.innerHTML = `<strong>Plate:</strong> ${plate} <br>
    <strong>In:</strong> ${inTime.toLocaleString()} <br>
    <strong>Now:</strong> ${outTime.toLocaleString()} <br>
    <strong>Duration:</strong> ${hours} hour(s) <br>
    <strong>Fee:</strong> ${fee.toLocaleString()} VNĐ`;
  checkoutBtn.disabled = false;
  lastCalc = { plate, fee };
});

checkoutBtn.addEventListener('click', async ()=>{
  if(!lastCalc){ alert('Please calculate first'); return; }
  // open modal for payment method
  openModal(lastCalc);
});

async function doCheckout(plate){
  const res = await fetch(API.leave, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ plate })
  });
  const j = await res.json();
  if(j.success){
    alert(`Checkout success. Fee: ${j.fee.toLocaleString()} VNĐ`);
    await loadData();
    plateOut.value='';
    checkoutInfo.classList.add('hidden');
    checkoutBtn.disabled = true;
    lastCalc = null;
  } else {
    alert(j.msg || 'Error during checkout');
  }
}

// modal logic
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const payCash = document.getElementById('payCash');
const payCard = document.getElementById('payCard');

function openModal(calc){
  modalBody.innerHTML = `<p>Plate: <strong>${calc.plate}</strong></p>
    <p>Amount: <strong>${calc.fee.toLocaleString()} VNĐ</strong></p>
    <p>Choose payment method:</p>`;
  modal.classList.remove('hidden');
  payCash.onclick = async ()=>{ await doCheckout(calc.plate); modal.classList.add('hidden'); };
  payCard.onclick = async ()=>{ alert('Card payment simulated'); await doCheckout(calc.plate); modal.classList.add('hidden'); };
}
modalClose.addEventListener('click', ()=> modal.classList.add('hidden'));

// search and filter
searchInput.addEventListener('input', ()=> renderTable(currentData.vehicles || []));
filterType.addEventListener('change', ()=> renderTable(currentData.vehicles || []));

// export CSV of current parked list
exportBtn.addEventListener('click', ()=>{
  if(!currentData) return alert('No data');
  const rows = [['plate','type','in']];
  currentData.vehicles.forEach(v => rows.push([v.plate, v.type, v.in]));
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `parked_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

// reset
resetBtn.addEventListener('click', async ()=>{
  if(confirm('Are you sure to reset all data?')) {
    await fetch(API.reset, { method: 'POST' });
    await loadData();
  }
});

// polling
loadData();
setInterval(loadData, 5000);
