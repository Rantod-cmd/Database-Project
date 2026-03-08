import type { FormData } from "@shared/types/components/types";

export const useForm = () => {
    
    const handleSubmit = (data: FormData) => {
        console.log("Form submitted with data:", data);
    };

    return {
        handleSubmit,
    };
}