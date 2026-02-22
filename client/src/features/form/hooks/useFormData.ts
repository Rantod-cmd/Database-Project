import { type FormData } from "@shared/types/components/types";

export const useForm = () => {
    const handleSubmit = async (data: FormData) => {
        console.log("Submitting form data:", data);
        // Add actual submission logic here once backend endpoint is confirmed
        alert("ส่งรายงานเข้าระบบสำเร็จ (จำลอง)");
    };

    return {
        handleSubmit,
    };
};
