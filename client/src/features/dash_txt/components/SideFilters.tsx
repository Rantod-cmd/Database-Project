import React from "react";
import DiseaseFilter from "./DiseaseFilter";

interface SideFiltersProps {
  diseases: any[];
  selectedDisease: string;
  onDiseaseChange: (disease: string) => void;
  diseaseLoading?: boolean;
  filters: any;
  updateFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

const SideFilters: React.FC<SideFiltersProps> = ({
  diseases,
  selectedDisease,
  onDiseaseChange,
  diseaseLoading = false,
  filters,
  updateFilter,
  resetFilters,
}) => {
  return (
    <div className="w-80 bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm h-fit">
      <div className="mb-6">
        <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600">filter_list</span>
          ตัวกรองข้อมูล
        </h3>
      </div>

      {/* Disease Search */}
      <div className="mb-6">
        <label className="block text-sm font-black text-slate-700 mb-2">
          ค้นหาโรค
        </label>
        <DiseaseFilter
          diseases={diseases}
          selectedDisease={selectedDisease}
          onDiseaseChange={onDiseaseChange}
          loading={diseaseLoading}
        />
      </div>

      {/* Quick Stats */}
      <div className="mb-6">
        <h4 className="text-sm font-black text-slate-700 mb-3">สถิติด่วน</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
            <span className="text-sm font-medium text-emerald-700">โรคทั้งหมด</span>
            <span className="text-sm font-black text-emerald-900">
              {diseases.length}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-700">ผู้ป่วยสูงสุด</span>
            <span className="text-sm font-black text-blue-900">
              {diseases.length > 0 
                ? Math.max(...diseases.map((d: any) => d.totalCases)).toLocaleString()
                : "0"
              }
            </span>
          </div>
        </div>
      </div>

      {/* Current Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-black text-slate-700 mb-3">ตัวกรองปัจจุบัน</h4>
        <div className="space-y-2">
          {filters.search && (
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600 truncate">
                ค้นหา: {filters.search}
              </span>
              <button
                onClick={() => updateFilter('search', '')}
                className="text-xs text-red-600 hover:text-red-700"
              >
                ลบ
              </button>
            </div>
          )}
          
          {filters.minCases > 0 && (
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">
                ขั้นต่ำ: {filters.minCases}+ ราย
              </span>
              <button
                onClick={() => updateFilter('minCases', 0)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                ลบ
              </button>
            </div>
          )}
          
          {filters.risk !== 'all' && (
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">
                ความเสี่ยง: {
                  filters.risk === 'normal' ? 'ปกติ' :
                  filters.risk === 'warning' ? 'เฝ้าระวัง' :
                  filters.risk === 'emergency' ? 'ฉุกเฉิน' : ''
                }
              </span>
              <button
                onClick={() => updateFilter('risk', 'all')}
                className="text-xs text-red-600 hover:text-red-700"
              >
                ลบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reset All */}
      <button
        onClick={resetFilters}
        className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition-colors"
      >
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
};

export default SideFilters;
