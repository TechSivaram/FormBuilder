/**
 * SOAP Schema: UI Structure Skeleton
 * * DESIGN NOTES:
 * 1. Labels are omitted to prioritize i18next translations via path keys.
 * 2. Field names match the dot-notation paths in localTranslations.js.
 * 3. Options are lowercase to serve as unique keys for multi-language lookups.
 */

export const soapModel = {
  fields: [
    {
      name: "subjective",
      type: "group",
      fields: [
        { name: "complaint", type: "textarea", min: 5 },
        { name: "onset", type: "date", required: true },
        {
          name: "painAssessment",
          type: "group",
          fields: [
            { name: "painScale", type: "number", min: 0, max: 10 },
            { name: "painLocation", type: "text" },
            { 
              name: "painType", 
              type: "select", 
              options: ["sharp", "dull", "burning", "throbbing", "other"] 
            },
          ],
        },
        { name: "functionalLimitations", type: "textarea" },
        { name: "history", type: "textarea" },
      ],
    },
    {
      name: "objective",
      type: "group",
      fields: [
        {
          name: "vitalSigns",
          type: "group",
          fields: [
            { name: "bp", type: "text", pattern: "^\\d{2,3}/\\d{2,3}$" },
            { name: "heartRate", type: "number", min: 30, max: 250 },
            { name: "temperature", type: "number", min: 95, max: 105 },
            { name: "respiration", type: "number", min: 10, max: 40 },
          ],
        },
        {
          name: "physicalAssessment",
          type: "group",
          fields: [
            { name: "rangeOfMotion", type: "textarea" },
            { name: "strength", type: "textarea" },
            { 
              name: "balance", 
              type: "select", 
              options: ["normal", "impaired", "severely_impaired"] 
            },
            { name: "gait", type: "text" },
          ],
        },
      ],
    },
    {
      name: "assessment",
      type: "group",
      fields: [
        { name: "Diagnosis", type: "textarea", min: 10 },
        { name: "goals", type: "textarea" },
        { name: "progress", type: "textarea" },
        { 
          name: "prognosis", 
          type: "radio", 
          options: ["excellent", "good", "fair", "poor"] 
        },
        {
          name: "functionalImprovements",
          type: "checkbox",
          options: [
            "increased_mobility", 
            "improved_strength", 
            "better_balance", 
            "reduced_pain", 
            "enhanced_endurance", 
            "other"
          ],
        },
        {
          name: "riskFactors",
          type: "checkbox",
          options: [
            "fall_risk", 
            "cardiovascular_issues", 
            "respiratory_problems", 
            "nutritional_deficiencies", 
            "mental_health_concerns", 
            "other"
          ],
        },
      ],
    },
    {
      name: "plan",
      type: "group",
      fields: [
        { name: "medications", type: "textarea", required: true },
        { name: "followUp", type: "date", required: true },
        {
          name: "treatmentPlan",
          type: "group",
          fields: [
            { name: "interventions", type: "textarea" },
            { name: "exercises", type: "textarea" },
            { name: "education", type: "textarea" },
            { name: "referrals", type: "textarea" },
          ],
        },
      ],
    },
  ],
};