import { useState, useMemo } from "react";
import Pagination from "../../../components/Pagination";

interface Disease {
    n: string;
    c: number;
}

interface ProvinceData {
    name: string;
    region: string;
    sev: "n" | "w" | "e";
    total: number;
    delta: string;
    diseases: Disease[];
}

const DATA: ProvinceData[] = [
    { name: 'กรุงเทพมหานคร', region: 'กลาง', sev: 'e', total: 8420, delta: '+12%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 2840 }, { n: 'COVID-19', c: 1620 }, { n: 'ไข้เลือดออก', c: 980 }] },
    { name: 'เชียงใหม่', region: 'เหนือ', sev: 'e', total: 5640, delta: '+8%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 2100 }, { n: 'ไข้เลือดออก', c: 1240 }, { n: 'มาลาเรีย', c: 430 }] },
    { name: 'เชียงราย', region: 'เหนือ', sev: 'e', total: 4320, delta: '+15%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 1870 }, { n: 'มาลาเรีย', c: 820 }, { n: 'ไข้เลือดออก', c: 560 }] },
    { name: 'ขอนแก่น', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3980, delta: '+5%', diseases: [{ n: 'ไข้เลือดออก', c: 1540 }, { n: 'โรคมือเท้าปาก', c: 890 }, { n: 'ไข้หวัดใหญ่ B', c: 620 }] },
    { name: 'นครราชสีมา', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3760, delta: '+3%', diseases: [{ n: 'ไข้เลือดออก', c: 1380 }, { n: 'ไข้หวัดใหญ่ A', c: 960 }, { n: 'อุจจาระร่วง', c: 540 }] },
    { name: 'อุดรธานี', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3210, delta: '-2%', diseases: [{ n: 'ไข้เลือดออก', c: 1210 }, { n: 'โรคมือเท้าปาก', c: 780 }, { n: 'ไข้หวัดใหญ่ A', c: 490 }] },
    { name: 'สงขลา', region: 'ใต้', sev: 'w', total: 2980, delta: '+4%', diseases: [{ n: 'ไข้เลือดออก', c: 1120 }, { n: 'ชิคุนกุนยา', c: 640 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }] },
    { name: 'นนทบุรี', region: 'กลาง', sev: 'w', total: 2840, delta: '+9%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 840 }, { n: 'COVID-19', c: 620 }, { n: 'ไข้เลือดออก', c: 420 }] },
    { name: 'ปทุมธานี', region: 'กลาง', sev: 'w', total: 2240, delta: '+7%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 780 }, { n: 'COVID-19', c: 540 }, { n: 'ไข้เลือดออก', c: 380 }] },
    { name: 'สุราษฎร์ธานี', region: 'ใต้', sev: 'w', total: 2640, delta: '+1%', diseases: [{ n: 'ไข้เลือดออก', c: 980 }, { n: 'ชิคุนกุนยา', c: 540 }, { n: 'โรคมือเท้าปาก', c: 320 }] },
    { name: 'ชลบุรี', region: 'ตะวันออก', sev: 'w', total: 2380, delta: '+6%', diseases: [{ n: 'ไข้เลือดออก', c: 840 }, { n: 'ไข้หวัดใหญ่ A', c: 720 }, { n: 'อาหารเป็นพิษ', c: 290 }] },
    { name: 'ตาก', region: 'ตะวันตก', sev: 'w', total: 1880, delta: '+6%', diseases: [{ n: 'มาลาเรีย', c: 820 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'ไข้หวัดใหญ่ A', c: 280 }] },
    { name: 'แม่ฮ่องสอน', region: 'เหนือ', sev: 'w', total: 1640, delta: '+4%', diseases: [{ n: 'มาลาเรีย', c: 740 }, { n: 'ไข้เลือดออก', c: 420 }, { n: 'ไข้หวัดใหญ่ A', c: 220 }] },
    { name: 'สมุทรปราการ', region: 'กลาง', sev: 'w', total: 1980, delta: '+5%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 720 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'โรคมือเท้าปาก', c: 320 }] },
    { name: 'อยุธยา', region: 'กลาง', sev: 'n', total: 1160, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 420 }, { n: 'ไข้หวัดใหญ่ A', c: 360 }, { n: 'อุจจาระร่วง', c: 180 }] },
    { name: 'ภูเก็ต', region: 'ใต้', sev: 'n', total: 1940, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 680 }, { n: 'ชิคุนกุนยา', c: 420 }, { n: 'อาหารเป็นพิษ', c: 240 }] },
    { name: 'นครปฐม', region: 'กลาง', sev: 'n', total: 1420, delta: '+2%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 540 }, { n: 'ไข้เลือดออก', c: 380 }, { n: 'โรคมือเท้าปาก', c: 220 }] },
    { name: 'นครศรีธรรมราช', region: 'ใต้', sev: 'n', total: 1820, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 720 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }, { n: 'โรคมือเท้าปาก', c: 210 }] },
    { name: 'กาญจนบุรี', region: 'ตะวันตก', sev: 'n', total: 1680, delta: '-3%', diseases: [{ n: 'มาลาเรีย', c: 640 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'ไข้หวัดใหญ่ A', c: 220 }] },
    { name: 'ราชบุรี', region: 'ตะวันตก', sev: 'n', total: 1540, delta: '+2%', diseases: [{ n: 'ไข้เลือดออก', c: 580 }, { n: 'ไข้หวัดใหญ่ A', c: 440 }, { n: 'อุจจาระร่วง', c: 180 }] },
    { name: 'ระยอง', region: 'ตะวันออก', sev: 'n', total: 1240, delta: '+1%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 460 }, { n: 'ไข้เลือดออก', c: 380 }, { n: 'COVID-19', c: 180 }] },
    { name: 'ลำปาง', region: 'เหนือ', sev: 'n', total: 1180, delta: '-2%', diseases: [{ n: 'ไข้เลือดออก', c: 420 }, { n: 'มาลาเรีย', c: 310 }, { n: 'ไข้หวัดใหญ่ A', c: 240 }] },
    { name: 'อุบลราชธานี', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 2840, delta: '+3%', diseases: [{ n: 'ไข้เลือดออก', c: 1040 }, { n: 'โรคมือเท้าปาก', c: 680 }, { n: 'ไข้หวัดใหญ่ A', c: 440 }] },
    { name: 'กระบี่', region: 'ใต้', sev: 'n', total: 1040, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 380 }, { n: 'ชิคุนกุนยา', c: 280 }, { n: 'อาหารเป็นพิษ', c: 180 }] },
    { name: 'เลย', region: 'ตะวันออกเฉียงเหนือ', sev: 'n', total: 720, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 280 }, { n: 'มาลาเรีย', c: 200 }, { n: 'ไข้หวัดใหญ่ B', c: 140 }] },
    { name: 'เพชรบุรี', region: 'ตะวันตก', sev: 'n', total: 1320, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 490 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }, { n: 'อาหารเป็นพิษ', c: 150 }] },
    { name: 'สกลนคร', region: 'ตะวันออกเฉียงเหนือ', sev: 'n', total: 980, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 360 }, { n: 'โรคมือเท้าปาก', c: 280 }, { n: 'อุจจาระร่วง', c: 180 }] },
];

