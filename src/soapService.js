import { soapModel } from './soapSchema'; // Local skeleton fallback
import { localTranslations } from './translations'; 
import apiClient from './apiClient';
import { staticSavedNote } from './mockData';

export const soapService = {
  /**
   * Fetches the UI structure for a specific form.
   * Fallback: soapModel (hardcoded schema)
   */
  getFormStructure: async (formId) => {
    try {
      const res = await apiClient.get(`/forms/${formId}/structure/`);
      
      if (!res.ok) {
        throw new Error(`Structure API returned status: ${res.status}`);
      }
      
      return await res.json();
    } catch (err) {
      console.warn(`soapService: API failed for structure ${formId}, using soapModel.`, err);
      return soapModel; 
    }
  },

  /**
   * Fetches translations and falls back to local data.
   */
  getFormTranslations: async (formId, lang) => {
    try {
      const res = await apiClient.get(`/forms/${formId}/translations/${lang}/`);
      if (!res.ok) throw new Error(`Translation API failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`soapService: Using local fallback for ${lang}`);
      return localTranslations[lang] || localTranslations['en'] || {};
    }
  },

  /**
   * Submits the completed SOAP note.
   */
  saveSoapNote: async (formId, data) => {
    const res = await apiClient.post(`/forms/${formId}/save/`, data);
    if (!res.ok) throw new Error('Save failed');
    return res.json();
  },

  /**
   * Fetches a previously saved SOAP note
   */
  getSavedNote: async (noteId) => {
    /* try {
      const response = await apiClient.get(`/notes/${noteId}/`);
      return response.data; 
    } catch (err) {
      console.warn(`soapService: API failed for note ${noteId}. Falling back to static JSON.`);
       */
      // Return the static data wrapped in a structure the component expects
      return staticSavedNote;
    // }
  },
};