import { Link } from "react-router-dom";
import { Phone, MapPin, Globe, Facebook, Twitter, Instagram, ShieldCheck } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-medical-green-900 text-white pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                    {/* Column 1: Agency Brand */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                                <ShieldCheck className="w-6 h-6 text-medical-green-100" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-black uppercase tracking-tight">ระบบเฝ้าระวังสุขภาพแห่งชาติ</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-medical-green-200">ราชอาณาจักรไทย</span>
                            </div>
                        </div>
                        <p className="text-[13px] text-medical-green-100/70 leading-relaxed font-medium">
                            ศูนย์ปฏิบัติการภาวะฉุกเฉินทางสาธารณสุข และการเฝ้าระวังโรคระบาดแห่งชาติ
                            ภายใต้การกำกับดูแลของกรมควบคุมโรค กระทรวงสาธารณสุข
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-6 text-medical-green-200">แผนผังเว็บไซต์</h4>
                        <div className="grid grid-cols-1 gap-4 text-[13px] font-bold text-medical-green-100/80">
                            <Link to="/map" className="hover:text-white transition-colors">แผนที่โรคระบาด</Link>
                            <Link to="/provinces" className="hover:text-white transition-colors">ข้อมูลรายจังหวัด</Link>
                            <Link to="/hospitals" className="hover:text-white transition-colors">โรงพยาบาลเครือข่าย</Link>
                            <Link to="/reporting" className="hover:text-white transition-colors">รายงานผู้ป่วย</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">ติดต่อสอบถาม</Link>
                        </div>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div>
                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-6 text-medical-green-200">ติดต่อ</h4>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-4 h-4 text-medical-green-100 mt-1" />
                                <p className="text-[13px] text-medical-green-100/80 leading-relaxed">
                                    กรมควบคุมโรค กระทรวงสาธารณสุข<br />
                                    ถ.ติวานนท์ ต.ตลาดขวัญ อ.เมือง<br />
                                    จ.นนทบุรี 11000
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-4 h-4 text-medical-green-100" />
                                <p className="text-[13px] text-medical-green-100/80">สายด่วน: 1422</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Globe className="w-4 h-4 text-medical-green-100" />
                                <p className="text-[13px] text-medical-green-100/80">ddc.moph.go.th</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Newsletter/Updates */}
                    <div>
                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-6 text-medical-green-200">จดหมายข่าว</h4>
                        <p className="text-[12px] text-medical-green-100/60 mb-5 leading-relaxed font-medium">
                            สมัครรับข้อมูลข่าวสารเฝ้าระวังโรคระบาดรายวันผ่านช่องทางอีเมลทางราชการ
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="อีเมลของคุณ..."
                                className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-[13px] focus:outline-none focus:border-white/30 transition-all"
                            />
                            <button className="absolute right-2 top-2 bg-white text-medical-green-900 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hover:bg-medical-green-100 transition-colors">
                                ส่ง
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-medical-green-100/40">
                    <p>© 2026 กรมควบคุมโรค สงวนลิขสิทธิ์ทุกประการ</p>
                    <div className="flex gap-8">
                        <button className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</button>
                        <button className="hover:text-white transition-colors">ข้อกำหนดการใช้งาน</button>
                        <button className="hover:text-white transition-colors">ตั้งค่าคุกกี้</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
