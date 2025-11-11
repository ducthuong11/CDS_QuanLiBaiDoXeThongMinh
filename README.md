<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
    🎓 Faculty of Information Technology (DaiNam University)
    </a>
</h2>
<h2 align="center">
 🚗 HỆ THỐNG QUẢN LÝ BÃI ĐỖ XE THÔNG MINH
</h2>
<div align="center">
    <p align="center">
        <img src="docs/aiotlab_logo.png" alt="AIoTLab Logo" width="170"/>
        <img src="docs/fitdnu_logo.png" alt="FIT DNU Logo" width="180"/>
        <img src="docs/dnu_logo.png" alt="DaiNam University Logo" width="200"/>
    </p>

[![AIoTLab](https://img.shields.io/badge/AIoTLab-green?style=for-the-badge)](https://www.facebook.com/DNUAIoTLab)
[![Faculty of Information Technology](https://img.shields.io/badge/Faculty%20of%20Information%20Technology-blue?style=for-the-badge)](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
[![DaiNam University](https://img.shields.io/badge/DaiNam%20University-orange?style=for-the-badge)](https://dainam.edu.vn)

</div>

---

## 📖 1. Giới thiệu
- **Tên đề tài:** Hệ thống Quản lý Bãi Đỗ Xe Thông Minh  
- **Môn học:** Chuyển đổi số  
- **Mục tiêu:**
  - Xây dựng hệ thống quản lý bãi đỗ xe tự động giúp tiết kiệm thời gian và chi phí vận hành.  
  - Ứng dụng công nghệ IoT và lập trình phần mềm để tự động nhận diện xe, tính phí, và giám sát vị trí xe theo thời gian thực.  
  - Tăng tính an toàn, minh bạch và tối ưu hóa không gian đỗ xe trong trường học, khu dân cư, hoặc tòa nhà thông minh.

- **Ý nghĩa:**
  - Giúp sinh viên hiểu rõ quy trình **chuyển đổi số trong quản lý đô thị thông minh**.  
  - Áp dụng công nghệ IoT, cơ sở dữ liệu và lập trình web/app vào mô hình thực tế.  
  - Góp phần phát triển giải pháp **Smart Campus / Smart City**.

---

## 🏗️ 2. Kiến trúc hệ thống
<img width="650" alt="image" src="https://github.com/user-attachments/assets/d9e45b32-fc91-49b5-8ab9-51c88f54677c" />

**Thành phần chính:**
- **Hệ thống IoT (ESP32 / Arduino):** Gửi dữ liệu cảm biến (RFID, cảm biến siêu âm, camera nhận diện biển số) lên server.  
- **Server:** Xử lý dữ liệu, lưu vào cơ sở dữ liệu, gửi phản hồi tới ứng dụng quản lý.  
- **Ứng dụng Web / App:** Hiển thị thông tin xe, vị trí trống, thời gian vào/ra, tính tiền và xuất hóa đơn.

---

## 🛠️ 3. Công nghệ sử dụng
- **Ngôn ngữ lập trình:**  
  - Backend: **Python / Node.js / Java**  
  - Frontend: **HTML, CSS, JavaScript (ReactJS hoặc VueJS)**  
  - IoT: **Arduino / C++ / MicroPython**
- **Cơ sở dữ liệu:** MySQL / Firebase Realtime Database  
- **Giao tiếp:** MQTT / HTTP / WebSocket  
- **Công cụ IDE:** VS Code, Arduino IDE, IntelliJ IDEA  
- **Môi trường chạy:** Windows / Linux / macOS  

---

## 💻 4. Các chức năng chính

| Nhóm chức năng | Mô tả |
|-----------------|-------|
| 🚘 Quản lý xe ra vào | Ghi nhận xe vào/ra qua cảm biến hoặc camera, cập nhật trạng thái bãi đỗ |
| 🧾 Tính phí tự động | Tự động tính tiền dựa trên thời gian gửi xe |
| 📱 Giao diện giám sát | Hiển thị vị trí trống, xe đang đỗ, tổng số xe theo thời gian thực |
| 🧍‍♂️ Quản lý người dùng | Phân quyền người dùng: Quản trị viên, Nhân viên, Khách |
| 📊 Báo cáo & Thống kê | Biểu đồ số lượng xe, doanh thu, tình trạng bãi đỗ |
| 🔔 Cảnh báo & Bảo mật | Thông báo khi xe chưa đăng ký, quá thời gian đỗ hoặc có hành vi bất thường |

---

## 🚀 5. Hướng dẫn cài đặt & chạy ứng dụng

🧩 Yêu cầu hệ thống
- **Hệ điều hành:** Windows 10/11, macOS hoặc Linux  
- **JDK / Node.js / Python:** Tùy theo bản backend sử dụng  
- **RAM:** Tối thiểu 4GB  
- **Cơ sở dữ liệu:** MySQL hoặc Firebase  

---

⚙️ Cài đặt
```
# Clone project
git clone https://github.com/ducthuong11/Smart-Parking-Management-Digital-Transformation.git
cd Smart-Parking-Management-Digital-Transformation 
```
###🚀 Chạy ứng dụng Server

```
npm install
npm start
```
🧠 Chạy mô-đun IoT

Nạp code cho ESP32/Arduino qua Arduino IDE

Kết nối WiFi → gửi dữ liệu cảm biến về server (qua MQTT/HTTP)

🌐 Chạy giao diện Web
```
npm run dev
```
## 📸 6. Giao diện minh họa

🔐 Màn hình đăng nhập

<img width="580" src="https://github.com/user-attachments/assets/aaaaa111-1234-4b44-9ccc-987654321000" />

🚗 Giao diện bãi đỗ xe

<img width="700" src="https://github.com/user-attachments/assets/bbbbb222-2345-4c33-8ddd-987654321111" />

📊 Thống kê hệ thống

<img width="750" src="https://github.com/user-attachments/assets/ccccc333-3456-4d22-7eee-987654321222" />

## 📞 7. Liên hệ

👤 Họ và tên: Nguyễn Đức Thường

🎓 Lớp: CNTT 16-04

📧 Email: ducthuong246ss@gmail.com

🏫 Trường: Đại học Đại Nam

🔗 Website: https://dainam.edu.vn







