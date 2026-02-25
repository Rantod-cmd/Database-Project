import { useState, useMemo } from "react";
import {
    Building2,
    Search,
    MapPin,
    Phone,
    Activity,
    Plus,
    ChevronRight,
    Hospital,
    Crosshair,
    ChevronDown,
    ShieldCheck,
    ArrowUpRight
} from "lucide-react";

// Mock Data for Hospitals
const INITIAL_FACILITIES = [
    { id: 1, name: "โรงพยาบาลศิริราช (Siriraj Hospital)", type: "General Hospital", province: "กรุงเทพมหานคร", status: "Active", beds: 2450, icu: 120, emergency: "High", phone: "02-419-7000" },
    { id: 2, name: "โรงพยาบาลเชียงใหม่ราม", type: "Private Hospital", province: "เชียงใหม่", status: "Active", beds: 350, icu: 25, emergency: "Normal", phone: "053-920-300" },
    { id: 3, name: "รพ.สต. บ้านไร่", type: "Health Center", province: "ขอนแก่น", status: "Maintenance", beds: 0, icu: 0, emergency: "Normal", phone: "043-123-456" },
    { id: 4, name: "โรงพยาบาลสงขลานครินทร์", type: "University Hospital", province: "สงขลา", status: "Active", beds: 850, icu: 45, emergency: "Full", phone: "074-451-000" },
    { id: 5, name: "โรงพยาบาลกรุงเทพ", type: "Private Hospital", province: "กรุงเทพมหานคร", status: "Active", beds: 500, icu: 40, emergency: "Normal", phone: "02-310-3000" },
    { id: 6, name: "โรงพยาบาลพุทธชินราช", type: "General Hospital", province: "พิษณุโลก", status: "Active", beds: 900, icu: 35, emergency: "High", phone: "055-270-300" },
];

