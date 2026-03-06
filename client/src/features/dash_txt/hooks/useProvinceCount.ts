import { useState, useEffect } from "react";
import apiClient from "../../../api/apiClient";

interface ProvinceCount {
  provinceName: string;
  totalCount: number;
}

interface DiseaseCount {
  diseaseName: string;
  patientCount: number;
  totalCases: number;
}

interface TotalCount {
  totalPatients: number;
}

interface UseProvinceCountParams {
  order?: "count_asc" | "count_desc" | "name_asc" | "name_desc";
  type?: "province" | "total" | "disease";
}

interface UseProvinceCountReturn {
  data: ProvinceCount[] | DiseaseCount[] | TotalCount | null;
  loading: boolean;
  error: string | null;
  totalProvinces?: number;
  totalDiseases?: number;
  totalPatients?: number;
  refetch: () => void;
}

export const useProvinceCount = ({
  order = "count_desc",
  type = "province",
}: UseProvinceCountParams = {}): UseProvinceCountReturn => {
  const [data, setData] = useState<ProvinceCount[] | DiseaseCount[] | TotalCount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProvinces, setTotalProvinces] = useState<number>();
  const [totalDiseases, setTotalDiseases] = useState<number>();
  const [totalPatients, setTotalPatients] = useState<number>();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        order,
        type,
      });

      const response = await apiClient.get<any>(`/dataProvince/count?${params}`);
      
      if (response.data.success) {
        setData(response.data.data || response.data.diseaseData || response.data);
        
        if (type === "province") {
          setTotalProvinces(response.data.total);
        } else if (type === "disease") {
          setTotalDiseases(response.data.totalDiseases);
        } else if (type === "total") {
          setTotalPatients(response.data.totalPatients);
        }
      } else {
        setError("Failed to fetch count data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [order, type]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    totalProvinces,
    totalDiseases,
    totalPatients,
    refetch,
  };
};
