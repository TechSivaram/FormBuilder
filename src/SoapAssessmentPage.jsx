import React, { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query'; // Import Mutation
import { zodResolver } from '@hookform/resolvers/zod';
import { createZodSchema } from './schemaUtils';
import { useFormTranslations } from './useFormTranslations'; 
import { useFormStructure } from './useFormStructure';
import { soapService } from './soapService'; // Import Service
import FormBuilder from './FormBuilder';
import { useQuery } from '@tanstack/react-query';
//import './SoapStyles.css';

const SoapAssessmentPage = ({ formId }) => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  // 1. Queries (Data Fetching)
  const { data: schema, isLoading: sLoading } = useFormStructure(formId);
  const { isLoading: tLoading } = useFormTranslations(formId);

  // 2. Mutation (Data Submission)
  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (data) => soapService.saveSoapNote(formId, data),
    onSuccess: () => {
      alert(t('save_success') || 'Saved successfully!');
    },
    onError: (error) => {
      console.error(error);
      alert(t('error.save_failed') || 'Save failed.');
    }
  });

  // 3. Fetch the Specific Saved Note (if noteId exists)
  const noteId = 1;
  const { data: savedNote, isLoading: nLoading } = useQuery({
    queryKey: ['saved-note', noteId],
    queryFn: () => soapService.getSavedNote(noteId),
    enabled: !!noteId, // Only fetch if we are in "view/edit" mode
  });

  const validationSchema = useMemo(() => {
    if (!schema || !schema.fields) return null;
    return createZodSchema(schema.fields);
  }, [schema, i18n.language]);

  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    mode: "onBlur",
    shouldUnregister: false 
  });

  // EFFECT: Populate form when saved data arrives
  useEffect(() => {
    if (savedNote && isReady) {
      // savedNote.content should be the JSON object from your DB column
      methods.reset(savedNote.content); 
    }
  }, [savedNote, isReady, methods]);

  useEffect(() => {
    if (!sLoading && !tLoading) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [sLoading, tLoading, i18n.language]);

  // Initial Load Screen
  if (!isReady) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <span>{t('switching_language')}</span>
      </div>
    );
  }

  return (
    <div className="content-container fluid" key={`${formId}-${i18n.language}`}>
      {/* 3. Global Save Overlay Loader (Optional) */}
      {isSaving && <div className="save-overlay"><div className="loader"></div></div>}

      <div className="page-header responsive-header">
        <div className="title-block">
          <h2>{t('save_note')}</h2>
          <p className="subtitle">ID: {formId}</p>
        </div>
        
        <button 
          type="submit" 
          form="soap-form" 
          className={`md-btn primary ${isSaving ? 'loading' : ''}`}
          disabled={isSaving} // Prevent double clicks
        >
          {isSaving ? (
            <span className="spinner-small"></span>
          ) : (
            <span className="material-icons">save</span>
          )}
          <span className="btn-text">{isSaving ? t('saving...') : t('save_note')}</span>
        </button>
      </div>

      <FormProvider {...methods}>
        <form id="soap-form" onSubmit={methods.handleSubmit((data) => mutate(data))} noValidate>
           {schema && <FormBuilder fields={schema.fields} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default SoapAssessmentPage;