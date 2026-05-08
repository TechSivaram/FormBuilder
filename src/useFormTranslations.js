import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { localTranslations } from './translations';
import { soapService } from './soapService';

/**
 * Custom hook to fetch form-specific translations from Django 
 * and inject them into the i18next resource bundle.
 * * @param {string} formId - The unique ID of the form (e.g., 'soap-001')
 */
export const useFormTranslations = (formId) => {
  const { i18n } = useTranslation();

  const query = useQuery({
    // The queryKey includes i18n.language so it refetches automatically 
    // whenever the user changes the language in the App header.
    queryKey: ['form-translations', formId, i18n.language],
    
    queryFn: async () => {
      const data = await soapService.getFormTranslations(formId, i18n.language);
      return data;
    },
    // Keep the translations cached for 10 minutes to prevent unnecessary API calls
    staleTime: 1000 * 60 * 10, 
    // Ensure the form remains interactive even if the network is flaky
    retry: 1,
  });

  // Automatically "feed" the fetched translations into the i18next store
  useEffect(() => {
    if (query.data) {
      // i18n.addResourceBundle adds the keys to the existing translation store
      // The 'true' parameters ensure we deep-merge and override existing keys
      i18n.addResourceBundle(
        i18n.language, 
        'translation', 
        query.data, 
        true, 
        true
      );
    }
  }, [query.data, i18n.language, i18n]);

  return {
    translations: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  };
};

export default useFormTranslations;