<!-- # Nerve Centre API

![NestJS](https://img.shields.io/badge/NestJS-v9-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-ORM--Prisma-blue?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![Status](https://img.shields.io/badge/status-Active--Development-yellow)

---

## 🧠 Overview

The **Nerve Center API** is a centralized backend service for managing geospatial data, timed geofences, and group-based zone control. It enables dynamic monitoring of geofence activity, scheduling of special geo-zones, and efficient grouping of operational zones for use in real-time response systems.

Built with **NestJS** and **PostgreSQL**, the system offers a scalable architecture and is designed to power platforms that require precise geolocation logic — such as logistics tracking, public safety coordination, smart city operations, and more.

---

## 🚀 Key Features

- 📍 **Geofence Management**  
  Create, update, and delete polygonal or circular geofences with precise coordinates.

- 👥 **Geofence Groups**  
  Group multiple geofences into logical zones for team, device, or event-based tracking.

- ⏱ **Special Timed Geofences**  
  Define **special geofences** that are active only during specific hours (e.g., 8 AM – 5 PM).

- 🔄 **Geo-Assignment APIs**  
  Assign and unassign geofences to groups, supporting flexible access control and behavior assignment.

- 📊 **RESTful Design**  
  Built using NestJS controllers and DTOs with Swagger for API docs.

---

## 🧰 Tech Stack

- **NestJS** – Type-safe and modular Node.js framework
- **TypeScript** – End-to-end type safety
- **PostgreSQL** – Relational database
- **Mongoose ORM** – Type-safe data modeling and querying
- **Swagger/OpenAPI** – Auto-generated API documentation
- **Docker** – (Planned containerization)
- **Zod / Class-validator** – Input validation

 -->




# Nerve Centre API

![NestJS](https://img.shields.io/badge/NestJS-v9-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![Status](https://img.shields.io/badge/status-Active--Development-yellow)

---

## 🧠 Overview

The **Nerve Center API** is a geolocation-aware backend service built with NestJS and MongoDB. It manages geofences, geofence groups, and special timed zones, enabling dynamic monitoring and control of physical or virtual areas. It's designed for use cases like logistics tracking, territory enforcement, security alerts, and smart-city operations.

---

## 🚀 Key Features

- 📍 **Geofence Management**  
  Create and manage custom geofences (polygon or circular) with coordinate precision.

- 👥 **Geofence Grouping**  
  Organize geofences into logical groups — for users, teams, assets, or operational units.

- ⏱ **Timed Special Geofences**  
  Define geofences that are only active during specific time windows (e.g., 08:00–17:00).

- 🔄 **Dynamic Assignment APIs**  
  Assign/unassign geofences to/from groups dynamically via REST endpoints.

- 📘 **OpenAPI/Swagger Docs**  
  Auto-generated API documentation with request/response schemas.

---

## 🧰 Tech Stack

- **NestJS** – Modular and scalable server-side framework
- **TypeScript** – Full type safety
- **MongoDB** – Document database
- **Mongoose** – ODM for MongoDB
- **Swagger (OpenAPI)** – Auto-generated API documentation
- **JWT** – Authentication (if applicable)

---

## ⚙️ Getting Started

```bash
# Clone the project
git clone https://github.com/yourusername/nerve-centre-api.git
cd nerve-centre-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Set DB_URI, PORT, and any other required config

# Run the development server
npm run start:dev

# Visit the app at
http://localhost:3001/api

