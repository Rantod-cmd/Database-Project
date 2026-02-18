import React, { useState } from "react";
import type { FormData } from "@shared/types/components/types";
import { useForm } from "../hooks/useFormData";
import { ShieldAlert } from "lucide-react";

export const PublicHealthForm = () => {
  const { handleSubmit } = useForm();

  const [formData, setFormData] = useState<FormData>({
    hospitalCode: "",
    instituteName: "",
    province: "",
    date: new Date(),
    diseases: "",
    remarks: "",
    patient: {
      age: 0,
      sex: "male",
    },
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePatientChange = (
    field: keyof FormData["patient"],
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      patient: { ...prev.patient, [field]: value },
    }));
  };

  const clearFormData = ():void => {
    setFormData({
      hospitalCode: "",
      instituteName: "",
      province: "",
      date: new Date(),
      diseases: "",
      remarks: "",
      patient: {
        age: 0,
        sex: "male",
      },
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 font-sans">
      <div className="max-w-[780px] mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-moph">
        <div className="relative overflow-hidden px-9 pt-7 pb-6 bg-primary">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center font-bold text-base text-white font-heading shrink-0">
                สธ
              </div>
              <div>
                <div className="text-[17px] font-semibold text-white leading-snug font-heading">
                  ระบบรายงานสถานการณ์โรคและภัยสุขภาพ
                </div>
                <div className="text-xs mt-0.5 text-white/60">
                  กระทรวงสาธารณสุข · Ministry of Public Health
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] uppercase tracking-widest text-white/50">
                Document ID
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 rounded text-[13px] text-white/85 font-mono">
                MOPH-2026-00124
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5 px-9 py-3 border-b border-blue-200 bg-blue-50">
          <ShieldAlert className="text-blue-800"/>
          <p className="text-[13px] leading-relaxed text-blue-700">
            <strong className="font-semibold">คำชี้แจง:</strong>{" "}
            ข้อมูลนี้จะถูกนำไปประมวลผลในระบบระบาดวิทยาเพื่อกำหนดนโยบายสาธารณสุขระดับประเทศ
            โปรดตรวจสอบความถูกต้องก่อนบันทึก
          </p>
        </div>

        <div className="px-9 pt-8 pb-6 space-y-8">
          <section>
            <div className="flex items-center gap-2.5 pb-2.5 mb-5 border-b border-slate-200">
              <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white text-[11px] font-mono bg-primary shrink-0">
                1
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
                ข้อมูลหน่วยงานผู้รายงาน
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  รหัสสถานพยาบาล{" "}
                  <span className="text-health-emergency">*</span>
                  <span className="font-normal text-secondary-medium text-[12px]">
                    {" "}
                    (5 หลัก)
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.hospitalCode}
                  onChange={(e) =>
                    handleInputChange("hospitalCode", e.target.value)
                  }
                  maxLength={5}
                  placeholder="H-12345"
                  className="w-full border  rounded-[7px] px-3 py-[9px] text-sm text-secondary font-mono outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  ชื่อหน่วยงาน <span className="text-health-emergency">*</span>
                </label>
                <input
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) =>
                    handleInputChange("instituteName", e.target.value)
                  }
                  placeholder="โรงพยาบาล"
                  className="w-full border  rounded-[7px] px-3 py-[9px] text-sm text-secondary font-mono outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  จังหวัด
                </label>
                <select
                  value={formData.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                  className="w-full border rounded-[7px] px-3 py-[9px] pr-8 text-sm text-secondary outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">— เลือกจังหวัด —</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="สงขลา">สงขลา</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  วันที่รายงาน <span className="text-health-emergency">*</span>
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    handleInputChange("date", new Date(e.target.value))
                  }
                  className="w-full border rounded-[7px] px-3 py-[9px] text-sm text-secondary font-mono outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 shadow-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2.5 pb-2.5 mb-5 border-b border-slate-200">
              <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white text-[11px] font-mono bg-primary shrink-0">
                2
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
                ข้อมูลผู้ป่วยและอาการ
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  อายุ (ปี)
                </label>
                <input
                  type="number"
                  value={formData.patient.age}
                  onChange={(e) =>
                    handlePatientChange("age", parseInt(e.target.value))
                  }
                  min={0}
                  className="w-full border rounded-[7px] px-3 py-[9px] text-sm text-secondary outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  เพศ
                </label>
                <select
                  value={formData.patient.sex}
                  onChange={(e) => handlePatientChange("sex", e.target.value)}
                  className="w-full border rounded-[7px] px-3 py-[9px] pr-8 text-sm text-secondary  outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 appearance-none cursor-pointer shadow-sm"
                >
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-secondary mb-1.5">
                  โรค/ภัยสุขภาพ
                </label>
                <input
                  type="text"
                  value={formData.diseases}
                  onChange={(e) =>
                    handleInputChange("diseases", e.target.value)
                  }
                  placeholder="เช่น ไข้เลือดออก"
                  className="w-full border rounded-[7px] px-3 py-[9px] text-sm text-secondary outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 shadow-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2.5 pb-2.5 mb-5 border-b border-slate-200">
              <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white text-[11px] font-mono bg-primary shrink-0">
                3
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
                หมายเหตุเพิ่มเติม
              </span>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-secondary mb-1.5">
                หมายเหตุ
                <span className="font-normal text-secondary-medium text-[12px]">
                  {" "}
                  (ถ้ามี)
                </span>
              </label>
              <textarea
                value={formData.remarks ?? ""}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="บันทึกข้อสังเกตหรือสถานการณ์เพิ่มเติม ..."
                rows={4}
                className="w-full border rounded-[7px] px-3 py-[9px] text-sm text-secondary outline-none transition-all focus:bg-white focus:border-primary-light focus:ring-[3px] focus:ring-primary-light/10 resize-y shadow-sm"
              />
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 px-9 py-5 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            className="px-5 py-[9px] rounded-[7px] text-[14px] text-secondary-medium border border-slate-200 bg-transparent transition-all hover:border-slate-400 hover:text-secondary cursor-pointer font-sans"
            onClick={() => clearFormData()}
          >
            ล้างข้อมูล
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(formData)}
            className="flex items-center gap-2 px-7 py-[9px] rounded-[7px] text-[15px] font-semibold text-white bg-primary transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer font-sans shadow-moph"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            ส่งรายงานเข้าระบบ
          </button>
        </div>

        <div className="flex items-center justify-between px-9 py-2.5 bg-white border-t border-slate-200">
          <p className="text-[11px] uppercase tracking-widest text-secondary-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-health-safe inline-block" />
            ระบบออนไลน์
          </p>
          <p className="text-[11px] uppercase tracking-widest text-secondary-medium">
            Digital Health Information System v2.0 © 2026
          </p>
        </div>
      </div>
    </div>
  );
};
