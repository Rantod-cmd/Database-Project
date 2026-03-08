import { useMemo } from "react";
import Pagination from "../../../components/Pagination";
import { useProvinceDashboard } from "../hooks";

const regionLabel: Record<string, string> = {
    'กลาง': 'ภาคกลาง',
    'เหนือ': 'ภาคเหนือ',
    'ตะวันออกเฉียงเหนือ': 'ภาคอีสาน',
    'ใต้': 'ภาคใต้',
    'ตะวันออก': 'ภาคตะวันออก',
    'ตะวันตก': 'ภาคตะวันตก'
};

const sevLabel: Record<string, string> = {
    n: 'ปกติ',
    w: 'เฝ้าระวัง',
    e: 'ควบคุมฉุกเฉิน'
};

const getSeverity = (totalCount: number): "n" | "w" | "e" => {
    if (totalCount > 3000) return "e";
    if (totalCount >= 501) return "w";
    return "n";
};

const getRegionFromProvince = (provinceName: string): string => {
    const provinceToRegionMap: Record<string, string> = {
        'กรุงเทพมหานคร': 'กลาง',
        'นนทบุรี': 'กลาง',
        'ปทุมธานี': 'กลาง',
        'สมุทรปราการ': 'กลาง',
        'อยุธยา': 'กลาง',
        'นครปฐม': 'กลาง',
        'สมุทรสาคร': 'กลาง',
        'สมุทรสงคราม': 'กลาง',
        'ราชบุรี': 'ตะวันตก',
        'เพชรบุรี': 'ตะวันตก',
        'กาญจนบุรี': 'ตะวันตก',
        'ตาก': 'ตะวันตก',
        'เชียงใหม่': 'เหนือ',
        'เชียงราย': 'เหนือ',
        'ลำปาง': 'เหนือ',
        'ลำพูน': 'เหนือ',
        'แพร่': 'เหนือ',
        'น่าน': 'เหนือ',
        'อุตรดิตถ์': 'เหนือ',
        'แม่ฮ่องสอน': 'เหนือ',
        'ขอนแก่น': 'ตะวันออกเฉียงเหนือ',
        'นครราชสีมา': 'ตะวันออกเฉียงเหนือ',
        'อุดรธานี': 'ตะวันออกเฉียงเหนือ',
        'อุบลราชธานี': 'ตะวันออกเฉียงเหนือ',
        'สกลนคร': 'ตะวันออกเฉียงเหนือ',
        'บุรีรัมย์': 'ตะวันออกเฉียงเหนือ',
        'สุรินทร์': 'ตะวันออกเฉียงเหนือ',
        'ศรีสะเกษ': 'ตะวันออกเฉียงเหนือ',
        'มหาสารคาม': 'ตะวันออกเฉียงเหนือ',
        'ร้อยเอ็ด': 'ตะวันออกเฉียงเหนือ',
        'ยโสธร': 'ตะวันออกเฉียงเหนือ',
        'เลย': 'ตะวันออกเฉียงเหนือ',
        'หนองคาย': 'ตะวันออกเฉียงเหนือ',
        'หนองบัวลำภู': 'ตะวันออกเฉียงเหนือ',
        'มุกดาหาร': 'ตะวันออกเฉียงเหนือ',
        'อำนาจเจริญ': 'ตะวันออกเฉียงเหนือ',
        'บึงกาฬ': 'ตะวันออกเฉียงเหนือ',
        'สงขลา': 'ใต้',
        'สุราษฎร์ธานี': 'ใต้',
        'ภูเก็ต': 'ใต้',
        'นครศรีธรรมราช': 'ใต้',
        'กระบี่': 'ใต้',
        'พังงา': 'ใต้',
        'ตรัง': 'ใต้',
        'ชุมพร': 'ใต้',
        'ระนอง': 'ใต้',
        'สตูล': 'ใต้',
        'ปัตตานี': 'ใต้',
        'ยะลา': 'ใต้',
        'นราธิวาส': 'ใต้',
        'ชลบุรี': 'ตะวันออก',
        'ระยอง': 'ตะวันออก',
        'จันทบุรี': 'ตะวันออก',
        'ตราด': 'ตะวันออก',
        'ฉะเชิงเทรา': 'ตะวันออก',
        'ปราจีนบุรี': 'ตะวันออก',
        'นครนายก': 'ตะวันออก',
        'สระแก้ว': 'ตะวันออก',
    };
    
    return provinceToRegionMap[provinceName] || "ไม่ทราบ";
};

