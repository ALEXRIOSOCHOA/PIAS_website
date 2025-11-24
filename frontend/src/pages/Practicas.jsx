import React, { useState } from 'react';
// Asegúrate de que las rutas de los assets son correctas
import iconFlechaAbajo from "../assets/icons/angle-down.svg";
import slidersVertical from "../assets/icons/sliders-vertical.svg";
import 'leaflet/dist/leaflet.css';

// Leaflet + React-Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix para los iconos de los marcadores en muchos bundlers (Vite, CRA, etc.)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Componente reutilizable para las pestañas
const TabItem = ({ title, isActive, onClick }) => (
  <div
    className={`h-full px-2 flex items-center cursor-pointer transition-colors duration-200 ${
      isActive
        ? 'border-b-[1.5px] border-[#54B046]'
        : 'border-b-[1.5px] border-transparent hover:border-[#98999A]'
    }`}
    onClick={onClick}
  >
    <span className={`text-[16px] font-medium ${isActive ? 'text-[#54B046]' : 'text-[#98999A]'}`}>
      {title}
    </span>
  </div>
);

export default function Practicas() {
  const [activeTab, setActiveTab] = useState('Prácticas AbE');

  const tabs = [
    'Prácticas AbE',
    'Cambio de uso de suelo',
    'Análisis de vulnerabilidad',
  ];

  // Configuración del mapa por pestaña (centro y zoom)
  const mapConfigByTab = {
    'Prácticas AbE': {
      center: [23.6345, -102.5528], // México (ejemplo)
      zoom: 5,
      popup: 'Mapa de prácticas AbE',
    },
    'Cambio de uso de suelo': {
      center: [19.4326, -99.1332], // CDMX (ejemplo)
      zoom: 6,
      popup: 'Mapa de cambio de uso de suelo',
    },
    'Análisis de vulnerabilidad': {
      center: [17.5, -92.5], // Sur de México (ejemplo)
      zoom: 6,
      popup: 'Mapa de análisis de vulnerabilidad',
    },
  };

  const currentMapConfig = mapConfigByTab[activeTab];

  return (
    <div className="w-full relative p-4 md:p-6 font-montserrat min-h-screen">

      {/* Contenedor de Pestañas (Tabs Responsivo) */}
      <div className="w-full h-auto min-h-[54px] bg-white rounded-lg px-4 md:px-6 flex flex-nowrap overflow-x-auto items-center gap-6 shadow-sm mb-6">
        {tabs.map((tabTitle) => (
          <TabItem
            key={tabTitle}
            title={tabTitle}
            isActive={activeTab === tabTitle}
            onClick={() => setActiveTab(tabTitle)}
          />
        ))}
      </div>

      {/* Controles Superiores: Filtro y Selección */}
      <div className="flex justify-between items-center mb-6">
        {/* Selector de Prácticas */}
        <button className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors">
          <span className="text-[#101010] text-[14px] font-semibold">Prácticas</span>
          <span><img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" /></span>
        </button>
        
        {/* Botón de Filtrar */}
        <button className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors">
          <span className="text-[#101010] text-[14px] font-semibold">Filtrar</span>
          <span><img src={slidersVertical} alt="icon" className="w-5 h-5" /></span>
        </button>
      </div>

      {/* Área de Contenido Principal con Mapa Leaflet */}
      <div className="w-full aspect-video md:aspect-[16/9] bg-white rounded-lg overflow-hidden relative shadow-lg">
        
        {/* Mapa Leaflet ocupa todo el contenedor */}
        <MapContainer
          center={currentMapConfig.center}
          zoom={currentMapConfig.zoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={currentMapConfig.center}>
            <Popup>
              {currentMapConfig.popup}
            </Popup>
          </Marker>
        </MapContainer>

        {/* Título superpuesto (overlay) sobre el mapa */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow">
          <h2 className="text-xl md:text-2xl font-bold text-[#54B046]">
            Contenido para: {activeTab}
          </h2>
        </div>
      </div>
    </div>
  );
}
