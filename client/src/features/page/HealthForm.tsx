import { useState } from "react";
import type { FormData } from "@shared/types/components/types";
import { useForm } from "../form/hooks/useFormData";
import './FormStyles.css';

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

  const clearFormData = (): void => {
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
    <div className="form-page">
      <div className="card">
        {/* Header */}
        <div className="header">
          <div className="header-inner">
            <div className="logo-block">
              <div className="logo-badge">สธ</div>
              <div>
                <div className="header-title">ระบบรายงานสถานการณ์โรคและภัยสุขภาพ</div>
                <div className="header-sub">กระทรวงสาธารณสุข · Ministry of Public Health</div>
              </div>
            </div>
            <div className="doc-id-block">
              <div className="doc-id-label">Document ID</div>
              <div className="doc-id-val">MOPH-2026-00124</div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="notice">
          <div className="notice-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <p><strong>คำชี้แจง:</strong> ข้อมูลนี้จะถูกนำไปประมวลผลในระบบระบาดวิทยาเพื่อกำหนดนโยบายสาธารณสุขระดับประเทศ โปรดตรวจสอบความถูกต้องก่อนบันทึก</p>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Section 1 */}
          <div className="section">
            <div className="section-title">
              <span className="section-num">1</span>ข้อมูลหน่วยงานผู้รายงาน
            </div>
            <div className="grid-2">
              <div>
                <label>รหัสสถานพยาบาล <span className="required">*</span><span className="sublabel"> (5 หลัก)</span></label>
                <input
                  type="text"
                  className="mono-input"
                  value={formData.hospitalCode}
                  onChange={(e) => handleInputChange("hospitalCode", e.target.value)}
                  maxLength={5}
                  placeholder="H-12345"
                />
              </div>
              <div>
                <label>ชื่อหน่วยงาน <span className="required">*</span></label>
                <input
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) => handleInputChange("instituteName", e.target.value)}
                  placeholder="โรงพยาบาล"
                />
              </div>
              <div>
                <label>จังหวัด</label>
                <select
                  value={formData.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
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
                <label>วันที่รายงาน <span className="required">*</span></label>
                <input
                  type="date"
                  onChange={(e) => handleInputChange("date", new Date(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="section">
            <div className="section-title">
              <span className="section-num">2</span>ข้อมูลผู้ป่วยและอาการ
            </div>
            <div className="grid-3">
              <div>
                <label>อายุ (ปี)</label>
                <input
                  type="number"
                  value={formData.patient.age}
                  onChange={(e) => handlePatientChange("age", parseInt(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label>เพศ</label>
                <select
                  value={formData.patient.sex}
                  onChange={(e) => handlePatientChange("sex", e.target.value)}
                >
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>
              <div>
                <label>โรค/ภัยสุขภาพ</label>
                <input
                  type="text"
                  value={formData.diseases}
                  onChange={(e) => handleInputChange("diseases", e.target.value)}
                  placeholder="เช่น ไข้เลือดออก"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="section">
            <div className="section-title">
              <span className="section-num">3</span>หมายเหตุเพิ่มเติม
            </div>
            <div>
              <label>หมายเหตุ <span className="sublabel">(ถ้ามี)</span></label>
              <textarea
                value={formData.remarks ?? ""}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="บันทึกข้อสังเกตหรือสถานการณ์เพิ่มเติม ..."
                rows={4}
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="form-footer">
          <button type="button" className="btn-cancel" onClick={() => clearFormData()}>
            ล้างข้อมูล
          </button>
          <button type="button" className="btn-submit" onClick={() => handleSubmit(formData)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12l5 5L20 7" />
            </svg>
            ส่งรายงานเข้าระบบ
          </button>
        </div>

        {/* System Footer */}
        <div className="sys-footer">
          <p><span className="status-dot"></span>ระบบออนไลน์</p>
          <p>Digital Health Information System v2.0 © 2026</p>
        </div>
      </div>
    </div>
  );
};
