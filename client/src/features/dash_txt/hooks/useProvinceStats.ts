import { useMemo } from "react";
import type { ProvinceData } from "./useProvinceData";

interface ProvinceStats {
  totalCases: number;
  totalProvinces: number;
  averageCasesPerProvince: number;
  highestCasesProvince: string | null;
  lowestCasesProvince: string | null;
  emergencyProvinces: number;
  warningProvinces: number;
  normalProvinces: number;
  topDiseases: Array<{ name: string; count: number; percentage: number }>;
}

interface UseProvinceStatsParams {
  data: ProvinceData[];
}

interface UseProvinceStatsReturn {
  stats: ProvinceStats;
}

export const useProvinceStats = ({ data }: UseProvinceStatsParams): UseProvinceStatsReturn => {
  const stats = useMemo(() => {
    if (!data.length) {
      return {
        totalCases: 0,
        totalProvinces: 0,
        averageCasesPerProvince: 0,
        highestCasesProvince: null,
        lowestCasesProvince: null,
        emergencyProvinces: 0,
        warningProvinces: 0,
        normalProvinces: 0,
        topDiseases: [],
      };
    }

    const totalCases = data.reduce((sum, province) => sum + province.totalCount, 0);
    const totalProvinces = data.length;
    const averageCasesPerProvince = Math.round(totalCases / totalProvinces);

    const sortedByCases = [...data].sort((a, b) => b.totalCount - a.totalCount);
    const highestCasesProvince = sortedByCases[0]?.provinceName || null;
    const lowestCasesProvince = sortedByCases[sortedByCases.length - 1]?.provinceName || null;

    // Risk level classification based on the same logic as the API
    const emergencyProvinces = data.filter(p => p.totalCount > 3000).length;
    const warningProvinces = data.filter(p => p.totalCount >= 501 && p.totalCount <= 3000).length;
    const normalProvinces = data.filter(p => p.totalCount >= 0 && p.totalCount <= 500).length;

    // Aggregate disease data across all provinces
    const diseaseMap = new Map<string, number>();
    data.forEach(province => {
      province.diseases.forEach((disease: { diseaseName: string; count: number }) => {
        const current = diseaseMap.get(disease.diseaseName) || 0;
        diseaseMap.set(disease.diseaseName, current + disease.count);
      });
    });

    const topDiseases = Array.from(diseaseMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalCases) * 100),
      }));

    return {
      totalCases,
      totalProvinces,
      averageCasesPerProvince,
      highestCasesProvince,
      lowestCasesProvince,
      emergencyProvinces,
      warningProvinces,
      normalProvinces,
      topDiseases,
    };
  }, [data]);

  return { stats };
};