export default function AffiliatedHospitals() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [isAdding, setIsAdding] = useState(false);

    const filteredFacilities = useMemo(() => {
        return INITIAL_FACILITIES.filter(f => {
            const matchSearch = f.name.includes(search) || f.province.includes(search);
            const matchType = filterType === "All" || f.type === filterType;
            return matchSearch && matchType;
        });
    }, [search, filterType]);

    return (
        <div className="pb-32 px-8 max-w-[1400px] mx-auto min-h-screen pt-12">
            {/* Header Section - Official Look */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 animate-fade-in border-b border-slate-200 pb-12 text-left">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-medical-green-50 text-medical-green-700 rounded text-[10px] font-black uppercase tracking-[0.2em] border border-medical-green-100">
                        <Hospital className="w-3 h-3" />
                        Facility Network Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                        เครือข่ายสถานพยาบาล
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        การประสานงานสถานพยาบาลและหน่วยงานสาธารณสุขในเครื่อข่ายกรมควบคุมโรค
                        เพื่อการจัดการทรัพยากรและการเตรียมความพร้อมอย่างเป็นระบบ
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-8 py-4 bg-medical-green-900 rounded-md text-[12px] font-black uppercase tracking-widest text-white hover:bg-medical-green-800 transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/10"
                    >
                        <Plus className="w-4 h-4" />
                        ลงทะเบียนสถานพยาบาล
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "หน่วยงานทั้งหมด", val: "1,248", icon: Building2 },
                    { label: "เตียงว่างรวม", val: "854", icon: Crosshair },
                    { label: "ความพร้อมระบบ", val: "98.2%", icon: Activity },
                    { label: "เจ้าหน้าที่ปฏิบัติงาน", val: "4,620", icon: ShieldCheck }
                ].map((s, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-6 rounded-md shadow-official flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-medical-green-50 text-medical-green-700 flex items-center justify-center">
                            <s.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            <p className="text-xl font-black text-slate-900">{s.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Structured Search/Filter Area */}
            <div className="bg-white border border-slate-200 rounded-md p-6 mb-12 shadow-official flex flex-col md:flex-row gap-6">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medical-green-600 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อหน่วยงาน หรือ จังหวัดที่ตั้ง..."
                        className="w-full pl-12 pr-6 py-3.5 rounded-md bg-slate-50 border border-slate-100 focus:border-medical-green-600 focus:bg-white focus:ring-4 focus:ring-medical-green-600/5 outline-none transition-all font-bold text-slate-700 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="min-w-[240px]">
                    <select
                        className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-md py-3.5 px-6 text-sm font-bold text-slate-700 focus:border-medical-green-600 focus:bg-white outline-none cursor-pointer transition-all"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">ทุกประเภทสถานพยาบาล</option>
                        <option value="General Hospital">โรงพยาบาลทั่วไป (General)</option>
                        <option value="Private Hospital">โรงพยาบาลเอกชน (Private)</option>
                        <option value="Health Center">ศูนย์อนามัย (Health Center)</option>
                        <option value="University Hospital">โรงพยาบาลมหาวิทยาลัย (University)</option>
                    </select>
                </div>
            </div>

            {/* List of Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFacilities.map((f) => (
                    <div key={f.id} className="official-card p-8 group flex flex-col gap-6 text-left hover:border-medical-green-600/30 transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${f.status === 'Active' ? 'bg-medical-green-50 text-medical-green-700 border-medical-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                }`}>
                                {f.status}
                            </span>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.province}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-medical-green-900 transition-colors leading-tight min-h-[3rem] flex items-center">
                                {f.name}
                            </h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{f.type}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Capacity</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xl font-black text-slate-800">{f.beds.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-slate-300">Beds</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Emergency</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${f.emergency === 'Full' ? 'bg-rose-500' : f.emergency === 'High' ? 'bg-amber-500' : 'bg-medical-green-500'}`} />
                                    <span className="text-[11px] font-black text-slate-700 uppercase">{f.emergency}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-medical-green-600" />
                                <span className="text-[12px] font-bold text-slate-600">{f.phone}</span>
                            </div>
                            <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-medical-green-900 hover:bg-medical-green-900 hover:text-white transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Registration Modal Overlay */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in text-left">
                        <div className="bg-medical-green-900 p-8 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-white font-black text-xl uppercase tracking-tight">ลงทะเบียนหน่วยงาน</h3>
                                <p className="text-medical-green-200/50 text-[10px] font-black uppercase tracking-widest">Network Registration Portal</p>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="text-white/50 hover:text-white transition-colors">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: "รหัสหน่วยงาน *", placeholder: "H-XXXXX" },
                                { label: "ชื่อหน่วยงาน (ภาษาไทย) *", placeholder: "ระบุชื่อหน่วยงานระดับทางการ..." },
                                { label: "ประเภทสถานพยาบาล", type: "select", options: ["โรงพยาบาลทั่วไป", "โรงพยาบาลเอกชน", "ศูนย์อนามัย"] },
                                { label: "จังหวัดที่ตั้ง", type: "select", options: ["กรุงเทพมหานคร", "เชียงใหม่", "นนทบุรี"] },
                                { label: "จำนวนเตียง", placeholder: "0", type: "number" },
                                { label: "เบอร์ติดต่อฉุกเฉิน", placeholder: "XX-XXX-XXXX" }
                            ].map((field, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{field.label}</label>
                                    {field.type === "select" ? (
                                        <div className="relative">
                                            <select className="w-full bg-slate-50 border border-slate-100 rounded py-3.5 px-4 text-sm font-bold text-slate-700 outline-none appearance-none focus:border-medical-green-600 transition-all">
                                                {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 pointer-events-none" />
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type || "text"}
                                            placeholder={field.placeholder}
                                            className="w-full bg-slate-50 border border-slate-100 rounded py-3.5 px-4 text-sm font-bold text-slate-700 outline-none focus:border-medical-green-600 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-6">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button className="px-10 py-4 bg-medical-green-900 text-white rounded font-black text-[12px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-medical-green-800 transition-all flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4" />
                                Submit registration
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
