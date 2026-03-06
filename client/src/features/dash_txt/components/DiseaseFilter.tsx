import React from "react";

interface DiseaseFilterProps {
  diseases: any[];
  selectedDisease: string;
  onDiseaseChange: (disease: string) => void;
  loading?: boolean;
}

const DiseaseFilter: React.FC<DiseaseFilterProps> = ({
  diseases,
  selectedDisease,
  onDiseaseChange,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredDiseases = diseases.filter((disease: any) =>
    disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (diseaseName: string) => {
    onDiseaseChange(diseaseName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onDiseaseChange("");
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-left font-medium text-slate-700 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
        disabled={loading}
      >
        <div className="flex items-center justify-between">
          <span className="truncate">
            {selectedDisease || "ค้นหาโรค..."}
          </span>
          <span className="material-symbols-outlined text-slate-400">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="ค้นหาโรค..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-slate-500">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                กำลังโหลด...
              </div>
            ) : filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease: any) => (
                <button
                  key={disease.diseaseName}
                  onClick={() => handleSelect(disease.diseaseName)}
                  className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-slate-900">
                        {disease.diseaseName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {disease.totalCases.toLocaleString()} ราย
                      </span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {disease.patientCount} จังหวัด
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">
                ไม่พบโรคที่ค้นหา
              </div>
            )}
          </div>

          {selectedDisease && (
            <div className="p-3 border-t border-slate-100">
              <button
                onClick={handleClear}
                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
              >
                ล้างการค้นหาโรค
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseFilter;
