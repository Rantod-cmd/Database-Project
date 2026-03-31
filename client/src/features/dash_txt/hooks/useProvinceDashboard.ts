import { useEffect } from "react";
import { useProvinceData, type ProvinceData } from "./useProvinceData";
import { useProvinceCount } from "./useProvinceCount";
import { useProvinceFilters, type ProvinceFilters } from "./useProvinceFilters";
import { useProvinceStats } from "./useProvinceStats";
import { useRegionMapping } from "./useRegionMapping";

interface UseProvinceDashboardParams {
  initialFilters?: {
    search?: string;
    region?: string;
    risk?: "all" | "normal" | "warning" | "emergency";
    minCases?: number;
    order?: "count_asc" | "count_desc" | "name_asc" | "name_desc";
    disease?: string;
  };
}

interface UseProvinceDashboardReturn {
  // Data
  provinceData: ProvinceData[];
  totalPatients?: number;
  diseaseData?: any[];
  
  // Loading states
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  
  // Filters
  filters: ProvinceFilters;
  regionMapping: any;
  
  // Actions
  updateFilter: <K extends keyof ProvinceFilters>(key: K, value: ProvinceFilters[K]) => void;
  resetFilters: () => void;
  refetch: () => void;
  setPage: (page: number) => void;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export const useProvinceDashboard = ({
  initialFilters = {},
}: UseProvinceDashboardParams = {}): UseProvinceDashboardReturn => {
  const filters = useProvinceFilters(initialFilters);
  const regionMapping = useRegionMapping();
  
  const {
    data: provinceData,
    loading: dataLoading,
    error: dataError,
    totalPages,
    currentPage,
    totalCount,
    refetch: refetchData,
    setPage,
  } = useProvinceData({
    page: filters.filters.page,
    limit: 9,
    order: filters.filters.order,
    risk: filters.filters.risk,
    search: filters.filters.search,
    region: filters.filters.region,
    minCases: filters.filters.minCases,
    disease: filters.filters.disease,
  });

  const {
    loading: totalLoading,
    error: totalError,
    totalPatients,
    refetch: refetchTotal,
  } = useProvinceCount({
    order: filters.filters.order,
    type: "total",
  });

  const {
    data: diseaseData,
    loading: diseaseLoading,
    error: diseaseError,
    refetch: refetchDisease,
  } = useProvinceCount({
    order: "count_desc",
    type: "disease",
  });

  useProvinceStats({ data: provinceData });

  const isLoading = dataLoading || totalLoading || diseaseLoading;
  const isError = !!dataError || !!totalError || !!diseaseError;
  const error = dataError || totalError || diseaseError;

  const refetch = () => {
    refetchData();
    refetchTotal();
    refetchDisease();
  };

  useEffect(() => {
    // Refetch data when order changes (affects all hooks)
    if (filters.filters.order) {
      refetch();
    }
  }, [filters.filters.order]);

  return {
    // Data
    provinceData,
    totalPatients,
    diseaseData: (diseaseData as any[]) || [],
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Filters
    filters: filters.filters,
    regionMapping,
    
    // Actions
    updateFilter: filters.updateFilter,
    resetFilters: filters.resetFilters,
    refetch,
    setPage,
    
    // Pagination
    currentPage,
    totalPages,
    totalCount,
  };
};
