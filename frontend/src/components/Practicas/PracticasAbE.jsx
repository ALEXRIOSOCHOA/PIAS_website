// src/pages/PracticasAbE.jsx
import React, { useState } from "react";
import iconFlechaAbajo from "../../assets/icons/angle-down.svg";
import slidersVertical from "../../assets/icons/sliders-vertical.svg";

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

export default function PracticasAbE() {
  const mapConfig = {
    center: [23.6345, -102.5528],
    zoom: 5,
    popup: "Mapa de prácticas AbE",
  };

  const opcionesPracticas = [
    "Capacidad de producción",
    "Análisis de los sistemas de producción y de la economía rural",
    "Efecto del Cambio Climático en la capacidad productiva",
  ];

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedPracticasOptions, setSelectedPracticasOptions] = useState([]);

  const handleToggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    setSelectedPracticasOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // -------- Modal filtro --------
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const productos = ["Trigo", "Arroz", "Maíz", "soja"];
  const rangos = [
    "1981-1990",
    "1991-2000",
    "2001-2010",
    "2011-2020",
    "2021-2030",
    "2031-2040",
    "2041-2050",
    "2051-2060",
    "2061-2070",
    "2071-2080",
    "2081-2090",
    "2071-2100",
  ];
  const practicasFiltro = ["Regada", "No irrigada", "Cultivo Nativo"];

  const [selectedProductos, setSelectedProductos] = useState(["Maíz"]);
  const [selectedRango, setSelectedRango] = useState("2011-2020");
  const [selectedPracticaFiltro, setSelectedPracticaFiltro] =
    useState("Cultivo Nativo");

  const toggleProducto = (prod) => {
    setSelectedProductos((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  };

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const handleActualizar = () => {
    console.log("Productos:", selectedProductos);
    console.log("Rango:", selectedRango);
    console.log("Práctica:", selectedPracticaFiltro);
    setIsFilterModalOpen(false);
  };

  return (
    <>
      {/* Barra superior */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button
          onClick={handleToggleOptions}
          className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors"
        >
          <span className="text-[#101010] text-[14px] font-semibold">
            Prácticas
          </span>
          <span
            className={`transform transition-transform duration-300 ${
              isOptionsOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" />
          </span>
        </button>

        <button
          onClick={openFilterModal}
          className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors"
        >
          <span className="text-[#101010] text-[14px] font-semibold">
            Filtrar
          </span>
          <span>
            <img src={slidersVertical} alt="icon" className="w-5 h-5" />
          </span>
        </button>
      </div>

      {/* Opciones prácticas */}
      {isOptionsOpen && (
        <div className="w-full mb-6">
          <div className="w-full flex flex-wrap gap-3">
            {opcionesPracticas.map((option) => {
              const selected = selectedPracticasOptions.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`
                    px-4 py-2 bg-white rounded-[40px]
                    border outline outline-1 outline-offset-[-1px]
                    flex items-center gap-3
                    transition whitespace-normal
                    ${
                      selected
                        ? "border-[#59AD31] outline-[#59AD31] bg-[#F5FFF1]"
                        : "border-[#E3E5E6] outline-[#E3E5E6] hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="w-4 h-4 relative">
                    <div
                      className={`
                        w-4 h-4 rounded-md border
                        ${
                          selected
                            ? "bg-[#59AD31] border-[#59AD31]"
                            : "bg-white border-[#59AD31]"
                        }
                      `}
                    />
                  </div>
                  <span className="text-black text-[15px] leading-[19.5px] text-left">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

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

      {/* MODAL FILTRAR PRÁCTICAS */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={closeFilterModal}
              className="absolute top-4 right-4 w-6 h-6 bg-black rounded flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">×</span>
            </button>

            <h2 className="text-[18px] font-semibold mb-4">Filtrar</h2>

            {/* Producto */}
            <div className="mb-6">
              <h3 className="text-[16px] font-medium mb-3">Producto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {productos.map((prod) => {
                  const selected = selectedProductos.includes(prod);
                  return (
                    <button
                      key={prod}
                      type="button"
                      onClick={() => toggleProducto(prod)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 relative">
                        <div
                          className={`w-6 h-6 rounded-md border ${
                            selected
                              ? "bg-[#59AD31] border-[#59AD31]"
                              : "bg-white border-[#DCDCDF]"
                          }`}
                        />
                        {selected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              ✓
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[15px]">{prod}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rango de tiempo */}
            <div className="mb-6">
              <h3 className="text-[16px] font-medium mb-3">Rango de tiempo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {rangos.map((rango) => {
                  const selected = selectedRango === rango;
                  return (
                    <button
                      key={rango}
                      type="button"
                      onClick={() => setSelectedRango(rango)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 relative">
                        <div className="w-6 h-6 rounded-full border border-[#DCDCDF] relative">
                          {selected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#59AD31] absolute inset-[4px]" />
                          )}
                        </div>
                      </div>
                      <span className="text-[15px]">{rango}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Práctica */}
            <div className="mb-8">
              <h3 className="text-[16px] font-medium mb-3">Práctica</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {practicasFiltro.map((p) => {
                  const selected = selectedPracticaFiltro === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPracticaFiltro(p)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 relative">
                        <div className="w-6 h-6 rounded-full border border-[#DCDCDF] relative">
                          {selected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#59AD31] absolute inset-[4px]" />
                          )}
                        </div>
                      </div>
                      <span className="text-[15px]">{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeFilterModal}
                className="px-5 py-2 bg-[#F2F2F2] rounded-lg text-[16px] font-medium text-[#0F0F0F]"
              >
                Cancelar
              </button>
              <button
                onClick={handleActualizar}
                className="px-4 py-2 bg-[#0F0F0F] rounded-lg text-white text-[14px] font-medium"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
