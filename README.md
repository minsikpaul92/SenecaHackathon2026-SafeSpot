# 🌡️ SafeSpot Toronto

> **Seneca Polytechnic Hackathon 2026**
> Theme 3 — Community Energy, Equity and Sustainability | Problem Statement 2

A real-time web app that helps Toronto communities stay safe during extreme heat events — combining live Raspberry Pi sensor data, urban heat island mapping, GPS-based routing, and cross-checked risk alerts.

---

## 🧩 The Problem

In June 2021, a heat dome killed [570 people in British Columbia](https://www.cbc.ca/news/canada/british-columbia/bc-heat-dome-sudden-deaths-570-1.6122316). Many victims lived near cooling centres — but had no way of knowing. Climate impacts like heatwaves disproportionately affect vulnerable populations, and there's no simple way to see where climate risk and limited shelter access overlap.

---

## 💡 Our Solution

SafeSpot Toronto deploys a **Raspberry Pi temperature sensor in a high-risk heat island zone**, cross-checks live sensor readings against urban heat island data, and guides users to the nearest safe space when conditions become dangerous.

Unlike weather apps that report a city-wide average, SafeSpot measures the **actual temperature where you are**.

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

### 🍓 1. Real-Time Hardware Temperature

- Raspberry Pi sensor **physically deployed in a heat island zone**
- Captures actual ground-level temperature — not a city-wide average
- Sensor readings POSTed to Hono backend at regular intervals
- Frontend polls `GET /api/sensor-latest` every 5 seconds (near real-time)
- Source badge: distinguishes live sensor data (`sensor`) from test overrides (`override`)

### 🗺️ 2. Urban Heat Island Map

- Interactive Leaflet map with Toronto's urban heat island layer
- Colour-coded risk areas: 🔴 High / 🟠 Medium / 🟡 Low Heat Area
- Data from ArcGIS: *Impervious Surface and Urban Heat Island Effect in Toronto*
- Historical surface temperature averages (not real-time — this is where the Pi matters)

### 🔬 3. Heat Island Cross-Check

- User's GPS location is checked against the heat island GeoJSON polygons using **ray-casting point-in-polygon** (no external dependencies)
- `getCombinedRisk(zoneLevel, sensorTemp)` calculates actual risk:

  | Zone | Sensor Temp | Risk Level |
  | ---- | ----------- | ---------- |
  | Any  | < 30°C      | Silent (no warning) |
  | HIGH | 30–35°C     | ⚠️ Caution |
  | HIGH | 35–40°C     | 🚨 Danger  |
  | HIGH | ≥ 40°C      | 🔴 Extreme |
  | MEDIUM | 35–40°C   | ⚠️ Caution |
  | MEDIUM | ≥ 40°C    | 🚨 Danger  |

- Risk card only appears at **caution or above** — no false warnings on safe-temperature days

### 🚨 4. Danger Threshold Alert

- Full-screen alert banner when sensor reads **35°C or above AND user is in a heat island zone**
- Web Audio API siren sound (extreme / danger / caution tones)
- Browser push notifications with `requireInteraction` for extreme alerts
- Alert levels: `safe` → `caution` → `danger` → `extreme`

### 📍 5. Nearest Safe Space Routing

- Browser GPS detects the user's current location
- Haversine formula calculates distance to all cooling centres and libraries
- Shows nearest cooling centre + nearest library with compass direction
- **Google Maps directions** link with one tap

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                                    |
| ------ | ---------------------- | ---------------------------------------------- |
| `GET`  | `/`                    | Health check                                   |
| `GET`  | `/health`              | Health check                                   |
| `POST` | `/api/sensor-data`     | Receives temperature from Raspberry Pi         |
| `GET`  | `/api/sensor-latest`   | Returns most recent sensor reading with alert level |
| `POST` | `/api/sensor-override` | Manual temperature input for testing           |
| `GET`  | `/docs`                | Swagger UI (OpenAPI 3.1)                       |
| `GET`  | `/openapi.json`        | OpenAPI spec                                   |

---

## 🏗️ System Architecture

```
Raspberry Pi (Temperature Sensor — deployed in heat island zone)
        │
        ▼  POST /api/sensor-data  {"temperature": 36.2}
Hono Backend (Node.js + Drizzle + SQLite)
        │  stores reading with timestamp + source
        ▼  GET /api/sensor-latest (every 5s)
Next.js Frontend
        │
        ├─ SensorCard       — live Pi temperature + alert bar
        ├─ WeatherCard      — city outdoor temp (OpenWeather API)
        ├─ ShelterMarkers   — Leaflet map + heat island layer + shelter pins
        └─ NearestShelter   — GPS location + heat zone cross-check + routing
                │
                ▼
        User Browser (GPS + push notifications + sound alerts)
```

---

## 📡 Data Sources

| Dataset                       | Source                    | Format        |
| ----------------------------- | ------------------------- | ------------- |
| Urban Heat Island Effect      | ArcGIS REST API (Seneca)  | GeoJSON       |
| Air Conditioned & Cool Spaces | City of Toronto Open Data | GeoJSON       |
| Library Branch Locations      | City of Toronto Open Data | GeoJSON       |
| Live Temperature              | Raspberry Pi Sensor       | POST via Hono |
| Outdoor Weather               | OpenWeather API           | JSON          |

---

## 📁 Project Structure

```
SafeSpot/
├── frontend/               # Next.js app
│   ├── app/
│   │   ├── page.js         # Main page (3 sections: Story, How It Works, Dashboard)
│   │   └── layout.js
│   ├── components/
│   │   ├── SensorCard.js       # Live Pi temperature + alert bar + sound
│   │   ├── AlertBanner.js      # Full-screen heat warning banner
│   │   ├── NearestShelter.js   # GPS + heat zone cross-check + routing
│   │   ├── ShelterMarkers.js   # Leaflet map + heat island + shelter pins
│   │   ├── WeatherCard.js      # OpenWeather city temperature
│   │   ├── UserLocation.js     # GPS marker on map
│   │   ├── Navbar.js
│   │   └── Footer.js
│   └── .env.local          # API keys + NEXT_PUBLIC_BACKEND_URL
└── backend/                # Hono server
    ├── src/
    │   ├── index.js        # Server entry point (port from env)
    │   ├── app.js          # Hono app factory + CORS + Swagger
    │   ├── routes/
    │   │   └── sensor.js   # POST /api/sensor-data, GET /api/sensor-latest, POST /api/sensor-override
    │   ├── sensor-store.js # DB read/write logic
    │   ├── alerts.js       # getAlertLevel() — safe/caution/danger/extreme
    │   ├── schema.js       # Drizzle schema (sensor_readings table)
    │   └── db.js           # SQLite init + mock data seeding
    └── tests/              # Vitest test suite
```

---

## 🚀 Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### `.env.local` (frontend)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_OPENWEATHER_KEY=your_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

### Raspberry Pi Script (Gary)

```python
import requests, time

BACKEND = "http://<backend-ip>:8000/api/sensor-data"

while True:
    temp = read_sensor()  # DHT22 / DS18B20
    requests.post(BACKEND, json={"temperature": temp})
    time.sleep(5)
```

---

## 🎬 Demo Scenario

1. Web app opens — Toronto map loads with **heat island risk areas**
2. Browser GPS detects user location — marked on map
3. App checks if user is inside a heat island polygon (**point-in-polygon**)
4. Raspberry Pi sensor is raised above **35°C** to simulate a heatwave
5. App cross-checks: heat island zone + dangerous temperature → **🚨 Danger alert fires**
6. Full-screen banner + siren sound + push notification
7. App displays: **"Nearest Cooling Centre: [Name], 0.3 km away → Get Directions"**

---

## ✅ How We Address Problem Statement 2

| PS2 Requirement                 | Our Solution                                                              |
| ------------------------------- | ------------------------------------------------------------------------- |
| Visualize climate risk areas    | Urban heat island layer (High / Medium / Low Heat Areas)                  |
| Identify vulnerable communities | Heat zone colour coding by risk area                                       |
| Show proximity to safe shelter  | Cooling centres & libraries with GPS routing + Google Maps directions      |
| Help communities prepare        | Real-time alerts + nearest safe space guidance                             |
| Innovative data approach        | Raspberry Pi sensor cross-checked with heat island map for actual risk     |

---

## 🔑 Why Raspberry Pi?

Weather APIs report a **city-wide average**. Urban heat islands mean a specific block can be **5–10°C hotter** than the official city temperature. SafeSpot deploys the Pi **inside a heat island zone** to measure the actual ground-level temperature — then cross-checks that reading against the historical heat map to calculate your real exposure risk.

> *"Official forecast: 28°C. Your heat island zone: 36°C. That difference can be life or death."*

---

<div align="center">
  <sub>Built with ❤️ by Team codeXperts · Seneca Polytechnic Hackathon 2026</sub>
</div>
