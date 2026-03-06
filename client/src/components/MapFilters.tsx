import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Activity,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useDiseases } from "../hooks/useDiseases";

interface MapFiltersProps {
  onFiltersChange: (filters: {
    disease: string;
    risk: string;
    order: string;
  }) => void;
  isLoading?: boolean;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  onFiltersChange,
  isLoading = false,
}) => {
  const [disease, setDisease] = useState("");
  const [risk, setRisk] = useState("all");
  const [order, setOrder] = useState("count_desc");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDiseaseDropdown, setShowDiseaseDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { diseases, isLoading: diseasesLoading } = useDiseases();

  const filteredDiseases = diseases.filter((d) =>
    d.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    onFiltersChange({ disease, risk, order });
  }, [disease, risk, order]);

  const handleReset = () => {
    setDisease("");
    setRisk("all");
    setOrder("count_desc");
    setSearchTerm("");
  };

  const handleDiseaseSelect = (diseaseName: string) => {
    setDisease(diseaseName);
    setSearchTerm(diseaseName);
    setShowDiseaseDropdown(false);
  };

  const riskOptions = [
    { value: "all", label: "ทุกระดับ", icon: Activity },
    { value: "normal", label: "ปกติ (0–500)", icon: TrendingUp },
    { value: "warning", label: "เฝ้าระวัง (501–3,000)", icon: AlertTriangle },
    { value: "emergency", label: "ฉุกเฉิน (3,000+)", icon: AlertTriangle },
  ];

  const sortOptions = [
    { value: "count_desc", label: "ผู้ป่วยมากสุด" },
    { value: "count_asc", label: "ผู้ป่วยน้อยสุด" },
    { value: "name_asc", label: "จังหวัด ก–ฮ" },
    { value: "name_desc", label: "จังหวัด ฮ–ก" },
  ];

  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-slate-100 transition-all duration-300 overflow-visible ${isExpanded ? "w-80" : "w-14"}`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-t-2xl"
      >
        {isExpanded ? (
          <>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#0fbd89" }}
              >
                <Filter className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-sm font-heading">
                ตัวกรองแผนที่
              </span>
            </div>
            <X className="w-4 h-4 text-slate-400" />
          </>
        ) : (
          <div
            className="mx-auto w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#0fbd89" }}
          >
            <Filter className="w-4 h-4 text-white" />
          </div>
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-5">
          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* Disease Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              ชื่อโรค
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!e.target.value) setDisease("");
                  setShowDiseaseDropdown(true);
                }}
                onFocus={() => setShowDiseaseDropdown(true)}
                placeholder="ค้นหาโรค..."
                className="w-full pl-9 pr-9 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": "#0fbd89" } as any}
                disabled={isLoading || diseasesLoading}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setDisease("");
                    setSearchTerm("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Dropdown */}
              {showDiseaseDropdown && searchTerm && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-card border border-slate-100 max-h-52 overflow-y-auto">
                  {diseasesLoading ? (
                    <div className="p-4 text-center text-slate-400 text-sm">
                      กำลังโหลด...
                    </div>
                  ) : filteredDiseases.length > 0 ? (
                    filteredDiseases.slice(0, 8).map((d) => (
                      <button
                        key={d.diseaseName}
                        onClick={() => handleDiseaseSelect(d.diseaseName)}
                        className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-sm text-slate-700 font-medium group-hover:text-primary">
                          {d.diseaseName}
                        </span>
                        <span className="text-xs text-slate-400">
                          {d.patientCount.toLocaleString()}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-sm">
                      ไม่พบโรค
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick select tags */}
            {!disease && (
              <div className="flex flex-wrap gap-1.5">
                {diseases.slice(0, 3).map((d) => (
                  <button
                    key={d.diseaseName}
                    onClick={() => handleDiseaseSelect(d.diseaseName)}
                    className="px-2.5 py-1 text-xs rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors bg-white"
                    disabled={isLoading || diseasesLoading}
                  >
                    {d.diseaseName.split(" ")[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Selected disease badge */}
            {disease && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white"
                style={{ backgroundColor: "#0fbd89" }}
              >
                <span className="truncate flex-1">{disease}</span>
                <button
                  onClick={() => {
                    setDisease("");
                    setSearchTerm("");
                  }}
                >
                  <X className="w-3 h-3 flex-shrink-0" />
                </button>
              </div>
            )}
          </div>

          {/* Risk Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              ระดับความเสี่ยง
            </label>
            <div className="space-y-1.5">
              {riskOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = risk === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setRisk(opt.value)}
                    disabled={isLoading}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${
                      isActive
                        ? "border-primary text-white shadow-primary"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: "#0fbd89", borderColor: "#0fbd89" }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{opt.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              เรียงลำดับ
            </label>
            <div className="relative">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-all text-slate-700 cursor-pointer"
                style={{ "--tw-ring-color": "#0fbd89" } as any}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="w-full py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            รีเซ็ตทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
};

export default MapFilters;
