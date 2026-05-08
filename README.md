# Multi-Lingual Rehabilitation SOAP Assessment Form

A high-performance, dynamic form-building architecture built with **React**, **React Hook Form**, and **i18next**. This system is specifically designed for rehabilitation professionals (PT/OT) to conduct SOAP (Subjective, Objective, Assessment, Plan) evaluations with real-time support for multiple languages.

## 🚀 Key Architectural Features

### 1. Schema-Driven UI (Metadata Rendering)
The entire form is generated from a central `soapSchema.js`. This decouples the **Technical Logic** (validation, nesting, field types) from the **Presentation Layer**, allowing for rapid updates to the assessment structure without modifying core UI components.

### 2. Deeply Nested State Management
Utilizes **React Hook Form** with dot-notation pathing (e.g., `subjective.painAssessment.painScale`). This ensures that complex, grouped medical data is serialized into a clean, hierarchical JSON object ready for NoSQL or Relational database storage.

### 3. Performance Optimized
* **Atomic Re-renders:** Uses `FieldRenderer` and `React.memo` to isolate component updates and ensure 60fps interaction.
* **Controlled Persistence:** Implements `shouldUnregister: false` to ensure that selected values (Radios/Checkboxes) are preserved during real-time language switching.
* **Reference Stability:** Optimized to prevent recursive re-renders of the entire form tree during simple input changes.

### 4. Advanced Localization (i18next)
Supports seamless transition between:
* **English (en)**
* **Spanish (es)**
* **Telugu (te)**
* **Malay (ms)**

The system uses **snake_case keys** (e.g., `options.fall_risk`) as a language-agnostic data layer, while `i18next` handles the human-readable display mapping.

---

## 🛠️ Tech Stack

* **Framework:** React 18
* **Form Logic:** React Hook Form (RHF)
* **Localization:** i18next & react-i18next
* **Schema Engine:** Custom JSON-based Form Model

---

## 📁 Project Structure

```text
src/
├── components/
│   └── FormBuilder/
│       ├── FormBuilder.jsx      # Core recursive rendering engine
│       └── FieldRenderer.jsx    # Optimized atomic field components
├── constants/
│   ├── soapSchema.js            # The "Source of Truth" for form structure
│   └── translations.js          # Multi-lingual key-value pairs
├── hooks/
│   └── useSOAPForm.js           # Custom hook for form initialization
└── App.js                       # Entry point with FormProvider & i18n
