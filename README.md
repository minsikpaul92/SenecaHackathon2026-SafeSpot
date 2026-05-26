# 🌡️ SafeSpot Toronto

> **Seneca Polytechnic Hackathon 2026**
> Theme 3 — Community Energy, Equity and Sustainability | Problem Statement 2

A real-time web app that helps Toronto communities stay safe during extreme weather events — combining live temperature sensor data, urban heat island mapping, and smart routing to the nearest cooling centre or library.

---

## 🧩 The Problem

Climate impacts like **heatwaves and flooding** disproportionately affect vulnerable populations. Many communities rely on public facilities — libraries, schools, and community centres — as cooling or warming spaces. But there's no simple way to see where climate risk and limited shelter access overlap.

---

## 💡 Our Solution

SafeSpot Toronto visualizes heat risk zones across the city, monitors live temperature data from a Raspberry Pi sensor, and guides users to the nearest safe space when conditions become dangerous.

---

## 👥 Team codeXperts

| Name       | Role                                             |
| ---------- | ------------------------------------------------ |
| **Gary**   | Hardware — Raspberry Pi & Temperature Sensor     |
| **Marcos** | Backend — Node.js (Hono + Drizzle + SQLite)      |
| **Paul**   | Frontend — Next.js, Leaflet.js Map Integration   |
| **Seulgi** | Frontend — UI/UX Design, Alert System            |
| **Arun**   | Frontend — GPS Location, Nearest Shelter Routing |

---

## ⚙️ Tech Stack

| Layer        | Technology                                 |
| ------------ | ------------------------------------------ |
| Frontend     | Next.js, Tailwind CSS, Leaflet.js          |
| Backend      | Hono.js (Node.js) + Drizzle ORM + SQLite   |
| Hardware     | Raspberry Pi + Temperature Sensor          |
| Map Library  | Leaflet.js with GeoJSON layers             |
| Data Sources | ArcGIS REST API, City of Toronto Open Data |

---

## ✨ Core Features

### 🗺️ 1. Heat Risk Map

- Interactive Leaflet map with Toronto's urban heat island layer
- Colour-coded zones: 🔴 High / 🟡 Medium / 🟢 Low risk
- Data from ArcGIS: _Impervious Surface and Urban Heat Island Effect in Toronto_

### 🌡️ 2. Real-Time Temperature Monitoring

- Raspberry Pi sensor deployed in a high-risk heat zone
- Sensor readings sent to Hono backend at regular intervals
- Live data point displayed on the map

### 🚨 3. Danger Threshold Alert

- Alert banner triggered when temperature exceeds **35°C**
- Displays current temperature and risk level
- Highlights nearby cooling centres and libraries on the map

### 📍 4. Nearest Safe Space Routing

- Browser GPS detects the user's current location
- Calculates and displays the closest cooling centre or library
- Shows distance and name of the nearest safe space

---

## 📡 Data Sources

| Dataset                       | Source                    | Format        |
| ----------------------------- | ------------------------- | ------------- |
| Urban Heat Island Effect      | ArcGIS REST API (Seneca)  | GeoJSON       |
| Air Conditioned & Cool Spaces | City of Toronto Open Data | GeoJSON       |
| Library Branch Locations      | City of Toronto Open Data | GeoJSON       |
| Live Temperature              | Raspberry Pi Sensor       | POST via Hono |

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| `GET`  | `/api/heat-data`       | Returns heat island GeoJSON            |
| `GET`  | `/api/cooling-centres` | Returns cooling centre locations       |
| `GET`  | `/api/libraries`       | Returns library branch locations       |
| `POST` | `/api/sensor-data`     | Receives temperature from Raspberry Pi |
| `GET`  | `/api/sensor-latest`   | Returns most recent sensor reading     |
| `POST` | `/api/sensor-override` | Manual temperature input for testing   |

---

## 🏗️ System Architecture

```
Raspberry Pi (Temperature Sensor)
        │
        ▼  POST /api/sensor-data
Hono Backend (Node.js)
        │
        ▼  Serves GeoJSON + sensor data
Next.js Frontend
        │
        ▼  Renders interactive Leaflet map
User Browser (with GPS)
```

---

## 📁 Project Structure

```
SafeSpot/
├── frontend/        # Next.js app (Paul, Seulgi, Arun)
│   ├── app/
│   ├── components/
│   └── ...
└── backend/         # Hono server (Marcos)
```

---

## 🗓️ Development Plan

### Day 1

| Task                              | Owner  | Goal                           |
| --------------------------------- | ------ | ------------------------------ |
| Hono project setup                | Marcos | Server running locally         |
| ArcGIS heat data fetch            | Marcos | `GET /api/heat-data` working   |
| Cooling centres + libraries fetch | Marcos | GET endpoints working          |
| Next.js + Leaflet setup           | Paul   | Toronto map rendered           |
| Heat island layer on map          | Paul   | GeoJSON zones displayed        |
| Raspberry Pi sensor setup         | Gary   | Temperature readings confirmed |
| UI wireframe                      | Seulgi | Screen layout designed         |

### Day 2

| Task                           | Owner  | Goal                          |
| ------------------------------ | ------ | ----------------------------- |
| Cooling centre + library pins  | Arun   | Markers visible on map        |
| GPS location detection         | Arun   | Browser location API working  |
| Nearest safe space calculation | Arun   | Distance logic implemented    |
| Alert banner UI                | Seulgi | Warning shown on threshold    |
| Sensor POST to the Backend     | Gary   | Live data flowing to backend  |
| Sensor data point on map       | Paul   | Live marker on map            |
| Full integration test          | All    | Demo scenario runs end to end |

---

## 🎬 Demo Scenario

1. Web app opens — Toronto map loads with **heat risk zones**
2. Browser GPS detects user location and marks it on the map
3. Raspberry Pi sensor is manually raised above **35°C** to simulate a heatwave
4. App triggers alert banner: **"⚠️ Extreme Heat Warning — Find a Cool Space Now"**
5. Cooling centres and libraries are highlighted on the map
6. App displays: **"Nearest Cooling Centre: [Name], 0.3 km away"**

---

## ✅ How We Address Problem Statement 2

| PS2 Requirement                 | Our Solution                                          |
| ------------------------------- | ----------------------------------------------------- |
| Visualize climate risk areas    | Urban heat island layer on interactive map            |
| Identify vulnerable communities | Heat zone colour coding by risk level                 |
| Show proximity to safe shelter  | Cooling centres & libraries with GPS routing          |
| Help communities prepare        | Real-time alerts + nearest safe space guidance        |
| Innovative data approach        | Live Raspberry Pi sensor adds real hardware dimension |

---

<div align="center">
  <sub>Built with ❤️ by Team codeXperts · Seneca Polytechnic Hackathon 2026</sub>
</div>
