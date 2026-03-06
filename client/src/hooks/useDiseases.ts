import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface Disease {
  diseaseName: string;
  patientCount: number;
  totalCases: number;
}

export const useDiseases = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiseases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the count endpoint with type=disease to get all disease data
      const response = await apiClient.get('/dataProvince/count?type=disease&order=count_desc');
      
      if (response.data.success && response.data.diseaseData) {
        setDiseases(response.data.diseaseData);
      } else {
        setError('Failed to fetch disease data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return {
    diseases,
    isLoading,
    error,
    refetch: fetchDiseases,
  };
};
