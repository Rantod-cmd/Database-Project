# 🏥 ระบบเฝ้าระวังโรค (Disease Surveillance System)

> ระบบติดตามและรายงานสถานการณ์โรคแบบ Real-time สำหรับโรงพยาบาลทั่วประเทศไทย
> พัฒนาด้วย Full-Stack TypeScript พร้อมฐานข้อมูล 2 รูปแบบ

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-latest-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC2927?style=flat&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📋 สารบัญ

- [ฟีเจอร์หลัก](#-ฟีเจอร์หลัก)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Services & Ports](#-services--ports)
- [โครงสร้างโปรเจ็ค](#-โครงสร้างโปรเจ็ค)
- [API Endpoints](#-api-endpoints)

---

## ✨ ฟีเจอร์หลัก

| หน้า | URL | คำอธิบาย | การเข้าถึง |
|------|-----|----------|-----------|
| หน้าแรก | `/` | Dashboard ภาพรวมระบบ | สาธารณะ |
| แผนที่ | `/map` | แผนที่แสดงสถานการณ์โรครายจังหวัด | สาธารณะ |
| ข้อมูลจังหวัด | `/provinces` | ตารางสถิติโรคแยกตามจังหวัด | สาธารณะ |
| สถิติรายงาน | `/statistics` | รายงานโรคล่าสุดจากทุกโรงพยาบาล | สาธารณะ |
| โรงพยาบาลเครือข่าย | `/hospitals` | รายชื่อโรงพยาบาลพร้อมข้อมูล | 🔒 Login |
| รายงานผู้ป่วย | `/reporting` | ฟอร์มส่งรายงานโรค | 🔒 Login |

---

## 🛠️ Tech Stack

<table>
<thead>
<tr>
<th>Layer</th>
<th>เทคโนโลยี</th>
<th>หน้าที่</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Frontend</strong></td>
<td>React 18 + Vite + TypeScript</td>
<td>UI และการโต้ตอบกับผู้ใช้</td>
</tr>
<tr>
<td><strong>Styling</strong></td>
<td>Tailwind CSS + Lucide Icons</td>
<td>Design System สีเขียวทางการแพทย์</td>
</tr>
<tr>
<td><strong>State</strong></td>
<td>Zustand</td>
<td>จัดการ Auth State (JWT Token)</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Node.js + Express + TypeScript</td>
<td>REST API</td>
</tr>
<tr>
<td><strong>Auth</strong></td>
<td>JWT + bcrypt</td>
<td>ระบบ Login สำหรับบุคลากรโรงพยาบาล</td>
</tr>
<tr>
<td><strong>DB 1 (NoSQL)</strong></td>
<td>MongoDB + Mongoose</td>
<td>เก็บรายงานผู้ป่วย (14,000+ records)</td>
</tr>
<tr>
<td><strong>DB 2 (SQL)</strong></td>
<td>SQL Server 2022 + Prisma ORM</td>
<td>เก็บข้อมูลโรค, โรงพยาบาล, จังหวัด, ผู้ใช้</td>
</tr>
<tr>
<td><strong>Infrastructure</strong></td>
<td>Docker + Docker Compose</td>
<td>รัน 5 services พร้อมกัน</td>
</tr>
</tbody>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│                     localhost:5173                           │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP / REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server (Express)                          │
│                     localhost:5207                           │
│                                                             │
│   /api/auth      /api/report    /api/hospital               │
│   /api/province  /api/disease   /api/data-provinces         │
└──────────────┬────────────────────────┬─────────────────────┘
               │                        │
               ▼                        ▼
┌──────────────────────┐   ┌────────────────────────┐
│   MongoDB            │   │   SQL Server 2022       │
│   localhost:27017    │   │   localhost:1433         │
│                      │   │                          │
│   collection:        │   │   tables:                │
│   • reports          │   │   • Province             │
│                      │   │   • Hospital             │
│                      │   │   • Disease              │
│                      │   │   • User                 │
└──────────────────────┘   └────────────────────────┘
```

### Database Structure Diagram

![Database Structure Diagram](database_structure_diagram.png)

---

## 🚀 Quick Start

### สิ่งที่ต้องมีก่อน

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ติดตั้งแล้วเปิดทิ้งไว้)
- Git
- ไฟล์ `documents-3.json` (ข้อมูลรายงานผู้ป่วย ~14,000 records) วางไว้ที่ root ของโปรเจ็ค

> **หมายเหตุ:** ต้องเปิด Docker Desktop ให้ daemon รันก่อนทุกครั้ง มิฉะนั้นจะเกิด error `Cannot connect to the Docker daemon`

### 1. Clone โปรเจ็ค

```bash
git clone <repository-url>
cd Database-Project
```

### 2. รัน Docker

```bash
docker compose up -d
```

> ระบบจะ build และเริ่ม 5 services อัตโนมัติ ใช้เวลาประมาณ 2–3 นาทีครั้งแรก

รอให้ Backend พร้อมก่อนทำขั้นตอนถัดไป (ดู log ด้วย `docker logs Backend --tail 20 -f`)

### 3. Migrate ฐานข้อมูล SQL Server

```bash
docker exec Backend sh -c "cd /app/server && npx prisma migrate deploy"
```

### 4. Seed ข้อมูลเริ่มต้น (SQL Server)

```bash
docker exec Backend sh -c "cd /app/server && npx prisma db seed"
```

> จะ seed ข้อมูล Province, Hospital, Disease, และ User เริ่มต้น

### 5. Import ข้อมูลรายงาน (MongoDB)

> ไฟล์ `documents-3.json` ต้องอยู่ที่ root ของโปรเจ็ค

**macOS / Linux:**
```bash
docker cp documents-3.json DB-mongo:/tmp/documents-3.json

docker exec DB-mongo mongoimport \
  --uri "mongodb://admin:password@localhost:27017/mydatabase?authSource=admin" \
  --collection reports \
  --file /tmp/documents-3.json \
  --jsonArray
```

**Windows — PowerShell หรือ Command Prompt (แนะนำ):**
```powershell
docker cp documents-3.json DB-mongo:/tmp/documents-3.json

docker exec DB-mongo mongoimport --uri "mongodb://admin:password@localhost:27017/mydatabase?authSource=admin" --collection reports --file /tmp/documents-3.json --jsonArray
```

**Windows — Git Bash:** ⚠️ Git Bash จะแปลง path `/tmp/...` เป็น Windows path โดยอัตโนมัติ ให้ใช้ `//` นำหน้าแทน:
```bash
docker cp documents-3.json DB-mongo:/tmp/documents-3.json

docker exec DB-mongo mongoimport \
  --uri "mongodb://admin:password@localhost:27017/mydatabase?authSource=admin" \
  --collection reports \
  --file //tmp/documents-3.json \
  --jsonArray
```

### 6. เปิดเว็บ

```
http://localhost:5173
```

---

## 🌐 Services & Ports

| Service | Container | Port | URL |
|---------|-----------|------|-----|
| Frontend (React) | `Frontend` | `5173` | http://localhost:5173 |
| Backend (Express) | `Backend` | `5207` | http://localhost:5207 |
| Prisma Studio | `Backend` | `5555` | http://localhost:5555 |
| MongoDB | `DB-mongo` | `27017` | — |
| Mongo Express (UI) | `DB-mongo-ui` | `8081` | http://localhost:8081 |
| SQL Server | `DB-sqlserver` | `1433` | — |

### ข้อมูล Login สำหรับ Tools

| Tool | Username | Password |
|------|----------|----------|
| Mongo Express | `admin` | `password` |

---

## 📂 โครงสร้างโปรเจ็ค

```
Database-Project/
│
├── 📁 client/                    # Frontend (React + Vite)
│   └── src/
│       ├── api/                  # apiClient (axios + interceptors)
│       ├── components/           # Navbar, Pagination
│       ├── features/
│       │   ├── landing/          # หน้าแรก
│       │   ├── map/              # แผนที่จังหวัด
│       │   ├── dash_txt/         # ตารางข้อมูลจังหวัด
│       │   ├── hospitals/        # โรงพยาบาลเครือข่าย
│       │   ├── statistics/       # รายงานโรคล่าสุด
│       │   ├── login/
│       │   └── register/
│       ├── routes/               # React Router config
│       └── stores/               # Zustand (authStore)
│
├── 📁 server/                    # Backend (Express)
│   ├── controllers/              # Business logic
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # Express routes
│   ├── middleware/               # Auth middleware (JWT)
│   ├── prisma/                   # Schema + Migrations
│   └── seeds/                    # Seed data
│
├── 📁 shared/                    # TypeScript types ใช้ร่วมกัน
│   └── types/schema/             # IReport, IHospital, IDisease ...
│
├── 🐳 docker-compose.yml
└── 📝 README.md
```
## 📡 API Endpoints

### Auth
| Method | Path | คำอธิบาย | Auth |
|--------|------|----------|------|
| `POST` | `/api/auth/login` | เข้าสู่ระบบ | — |
| `POST` | `/api/auth/register` | สมัครสมาชิก | — |

### Reports
| Method | Path | คำอธิบาย | Auth |
|--------|------|----------|------|
| `GET` | `/api/report/recent` | รายงานล่าสุด 50 รายการ | — |
| `POST` | `/api/report` | ส่งรายงานผู้ป่วย | 🔒 |

### Hospitals
| Method | Path | คำอธิบาย | Auth |
|--------|------|----------|------|
| `GET` | `/api/hospital` | รายชื่อโรงพยาบาล (search, page) | 🔒 |

### Provinces
| Method | Path | คำอธิบาย | Auth |
|--------|------|----------|------|
| `GET` | `/api/province` | รายชื่อจังหวัด | — |
| `GET` | `/api/data-provinces` | ข้อมูลสถิติจังหวัด | — |

