// 🚗 SERVER QUẢN LÝ BÃI ĐỖ XE THÔNG MINH (phiên bản tiếng Việt)
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "data.json");
const SO_CHO = 500;

function readData() {
  if (!fs.existsSync(DATA_FILE)) return { vehicles: [], revenue: 0 };
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function validatePlate(plate) {
  const p = plate.toUpperCase().trim();
  const regexBike = /^[0-9]{2}[A-Z]{2}-[0-9]{5}$/; // 89AA-11234
  const regexCar = /^[0-9]{2}[A-Z]-[0-9]{4,5}$/;   // 30A-12345
  return regexBike.test(p) || regexCar.test(p);
}

app.get("/api/list", (req, res) => {
  const data = readData();
  res.json({
    success: true,
    vehicles: data.vehicles,
    revenue: data.revenue,
    free: SO_CHO - data.vehicles.length,
    slots: SO_CHO,
  });
});

app.post("/api/park", (req, res) => {
  const { plate, type } = req.body;
  if (!plate || !type)
    return res.json({ success: false, msg: "❌ Thiếu biển số hoặc loại xe!" });

  const plateU = plate.toUpperCase().trim();
  if (!validatePlate(plateU))
    return res.json({ success: false, msg: "⚠️ Biển số không hợp lệ! (VD: 89AA-11234)" });

  const data = readData();
  if (data.vehicles.find(v => v.plate === plateU))
    return res.json({ success: false, msg: "🚙 Xe này đã có trong bãi!" });

  if (data.vehicles.length >= SO_CHO)
    return res.json({ success: false, msg: "❌ Bãi đã đầy!" });

  const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const vehicle = { plate: plateU, type, in: now };
  data.vehicles.push(vehicle);
  writeData(data);
  res.json({ success: true, msg: "✅ Xe vào bãi thành công!", vehicle });
});

app.post("/api/leave", (req, res) => {
  const { plate } = req.body;
  const plateU = plate.toUpperCase().trim();
  const data = readData();
  const idx = data.vehicles.findIndex(v => v.plate === plateU);
  if (idx === -1)
    return res.json({ success: false, msg: "Không tìm thấy xe trong bãi!" });

  const v = data.vehicles[idx];
  const inTime = new Date(v.in);
  const outTime = new Date();
  const diff = (outTime - inTime) / (1000 * 60 * 60);
  const hours = Math.ceil(diff);
  const rate = v.type === "car" ? 50000 : 5000;
  const fee = hours * rate;

  data.vehicles.splice(idx, 1);
  data.revenue += fee;
  writeData(data);

  res.json({
    success: true,
    msg: `Xe rời bãi thành công. Thời gian gửi: ${hours} giờ. Phí: ${fee.toLocaleString()} VNĐ.`,
    plate: plateU,
    hours,
    fee,
  });
});

app.post("/api/reset", (req, res) => {
  writeData({ vehicles: [], revenue: 0 });
  res.json({ success: true, msg: "Đã xóa toàn bộ dữ liệu bãi xe!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚗 Server đang chạy tại: http://localhost:${PORT}`));
