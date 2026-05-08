import { useQuery } from '@tanstack/react-query';
import { soapService } from './soapService';

/**
 * Custom hook to fetch the JSON structure of a specific form.
 * @param {string} formId - The unique ID of the form structure to fetch.
 */
export const useFormStructure = (formId) => {
  return useQuery({
    queryKey: ['form-structure', formId],
    queryFn: () => soapService.getFormStructure(formId),
    staleTime: 600000, // 10 minutes cache
    retry: 1,
  });
};