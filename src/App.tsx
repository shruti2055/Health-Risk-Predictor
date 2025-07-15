import React, { useState } from 'react';
import { Activity, Heart, Shield } from 'lucide-react';
import HealthForm from './components/HealthForm';
import RiskAssessment from './components/RiskAssessment';

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

function App() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: HealthData) => {
    setHealthData(data);
    setShowResults(true);
  };

  const handleReset = () => {
    setHealthData(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
              <Heart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Advanced Health Risk Predictor</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get a comprehensive assessment of your health risks based on detailed medical indicators, lifestyle factors, 
            family history, and personal health data. Take control of your health with personalized insights and recommendations.
          </p>
        </div>

        {/* Features */}
        {!showResults && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Analysis</h3>
              <p className="text-sm text-gray-600">
                Analyze 25+ health metrics including cardiovascular, metabolic, lifestyle, and mental health factors
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-sm text-gray-600">
                Get tailored health advice based on your specific risk factors, lifestyle, and medical history
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Risk Assessment</h3>
              <p className="text-sm text-gray-600">
                Evaluate cardiovascular, diabetes, stroke, and overall health risks with detailed breakdowns
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!showResults ? (
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Comprehensive Health Assessment Form</h2>
                <p className="text-gray-600">
                  Please fill in your detailed health information below. All data is processed locally and never stored. 
                  The more accurate information you provide, the better your risk assessment will be.
                </p>
              </div>
              <HealthForm onSubmit={handleFormSubmit} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Comprehensive Health Risk Assessment</h2>
                <p className="text-gray-600">
                  Based on your detailed health information, here's your personalized multi-factor health risk analysis.
                </p>
              </div>
              {healthData && <RiskAssessment data={healthData} onReset={handleReset} />}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Built with modern web technologies • For educational purposes only • 
            Always consult healthcare professionals for medical advice • Data processed locally and never stored
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