export default function ProvincialData() {
    const {
        provinceData,
        totalPatients,
        diseaseData,
        isLoading,
        isError,
        error,
        filters,
        updateFilter,
        resetFilters,
        setPage,
        currentPage,
        totalPages,
        totalCount,
    } = useProvinceDashboard();

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    // Transform API data to match the expected format
    const transformedData = useMemo(() => {
        return provinceData.map((province: any) => ({
            name: province.provinceName,
            region: getRegionFromProvince(province.provinceName),
            sev: getSeverity(province.totalCount),
            total: province.totalCount,
            diseases: province.diseases
                .sort((a: any, b: any) => b.count - a.count)
                .slice(0, 3)
                .map((disease: any) => ({
                    n: disease.diseaseName,
                    c: disease.count,
                })),
        }));
    }, [provinceData]);

    if (isLoading) {
        return (
            <div className="pb-24 px-6 max-w-7xl mx-auto min-h-screen pt-12">
                <div className="flex items-center justify-center min-h-100">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600 font-medium">กำลังโหลดข้อมูล...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pb-24 px-6 max-w-7xl mx-auto min-h-screen pt-12">
                <div className="flex items-center justify-center min-h-100">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto mb-4">
                            <span className="material-symbols-outlined text-[48px]">error</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">เกิดข้อผิดพลาด</h3>
                        <p className="text-slate-400 font-medium mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all"
                        >
                            ลองใหม่
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-24 px-6 max-w-7xl mx-auto min-h-screen pt-12">
            {/* Header Section */}
            <div className="mb-12 animate-fade-in">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 block">Epidemiological Statistics</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                    สถานการณ์โรครายจังหวัด
                </h1>
                <p className="text-slate-500 font-medium mt-3 text-lg">
                    ผู้ป่วยสะสม 30 วันล่าสุด · อรรถาธิบายระดับความรุนแรงและสัดส่วนโรคระบาดที่พบมากที่สุด
                </p>
            </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ผู้ป่วยทั้งหมด</p>
                                    <p className="text-2xl font-black text-slate-900">
                                        {totalPatients?.toLocaleString() || "0"}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-emerald-600">people</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">จังหวัดที่พบ</p>
                                    <p className="text-2xl font-black text-slate-900">
                                        {totalCount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-600">location_city</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">โรคที่พบ</p>
                                    <p className="text-2xl font-black text-slate-900">
                                        {diseaseData?.length || 0}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-600">coronavirus</span>
                                </div>
                            </div>
                        </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white border border-slate-200 rounded-[30px] p-6 mb-8 shadow-sm flex flex-col lg:flex-row items-center gap-6">
                    <div className="relative flex-1 w-full lg:w-auto">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อจังหวัดที่ต้องการ..."
                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700"
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                        />
                    </div>

                    <div className="h-10 w-px bg-slate-100 hidden lg:block"></div>

                    <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                        
                        <div className="flex flex-col gap-1.5 min-w-35">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">เกณฑ์ผู้ป่วย</span>
                            <select
                                className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                                value={filters.minCases}
                                onChange={(e) => updateFilter('minCases', Number(e.target.value))}
                            >
                                <option value="0">ทุกจำนวน</option>
                                <option value="300">300+ ราย</option>
                                <option value="500">500+ ราย</option>
                                <option value="1000">1,000+ ราย</option>
                                <option value="2000">2,000+ ราย</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ระดับความเสี่ยง</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateFilter('risk', 'all')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${filters.risk === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                >
                                    ทั้งหมด
                                </button>
                                <button
                                    onClick={() => updateFilter('risk', 'normal')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${filters.risk === "normal" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
                                >
                                    ปกติ
                                </button>
                                <button
                                    onClick={() => updateFilter('risk', 'warning')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${filters.risk === "warning" ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}
                                >
                                    เฝ้าระวัง
                                </button>
                                <button
                                    onClick={() => updateFilter('risk', 'emergency')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${filters.risk === "emergency" ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`}
                                >
                                    ฉุกเฉิน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meta Row */}
                <div className="flex items-center justify-between mb-6 px-4">
                    <span className="text-sm font-medium text-slate-400">
                        แสดงข้อมูล <strong className="text-slate-900">{transformedData.length}</strong> จากทั้งหมด <strong className="text-slate-900">{totalCount}</strong> จังหวัด
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เรียงลำดับ</span>
                        <select
                            className="text-sm font-bold text-emerald-700 outline-none cursor-pointer bg-emerald-50 px-4 py-2 rounded-xl"
                            value={filters.order}
                            onChange={(e) => updateFilter('order', e.target.value as any)}
                        >
                            <option value="count_desc">ผู้ป่วยมาก → น้อย</option>
                            <option value="count_asc">ผู้ป่วยน้อย → มาก</option>
                            <option value="name_asc">ชื่อ ก → ฮ</option>
                            <option value="name_desc">ชื่อ ฮ → ก</option>
                        </select>
                    </div>
                </div>

                {/* Grid of Province Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {transformedData.length > 0 ? transformedData.map((province: any, idx: number) => {
                        const maxCase = province.diseases[0]?.c || 0;

                        return (
                            <div
                                key={province.name}
                                className="group bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{regionLabel[province.region]}</span>
                                        <h3 className="text-xl font-black text-slate-900 font-heading leading-none">{province.name}</h3>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${province.sev === 'e' ? 'bg-rose-50 text-rose-600' :
                                        province.sev === 'w' ? 'bg-amber-50 text-amber-600' :
                                            'bg-emerald-50 text-emerald-600'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${province.sev === 'e' ? 'bg-rose-500' :
                                            province.sev === 'w' ? 'bg-amber-500' :
                                                'bg-emerald-500'
                                            }`} />
                                        {sevLabel[province.sev]}
                                    </div>
                                </div>

                                <div className="flex items-end justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">สะสม 30 วัน</span>
                                        <div className="text-3xl font-black text-slate-900 font-heading">
                                            {province.total.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    {province.diseases.map((disease: any, dIdx: number) => (
                                        <div key={disease.n} className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                <span>{disease.n}</span>
                                                <span className="text-slate-900 font-bold">{disease.c.toLocaleString()}</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${dIdx === 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                                                        dIdx === 1 ? 'bg-emerald-400/60' : 'bg-slate-300'
                                                        }`}
                                                    style={{ width: `${Math.round((disease.c / maxCase) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center gap-6 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                                <span className="material-symbols-outlined text-[48px]">search_off</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">ไม่พบข้อมูลที่ค้นหา</h3>
                                <p className="text-slate-400 font-medium">โปรดตรวจสอบคำค้นหาหรือตัวกรองที่เลือกอีกครั้ง</p>
                            </div>
                            <button
                                onClick={() => resetFilters()}
                                className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all"
                            >
                                ล้างตัวกรองทั้งหมด
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
    );
}
