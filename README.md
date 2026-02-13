# 🏨 Agoda Clone Project

> โปรเจ็คฝึกทำระบบจองที่พักแบบ Full-Stack พร้อมฐานข้อมูล 2 รูปแบบ

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📋 สารบัญ

- [Tech Stack](#-tech-stack--architecture)
- [เริ่มต้นใช้งาน](#-quick-start)
- [โครงสร้างโปรเจ็ค](#-โครงสร้างโฟลเดอร์)
- [กฎการใช้ Git](#-กฎการใช้-git-ร่วมกัน)
- [คำแนะนำ](#-คำแนะนำสำหรับเพื่อนใหม่)

---

## 🛠️ Tech Stack & Architecture

<table>
<thead>
<tr>
<th>ส่วนงาน</th>
<th>เทคโนโลยี</th>
<th>หน้าที่</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Frontend</strong></td>
<td>React (Vite)</td>
<td>หน้าตาเว็บไซต์และการโต้ตอบกับผู้ใช้</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Node.js (Express)</td>
<td>ระบบจัดการ API และ Logic หลังบ้าน</td>
</tr>
<tr>
<td><strong>Database 1</strong></td>
<td><strong>MongoDB</strong> (NoSQL)</td>
<td>เก็บข้อมูลโรงแรม, รีวิว, และรายละเอียดห้องพัก</td>
</tr>
<tr>
<td><strong>Database 2</strong></td>
<td><strong>MySQL/PostgreSQL</strong> (SQL)</td>
<td>เก็บข้อมูลผู้ใช้ (User) และการจอง (Booking)</td>
</tr>
<tr>
<td><strong>Infrastructure</strong></td>
<td><strong>Docker</strong></td>
<td>จำลองฐานข้อมูลให้เหมือนกันทุกเครื่อง</td>
</tr>
</tbody>
</table>

---

## 🚀 Quick Start

### ขั้นตอนที่ 1: Clone โปรเจ็ค

```bash
git clone <repository-url>
cd agoda-clone
```

### ขั้นตอนที่ 2: เริ่มต้นฐานข้อมูลด้วย Docker 🐳

ไม่ต้องติดตั้ง MySQL หรือ MongoDB ลงเครื่อง ใช้ Docker แทนได้เลย!

```bash
# 1. เปิด Docker Desktop ทิ้งไว้
# 2. รันคำสั่งนี้
docker-compose up -d
```

✅ **ฐานข้อมูลพร้อมใช้งานแล้ว!**
- 🔹 **MongoDB Port:** `27017`

### ขั้นตอนที่ 3: ติดตั้ง Dependencies

#### Backend Setup
```bash
cd server
npm install
npm start
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

🎉 **เสร็จแล้ว!** เปิดบราวเซอร์ไปที่ `http://localhost:5173`

---

## 📂 โครงสร้างโฟลเดอร์

```
agoda-clone/
│
├── 📁 client/              # โค้ดฝั่ง React (Frontend)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── 📁 server/              # โค้ดฝั่ง Express (Backend)
│   ├── routes/
│   ├── models/
│   ├── controllers/        
    ├── db/                 # Database configuration
    ├── config/             # เก็บ swagger configuration
    ├── .env                # เก็บข้อมูลความลับ
│   └── package.json
│
├── 🐳 docker-compose.yml   # ไฟล์ตั้งค่าฐานข้อมูล
├── 📝 README.md            
├── shared/type
|    ├── hotel.ts           # เก็บ type และ interfaces ร่วมกันทั้ง front แลพ back
|    ├── user.ts
└── 🚫 .gitignore           # ไฟล์ที่ไม่ต้องอัปโหลด
```

---

## 🌿 กฎการใช้ Git ร่วมกัน

### ⚠️ กฎสำคัญ
- ❌ **ห้ามทำงานบนกิ่ง `main` โดยตรง**
- ✅ **รวมงานกันที่กิ่ง `develop`**

### 📝 Workflow การทำงาน

#### 1️⃣ อัปเดตงานล่าสุด
```bash
git checkout develop
git pull origin develop
```

#### 2️⃣ สร้างกิ่งใหม่สำหรับฟีเจอร์ของคุณ
```bash
git checkout -b feature/ชื่อฟีเจอร์ของคุณ
```
**ตัวอย่าง:** `feature/login-page`, `feature/hotel-search`

#### 3️⃣ บันทึกงาน (Commit)
```bash
git add .
git commit -m "✨ feat: เพิ่มหน้า login"
git push origin feature/ชื่อฟีเจอร์ของคุณ
```

#### 4️⃣ ส่ง Pull Request
1. ไปที่หน้า GitHub Repository
2. กดปุ่ม **"Compare & pull request"**
3. รอ Team Lead Review และ Merge

### 📌 Commit Message Convention

| Prefix | ความหมาย | ตัวอย่าง |
|--------|----------|----------|
| `✨ feat:` | เพิ่มฟีเจอร์ใหม่ | `✨ feat: เพิ่มระบบค้นหาโรงแรม` |
| `🐛 fix:` | แก้ไข Bug | `🐛 fix: แก้ปัญหาการ Login` |
| `📝 docs:` | เพิ่ม/แก้ไข Document | `📝 docs: อัปเดต README` |
| `💄 style:` | แก้ไข CSS/UI | `💄 style: ปรับสี Header` |
| `♻️ refactor:` | ปรับปรุงโค้ด | `♻️ refactor: ทำ API ให้กระชับขึ้น` |

---

## 💡 คำแนะนํา

### สิ่งที่ต้องระวัง

| ❌ ห้ามทำ | ✅ ควรทำ |
|-----------|----------|
| ลบไฟล์ `.env` | เก็บไฟล์ `.env` ไว้ (มีรหัสผ่าน DB) |
| อัปโหลด `node_modules` | ให้ `.gitignore` จัดการให้ |
| ทำงานบน `main` | ทำงานบน `feature/*` เสมอ |
| แก้โค้ดแล้วไม่ commit | commit บ่อยๆ เพื่อป้องกันงานหาย |

### เจอปัญหา?

1. **ถ่ายภาพหน้าจอ Terminal** ที่มี Error
2. **ส่งเข้ากลุ่มทันที** พร้อมบอกว่าทำอะไรไปบ้าง
3. **อย่าเก็บงาน!** ยิ่งถามเร็ว แก้เร็ว 

### Tips

- 📖 **อ่าน Error Message** ให้ดี มันบอกปัญหาตรงๆ เลย
- 🔄 **Pull บ่อยๆ** เพื่อไม่ให้โค้ดคนอื่น conflict
- 💬 **ถาม-ตอบ** ในกลุ่มบ่อยๆ ทุกคนเคยเป็นมือใหม่มาก่อน
- 🎨 **ลองผิดลองถูก** อย่ากลัว! มี Git ช่วยย้อนกลับได้เสมอ

---

## 🔧 คำสั่งที่ใช้บ่อย

```bash
# ดูว่าอยู่กิ่งไหน
git branch

# ดูไฟล์ที่เปลี่ยน
git status

# ดู commit ล่าสุด
git log --oneline

# หยุด Docker
docker-compose down

# เช็ค Docker ที่รันอยู่
docker ps
```

---

## 🤝 Contributing

เรายินดีรับ Contribution จากทุกคน! 
1. Fork โปรเจ็ค
2. สร้าง Feature Branch
3. ส่ง Pull Request

---

## Swagger 

1. เข้าไปที่ localhost:5207/api-docs
2. Swagger จะเป็นหน้า page รวม api ทีมีใน backend

---

## Backend

1. cd เข้าไปที่โฟลเดอร์ทีมี index.ts อยู่
2. พิมพ์ใน terminal ว่า npm run dev
3. เข้าเว็ปไปที่ localhost:5207/api-docs

---

## Frontend

1. cd ไปที่ client
2. พิมพ์ใน terminal ว่า npm run dev
3. เข้าเว็ปไปที่ localhost:5173

---

## อย่าลืม Checkout ไปที่ develops ก่อนจะทําการรัน server นะ
