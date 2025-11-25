// src/pages/UsoDeSuelo.jsx
import React, { useState } from "react";
import iconFlechaAbajo from "../../assets/icons/angle-down.svg";
import slidersVertical from "../../assets/icons/sliders-vertical.svg";
import iconCheckBox from "../../assets/icons/checkbox.svg";

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

export default function UsoDeSuelo() {
  const mapConfig = {
    center: [19.4326, -99.1332],
    zoom: 6,
    popup: "Mapa de cambio de uso de suelo",
  };

  const opcionesVista = [
    "Uso de suelo y vegetación",
    "Incertidumbre sobre los cambios futuros en la productividad",
  ];

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedVistaOption, setSelectedVistaOption] = useState("");

  const handleToggleOptions = () => setIsOptionsOpen((prev) => !prev);

  const handleSelectOption = (option) => {
    setSelectedVistaOption(option);
  };

  // Modal filtro
  const [isUsoFilterModalOpen, setIsUsoFilterModalOpen] = useState(false);

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

  const [usoSelectedProductos, setUsoSelectedProductos] = useState(["Maíz"]);
  const [usoSelectedRango, setUsoSelectedRango] = useState("2011-2020");
  const [usoSelectedPractica, setUsoSelectedPractica] =
    useState("Cultivo Nativo");
  const [usoSelectedEscenario, setUsoSelectedEscenario] =
    useState("Escenario extremo");

  const openUsoFilterModal = () => setIsUsoFilterModalOpen(true);
  const closeUsoFilterModal = () => setIsUsoFilterModalOpen(false);

  const toggleUsoProducto = (prod) => {
    setUsoSelectedProductos((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  };

  const handleUsoActualizar = () => {
    console.log("USO - Productos:", usoSelectedProductos);
    console.log("USO - Rango:", usoSelectedRango);
    console.log("USO - Práctica:", usoSelectedPractica);
    console.log("USO - Escenario:", usoSelectedEscenario);
    setIsUsoFilterModalOpen(false);
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
            Vista
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
          onClick={openUsoFilterModal}
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

      {/* Opciones Vista */}
      {isOptionsOpen && (
        <div className="w-full mb-6">
          <div className="w-full flex flex-wrap gap-3">
            {opcionesVista.map((option) => {
              const selected = selectedVistaOption === option;
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
                  <div className="w-4 h-4 relative flex items-center justify-center">
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
                    {selected && (
                      <img
                        src={iconCheckBox}
                        alt="icon"
                        className="w-5 h-5 absolute"
                      />
                    )}
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

      {/* MODAL FILTRAR USO DE SUELO */}
      {isUsoFilterModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={closeUsoFilterModal}
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
                  const selected = usoSelectedProductos.includes(prod);
                  return (
                    <button
                      key={prod}
                      type="button"
                      onClick={() => toggleUsoProducto(prod)}
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
                      <span className="text-[15px] leading-[19.5px]">
                        {prod}
                      </span>
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
                  const selected = usoSelectedRango === rango;
                  return (
                    <button
                      key={rango}
                      type="button"
                      onClick={() => setUsoSelectedRango(rango)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 relative">
                        <div className="w-6 h-6 rounded-full border border-[#DCDCDF] relative">
                          {selected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#59AD31] absolute inset-[4px]" />
                          )}
                        </div>
                      </div>
                      <span className="text-[15px] leading-[19.5px]">
                        {rango}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Práctica */}
            <div className="mb-6">
              <h3 className="text-[16px] font-medium mb-3">Práctica</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {practicasFiltro.map((p) => {
                  const selected = usoSelectedPractica === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setUsoSelectedPractica(p)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 relative">
                        <div className="w-6 h-6 rounded-full border border-[#DCDCDF] relative">
                          {selected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#59AD31] absolute inset-[4px]" />
                          )}
                        </div>
                      </div>
                      <span className="text-[15px] leading-[19.5px]">{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Escenario de cambio climático */}
            <div className="mb-8">
              <h3 className="text-[16px] font-medium mb-3">
                Escenario de cambio climático:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    key: "Escenario extremo",
                    title: "Escenario extremo",
                    subtitle: "RCP 8.5",
                  },
                  {
                    key: "Escenario moderado",
                    title: "Escenario moderado",
                    subtitle: "RCP 4.5",
                  },
                ].map((esc) => {
                  const selected = usoSelectedEscenario === esc.key;
                  return (
                    <button
                      key={esc.key}
                      type="button"
                      onClick={() => setUsoSelectedEscenario(esc.key)}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="w-6 h-6 relative">
                        <div className="w-6 h-6 rounded-full border border-[#DCDCDF] relative">
                          {selected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#59AD31] absolute inset-[4px]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] leading-[19.5px]">
                          {esc.title}
                        </span>
                        <span className="text-[15px] leading-[19.5px] italic">
                          {esc.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeUsoFilterModal}
                className="px-5 py-2 bg-[#F2F2F2] rounded-lg text-[16px] font-medium text-[#0F0F0F]"
              >
                Cancelar
              </button>

              <button
                onClick={handleUsoActualizar}
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
