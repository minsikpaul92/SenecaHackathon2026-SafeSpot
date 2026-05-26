"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UserLocation from "./UserLocation";

const COOLING_URL =
  "https://services6.arcgis.com/gEBDQzUF4BVGW25i/arcgis/rest/services/Air_Conditioned_and_Cool_Spaces_v2/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson";

const LIBRARY_URL =
  "https://services6.arcgis.com/gEBDQzUF4BVGW25i/arcgis/rest/services/tpl_branch_general_information___4326/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson";

const HEAT_URL =
  "https://services1.arcgis.com/jYHC0Oa2n7z2uKcM/arcgis/rest/services/Impervious_Surface_and_the_Urban_Heat_Island_Effect_in_Toronto_WFL1/FeatureServer/1/query?where=1%3D1&outFields=SurfTemp_Tess_MEAN&f=geojson&resultRecordCount=2000";

function heatColor(temp) {
  if (temp >= 35) return "#ef4444";
  if (temp >= 32) return "#f97316";
  if (temp >= 29) return "#facc15";
  return "#22c55e";
}

export default function ShelterMarkers({ userLocation, onSheltersLoaded }) {
  const [coolingFeatures, setCoolingFeatures] = useState([]);
  const [libraryFeatures, setLibraryFeatures] = useState([]);
  const [heatData, setHeatData] = useState(null);
  const onSheltersLoadedRef = useRef(onSheltersLoaded);
  onSheltersLoadedRef.current = onSheltersLoaded;

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [43.7, -79.42];

  useEffect(() => {
    // Load shelter data
    Promise.all([
      fetch(COOLING_URL).then((r) => r.json()),
      fetch(LIBRARY_URL).then((r) => r.json()),
    ]).then(([coolingData, libraryData]) => {
      const cooling = coolingData.features || [];
      const libraries = libraryData.features || [];

      setCoolingFeatures(cooling);
      setLibraryFeatures(libraries);

      const coolingList = cooling
        .filter((f) => f.geometry?.coordinates?.length >= 2)
        .map((f) => ({
          type: "cooling",
          name: f.properties.NAME || "Cooling Centre",
          address: f.properties.ADDRESS || "",
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }));

      const libraryList = libraries
        .filter((f) => f.geometry?.coordinates?.length >= 2)
        .map((f) => ({
          type: "library",
          name: f.properties.BranchName || "Library Branch",
          address: f.properties.Address || "",
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }));

      onSheltersLoadedRef.current?.([...coolingList, ...libraryList]);
    }).catch((err) => console.error("Failed to load shelter data:", err));

    // Load heat island data
    fetch(HEAT_URL)
      .then((r) => r.json())
      .then((data) => setHeatData(data))
      .catch((err) => console.error("Failed to load heat data:", err));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      {/* Mapbox Light grey base map */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        tileSize={512}
        zoomOffset={-1}
      />

      {/* Heat Island Effect layer */}
      {heatData && (
        <GeoJSON
          data={heatData}
          style={(feature) => ({
            fillColor: heatColor(feature.properties.SurfTemp_Tess_MEAN),
            fillOpacity: 0.45,
            weight: 0,
            stroke: false,
          })}
        />
      )}

      {/* User position marker */}
      <UserLocation position={userLocation} />

      {/* Cooling centre markers — blue */}
      {coolingFeatures
        .filter((f) => f.geometry?.coordinates?.length >= 2)
        .map((f, i) => (
          <CircleMarker
            key={`cc-${i}`}
            center={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            radius={5}
            pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.8, weight: 1 }}
          >
            <Popup>
              <strong>{f.properties.NAME || "Cooling Centre"}</strong>
              <br />
              {f.properties.ADDRESS || ""}
            </Popup>
          </CircleMarker>
        ))}

      {/* Library markers — green */}
      {libraryFeatures
        .filter((f) => f.geometry?.coordinates?.length >= 2)
        .map((f, i) => (
          <CircleMarker
            key={`lib-${i}`}
            center={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            radius={5}
            pathOptions={{ color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.8, weight: 1 }}
          >
            <Popup>
              <strong>{f.properties.BranchName || "Library Branch"}</strong>
              <br />
              {f.properties.Address || ""}
            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
