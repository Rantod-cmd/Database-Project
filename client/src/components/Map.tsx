import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { X } from "lucide-react";
import apiClient from "../api/apiClient";

const geoUrl =
  "https://raw.githubusercontent.com/cvibhagool/thailand-map/06fb629ef127b9ef95565c456d73fef74970294d/thailand-provinces.topojson";

interface ProvinceData {
  provinceName: string;
  totalCount: number;
  diseaseCount?: number;
  diseases?: Array<{
    diseaseName: string;
    count: number;
  }>;
}

const getColor = (
  count: number,
  diseaseName?: string,
  diseaseConfig?: Record<string, {
    colorScale?: string[];
    thresholds?: number[];
    customParams?: Record<string, string>;
  }>,
  diseaseTotals: Record<string, number> = {},
  maxTotalCount?: number,
  allProvinceCounts?: number[]
) => {
  if (count === 0) return "#f1f5f9";

  let percentage: number;

  if (diseaseName && diseaseTotals[diseaseName]) {
    percentage = (count / diseaseTotals[diseaseName]) * 100;
  } else if (maxTotalCount && maxTotalCount > 0) {
    percentage = (count / maxTotalCount) * 100;
  } else {
    percentage = 100;
  }

  const currentConfig = diseaseName ? diseaseConfig?.[diseaseName] : null;
  const colors = currentConfig?.colorScale ?? ["#F88379", "#DC143C", "#880808", "#660000", "#4c0505"];

  let levels: number[];
  if (currentConfig?.thresholds) {
    levels = currentConfig.thresholds;
  } else if (allProvinceCounts && allProvinceCounts.length > 0) {
    const maxPct = Math.max(...allProvinceCounts);
    const minPct = Math.min(...allProvinceCounts.filter(v => v > 0));
    const range = maxPct - minPct;
    levels = [
      minPct + range * 0.2,
      minPct + range * 0.4,
      minPct + range * 0.6,
      minPct + range * 0.8,
    ];
  } else {
    levels = [2, 5, 8, 12];
  }

  if (percentage <= levels[0]) return colors[0];
  if (percentage <= levels[1]) return colors[1];
  if (percentage <= levels[2]) return colors[2];
  if (percentage <= levels[3]) return colors[3];
  return colors[4];
};

interface MapChartProps {
  filters?: {
    disease: string;
    risk: string;
    order: string;
  };
  onLoadingChange?: (loading: boolean) => void;
  diseaseConfig?: Record<string, {
    colorScale?: string[];
    thresholds?: number[];
    customParams?: Record<string, string>;
  }>;
}

