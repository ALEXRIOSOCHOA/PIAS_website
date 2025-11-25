// src/pages/AnalisisDeVulnerabilidad.jsx
import React from "react";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function AnalisisDeVulnerabilidad() {
  const mapConfig = {
    center: [17.5, -92.5],
    zoom: 6,
    popup: "Mapa de análisis de vulnerabilidad",
  };

  return (
    <>
      {/* Barra superior */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button
          className="h-10 px-4 py-2 bg-[#0F0F0F] rounded-lg flex items-center justify-center shadow text-white 
                     font-medium text-[14px] leading-[18px]"
          onClick={() => console.log("Delimitar")}
        >
          Delimitar
        </button>
      </div>

      {/* Mapa */}
      <div className="w-full aspect-video md:aspect-[16/9] bg-white rounded-lg overflow-hidden relative shadow-lg">
        <MapContainer
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapConfig.center}>
            <Popup>{mapConfig.popup}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}
