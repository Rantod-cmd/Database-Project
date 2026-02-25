import { Link } from "react-router-dom";
import { ShieldCheck, Activity, Users, Map as MapIcon, FileText, ChevronRight, PhoneCall } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section - Official Document Look */}
            <section className="bg-medical-green-900 pt-20 pb-40 px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -mr-96 -mt-96" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-green-100 rounded-full blur-[120px] -ml-48 -mb-48" />
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
                            <ShieldCheck className="w-4 h-4 text-medical-green-100" />
                            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Official Health Surveillance Network</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                            ระบบเฝ้าระวังภัย<br />
                            <span className="text-medical-green-100">และรายงานโรคระบาด</span><br />
                            ระดับแห่งชาติ
                        </h1>
                        <p className="text-medical-green-50/70 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                            ศูนย์กลางการเชื่อมโยงข้อมูลและบูรณาการด้านระบาดวิทยา
                            เพื่อความมั่นคงทางสาธารณสุขของประเทศไทย ภายใต้มาตรฐานสากล
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <Link
                                to="/reporting"
                                className="px-10 py-4 bg-white text-medical-green-900 rounded-md font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-medical-green-50 transition-all flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                แจ้งข้อมูลรายงาน
                            </Link>
                            <Link
                                to="/map"
                                className="px-10 py-4 bg-medical-green-700 text-white rounded-md font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-medical-green-600 transition-all flex items-center gap-2"
                            >
                                <MapIcon className="w-4 h-4" />
                                แผนที่พื้นที่เสี่ยง
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-xl hidden lg:block">
                        <div className="relative group p-4 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-sm">
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                                alt="Medical Monitoring"
                                className="rounded-[20px] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[24px] shadow-2xl border border-slate-100 flex items-center gap-6 animate-fade-in">
                                <div className="w-14 h-14 rounded-2xl bg-medical-green-50 text-medical-green-700 flex items-center justify-center">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</p>
                                    <p className="text-xl font-black text-slate-900 uppercase">Operational</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Dashboard - Card on Slate Pattern */}
            <section className="bg-slate-50 py-24 px-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-44 relative z-20">
                        <div className="bg-white p-10 rounded-md border border-slate-200 shadow-official group hover:-translate-y-2 transition-all duration-300">
                            <div className="flex flex-col gap-6 text-left">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Cases</span>
                                    <Activity className="w-4 h-4 text-rose-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">248,102</span>
                                    <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase">ผู้ติดเชื้อยืนยันสะสม</span>
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-emerald-600">+12.4% Weekly</span>
                                    <div className="w-16 h-1 bg-medical-green-100 rounded-full overflow-hidden">
                                        <div className="w-3/4 h-full bg-medical-green-600"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-md border border-slate-200 shadow-official group hover:-translate-y-2 transition-all duration-300">
                            <div className="flex flex-col gap-6 text-left">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monitoring</span>
                                    <MapIcon className="w-4 h-4 text-medical-green-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">1,248</span>
                                    <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase">เครือข่ายความร่วมมือ</span>
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-medical-green-600">Active Nodes</span>
                                    <Activity className="w-4 h-4 text-medical-green-100 opacity-20" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-md border border-slate-200 shadow-official group hover:-translate-y-2 transition-all duration-300">
                            <div className="flex flex-col gap-6 text-left">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coverage</span>
                                    <Users className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">77</span>
                                    <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase">จังหวัดทั่วประเทศ</span>
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-blue-600">Full Coverage</span>
                                    <ShieldCheck className="w-4 h-4 text-blue-100 opacity-30" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-medical-green-900 p-10 rounded-md shadow-2xl group hover:-translate-y-2 transition-all duration-300">
                            <div className="flex flex-col h-full gap-6 text-left">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-medical-green-100/50 uppercase tracking-widest">Protocol</span>
                                    <ShieldCheck className="w-4 h-4 text-medical-green-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white leading-tight">MOPH-GRID v2.4</span>
                                    <span className="text-[10px] font-bold text-medical-green-200/40 mt-2 uppercase tracking-widest">กรมควบคุมโรค</span>
                                </div>
                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <button className="text-[10px] font-black text-white hover:text-medical-green-100 transition-colors uppercase tracking-widest flex items-center gap-2">
                                        View Documentation <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="flex flex-col gap-8 text-left">
                            <div className="space-y-4">
                                <span className="text-[11px] font-black text-medical-green-700 uppercase tracking-[0.3em]">Institutional Service</span>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                                    ระบบบริหารจัดการข้อมูลระบาดวิทยา<br />แบบบูรณาการรายชั่วโมง
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed font-bold">
                                    เราเชื่อมโยงเครือข่ายสาธารณสุขทั่วประเทศเข้าด้วยกัน เพื่อการตัดสินใจที่มีประสิทธิภาพสูงสุดสำหรับการป้องกันโรค
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-start gap-6 group hover:translate-x-2 transition-transform">
                                    <div className="w-12 h-12 rounded-lg bg-medical-green-50 text-medical-green-700 flex items-center justify-center shrink-0">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[16px] font-black text-slate-900">Live Surveillance Tracking</h4>
                                        <p className="text-sm text-slate-500 font-medium">ติดตามสถานะการแพร่ระบาดแบบเรียลไทม์ผ่านระบบดาวเทียมและข้อมูลเบื้องต้น</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group hover:translate-x-2 transition-transform">
                                    <div className="w-12 h-12 rounded-lg bg-medical-green-50 text-medical-green-700 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[16px] font-black text-slate-900">Hospital Resource Gateway</h4>
                                        <p className="text-sm text-slate-500 font-medium">จัดการทรัพยากรเตียงและบุคลากรทางการแพทย์ในภาวะวิกฤตอย่างเป็นระบบ</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-medical-green-900/5 rounded-[40px] transform rotate-3"></div>
                            <div className="relative bg-white border border-slate-200 p-4 rounded-[40px] shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80&w=2080"
                                    className="rounded-[30px]"
                                    alt="Expert Analysis"
                                />
                                <div className="absolute -bottom-10 right-10 bg-medical-green-900 text-white p-10 rounded-[24px] shadow-2xl">
                                    <PhoneCall className="w-10 h-10 mb-6 text-medical-green-200" />
                                    <p className="text-[10px] font-black text-medical-green-200 uppercase tracking-widest mb-1">Emergency Support</p>
                                    <p className="text-2xl font-black underline decoration-medical-green-400 decoration-4 underline-offset-8">สายด่วน 1422</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
