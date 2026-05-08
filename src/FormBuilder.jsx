import React, { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/**
 * Optimized Checkbox Group
 * React.memo prevents this group from re-rendering unless the watchedValue changes.
 */
const CheckboxGroupField = memo(({ fieldName, options, control, t }) => {
  const { setValue } = useFormContext();
  const watchedValue = useWatch({ control, name: fieldName });
  
  const currentValue = useMemo(() => 
    Array.isArray(watchedValue) ? watchedValue : [], 
    [watchedValue]
  );

  return (
    <div className="checkbox-group">
      {options.map((option) => (
        <label key={`${fieldName}-${option}`} className="checkbox-label">
          <input
            type="checkbox"
            value={option}
            checked={currentValue.includes(option)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const newValues = isChecked
                ? [...currentValue, option]
                : currentValue.filter((v) => v !== option);
              
              setValue(fieldName, newValues, { 
                shouldValidate: true, 
                shouldDirty: true 
              });
            }}
          />
          <span className="label-text">
            {t(`options.${option}`, { defaultValue: option })}
          </span>
        </label>
      ))}
    </div>
  );
});

/**
 * Isolated Field Renderer 
 * Prevents the entire FormBuilder from re-processing logic for every field on every tick.
 */
const FieldRenderer = memo(({ field, fieldName, control, register, errors, t }) => {
  const getNestedError = (name) => {
    return name.split('.').reduce((obj, key) => obj?.[key], errors);
  };

  const error = getNestedError(fieldName);
  const commonProps = {
    id: fieldName,
    className: error ? 'error-border' : '',
    placeholder: t(`${fieldName}_placeholder`, { defaultValue: "" }),
  };

  const displayLabel = t(fieldName);

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${field.type === 'textarea' ? 'textarea-group' : ''}`}>
      <label htmlFor={fieldName} className="field-label">{displayLabel}</label>
      
      {(() => {
        switch (field.type) {
          case 'textarea':
            return (
              <textarea
                {...commonProps}
                {...register(fieldName, {
                  required: field.required ? t('error.required') : false,
                  minLength: field.min ? { value: field.min, message: t('error.min_length') } : undefined,
                })}
                rows={4}
              />
            );
          case 'number':
            return (
              <input
                {...commonProps}
                type="number"
                {...register(fieldName, {
                  required: field.required ? t('error.required') : false,
                  min: field.min !== undefined ? { value: field.min, message: t('error.invalid_range') } : undefined,
                  max: field.max !== undefined ? { value: field.max, message: t('error.invalid_range') } : undefined,
                })}
              />
            );
          case 'date':
            return (
              <input
                {...commonProps}
                type="date"
                {...register(fieldName, { required: field.required ? t('error.required') : false })}
              />
            );
          case 'select':
            return (
              <select {...commonProps} {...register(fieldName, { required: field.required ? t('error.required') : false })}>
                <option value="">{t('select_option')}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{t(`options.${opt}`, { defaultValue: opt })}</option>
                ))}
              </select>
            );
          case 'radio':
            return (
              <div className="radio-group">
                {field.options.map((opt) => (
                  <label key={`${fieldName}-${opt}`} className="radio-label">
                    <input type="radio" value={opt} {...register(fieldName, { required: field.required ? t('error.required') : false })} />
                    <span className="label-text">{t(`options.${opt}`, { defaultValue: opt })}</span>
                  </label>
                ))}
              </div>
            );
          case 'checkbox':
            return <CheckboxGroupField fieldName={fieldName} options={field.options} control={control} t={t} />;
          default:
            return <input {...commonProps} type={field.type || 'text'} {...register(fieldName, { required: field.required ? t('error.required') : false })} />;
        }
      })()}

      {error && <span className="error-message">{t(error.message)}</span>}
    </div>
  );
});

const FormBuilder = ({ fields, path = "" }) => {
  const { t } = useTranslation();
  const { register, formState: { errors }, control } = useFormContext();

  return (
    <div className="fields-grid">
      {fields.map((field) => {
        const fieldName = path ? `${path}.${field.name}` : field.name;

        if (field.type === "group") {
          return (
            <fieldset key={fieldName} className="section-card">
              <legend className="section-title">{t(fieldName)}</legend>
              <FormBuilder fields={field.fields} path={fieldName} />
            </fieldset>
          );
        }

        return (
          <FieldRenderer
            key={fieldName}
            field={field}
            fieldName={fieldName}
            control={control}
            register={register}
            errors={errors}
            t={t}
          />
        );
      })}
    </div>
  );
};

export default memo(FormBuilder);