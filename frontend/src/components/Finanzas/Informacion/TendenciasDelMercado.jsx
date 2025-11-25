// src/components/Finanzas/Informacion/TendenciasDelMercado.jsx
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
 *    └─ por scope: Global / Nacional
 *        └─ por tipo de mercado: local / regional
 */
const dataPorProducto = {
  Café: {
    Global: [
      { mes: "Ene", local: 500, regional: 700 },
      { mes: "Feb", local: 4800, regional: 4200 },
      { mes: "Mar", local: 2600, regional: 2800 },
      { mes: "Abr", local: 3021, regional: 3100 },
      { mes: "May", local: 3800, regional: 3600 },
      { mes: "Jun", local: 2400, regional: 2600 },
      { mes: "Jul", local: 4200, regional: 3900 },
    ],
    Nacional: [
      { mes: "Ene", local: 400, regional: 600 },
      { mes: "Feb", local: 3800, regional: 3500 },
      { mes: "Mar", local: 2200, regional: 2300 },
      { mes: "Abr", local: 2800, regional: 2900 },
      { mes: "May", local: 3400, regional: 3200 },
      { mes: "Jun", local: 2100, regional: 2300 },
      { mes: "Jul", local: 3800, regional: 3600 },
    ],
  },

  "Milpa / MIAF": {
    Global: [
      { mes: "Ene", local: 800, regional: 600 },
      { mes: "Feb", local: 3000, regional: 2800 },
      { mes: "Mar", local: 3500, regional: 3400 },
      { mes: "Abr", local: 2000, regional: 2200 },
      { mes: "May", local: 2800, regional: 2600 },
      { mes: "Jun", local: 3200, regional: 3000 },
      { mes: "Jul", local: 3100, regional: 3300 },
    ],
    Nacional: [
      { mes: "Ene", local: 700, regional: 550 },
      { mes: "Feb", local: 2600, regional: 2500 },
      { mes: "Mar", local: 3200, regional: 3100 },
      { mes: "Abr", local: 1900, regional: 2000 },
      { mes: "May", local: 2500, regional: 2400 },
      { mes: "Jun", local: 2900, regional: 2800 },
      { mes: "Jul", local: 3000, regional: 2950 },
    ],
  },

  Silvopastoril: {
    Global: [
      { mes: "Ene", local: 1200, regional: 1000 },
      { mes: "Feb", local: 2200, regional: 2100 },
      { mes: "Mar", local: 2600, regional: 2500 },
      { mes: "Abr", local: 2900, regional: 2800 },
      { mes: "May", local: 3100, regional: 3050 },
      { mes: "Jun", local: 3300, regional: 3200 },
      { mes: "Jul", local: 3500, regional: 3400 },
    ],
    Nacional: [
      { mes: "Ene", local: 1000, regional: 900 },
      { mes: "Feb", local: 2000, regional: 1900 },
      { mes: "Mar", local: 2400, regional: 2300 },
      { mes: "Abr", local: 2700, regional: 2600 },
      { mes: "May", local: 2900, regional: 2850 },
      { mes: "Jun", local: 3050, regional: 3000 },
      { mes: "Jul", local: 3200, regional: 3150 },
    ],
  },

  Apicultura: {
    Global: [
      { mes: "Ene", local: 400, regional: 350 },
      { mes: "Feb", local: 900, regional: 800 },
      { mes: "Mar", local: 1200, regional: 1100 },
      { mes: "Abr", local: 1500, regional: 1400 },
      { mes: "May", local: 1800, regional: 1700 },
      { mes: "Jun", local: 1700, regional: 1650 },
      { mes: "Jul", local: 1900, regional: 1850 },
    ],
    Nacional: [
      { mes: "Ene", local: 350, regional: 320 },
      { mes: "Feb", local: 800, regional: 720 },
      { mes: "Mar", local: 1100, regional: 1000 },
      { mes: "Abr", local: 1400, regional: 1300 },
      { mes: "May", local: 1650, regional: 1550 },
      { mes: "Jun", local: 1600, regional: 1550 },
      { mes: "Jul", local: 1800, regional: 1750 },
    ],
  },

  Agave: {
    Global: [
      { mes: "Ene", local: 600, regional: 550 },
      { mes: "Feb", local: 1100, regional: 1050 },
      { mes: "Mar", local: 1700, regional: 1650 },
      { mes: "Abr", local: 2300, regional: 2200 },
      { mes: "May", local: 2500, regional: 2450 },
      { mes: "Jun", local: 2700, regional: 2650 },
      { mes: "Jul", local: 2900, regional: 2850 },
    ],
    Nacional: [
      { mes: "Ene", local: 550, regional: 500 },
      { mes: "Feb", local: 1000, regional: 950 },
      { mes: "Mar", local: 1500, regional: 1450 },
      { mes: "Abr", local: 2100, regional: 2000 },
      { mes: "May", local: 2300, regional: 2250 },
      { mes: "Jun", local: 2500, regional: 2450 },
      { mes: "Jul", local: 2700, regional: 2650 },
    ],
  },
};

