// src/components/Finanzas/Informacion/ProductosPorMercado.jsx
import React, { useState } from "react";
import iconFlechaAbajo from "../../../assets/icons/angle-down.svg";
import iconChartBar from "../../../assets/icons/chart-bar-vertical.svg";
import iconChartLine from "../../../assets/icons/chart-line.svg";
import iconCheckBox from "../../../assets/icons/checkbox.svg";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

/**
 * 🔹 Datos por producto
 * Cada producto tiene valores para:
 *   - local
 *   - regional (base)
 *   - nacional
 *   - global
 */
const dataPorProducto = {
  Café: [
    { mes: "Ene", local: 500, nacional: 900, global: 1200 },
    { mes: "Feb", local: 4800, nacional: 4000, global: 4500 },
    { mes: "Mar", local: 2600, nacional: 3000, global: 3200 },
    { mes: "Abr", local: 3021, nacional: 3300, global: 3500 },
    { mes: "May", local: 3800, nacional: 3700, global: 3900 },
    { mes: "Jun", local: 2400, nacional: 2700, global: 2900 },
    { mes: "Jul", local: 4200, nacional: 4100, global: 4300 },
  ],
  "Milpa / MIAF": [
    { mes: "Ene", local: 800, nacional: 700, global: 900 },
    { mes: "Feb", local: 3000, nacional: 2900, global: 3200 },
    { mes: "Mar", local: 3500, nacional: 3600, global: 3800 },
    { mes: "Abr", local: 2000, nacional: 2300, global: 2500 },
    { mes: "May", local: 2800, regional: 2600, nacional: 2750, global: 2950 },
    { mes: "Jun", local: 3200, regional: 3000, nacional: 3100, global: 3300 },
    { mes: "Jul", local: 3100, regional: 3300, nacional: 3400, global: 3600 },
  ],
  Silvopastoril: [
    { mes: "Ene", local: 1200, nacional: 1100, global: 1300 },
    { mes: "Feb", local: 2200, nacional: 2150, global: 2400 },
    { mes: "Mar", local: 2600, nacional: 2600, global: 2800 },
    { mes: "Abr", local: 2900, nacional: 2900, global: 3100 },
    { mes: "May", local: 3100, nacional: 3150, global: 3350 },
    { mes: "Jun", local: 3300, nacional: 3300, global: 3500 },
    { mes: "Jul", local: 3500, nacional: 3450, global: 3650 },
  ],
  Apicultura: [
    { mes: "Ene", local: 400, nacional: 380, global: 450 },
    { mes: "Feb", local: 900, nacional: 850, global: 950 },
    { mes: "Mar", local: 1200, nacional: 1150, global: 1250 },
    { mes: "Abr", local: 1500, nacional: 1450, global: 1600 },
    { mes: "May", local: 1800, nacional: 1750, global: 1900 },
    { mes: "Jun", local: 1700, nacional: 1700, global: 1850 },
    { mes: "Jul", local: 1900, nacional: 1900, global: 2050 },
  ],
  Agave: [
    { mes: "Ene", local: 600, nacional: 580, global: 650 },
    { mes: "Feb", local: 1100, nacional: 1100, global: 1200 },
    { mes: "Mar", local: 1700, nacional: 1750, global: 1900 },
    { mes: "Abr", local: 2300, nacional: 2300, global: 2450 },
    { mes: "May", local: 2500, nacional: 2550, global: 2700 },
    { mes: "Jun", local: 2700, nacional: 2750, global: 2900 },
    { mes: "Jul", local: 2900, nacional: 2950, global: 3100 },
  ],
};

const productos = [
  "Café",
  "Milpa / MIAF",
  "Silvopastoril",
  "Apicultura",
  "Agave",
];

// series de la gráfica
const seriesOpciones = ["Local", "Regional", "Nacional", "Global"];