export const MapChart = ({ filters, onLoadingChange, diseaseConfig }: MapChartProps) => {
  const [zoom, setZoom] = useState<number>(1);
  const [data, setData] = useState<ProvinceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<{ name: string; count: number } | null>(null);
  const [diseaseTotals, setDiseaseTotals] = useState<Record<string, number>>({});

  const currentDiseaseConfig = filters?.disease ? diseaseConfig?.[filters.disease] : null;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        onLoadingChange?.(true);

        const params = new URLSearchParams();
        if (filters?.disease && typeof filters.disease === "string") {
          params.append("disease", filters.disease);
          if (currentDiseaseConfig?.customParams) {
            Object.entries(currentDiseaseConfig.customParams).forEach(([key, value]) => {
              params.append(key, value);
            });
          }
        }
        if (filters?.risk && filters.risk !== "all" && typeof filters.risk === "string") {
          params.append("risk", filters.risk);
        }
        if (filters?.order && typeof filters.order === "string") {
          params.append("order", filters.order);
        }

        const queryString = params.toString();
        const url = `/dataProvince/map${queryString ? `?${queryString}` : ""}`;

        const res = await apiClient.get(url);
        setData(res.data.data);

        if (res.data.diseaseTotals) {
          setDiseaseTotals(res.data.diseaseTotals);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    };
    fetchData();
  }, [filters]);

  const maxTotalCount = Math.max(...data.map((d) => d.totalCount), 1);

  const allProvinceCounts = data
    .map((d) => {
      const count = filters?.disease ? (d.diseaseCount ?? 0) : d.totalCount;
      const nationalTotal =
        filters?.disease && diseaseTotals[filters.disease]
          ? diseaseTotals[filters.disease]
          : maxTotalCount;
      return (count / nationalTotal) * 100;
    })
    .filter((v) => v > 0);

  return (
    // ✅ แก้จาก h-[calc(100vh-64px)] เป็น h-full
    <div className="w-full h-full flex justify-center items-start overflow-hidden relative">

      {/* Loading */}
      {isLoading && (
        <div className="absolute top-4 left-80 z-10 bg-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-slate-600">กำลังโหลด...</span>
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredProvince && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl pointer-events-none">
          <div className="text-sm font-semibold">{hoveredProvince.name}</div>
          <div className="text-xs text-slate-300">
            {hoveredProvince.count.toLocaleString()} ราย
            {filters?.disease && diseaseTotals[filters.disease] ? (
              <span className="ml-1">
                ({((hoveredProvince.count / diseaseTotals[filters.disease]) * 100).toFixed(1)}%)
              </span>
            ) : null}
          </div>
        </div>
      )}

      {/* Province Info Popup */}
      {selectedProvince && (
        <div className="absolute top-4 right-4 z-20 bg-white rounded-xl shadow-card border border-slate-100 p-6 min-w-80 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 font-heading">ข้อมูลจังหวัด</h3>
            <button
              onClick={() => setSelectedProvince(null)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">จังหวัด</div>
              <div className="text-lg font-semibold text-slate-800">{selectedProvince.provinceName}</div>
            </div>

            {filters?.disease ? (
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{filters.disease}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-slate-200"
                    style={{
                      backgroundColor: getColor(
                        selectedProvince.diseaseCount ?? 0,
                        filters.disease,
                        diseaseConfig,
                        diseaseTotals,
                        maxTotalCount,
                        allProvinceCounts
                      ),
                    }}
                  />
                  <span className="text-2xl font-bold text-slate-800">
                    {(selectedProvince.diseaseCount ?? 0).toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400">ราย</span>
                  {diseaseTotals[filters.disease] ? (
                    <span className="text-sm text-slate-400">
                      ({(((selectedProvince.diseaseCount ?? 0) / diseaseTotals[filters.disease]) * 100).toFixed(1)}% ของทั้งประเทศ)
                    </span>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">ผู้ป่วยรวมทุกโรค</div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-slate-200"
                    style={{
                      backgroundColor: getColor(
                        selectedProvince.totalCount,
                        undefined,
                        diseaseConfig,
                        diseaseTotals,
                        maxTotalCount,
                        allProvinceCounts
                      ),
                    }}
                  />
                  <span className="text-2xl font-bold text-slate-800">
                    {selectedProvince.totalCount.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400">ราย</span>
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">ระดับความเสี่ยง</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                selectedProvince.totalCount === 0 ? "bg-slate-100 text-slate-600"
                : selectedProvince.totalCount <= 500 ? "bg-medical-green-100 text-medical-green-700"
                : selectedProvince.totalCount <= 3000 ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
              }`}>
                {selectedProvince.totalCount === 0 ? "ไม่มีผู้ป่วย"
                  : selectedProvince.totalCount <= 500 ? "ปกติ"
                  : selectedProvince.totalCount <= 3000 ? "เฝ้าระวัง"
                  : "ฉุกเฉิน"}
              </div>
            </div>

            {selectedProvince.diseases && selectedProvince.diseases.length > 0 && (
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">รายละเอียดโรค</div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {selectedProvince.diseases
                    .sort((a, b) => b.count - a.count)
                    .map((disease) => {
                      const nationalTotal = diseaseTotals[disease.diseaseName] ?? 1;
                      const percentage = ((disease.count / nationalTotal) * 100).toFixed(1);
                      return (
                        <div key={disease.diseaseName} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-50">
                          <span className="text-slate-600 truncate max-w-[55%]">{disease.diseaseName}</span>
                          <span className="text-slate-800 font-medium">
                            {disease.count.toLocaleString()}{" "}
                            <span className="text-slate-400 text-xs">({percentage}%)</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.5, 8))}
          className="w-10 h-10 bg-white rounded-full shadow-card text-xl font-bold flex items-center justify-center hover:bg-slate-50 text-slate-700"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
          className="w-10 h-10 bg-white rounded-full shadow-card text-xl font-bold flex items-center justify-center hover:bg-slate-50 text-slate-700"
        >
          −
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-full bg-light-bg">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 2100, center: [100.5, 13.5] }}
          className="w-full h-full"
        >
          <ZoomableGroup center={[100.5, 13.5]} zoom={zoom} minZoom={1} maxZoom={8}>
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                return geographies.map((geo) => {
                  const name = geo.properties.NAME_1;
                  const provinceData = data.find((d) => d.provinceName === name);

                  const displayCount = filters?.disease
                    ? (provinceData?.diseaseCount ?? 0)
                    : (provinceData?.totalCount ?? 0);

                  const fill = getColor(
                    displayCount,
                    filters?.disease || undefined,
                    diseaseConfig,
                    diseaseTotals,
                    maxTotalCount,
                    allProvinceCounts
                  );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        setSelectedProvince(
                          provinceData ?? {
                            provinceName: name,
                            totalCount: 0,
                            diseaseCount: 0,
                            diseases: [],
                          }
                        );
                      }}
                      onMouseEnter={() => setHoveredProvince({ name, count: displayCount })}
                      onMouseLeave={() => setHoveredProvince(null)}
                      style={{
                        default: { fill, stroke: "#94a3b8", strokeWidth: 0.3, outline: "none" },
                        hover: { fill: "#ffffff", stroke: fill, cursor: "pointer", strokeWidth: 1, outline: "none" },
                        pressed: { fill: "#f1f5f9", outline: "none" },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};