const opcionesMercado = ["Local", "Regional"];

// Para el tooltip: mapear dataKey → texto bonito
const labelPorClave = {
  local: "Local",
  regional: "Regional",
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

export default function TendenciasDelMercado() {
  const [marketScope, setMarketScope] = useState("Nacional"); // Global | Nacional
  const [productoActivo, setProductoActivo] = useState("Café");
  const [chartType, setChartType] = useState("line"); // "line" | "bar"
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedMercadosOptions, setSelectedMercadosOptions] = useState([
    "Local",
  ]); // por defecto Local

  const handleToggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    setSelectedMercadosOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleScopeChange = (scope) => {
    setMarketScope(scope);
  };

  // 🔹 Data actual según producto activo y scope (Global / Nacional)
  const chartData =
    dataPorProducto[productoActivo]?.[marketScope] ||
    dataPorProducto["Café"]["Global"];

  // 🔹 Series activas: si no hay ninguna seleccionada, usamos Local como fallback
  const mercadosActivos =
    selectedMercadosOptions.length > 0 ? selectedMercadosOptions : ["Local"];

  // Configuración visual por opción de mercado
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

            {mercadosActivos.map((mercado) => {
              const cfg = seriesConfig[mercado];
              if (!cfg) return null;
              return (
                <Bar
                  key={mercado}
                  dataKey={cfg.key}
                  name={mercado}
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

    // 🔹 Gráfica de línea/área
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

          {mercadosActivos.map((mercado) => {
            const cfg = seriesConfig[mercado];
            if (!cfg) return null;
            return (
              <Area
                key={mercado}
                type="linear"
                dataKey={cfg.key}
                name={mercado}
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

  return (
    <>
      {/* 🔹 Barra superior */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        {/* Botón Mercado */}
        <button
          className="h-10 px-4 py-2 bg-white rounded-lg inline-flex items-center gap-2 shadow hover:bg-gray-100 transition-colors"
          onClick={handleToggleOptions}
        >
          <span className="text-[#101010] text-[14px] font-semibold">
            Mercado
          </span>
          <span
            className={`transform transition-transform duration-300 ${
              isOptionsOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" />
          </span>
        </button>

        {/* Toggle Global / Nacional */}
        <div className="inline-flex rounded-full overflow-hidden border border-[#E3E5E6] bg-white">
          <button
            type="button"
            onClick={() => handleScopeChange("Global")}
            className={`px-4 md:px-6 py-2 text-[14px] md:text-[15px] transition-colors ${
              marketScope === "Global"
                ? "bg-[#EEF7EC] text-[#54B046] font-semibold border-r border-[#54B046]"
                : "bg-white text-black font-normal border-r border-transparent"
            }`}
          >
            Global
          </button>
          <button
            type="button"
            onClick={() => handleScopeChange("Nacional")}
            className={`px-4 md:px-6 py-2 text-[14px] md:text-[15px] transition-colors ${
              marketScope === "Nacional"
                ? "bg-[#EEF7EC] text-[#54B046] font-semibold"
                : "bg-white text-black font-normal"
            }`}
          >
            Nacional
          </button>
        </div>
      </div>

      {/* Opciones Mercado (Local / Regional) */}
      {isOptionsOpen && (
        <div className="w-full mb-6">
          <div className="w-full flex flex-wrap gap-3">
            {opcionesMercado.map((option) => {
              const selected = selectedMercadosOptions.includes(option);
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

      {/* 🔹 Tarjeta principal con gráfica */}
      <div className="mt-4 bg-white rounded-xl shadow-sm w-full h-[750px] relative overflow-hidden">
        {/* Selector de productos */}
        <div className="absolute top-6 left-6 flex items-center gap-4 flex-wrap">
          {["Café", "Milpa / MIAF", "Silvopastoril", "Apicultura", "Agave"].map(
            (prod) => (
              <button
                key={prod}
                type="button"
                onClick={() => setProductoActivo(prod)}
                className={`px-4 py-2 rounded-lg text-[15px] font-medium ${
                  productoActivo === prod
                    ? "bg-[#EDF0F2] text-[#323334]"
                    : "bg-transparent text-[#323334]"
                }`}
              >
                {prod}
              </button>
            )
          )}
        </div>

        {/* Título centrado */}
        <div className="absolute top-[84px] left-1/2 -translate-x-1/2 text-center">
          <span className="text-[15px] font-medium text-[#323334]">
            {productoActivo}, {marketScope}:{" "}
            {mercadosActivos.length === 1
              ? mercadosActivos[0]
              : "Local y Regional"}
          </span>
        </div>

        {/* Iconitos arriba derecha: tipo de gráfica */}
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
    </>
  );
}
