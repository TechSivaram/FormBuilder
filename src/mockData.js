export const staticSavedNote = {
  id: "note_123",
  patientName: "Venkata Rama Krishna",
  content: {
    subjective: {
      complaint: "Patient experiencing persistent lower back pain for 3 days after lifting heavy equipment.",
      onset: "2026-05-05",
      painAssessment: {
        painScale: 7,
        painLocation: "Lower back",
        painType: "sharp" // CHANGED: lowercase to match schema/translations
      },
      functionalLimitations: "Difficulty bending, lifting, and walking long distances.",
      history: "Patient reports history of similar episodes in the past, managed with rest and NSAIDs."
    },
    objective: {
      vitalSigns: {
        bp: "125/82",
        heartRate: 74,
        temperature: 98.6,
        respiration: 16
      },
      physicalAssessment: {
        rangeOfMotion: "Limited lumbar flexion to 45 degrees. Normal cervical and thoracic ROM.",
        strength: "5/5 in upper extremities, 4/5 in lower extremities bilaterally.",
        balance: "impaired", // CHANGED: lowercase
        gait: "Antalgic gait observed, favoring left side."
      }
    },
    assessment: {
      Diagnosis: "Acute lumbar strain. No neurological deficits noted during physical examination.",
      goals: "Short-term: Reduce pain to 3/10 within 1 week. Long-term: Return to full work duties in 4 weeks.",
      progress: "Patient shows mild improvement in pain levels since initial visit. Adhering to prescribed exercises.",
      prognosis: "good", // CHANGED: lowercase
      functionalImprovements: ["reduced_pain", "enhanced_endurance"], // CHANGED: snake_case
      riskFactors: ["fall_risk", "other"] // CHANGED: snake_case
    },
    plan: {
      medications: "Ibuprofen 400mg every 6 hours as needed for pain. Physical therapy referral pending.",
      followUp: "2026-05-12",
      treatmentPlan: {
        interventions: "Manual therapy for lumbar region, modalities including heat and ice.",
        exercises: "Core strengthening exercises, hamstring stretches, daily walking program.",
        education: "Educated on proper lifting techniques and ergonomics at work.",
        referrals: "Referral to physical therapy for ongoing rehabilitation."
      }
    }
  }
};