const PER_PAGE = 9;

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

export default function ProvincialData() {
    const [q, setQ] = useState("");
    const [region, setRegion] = useState("");
    const [sev, setSev] = useState("all");
    const [min, setMin] = useState(0);
    const [sort, setSort] = useState("pd");
    const [page, setPage] = useState(1);

    const filteredData = useMemo(() => {
        let d = [...DATA];
        if (q) d = d.filter(p => p.name.includes(q.trim()));
        if (region) d = d.filter(p => p.region === region);
        if (sev !== 'all') d = d.filter(p => p.sev === sev);
        if (min > 0) d = d.filter(p => p.total >= min);

        d.sort((a, b) => {
            if (sort === 'pd') return b.total - a.total;
            if (sort === 'pa') return a.total - b.total;
            if (sort === 'na') return a.name.localeCompare(b.name, 'th');
            if (sort === 'nd') return b.name.localeCompare(a.name, 'th');
            return 0;
        });
        return d;
    }, [q, region, sev, min, sort]);
    const totalPages = Math.max(1, Math.ceil(filteredData.length / PER_PAGE));
    const currentPageData = filteredData.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const handlePageChange = (p: number) => {
        setPage(p);
    };

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

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-[30px] p-6 mb-8 shadow-sm flex flex-col lg:flex-row items-center gap-6">
                <div className="relative flex-1 w-full lg:w-auto">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อจังหวัดที่ต้องการ..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700"
                        value={q}
                        onChange={(e) => { setQ(e.target.value); setPage(1); }}
                    />
                </div>

                <div className="h-10 w-[1px] bg-slate-100 hidden lg:block"></div>

                <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                    <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ภูมิภาค</span>
                        <select
                            className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                            value={region}
                            onChange={(e) => { setRegion(e.target.value); setPage(1); }}
                        >
                            <option value="">ทุกภูมิภาค</option>
                            {Object.entries(regionLabel).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">เกณฑ์ผู้ป่วย</span>
                        <select
                            className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                            value={min}
                            onChange={(e) => { setMin(Number(e.target.value)); setPage(1); }}
                        >
                            <option value="0">ทุกจำนวน</option>
                            <option value="1000">1,000+ ราย</option>
                            <option value="3000">3,000+ ราย</option>
                            <option value="5000">5,000+ ราย</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ระดับความเสี่ยง</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setSev("all"); setPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${sev === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                            >
                                ทั้งหมด
                            </button>
                            <button
                                onClick={() => { setSev("n"); setPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${sev === "n" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
                            >
                                ปกติ
                            </button>
                            <button
                                onClick={() => { setSev("w"); setPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${sev === "w" ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}
                            >
                                เฝ้าระวัง
                            </button>
                            <button
                                onClick={() => { setSev("e"); setPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${sev === "e" ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`}
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
                    แสดงข้อมูล <strong className="text-slate-900">{currentPageData.length}</strong> จากทั้งหมด <strong className="text-slate-900">{filteredData.length}</strong> จังหวัด
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เรียงลำดับ</span>
                    <select
                        className="text-sm font-bold text-emerald-700 outline-none cursor-pointer bg-emerald-50 px-4 py-2 rounded-xl"
                        value={sort}
                        onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    >
                        <option value="pd">ผู้ป่วยมาก → น้อย</option>
                        <option value="pa">ผู้ป่วยน้อย → มาก</option>
                        <option value="na">ชื่อ ก → ฮ</option>
                        <option value="nd">ชื่อ ฮ → ก</option>
                    </select>
                </div>
            </div>

            {/* Grid of Province Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentPageData.length > 0 ? currentPageData.map((province, idx) => {
                    const maxCase = province.diseases[0].c;
                    const trendUp = province.delta.startsWith('+');
                    const trendStable = province.delta === '0%';

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
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs ${trendStable ? 'bg-slate-200 text-slate-500' :
                                        trendUp ? 'bg-rose-100 text-rose-600' :
                                            'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    <span className="material-symbols-outlined text-[16px]">
                                        {trendStable ? 'horizontal_rule' : trendUp ? 'trending_up' : 'trending_down'}
                                    </span>
                                    {province.delta}
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {province.diseases.map((disease, dIdx) => (
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
                            onClick={() => { setQ(""); setRegion(""); setSev("all"); setMin(0); }}
                            className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all"
                        >
                            ล้างตัวกรองทั้งหมด
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <Pagination
                    page={page} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    );
}