// Estados disponibles
const estados = [
  "AGUASCALIENTES",
  "BAJA CALIFORNIA",
  "BAJA CALIFORNIA SUR",
  "CAMPECHE",
  "COAHUILA",
  "COLIMA",
  "CHIAPAS",
  "CHIHUAHUA",
  "CIUDAD DE MEXICO",
  "DURANGO",
  "GUANAJUATO",
  "GUERRERO",
  "HIDALGO",
  "JALISCO",
  "MEXICO",
  "MICHOACAN",
  "MORELOS",
  "NAYARIT",
  "NUEVO LEON",
  "OAXACA",
  "PUEBLA",
  "QUERETARO",
  "QUINTANA ROO",
  "SAN LUIS POTOSI",
  "SINALOA",
  "SONORA",
  "TABASCO",
  "TAMAULIPAS",
  "TLAXCALA",
  "VERACRUZ",
  "YUCATAN",
  "ZACATECAS",
];


const regionalDataPorEstado = {
  AGUASCALIENTES: {
    "Café": [
      { mes: "Ene", regional: 650 },
      { mes: "Feb", regional: 4100 },
      { mes: "Mar", regional: 2700 },
      { mes: "Abr", regional: 3000 },
      { mes: "May", regional: 3500 },
      { mes: "Jun", regional: 2550 },
      { mes: "Jul", regional: 3800 },
    ],
    "Milpa / MIAF": [
      { mes: "Ene", regional: 580 },
      { mes: "Feb", regional: 2700 },
      { mes: "Mar", regional: 3350 },
      { mes: "Abr", regional: 2150 },
      { mes: "May", regional: 2550 },
      { mes: "Jun", regional: 2950 },
      { mes: "Jul", regional: 3200 },
    ],
    Silvopastoril: [
      { mes: "Ene", regional: 980 },
      { mes: "Feb", regional: 2050 },
      { mes: "Mar", regional: 2450 },
      { mes: "Abr", regional: 2750 },
      { mes: "May", regional: 3000 },
      { mes: "Jun", regional: 3150 },
      { mes: "Jul", regional: 3350 },
    ],
    Apicultura: [
      { mes: "Ene", regional: 340 },
      { mes: "Feb", regional: 780 },
      { mes: "Mar", regional: 1080 },
      { mes: "Abr", regional: 1380 },
      { mes: "May", regional: 1680 },
      { mes: "Jun", regional: 1620 },
      { mes: "Jul", regional: 1820 },
    ],
    Agave: [
      { mes: "Ene", regional: 540 },
      { mes: "Feb", regional: 1030 },
      { mes: "Mar", regional: 1620 },
      { mes: "Abr", regional: 2170 },
      { mes: "May", regional: 2420 },
      { mes: "Jun", regional: 2620 },
      { mes: "Jul", regional: 2820 },
    ],
  },
  "BAJA CALIFORNIA": {
    "Café": [
      { mes: "Ene", regional: 720 },
      { mes: "Feb", regional: 4300 },
      { mes: "Mar", regional: 2900 },
      { mes: "Abr", regional: 3200 },
      { mes: "May", regional: 3700 },
      { mes: "Jun", regional: 2750 },
      { mes: "Jul", regional: 4050 },
    ],
    "Milpa / MIAF": [
      { mes: "Ene", regional: 620 },
      { mes: "Feb", regional: 2900 },
      { mes: "Mar", regional: 3500 },
      { mes: "Abr", regional: 2300 },
      { mes: "May", regional: 2700 },
      { mes: "Jun", regional: 3100 },
      { mes: "Jul", regional: 3400 },
    ],
    Silvopastoril: [
      { mes: "Ene", regional: 1020 },
      { mes: "Feb", regional: 2150 },
      { mes: "Mar", regional: 2550 },
      { mes: "Abr", regional: 2850 },
      { mes: "May", regional: 3100 },
      { mes: "Jun", regional: 3250 },
      { mes: "Jul", regional: 3450 },
    ],
    Apicultura: [
      { mes: "Ene", regional: 360 },
      { mes: "Feb", regional: 820 },
      { mes: "Mar", regional: 1120 },
      { mes: "Abr", regional: 1420 },
      { mes: "May", regional: 1720 },
      { mes: "Jun", regional: 1670 },
      { mes: "Jul", regional: 1870 },
    ],
    Agave: [
      { mes: "Ene", regional: 560 },
      { mes: "Feb", regional: 1070 },
      { mes: "Mar", regional: 1680 },
      { mes: "Abr", regional: 2230 },
      { mes: "May", regional: 2480 },
      { mes: "Jun", regional: 2680 },
      { mes: "Jul", regional: 2880 },
    ],
  },
  "BAJA CALIFORNIA SUR": {
    "Café": [
      { mes: "Ene", regional: 690 },
      { mes: "Feb", regional: 4150 },
      { mes: "Mar", regional: 2750 },
      { mes: "Abr", regional: 3050 },
      { mes: "May", regional: 3550 },
      { mes: "Jun", regional: 2500 },
      { mes: "Jul", regional: 3850 },
    ],
    "Milpa / MIAF": [
      { mes: "Ene", regional: 590 },
      { mes: "Feb", regional: 2750 },
      { mes: "Mar", regional: 3300 },
      { mes: "Abr", regional: 2100 },
      { mes: "May", regional: 2500 },
      { mes: "Jun", regional: 2900 },
      { mes: "Jul", regional: 3200 },
    ],
    Silvopastoril: [
      { mes: "Ene", regional: 990 },
      { mes: "Feb", regional: 2080 },
      { mes: "Mar", regional: 2480 },
      { mes: "Abr", regional: 2780 },
      { mes: "May", regional: 3030 },
      { mes: "Jun", regional: 3180 },
      { mes: "Jul", regional: 3380 },
    ],
    Apicultura: [
      { mes: "Ene", regional: 345 },
      { mes: "Feb", regional: 790 },
      { mes: "Mar", regional: 1090 },
      { mes: "Abr", regional: 1390 },
      { mes: "May", regional: 1690 },
      { mes: "Jun", regional: 1640 },
      { mes: "Jul", regional: 1840 },
    ],
    Agave: [
      { mes: "Ene", regional: 545 },
      { mes: "Feb", regional: 1040 },
      { mes: "Mar", regional: 1660 },
      { mes: "Abr", regional: 2210 },
      { mes: "May", regional: 2460 },
      { mes: "Jun", regional: 2660 },
      { mes: "Jul", regional: 2860 },
    ],
  },

  CAMPECHE: {
    "Café": [
      { mes: "Ene", regional: 710 },
      { mes: "Feb", regional: 4250 },
      { mes: "Mar", regional: 2850 },
      { mes: "Abr", regional: 3150 },
      { mes: "May", regional: 3650 },
      { mes: "Jun", regional: 2650 },
      { mes: "Jul", regional: 3950 },
    ],
    "Milpa / MIAF": [
      { mes: "Ene", regional: 610 },
      { mes: "Feb", regional: 2850 },
      { mes: "Mar", regional: 3450 },
      { mes: "Abr", regional: 2250 },
      { mes: "May", regional: 2650 },
      { mes: "Jun", regional: 3050 },
      { mes: "Jul", regional: 3350 },
    ],
    Silvopastoril: [
      { mes: "Ene", regional: 1010 },
      { mes: "Feb", regional: 2130 },
      { mes: "Mar", regional: 2530 },
      { mes: "Abr", regional: 2830 },
      { mes: "May", regional: 3080 },
      { mes: "Jun", regional: 3230 },
      { mes: "Jul", regional: 3430 },
    ],
    Apicultura: [
      { mes: "Ene", regional: 355 },
      { mes: "Feb", regional: 810 },
      { mes: "Mar", regional: 1110 },
      { mes: "Abr", regional: 1410 },
      { mes: "May", regional: 1710 },
      { mes: "Jun", regional: 1660 },
      { mes: "Jul", regional: 1860 },
    ],
    Agave: [
      { mes: "Ene", regional: 555 },
      { mes: "Feb", regional: 1060 },
      { mes: "Mar", regional: 1670 },
      { mes: "Abr", regional: 2220 },
      { mes: "May", regional: 2470 },
      { mes: "Jun", regional: 2670 },
      { mes: "Jul", regional: 2870 },
    ],
  },
};

