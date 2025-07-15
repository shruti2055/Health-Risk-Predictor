import React, { useState } from 'react';
import { User, Activity, Heart, Droplets, Scale, Calendar, Brain, Utensils, Moon, Shield } from 'lucide-react';

interface HealthData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  systolicBP: number;
  diastolicBP: number;
  restingHeartRate: number;
  glucose: number;
  cholesterol: number;
  hdlCholesterol: number;
  ldlCholesterol: number;
  triglycerides: number;
  hba1c: number;
  smokingStatus: 'never' | 'former' | 'current';
  smokingYears: number;
  cigarettesPerDay: number;
  exerciseFrequency: 'none' | 'low' | 'moderate' | 'high';
  exerciseIntensity: 'light' | 'moderate' | 'vigorous';
  sleepHours: number;
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'moderate' | 'high' | 'very-high';
  alcoholConsumption: 'none' | 'light' | 'moderate' | 'heavy';
  familyHistory: boolean;
  heartDiseaseFamily: boolean;
  diabetesFamily: boolean;
  strokeFamily: boolean;
  cancerFamily: boolean;
  medications: string[];
  chronicConditions: string[];
  waistCircumference: number;
  dietQuality: 'poor' | 'fair' | 'good' | 'excellent';
  waterIntake: number;
  mentalHealthStatus: 'poor' | 'fair' | 'good' | 'excellent';
  lastCheckup: 'less-than-6-months' | '6-12-months' | '1-2-years' | 'more-than-2-years';
}

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
}

