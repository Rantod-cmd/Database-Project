import { useState, useEffect, useMemo } from "react";
import apiClient from "../../../api/apiClient";
import { useRegionMapping } from "./useRegionMapping";

export interface Disease {
  diseaseName: string;
  count: number;
}

export interface ProvinceData {
  provinceName: string;
  totalCount: number;
  diseases: Disease[];
}

interface ProvinceDataResponse {
  success: boolean;
  page: number;
  limit: number;
  risk: string;
  data: ProvinceData[];
}

interface UseProvinceDataParams {
  page?: number;
  limit?: number;
  order?: "count_asc" | "count_desc" | "name_asc" | "name_desc";
  risk?: "all" | "normal" | "warning" | "emergency";
  search?: string;
  region?: string;
  minCases?: number;
}

interface UseProvinceDataReturn {
  data: ProvinceData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
  refetch: () => void;
  setPage: (page: number) => void;
}

export const useProvinceData = ({
  page = 1,
  limit = 9,
  order = "count_desc",
  risk = "all",
  search = "",
  region = "",
  minCases = 0,
  disease = "",
}: UseProvinceDataParams & { disease?: string } = {}): UseProvinceDataReturn => {
  const [allData, setAllData] = useState<ProvinceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const { getRegion } = useRegionMapping();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data without pagination for client-side filtering
      const params = new URLSearchParams({
        page: "1",
        limit: "1000", // Get a large number to get all data
        order,
        risk,
      });

      const response = await apiClient.get<ProvinceDataResponse>(`/dataProvince?${params}`);
      
      if (response.data.success) {
        setAllData(response.data.data);
        setTotalCount(response.data.data.length);
      } else {
        setError("Failed to fetch province data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [order, risk]); // Only refetch all data when order or risk changes

  // Apply client-side filtering and pagination
  const filteredAndPaginatedData = useMemo(() => {
    let filtered = [...allData];

    // Apply filters
    if (search) {
      filtered = filtered.filter(province =>
        province.provinceName.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (region) {
      filtered = filtered.filter(province => {
        const provinceRegion = getRegion(province.provinceName);
        return provinceRegion === region;
      });
    }

    if (minCases > 0) {
      filtered = filtered.filter(province => province.totalCount >= minCases);
    }

    if (disease) {
      filtered = filtered.filter(province =>
        province.diseases.some((d: any) =>
          d.diseaseName.toLowerCase().includes(disease.toLowerCase())
        )
      );
    }

    // Update total count for pagination
    setTotalCount(filtered.length);

    // Apply pagination
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filtered.slice(startIndex, endIndex);
  }, [allData, currentPage, limit, search, region, minCases, disease, getRegion]);

  const totalPages = Math.ceil(totalCount / limit);

  const setPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const refetch = () => {
    fetchAllData();
  };

  return {
    data: filteredAndPaginatedData,
    loading,
    error,
    totalPages,
    currentPage,
    totalCount,
    refetch,
    setPage,
  };
};