// Para el tooltip: mapear dataKey → texto bonito
const labelPorClave = {
  local: "Local",
  regional: "Regional",
  nacional: "Nacional",
  global: "Global",
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#323334] text-white text-[14px] font-medium rounded-lg px-2 py-1 shadow">
        <div className="text-[12px] text-gray-200 mb-1">{label}</div>
        {payload.map((p) => (
          <div
            key={p.dataKey}
            className="flex justify-between gap-4 text-[13px]"
          >
            <span>{labelPorClave[p.dataKey] || p.dataKey}</span>
            <span>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ProductosPorMercado() {
  const [productoActivo, setProductoActivo] = useState("Café");
  const [chartType, setChartType] = useState("line"); // "line" | "bar"
  const [isProductosOpen, setIsProductosOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(["Local"]); // Local, Regional, Nacional, Global

  // 🔹 Estado / modal para "Regional"
  const [isEstadoModalOpen, setIsEstadoModalOpen] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("AGUASCALIENTES");
  const [draftEstadoSeleccionado, setDraftEstadoSeleccionado] = useState();

  const handleToggleProductos = () => {
    setIsProductosOpen((prev) => !prev);
  };

  const handleSelectProducto = (prod) => {
    setProductoActivo(prod);
  };

  // solo una serie a la vez
  const handleToggleSerie = (serie) => {
    setSelectedSeries([serie]);
    if (serie === "Regional") {
      // Al abrir Regional, el draft parte del valor actual
      setDraftEstadoSeleccionado(estadoSeleccionado || "");
    } else {
      setIsEstadoModalOpen(false);
    }
  };

  const abrirModalEstado = () => {
    setDraftEstadoSeleccionado(estadoSeleccionado || "");
    setIsEstadoModalOpen(true);
  };

  const cerrarModalEstado = () => {
    setIsEstadoModalOpen(false);
    // NO cambiamos estadoSeleccionado aquí
  };

  const handleSelectEstado = (estado) => {
    setDraftEstadoSeleccionado(estado);
    // solo cambiamos el borrador; la gráfica aún no se actualiza
  };

  const aplicarEstado = () => {
    setEstadoSeleccionado(draftEstadoSeleccionado);
    setIsEstadoModalOpen(false);
  };

  // 🔹 Data base según producto
  const baseData = dataPorProducto[productoActivo] || dataPorProducto["Café"];

  // 🔹 Series activas: si no hay ninguna, usamos Local como fallback
  const seriesActivas = selectedSeries.length > 0 ? selectedSeries : ["Local"];

  const serieActual = seriesActivas[0]; // solo hay una por diseño

  // 🔹 Si la serie es Regional y hay estadoSeleccionado definitivo,
  //     mezclamos los datos con la serie por estado
  let chartData = baseData;
  if (serieActual === "Regional" && estadoSeleccionado) {
    const serieRegionalEstado =
      regionalDataPorEstado[estadoSeleccionado]?.[productoActivo];
    if (serieRegionalEstado) {
      chartData = baseData.map((row, idx) => ({
        ...row,
        regional:
          serieRegionalEstado[idx]?.regional !== undefined
            ? serieRegionalEstado[idx].regional
            : row.regional,
      }));
    }
  }

  // Config visual por serie
  const seriesConfig = {
    Local: {
      key: "local",
      stroke: "#00AAFF",
      fillId: "colorLocal",
    },
    Regional: {
      key: "regional",
      stroke: "#9999CC",
      fillId: "colorRegional",
    },
    Nacional: {
      key: "nacional",
      stroke: "#54B046",
      fillId: "colorNacional",
    },
    Global: {
      key: "global",
      stroke: "#FBBA06",
      fillId: "colorGlobal",
    },
  };

  const renderChart = () => {
    if (chartType === "bar") {
      // 🔹 Gráfica de barras
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 40, right: 20, left: 0, bottom: 40 }}
          >
            <defs>
              <linearGradient id="colorLocal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00AAFF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00AAFF" stopOpacity={0.2} />
              </linearGradient>

              <linearGradient id="colorRegional" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(153,153,204,0.20)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              <linearGradient id="colorNacional" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#54B046" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#54B046" stopOpacity={0.2} />
              </linearGradient>

              <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBA06" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FBBA06" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#98999A" }}
              axisLine={{ stroke: "#E3E5E6" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#98999A" }}
              axisLine={{ stroke: "#E3E5E6" }}
              tickLine={false}
              tickCount={6}
              domain={[0, 5000]}
            />
            <Tooltip content={<CustomTooltip />} />

            {seriesActivas.map((serie) => {
              const cfg = seriesConfig[serie];
              if (!cfg) return null;
              return (
                <Bar
                  key={serie}
                  dataKey={cfg.key}
                  name={serie}
                  fill={`url(#${cfg.fillId})`}
                  stroke={cfg.stroke}
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // 🔹 Gráfica de área / línea
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 40, right: 20, left: 0, bottom: 40 }}
        >
          <defs>
            <linearGradient id="colorLocal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00AAFF" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorRegional" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(153,153,204,0.20)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            <linearGradient id="colorNacional" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#54B046" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBA06" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="mes"
            tick={{ fontSize: 12, fill: "#98999A" }}
            axisLine={{ stroke: "#E3E5E6" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#98999A" }}
            axisLine={{ stroke: "#E3E5E6" }}
            tickLine={false}
            tickCount={6}
            domain={[0, 5000]}
          />

          <Tooltip content={<CustomTooltip />} />

          {seriesActivas.map((serie) => {
            const cfg = seriesConfig[serie];
            if (!cfg) return null;
            return (
              <Area
                key={serie}
                type="linear"
                dataKey={cfg.key}
                name={serie}
                stroke={cfg.stroke}
                strokeWidth={2}
                fill={`url(#${cfg.fillId})`}
                dot={{
                  r: 4,
                  stroke: "#FFFFFF",
                  strokeWidth: 1,
                  fill: cfg.stroke,
                }}
                activeDot={{
                  r: 5,
                  stroke: "#FFFFFF",
                  strokeWidth: 1,
                  fill: "#323334",
                }}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  // 🧠 Texto para el título
  const seriesTexto =
    seriesActivas.length === 1 ? seriesActivas[0] : seriesActivas.join(", ");

  const esRegional = serieActual === "Regional";

  return (
    <>
      {/* 🔹 Barra superior */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        {/* Botón Productos */}
        <button
          className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors"
          onClick={handleToggleProductos}
        >
          <span className="text-[#101010] text-[14px] font-semibold">
            Productos
          </span>
          <span
            className={`transform transition-transform duration-300 ${
              isProductosOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" />
          </span>
        </button>

        {/* Botón Estado (solo si la serie es Regional) */}
        {esRegional && (
          <button
            type="button"
            onClick={abrirModalEstado}
            className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors"
          >
            <span className="text-[#101010] text-[14px] font-semibold">
              Estado
            </span>
            {estadoSeleccionado && (
              <span className="text-[13px] text-[#98999A]">
                {estadoSeleccionado}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Opciones de Productos */}
      {isProductosOpen && (
        <div className="w-full mb-6">
          <div className="w-full flex flex-wrap gap-3">
            {productos.map((prod) => {
              const selected = productoActivo === prod;
              return (
                <button
                  key={prod}
                  type="button"
                  onClick={() => handleSelectProducto(prod)}
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
                    {prod}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 🔹 Tarjeta principal con gráfica */}
      <div className="mt-4 bg-white rounded-xl shadow-sm w-full h-[750px] relative overflow-hidden">
        {/* Selector de SERIES */}
        <div className="absolute top-6 left-6 flex items-center gap-4 flex-wrap">
          {seriesOpciones.map((serie) => {
            const selected = seriesActivas.includes(serie);
            return (
              <button
                key={serie}
                type="button"
                onClick={() => handleToggleSerie(serie)}
                className={`px-4 py-2 rounded-lg text-[15px] font-medium ${
                  selected
                    ? "bg-[#EDF0F2] text-[#323334]"
                    : "bg-transparent text-[#323334]"
                }`}
              >
                {serie}
              </button>
            );
          })}
        </div>

        {/* Título centrado */}
        <div className="absolute top-[84px] left-1/2 -translate-x-1/2 text-center">
          <span className="text-[15px] font-medium text-[#323334]">
            {productoActivo}: {seriesTexto}
            {esRegional && estadoSeleccionado ? ` — ${estadoSeleccionado}` : ""}
          </span>
        </div>

        {/* Iconos tipo de gráfica */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          {/* Línea / Área */}
          <button
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              chartType === "line"
                ? "bg-[#54B046]"
                : "bg-white border border-[#E3E5E6] hover:bg-gray-50"
            }`}
            onClick={() => setChartType("line")}
          >
            <img
              src={iconChartLine}
              alt="Línea"
              className={`w-5 h-5 ${
                chartType === "line" ? "invert-0" : "brightness-0"
              }`}
            />
          </button>

          {/* Barras */}
          <button
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              chartType === "bar"
                ? "bg-[#54B046]"
                : "bg-white border border-[#E3E5E6] hover:bg-gray-50"
            }`}
            onClick={() => setChartType("bar")}
          >
            <img
              src={iconChartBar}
              alt="Barras"
              className={`w-5 h-5 ${
                chartType === "bar" ? "invert-0" : "brightness-0"
              }`}
            />
          </button>
        </div>

        {/* 📊 Gráfica */}
        <div className="absolute left-6 right-6 top-[130px] bottom-[90px]">
          {renderChart()}

          {/* Texto eje X/Y */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-36px] text-center text-[12px]">
            <span className="text-[#58595A] font-medium">x</span>
            <span className="text-[#98999A] font-normal"> Mes </span>
            <span className="text-[#58595A] font-medium">y</span>
            <span className="text-[#98999A] font-normal">
              {" "}
              Volumen Exportado (t)
            </span>
          </div>
        </div>
      </div>

      {/* 🧊 MODAL ESTADO - estilo Figma */}
      {isEstadoModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[12px] shadow-xl w-full max-w-[640px] max-h-[90vh] relative overflow-hidden">
            {/* Botón cerrar (cuadrito negro) */}
            <button
              onClick={cerrarModalEstado}
              className="absolute top-6 right-6 w-6 h-6 bg-black rounded flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">×</span>
            </button>

            {/* Contenido scrollable */}
            <div className="px-8 pt-8 pb-4 overflow-y-auto max-h-[76vh]">
              {/* Título */}
              <h2 className="text-[18px] font-semibold mb-6">Estado</h2>

              {/* Lista de estados en grid tipo Figma */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  {estados.map((estado) => {
                    const selected = draftEstadoSeleccionado === estado;
                    return (
                      <button
                        key={estado}
                        type="button"
                        onClick={() => handleSelectEstado(estado)}
                        className="w-[180px] flex items-center gap-3 text-left"
                      >
                        {/* Radio button */}
                        <div className="w-5 h-5 rounded-full border border-[#DCDCDF] flex items-center justify-center">
                          {selected && (
                            <div className="w-3 h-3 rounded-full bg-[#59AD31]" />
                          )}
                        </div>

                        {/* Nombre estado */}
                        <span className="text-[15px] font-normal leading-[19.5px] text-black">
                          {estado}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Botones inferiores: Cancelar / Actualizar */}
            <div className="px-8 pb-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cerrarModalEstado}
                className="px-5 py-2 bg-[#F2F2F2] rounded-[10px] text-[16px] font-medium text-[#0F0F0F]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={aplicarEstado}
                className="h-10 px-4 bg-[#0F0F0F] rounded-[8px] inline-flex items-center justify-center"
              >
                <span className="text-white text-[14px] font-medium">
                  Actualizar
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
