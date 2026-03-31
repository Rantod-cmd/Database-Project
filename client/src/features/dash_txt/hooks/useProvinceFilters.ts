import { useState, useCallback } from "react";

export interface ProvinceFilters {
  search: string;
  region: string;
  risk: "all" | "normal" | "warning" | "emergency";
  minCases: number;
  order: "count_asc" | "count_desc" | "name_asc" | "name_desc";
  page: number;
  disease: string;
}

interface UseProvinceFiltersReturn {
  filters: ProvinceFilters;
  updateFilter: <K extends keyof ProvinceFilters>(key: K, value: ProvinceFilters[K]) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;
  setRegion: (region: string) => void;
  setRisk: (risk: ProvinceFilters["risk"]) => void;
  setMinCases: (minCases: number) => void;
  setOrder: (order: ProvinceFilters["order"]) => void;
  setPage: (page: number) => void;
}

const defaultFilters: ProvinceFilters = {
  search: "",
  region: "",
  risk: "all",
  minCases: 0,
  order: "count_desc",
  page: 1,
  disease: "",
};

export const useProvinceFilters = (initialFilters: Partial<ProvinceFilters> = {}): UseProvinceFiltersReturn => {
  const [filters, setFilters] = useState<ProvinceFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const updateFilter = useCallback(<K extends keyof ProvinceFilters>(key: K, value: ProvinceFilters[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset to page 1 when filters change (except when explicitly changing page)
      ...(key !== 'page' ? { page: 1 } : {}),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const setSearch = useCallback((search: string) => {
    updateFilter('search', search);
  }, [updateFilter]);

  const setRegion = useCallback((region: string) => {
    updateFilter('region', region);
  }, [updateFilter]);

  const setRisk = useCallback((risk: ProvinceFilters["risk"]) => {
    updateFilter('risk', risk);
  }, [updateFilter]);

  const setMinCases = useCallback((minCases: number) => {
    updateFilter('minCases', minCases);
  }, [updateFilter]);

  const setOrder = useCallback((order: ProvinceFilters["order"]) => {
    updateFilter('order', order);
  }, [updateFilter]);

  const setPage = useCallback((page: number) => {
    updateFilter('page', page);
  }, [updateFilter]);

  return {
    filters,
    updateFilter,
    resetFilters,
    setSearch,
    setRegion,
    setRisk,
    setMinCases,
    setOrder,
    setPage,
  };
};
