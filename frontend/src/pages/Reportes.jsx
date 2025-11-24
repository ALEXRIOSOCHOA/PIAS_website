import React, { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../components/Reports/SearchBar";
import { Filters } from "../components/Reports/Filters";
import { Table } from "../components/Reports/Table";
import { Pagination } from "../components/Reports/Pagination";
import { Modal } from "../components/Reports/Modal";
import { DetailsCard } from "../components/Reports/DetailsCard";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [activityTypeFilter, setactivityTypeFilter] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/reportes/reports"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const formatted = result.map((item) => ({
        ...item,
        ActivityCreationTime: {
          raw: item.ActivityCreationTime,
          formatted: formatDate(item.ActivityCreationTime),
        },
        ActivityDate: {
          raw: item.ActivityDate,
          formatted: formatDate(item.ActivityDate),
        },
        ModelCreationTime: {
          raw: item.ModelCreationTime,
          formatted: formatDate(item.ModelCreationTime),
        },
      }));

      setData(formatted);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function formatDate(value) {
    if (!value) return value;
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const handlePerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setPerPage(value);
      setPage(1);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let res = data;

    const normalizeText = (str) => {
      return str
        ?.normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();
    };

    if (query) {
      const q = query.toLowerCase();
      res = res.filter((r) => {
        const userId = normalizeText(r.userId);
        const modelName = normalizeText(r.ModelName);
        const modelType = normalizeText(r.ModelTypeName);
        const activityType = normalizeText(r.ActivityTypeName);
        const activityCreation =
          r.ActivityCreationTime?.formatted?.toLowerCase() || "";
        return (
          userId?.includes(q) ||
          modelName?.includes(q) ||
          modelType?.includes(q) ||
          activityType?.includes(q) ||
          activityCreation.includes(q)
        );
      });
    }

    if (activityTypeFilter)
      res = res.filter((r) => r.ActivityTypeName === activityTypeFilter);

    if (orgFilter) res = res.filter((r) => r.organization === orgFilter);

    if (sortColumn) {
      res = [...res].sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];

        // Si es fecha (es un objeto con raw y formatted)
        if (x?.raw || y?.raw) {
          // Si ambos son null → iguales
          if (!x?.raw && !y?.raw) return 0;

          // Si x es null → va al final o al inicio según sortDirection
          if (!x?.raw) return sortDirection === "asc" ? 1 : -1;

          // Si y es null → igual pero invertido
          if (!y?.raw) return sortDirection === "asc" ? -1 : 1;

          const dateX = new Date(x.raw);
          const dateY = new Date(y.raw);

          return sortDirection === "asc" ? dateX - dateY : dateY - dateX;
        }

        // texto normal
        if (typeof x === "string" && typeof y === "string") {
          return sortDirection === "asc"
            ? x.localeCompare(y)
            : y.localeCompare(x);
        }

        // número normal
        if (typeof x === "number" && typeof y === "number") {
          return sortDirection === "asc" ? x - y : y - x;
        }

        return 0;
      });
    }
    return res;
  }, [query, activityTypeFilter, orgFilter, data, sortColumn, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedData.length / perPage)
  );
  const pageData = filteredAndSortedData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleExportToCsv = () => {
    if (!filteredAndSortedData || filteredAndSortedData.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const headers = Object.keys(filteredAndSortedData[0]);
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedData.map((row) =>
        headers.map((fieldName) => JSON.stringify(row[fieldName])).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reporte_saberes.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  function handleView(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  const formatDetailsData = (item) => {
    if (!item) return [];
    return [
      { label: "UserID", value: item.userId },
      { label: "Model ID", value: item.modelId },
      { label: "Activity ID", value: item.activityId },
      { label: "Local Organization", value: item.LocalOrganization },
      { label: "Organization", value: item.organization },
      { label: "Other Local Organization", value: item.OtherLocalOrganization },
      { label: "State", value: item.state },
      { label: "Other State", value: item.OtherState },
      { label: "Municipality", value: item.Municipality },
      { label: "Other Municipality", value: item.OtherMunicipality },
      { label: "Location Point", value: item.LocationPoint },
      { label: "Location Polygon", value: item.LocationPolygon },
      { label: "Model Type", value: item.ModelType },
      { label: "Model Type Name", value: item.ModelTypeName },
      { label: "Other Model", value: item.OtherModel },
      { label: "Number of Years", value: item.NoOfYearsUnder },
      { label: "Soil Type", value: item.SoilType },
      { label: "Model Name", value: item.ModelName },
      { label: "Common Issues", value: item.CommonIssues },
      { label: "Additional Comments", value: item.AdditionalComments },
      { label: "Model Creation Time", value: item.ModelCreationTime.formatted },
      { label: "Area", value: item.Area },
      { label: "Activity Type", value: item.ActivityType },
      { label: "Activity Type Name", value: item.ActivityTypeName },
      { label: "Other Activity", value: item.OtherActivity },
      { label: "Activity Date", value: item.ActivityDate.formatted },
      { label: "Value", value: item.Value },
      { label: "Split Over Time", value: item.SplitOverTime },
      { label: "Duration", value: item.Duration },
      { label: "Activity Description", value: item.ActivityDescription },
      { label: "Activity Sub Type", value: item.ActivitySubType },
      { label: "Area Percent", value: item.AreaPercent },
      { label: "Activity Creation Time", value: item.ActivityCreationTime.formatted },
    ];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error al cargar los datos: {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1440px] top-0">
      

      <div className="bg-white rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/2">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <Filters
            activityTypeFilter={activityTypeFilter}
            setactivityTypeFilter={setactivityTypeFilter}
            orgFilter={orgFilter}
            setOrgFilter={setOrgFilter}
            onExport={handleExportToCsv}
          />
        </div>

        <div className="mt-6">
          <Table
            data={pageData}
            onView={handleView}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />

              <input
                type="number"
                value={perPage}
                onChange={handlePerPageChange}
                min="1"
                className="bg-white border border-gray-200 rounded px-3 py-1 w-20 text-center focus:outline-none focus:ring-2 focus:ring-[#54B046] focus:border-[#54B046]"
              />
              <div className="text-sm text-gray-500">
                Registros de {filteredAndSortedData.length} resultados
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Detalles del Registro"
      >
        {selectedItem && <DetailsCard data={formatDetailsData(selectedItem)} />}
      </Modal>
    </div>
  );
}
