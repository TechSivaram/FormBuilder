import { z } from 'zod';

export const createZodSchema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    if (field.type === 'group' && field.fields) {
      shape[field.name] = createZodSchema(field.fields);
    } else {
      let validator;

      switch (field.type) {
        case 'textarea':
        case 'text':
          validator = z.string();
          if (field.required) {
            validator = validator.min(1, { message: 'error.required' });
          } else {
            validator = validator.optional().or(z.literal(''));
          }
          if (field.min > 1) {
            validator = validator.refine((val) => !val || val.length >= field.min, {
              message: 'error.min_length',
            });
          }
          if (field.pattern) {
            const regex = new RegExp(field.pattern);
            validator = validator.refine((val) => !val || regex.test(val), {
              message: field.name === 'bp' ? 'error.bp_format' : 'error.invalid_format',
            });
          }
          break;
        case 'number':
          validator = z.coerce.number().optional().refine((val) => {
            if (val === undefined) return !field.required;
            const minOk = field.min !== undefined ? val >= field.min : true;
            const maxOk = field.max !== undefined ? val <= field.max : true;
            return minOk && maxOk;
          }, {
            message: `error.${field.name}_range` || 'error.invalid_range',
          });
          break;
        case 'date':
          validator = z.string();
          if (field.required) {
            validator = validator.min(1, { message: 'error.required' });
          } else {
            validator = validator.optional().or(z.literal(''));
          }
          validator = validator.refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'error.date_invalid',
          });
          break;
        case 'select':
        case 'radio':
          validator = z.string();
          if (field.required) {
            validator = validator.min(1, { message: 'error.required' });
          } else {
            validator = validator.optional().or(z.literal(''));
          }
          if (field.options) {
            validator = validator.refine((val) => !val || field.options.includes(val), {
              message: 'error.invalid_option',
            });
          }
          break;
        case 'checkbox':
          validator = z.array(z.string()).optional();
          if (field.required) {
            validator = validator.refine((val) => val && val.length > 0, {
              message: 'error.required',
            });
          }
          if (field.options) {
            validator = validator.refine((val) => !val || val.every(v => field.options.includes(v)), {
              message: 'error.invalid_option',
            });
          }
          break;
        default:
          validator = z.string();
          if (field.required) {
            validator = validator.min(1, { message: 'error.required' });
          } else {
            validator = validator.optional().or(z.literal(''));
          }
      }

      shape[field.name] = validator;
    }
  });

  return z.object(shape);
};