const HealthForm: React.FC<HealthFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<HealthData>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 175,
    systolicBP: 120,
    diastolicBP: 80,
    restingHeartRate: 70,
    glucose: 90,
    cholesterol: 180,
    hdlCholesterol: 50,
    ldlCholesterol: 100,
    triglycerides: 150,
    hba1c: 5.5,
    smokingStatus: 'never',
    smokingYears: 0,
    cigarettesPerDay: 0,
    exerciseFrequency: 'moderate',
    exerciseIntensity: 'moderate',
    sleepHours: 7,
    sleepQuality: 'good',
    stressLevel: 'moderate',
    alcoholConsumption: 'light',
    familyHistory: false,
    heartDiseaseFamily: false,
    diabetesFamily: false,
    strokeFamily: false,
    cancerFamily: false,
    medications: [],
    chronicConditions: [],
    waistCircumference: 85,
    dietQuality: 'fair',
    waterIntake: 8,
    mentalHealthStatus: 'good',
    lastCheckup: '6-12-months',
  });

  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    'Personal Information',
    'Vital Signs & Lab Results',
    'Lifestyle Factors',
    'Family History & Medical',
    'Mental Health & Wellness'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof HealthData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'medications' | 'chronicConditions', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex items-center ${index < sections.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentSection
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < sections.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < currentSection ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{sections[currentSection]}</h3>
      </div>

      {/* Section 0: Personal Information */}
      {currentSection === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="18" max="120" required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="30" max="300" required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="120" max="250" required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Body Measurements
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waist Circumference (cm)
              </label>
              <input
                type="number"
                value={formData.waistCircumference}
                onChange={(e) => handleChange('waistCircumference', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50" max="200" required
              />
              <p className="text-xs text-gray-500 mt-1">Measure at the narrowest point of your waist</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Medical Checkup
              </label>
              <select
                value={formData.lastCheckup}
                onChange={(e) => handleChange('lastCheckup', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="less-than-6-months">Less than 6 months ago</option>
                <option value="6-12-months">6-12 months ago</option>
                <option value="1-2-years">1-2 years ago</option>
                <option value="more-than-2-years">More than 2 years ago</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Vital Signs & Lab Results */}
      {currentSection === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Cardiovascular Metrics
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Systolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    value={formData.systolicBP}
                    onChange={(e) => handleChange('systolicBP', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="80" max="250" required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diastolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    value={formData.diastolicBP}
                    onChange={(e) => handleChange('diastolicBP', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="40" max="150" required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resting Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  value={formData.restingHeartRate}
                  onChange={(e) => handleChange('restingHeartRate', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="40" max="120" required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Blood Chemistry
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fasting Glucose (mg/dL)
                </label>
                <input
                  type="number"
                  value={formData.glucose}
                  onChange={(e) => handleChange('glucose', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="50" max="400" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HbA1c (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.hba1c}
                  onChange={(e) => handleChange('hba1c', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="4" max="15" required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                value={formData.cholesterol}
                onChange={(e) => handleChange('cholesterol', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="100" max="400" required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HDL Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                value={formData.hdlCholesterol}
                onChange={(e) => handleChange('hdlCholesterol', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="20" max="100" required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LDL Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                value={formData.ldlCholesterol}
                onChange={(e) => handleChange('ldlCholesterol', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50" max="300" required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Triglycerides (mg/dL)
            </label>
            <input
              type="number"
              value={formData.triglycerides}
              onChange={(e) => handleChange('triglycerides', Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="50" max="1000" required
            />
          </div>
        </div>
      )}

      {/* Section 2: Lifestyle Factors */}
      {currentSection === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Physical Activity & Habits
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise Frequency
                </label>
                <select
                  value={formData.exerciseFrequency}
                  onChange={(e) => handleChange('exerciseFrequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">No exercise</option>
                  <option value="low">1-2 times per week</option>
                  <option value="moderate">3-4 times per week</option>
                  <option value="high">5+ times per week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise Intensity
                </label>
                <select
                  value={formData.exerciseIntensity}
                  onChange={(e) => handleChange('exerciseIntensity', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light (walking, gentle yoga)</option>
                  <option value="moderate">Moderate (brisk walking, cycling)</option>
                  <option value="vigorous">Vigorous (running, HIIT, sports)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smoking Status
                </label>
                <select
                  value={formData.smokingStatus}
                  onChange={(e) => handleChange('smokingStatus', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>

              {formData.smokingStatus !== 'never' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years Smoked
                    </label>
                    <input
                      type="number"
                      value={formData.smokingYears}
                      onChange={(e) => handleChange('smokingYears', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0" max="80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cigarettes per Day
                    </label>
                    <input
                      type="number"
                      value={formData.cigarettesPerDay}
                      onChange={(e) => handleChange('cigarettesPerDay', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0" max="100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alcohol Consumption
                </label>
                <select
                  value={formData.alcoholConsumption}
                  onChange={(e) => handleChange('alcoholConsumption', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="light">Light (1-3 drinks per week)</option>
                  <option value="moderate">Moderate (4-7 drinks per week)</option>
                  <option value="heavy">Heavy (8+ drinks per week)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Diet & Wellness
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Quality
                </label>
                <select
                  value={formData.dietQuality}
                  onChange={(e) => handleChange('dietQuality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="poor">Poor (mostly processed foods)</option>
                  <option value="fair">Fair (some healthy foods)</option>
                  <option value="good">Good (balanced diet)</option>
                  <option value="excellent">Excellent (very healthy diet)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Water Intake (glasses)
                </label>
                <input
                  type="number"
                  value={formData.waterIntake}
                  onChange={(e) => handleChange('waterIntake', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0" max="20" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Hours per Night
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => handleChange('sleepHours', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="3" max="12" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Quality
                </label>
                <select
                  value={formData.sleepQuality}
                  onChange={(e) => handleChange('sleepQuality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="poor">Poor (frequent interruptions)</option>
                  <option value="fair">Fair (some interruptions)</option>
                  <option value="good">Good (mostly restful)</option>
                  <option value="excellent">Excellent (very restful)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level
                </label>
                <select
                  value={formData.stressLevel}
                  onChange={(e) => handleChange('stressLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Family History & Medical */}
      {currentSection === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Family Medical History
              </h4>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="heartDiseaseFamily"
                    checked={formData.heartDiseaseFamily}
                    onChange={(e) => handleChange('heartDiseaseFamily', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="heartDiseaseFamily" className="ml-2 block text-sm text-gray-700">
                    Heart disease in immediate family
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="diabetesFamily"
                    checked={formData.diabetesFamily}
                    onChange={(e) => handleChange('diabetesFamily', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="diabetesFamily" className="ml-2 block text-sm text-gray-700">
                    Diabetes in immediate family
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="strokeFamily"
                    checked={formData.strokeFamily}
                    onChange={(e) => handleChange('strokeFamily', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="strokeFamily" className="ml-2 block text-sm text-gray-700">
                    Stroke in immediate family
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cancerFamily"
                    checked={formData.cancerFamily}
                    onChange={(e) => handleChange('cancerFamily', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="cancerFamily" className="ml-2 block text-sm text-gray-700">
                    Cancer in immediate family
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Current Medical Status
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications (comma-separated)
                </label>
                <textarea
                  value={formData.medications.join(', ')}
                  onChange={(e) => handleArrayChange('medications', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="e.g., Lisinopril, Metformin, Aspirin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chronic Conditions (comma-separated)
                </label>
                <textarea
                  value={formData.chronicConditions.join(', ')}
                  onChange={(e) => handleArrayChange('chronicConditions', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="e.g., Hypertension, Type 2 Diabetes, Arthritis"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Mental Health & Wellness */}
      {currentSection === 4 && (
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5" />
              Mental Health & Overall Wellness
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mental Health Status
                </label>
                <select
                  value={formData.mentalHealthStatus}
                  onChange={(e) => handleChange('mentalHealthStatus', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="poor">Poor (frequent anxiety/depression)</option>
                  <option value="fair">Fair (occasional stress/mood issues)</option>
                  <option value="good">Good (generally positive mood)</option>
                  <option value="excellent">Excellent (very positive mental health)</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Assessment Summary</h5>
                <p className="text-sm text-blue-700">
                  You've provided comprehensive health information across {sections.length} categories. 
                  This detailed data will help generate a more accurate and personalized health risk assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`px-6 py-2 rounded-lg font-semibold ${
            currentSection === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>

        {currentSection < sections.length - 1 ? (
          <button
            type="button"
            onClick={nextSection}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Generate Health Risk Assessment
          </button>
        )}
      </div>
    </form>
  );
};

export default HealthForm;
