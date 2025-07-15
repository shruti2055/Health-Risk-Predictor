import React from 'react';
import { AlertTriangle, Heart, Droplets, Scale, TrendingUp, TrendingDown, Activity, Brain, Shield, Target, Clock, Zap, Utensils, Moon } from 'lucide-react';

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

interface RiskLevel {
  level: 'low' | 'moderate' | 'high' | 'very-high';
  score: number;
  description: string;
}

interface SpecificRisk {
  type: string;
  level: 'low' | 'moderate' | 'high' | 'very-high';
  percentage: number;
  description: string;
}

interface RiskAssessmentProps {
  data: HealthData;
  onReset: () => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ data, onReset }) => {
  const calculateBMI = () => {
    const heightInMeters = data.height / 100;
    return data.weight / (heightInMeters * heightInMeters);
  };

  const getWaistToHeightRatio = () => {
    return data.waistCircumference / data.height;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-yellow-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const getBloodPressureCategory = () => {
    if (data.systolicBP < 120 && data.diastolicBP < 80) return { category: 'Normal', color: 'text-green-600' };
    if (data.systolicBP < 130 && data.diastolicBP < 80) return { category: 'Elevated', color: 'text-yellow-600' };
    if (data.systolicBP < 140 || data.diastolicBP < 90) return { category: 'High (Stage 1)', color: 'text-orange-600' };
    return { category: 'High (Stage 2)', color: 'text-red-600' };
  };

  const getGlucoseCategory = () => {
    if (data.glucose < 100) return { category: 'Normal', color: 'text-green-600' };
    if (data.glucose < 126) return { category: 'Pre-diabetes', color: 'text-yellow-600' };
    return { category: 'Diabetes', color: 'text-red-600' };
  };

  const getHbA1cCategory = () => {
    if (data.hba1c < 5.7) return { category: 'Normal', color: 'text-green-600' };
    if (data.hba1c < 6.5) return { category: 'Pre-diabetes', color: 'text-yellow-600' };
    return { category: 'Diabetes', color: 'text-red-600' };
  };

  const getCholesterolCategory = () => {
    if (data.cholesterol < 200) return { category: 'Desirable', color: 'text-green-600' };
    if (data.cholesterol < 240) return { category: 'Borderline High', color: 'text-yellow-600' };
    return { category: 'High', color: 'text-red-600' };
  };

  const getHDLCategory = () => {
    const threshold = data.gender === 'male' ? 40 : 50;
    if (data.hdlCholesterol >= 60) return { category: 'High (Protective)', color: 'text-green-600' };
    if (data.hdlCholesterol >= threshold) return { category: 'Normal', color: 'text-green-600' };
    return { category: 'Low (Risk Factor)', color: 'text-red-600' };
  };

  const getLDLCategory = () => {
    if (data.ldlCholesterol < 100) return { category: 'Optimal', color: 'text-green-600' };
    if (data.ldlCholesterol < 130) return { category: 'Near Optimal', color: 'text-yellow-600' };
    if (data.ldlCholesterol < 160) return { category: 'Borderline High', color: 'text-orange-600' };
    return { category: 'High', color: 'text-red-600' };
  };

  const getTriglyceridesCategory = () => {
    if (data.triglycerides < 150) return { category: 'Normal', color: 'text-green-600' };
    if (data.triglycerides < 200) return { category: 'Borderline High', color: 'text-yellow-600' };
    if (data.triglycerides < 500) return { category: 'High', color: 'text-orange-600' };
    return { category: 'Very High', color: 'text-red-600' };
  };

  const getHeartRateCategory = () => {
    if (data.restingHeartRate < 60) return { category: 'Low (Athletic)', color: 'text-green-600' };
    if (data.restingHeartRate <= 100) return { category: 'Normal', color: 'text-green-600' };
    return { category: 'High', color: 'text-red-600' };
  };

  const calculateSpecificRisks = (): SpecificRisk[] => {
    const risks: SpecificRisk[] = [];

    // Cardiovascular Risk
    let cvdScore = 0;
    if (data.age > 65) cvdScore += 25;
    else if (data.age > 50) cvdScore += 15;
    else if (data.age > 35) cvdScore += 8;
    
    if (data.gender === 'male') cvdScore += 8;
    if (data.systolicBP >= 140 || data.diastolicBP >= 90) cvdScore += 20;
    else if (data.systolicBP >= 130) cvdScore += 12;
    
    if (data.cholesterol >= 240) cvdScore += 15;
    if (data.hdlCholesterol < (data.gender === 'male' ? 40 : 50)) cvdScore += 10;
    if (data.ldlCholesterol >= 160) cvdScore += 12;
    
    if (data.smokingStatus === 'current') cvdScore += 20;
    else if (data.smokingStatus === 'former') cvdScore += 8;
    
    const bmi = calculateBMI();
    if (bmi >= 30) cvdScore += 15;
    else if (bmi >= 25) cvdScore += 8;
    
    if (data.heartDiseaseFamily) cvdScore += 12;
    if (data.exerciseFrequency === 'none') cvdScore += 10;
    if (data.stressLevel === 'very-high') cvdScore += 8;

    const cvdPercentage = Math.min(cvdScore * 1.2, 85);
    risks.push({
      type: 'Cardiovascular Disease',
      level: cvdScore <= 30 ? 'low' : cvdScore <= 60 ? 'moderate' : cvdScore <= 90 ? 'high' : 'very-high',
      percentage: cvdPercentage,
      description: `${cvdPercentage.toFixed(0)}% 10-year risk based on current factors`
    });

    // Diabetes Risk
    let diabetesScore = 0;
    if (data.age > 65) diabetesScore += 20;
    else if (data.age > 45) diabetesScore += 12;
    
    if (bmi >= 30) diabetesScore += 25;
    else if (bmi >= 25) diabetesScore += 15;
    
    if (data.glucose >= 126) diabetesScore += 40;
    else if (data.glucose >= 100) diabetesScore += 20;
    
    if (data.hba1c >= 6.5) diabetesScore += 40;
    else if (data.hba1c >= 5.7) diabetesScore += 20;
    
    if (data.diabetesFamily) diabetesScore += 15;
    if (getWaistToHeightRatio() > 0.5) diabetesScore += 10;
    if (data.exerciseFrequency === 'none') diabetesScore += 8;

    const diabetesPercentage = Math.min(diabetesScore * 0.8, 75);
    risks.push({
      type: 'Type 2 Diabetes',
      level: diabetesScore <= 25 ? 'low' : diabetesScore <= 50 ? 'moderate' : diabetesScore <= 75 ? 'high' : 'very-high',
      percentage: diabetesPercentage,
      description: `${diabetesPercentage.toFixed(0)}% 10-year risk based on current factors`
    });

    // Stroke Risk
    let strokeScore = 0;
    if (data.age > 75) strokeScore += 25;
    else if (data.age > 65) strokeScore += 18;
    else if (data.age > 55) strokeScore += 10;
    
    if (data.systolicBP >= 160) strokeScore += 25;
    else if (data.systolicBP >= 140) strokeScore += 15;
    
    if (data.smokingStatus === 'current') strokeScore += 20;
    if (data.heartDiseaseFamily || data.strokeFamily) strokeScore += 12;
    if (data.diabetesFamily && data.glucose >= 100) strokeScore += 10;

    const strokePercentage = Math.min(strokeScore * 0.6, 60);
    risks.push({
      type: 'Stroke',
      level: strokeScore <= 20 ? 'low' : strokeScore <= 40 ? 'moderate' : strokeScore <= 60 ? 'high' : 'very-high',
      percentage: strokePercentage,
      description: `${strokePercentage.toFixed(0)}% 10-year risk based on current factors`
    });

    // Metabolic Syndrome Risk
    let metSynScore = 0;
    if (getWaistToHeightRatio() > 0.5) metSynScore += 20;
    if (data.triglycerides >= 150) metSynScore += 15;
    if (data.hdlCholesterol < (data.gender === 'male' ? 40 : 50)) metSynScore += 15;
    if (data.systolicBP >= 130 || data.diastolicBP >= 85) metSynScore += 15;
    if (data.glucose >= 100) metSynScore += 15;

    const metSynPercentage = Math.min(metSynScore * 1.1, 80);
    risks.push({
      type: 'Metabolic Syndrome',
      level: metSynScore <= 20 ? 'low' : metSynScore <= 40 ? 'moderate' : metSynScore <= 60 ? 'high' : 'very-high',
      percentage: metSynPercentage,
      description: `${metSynPercentage.toFixed(0)}% current risk based on metabolic factors`
    });

    return risks;
  };

  const calculateOverallRisk = (): RiskLevel => {
    let riskScore = 0;
    
    // Age factor (0-35 points)
    if (data.age > 75) riskScore += 35;
    else if (data.age > 65) riskScore += 28;
    else if (data.age > 55) riskScore += 20;
    else if (data.age > 45) riskScore += 12;
    else if (data.age > 35) riskScore += 6;
    
    // Gender factor (0-10 points)
    if (data.gender === 'male') riskScore += 10;
    
    // BMI and body composition (0-30 points)
    const bmi = calculateBMI();
    const waistToHeight = getWaistToHeightRatio();
    if (bmi >= 35) riskScore += 30;
    else if (bmi >= 30) riskScore += 22;
    else if (bmi >= 25) riskScore += 12;
    
    if (waistToHeight > 0.6) riskScore += 8;
    else if (waistToHeight > 0.5) riskScore += 4;
    
    // Cardiovascular factors (0-40 points)
    if (data.systolicBP >= 160 || data.diastolicBP >= 100) riskScore += 25;
    else if (data.systolicBP >= 140 || data.diastolicBP >= 90) riskScore += 18;
    else if (data.systolicBP >= 130 || data.diastolicBP >= 80) riskScore += 10;
    
    if (data.restingHeartRate > 100) riskScore += 8;
    else if (data.restingHeartRate > 80) riskScore += 4;
    
    // Metabolic factors (0-45 points)
    if (data.glucose >= 126) riskScore += 25;
    else if (data.glucose >= 100) riskScore += 12;
    
    if (data.hba1c >= 6.5) riskScore += 20;
    else if (data.hba1c >= 5.7) riskScore += 10;
    
    // Lipid profile (0-35 points)
    if (data.cholesterol >= 240) riskScore += 15;
    else if (data.cholesterol >= 200) riskScore += 8;
    
    if (data.hdlCholesterol < (data.gender === 'male' ? 40 : 50)) riskScore += 10;
    if (data.ldlCholesterol >= 160) riskScore += 12;
    else if (data.ldlCholesterol >= 130) riskScore += 6;
    
    if (data.triglycerides >= 200) riskScore += 8;
    else if (data.triglycerides >= 150) riskScore += 4;
    
    // Lifestyle factors (0-50 points)
    if (data.smokingStatus === 'current') {
      riskScore += 25;
      if (data.cigarettesPerDay > 20) riskScore += 10;
      if (data.smokingYears > 20) riskScore += 8;
    } else if (data.smokingStatus === 'former') {
      riskScore += 8;
    }
    
    if (data.exerciseFrequency === 'none') riskScore += 15;
    else if (data.exerciseFrequency === 'low') riskScore += 8;
    else if (data.exerciseFrequency === 'high' && data.exerciseIntensity === 'vigorous') riskScore -= 5;
    
    if (data.alcoholConsumption === 'heavy') riskScore += 12;
    else if (data.alcoholConsumption === 'moderate') riskScore += 4;
    
    // Sleep and stress (0-20 points)
    if (data.sleepHours < 6 || data.sleepHours > 9) riskScore += 6;
    if (data.sleepQuality === 'poor') riskScore += 8;
    else if (data.sleepQuality === 'fair') riskScore += 4;
    
    if (data.stressLevel === 'very-high') riskScore += 12;
    else if (data.stressLevel === 'high') riskScore += 8;
    else if (data.stressLevel === 'moderate') riskScore += 3;
    
    // Diet and hydration (0-15 points)
    if (data.dietQuality === 'poor') riskScore += 12;
    else if (data.dietQuality === 'fair') riskScore += 6;
    else if (data.dietQuality === 'excellent') riskScore -= 3;
    
    if (data.waterIntake < 6) riskScore += 3;
    
    // Family history (0-25 points)
    if (data.heartDiseaseFamily) riskScore += 12;
    if (data.diabetesFamily) riskScore += 10;
    if (data.strokeFamily) riskScore += 8;
    if (data.cancerFamily) riskScore += 5;
    
    // Mental health (0-15 points)
    if (data.mentalHealthStatus === 'poor') riskScore += 15;
    else if (data.mentalHealthStatus === 'fair') riskScore += 8;
    else if (data.mentalHealthStatus === 'excellent') riskScore -= 3;
    
    // Medical care (0-10 points)
    if (data.lastCheckup === 'more-than-2-years') riskScore += 10;
    else if (data.lastCheckup === '1-2-years') riskScore += 5;
    
    // Chronic conditions and medications
    riskScore += data.chronicConditions.length * 8;
    riskScore += data.medications.length * 3;
    
    if (riskScore <= 60) return { level: 'low', score: riskScore, description: 'Low risk - Excellent health profile!' };
    if (riskScore <= 120) return { level: 'moderate', score: riskScore, description: 'Moderate risk - Some areas for improvement' };
    if (riskScore <= 180) return { level: 'high', score: riskScore, description: 'High risk - Important to address key factors' };
    return { level: 'very-high', score: riskScore, description: 'Very high risk - Immediate attention recommended' };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'very-high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPersonalizedRecommendations = () => {
    const recommendations = [];
    const bmi = calculateBMI();
    
    // Weight management
    if (bmi >= 25) {
      recommendations.push({
        category: 'Weight Management',
        icon: Scale,
        priority: 'high',
        text: `Your BMI is ${bmi.toFixed(1)}. Aim to lose 5-10% of body weight through diet and exercise.`
      });
    }
    
    // Blood pressure
    if (data.systolicBP >= 130 || data.diastolicBP >= 80) {
      recommendations.push({
        category: 'Blood Pressure',
        icon: Heart,
        priority: 'high',
        text: 'Monitor blood pressure daily, reduce sodium intake, and consider DASH diet principles.'
      });
    }
    
    // Glucose/Diabetes
    if (data.glucose >= 100 || data.hba1c >= 5.7) {
      recommendations.push({
        category: 'Blood Sugar',
        icon: Droplets,
        priority: 'high',
        text: 'Focus on low glycemic index foods, regular meal timing, and post-meal walks.'
      });
    }
    
    // Exercise
    if (data.exerciseFrequency === 'none' || data.exerciseFrequency === 'low') {
      recommendations.push({
        category: 'Physical Activity',
        icon: Activity,
        priority: 'high',
        text: 'Aim for 150 minutes of moderate exercise weekly. Start with 10-minute walks after meals.'
      });
    }
    
    // Smoking
    if (data.smokingStatus === 'current') {
      recommendations.push({
        category: 'Smoking Cessation',
        icon: Target,
        priority: 'critical',
        text: 'Quitting smoking is the single most important step for your health. Consider nicotine replacement therapy.'
      });
    }
    
    // Sleep
    if (data.sleepHours < 7 || data.sleepQuality === 'poor') {
      recommendations.push({
        category: 'Sleep Quality',
        icon: Moon,
        priority: 'medium',
        text: 'Aim for 7-9 hours of quality sleep. Maintain consistent sleep schedule and create a relaxing bedtime routine.'
      });
    }
    
    // Stress
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
      recommendations.push({
        category: 'Stress Management',
        icon: Brain,
        priority: 'medium',
        text: 'Practice stress reduction techniques like meditation, deep breathing, or yoga for 10-15 minutes daily.'
      });
    }
    
    // Diet
    if (data.dietQuality === 'poor' || data.dietQuality === 'fair') {
      recommendations.push({
        category: 'Nutrition',
        icon: Utensils,
        priority: 'medium',
        text: 'Focus on whole foods: fruits, vegetables, lean proteins, and whole grains. Limit processed foods.'
      });
    }
    
    // Checkups
    if (data.lastCheckup === '1-2-years' || data.lastCheckup === 'more-than-2-years') {
      recommendations.push({
        category: 'Medical Care',
        icon: Clock,
        priority: 'medium',
        text: 'Schedule regular checkups and screenings appropriate for your age and risk factors.'
      });
    }
    
    return recommendations;
  };

  const bmi = calculateBMI();
  const waistToHeight = getWaistToHeightRatio();
  const bmiCategory = getBMICategory(bmi);
  const bpCategory = getBloodPressureCategory();
  const glucoseCategory = getGlucoseCategory();
  const hba1cCategory = getHbA1cCategory();
  const cholesterolCategory = getCholesterolCategory();
  const hdlCategory = getHDLCategory();
  const ldlCategory = getLDLCategory();
  const triglyceridesCategory = getTriglyceridesCategory();
  const heartRateCategory = getHeartRateCategory();
  const overallRisk = calculateOverallRisk();
  const specificRisks = calculateSpecificRisks();
  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="space-y-8">
      {/* Overall Risk Assessment */}
      <div className={`p-6 rounded-xl border-2 ${getRiskColor(overallRisk.level)}`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Overall Health Risk Assessment</h2>
            <p className="text-sm opacity-80">Comprehensive Risk Score: {overallRisk.score}/300</p>
          </div>
        </div>
        <p className="text-lg font-semibold mb-2">{overallRisk.level.toUpperCase().replace('-', ' ')} RISK</p>
        <p className="text-sm mb-4">{overallRisk.description}</p>
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Low (0-60)</span>
            <span>Moderate (61-120)</span>
            <span>High (121-180)</span>
            <span>Very High (181+)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                overallRisk.level === 'low' ? 'bg-green-500' :
                overallRisk.level === 'moderate' ? 'bg-yellow-500' :
                overallRisk.level === 'high' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((overallRisk.score / 300) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Specific Disease Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specificRisks.map((risk, index) => (
          <div key={index} className={`p-6 rounded-xl border-2 ${getRiskColor(risk.level)}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white bg-opacity-50 rounded-lg">
                {risk.type === 'Cardiovascular Disease' && <Heart className="w-5 h-5" />}
                {risk.type === 'Type 2 Diabetes' && <Droplets className="w-5 h-5" />}
                {risk.type === 'Stroke' && <Brain className="w-5 h-5" />}
                {risk.type === 'Metabolic Syndrome' && <Zap className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-semibold">{risk.type}</h3>
            </div>
            <div className="text-2xl font-bold mb-1">{risk.level.toUpperCase().replace('-', ' ')}</div>
            <p className="text-sm opacity-90">{risk.description}</p>
          </div>
        ))}
      </div>

      {/* Detailed Health Metrics */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          Detailed Health Metrics Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* BMI & Body Composition */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Body Composition
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">BMI:</span>
                <span className={`text-sm font-medium ${bmiCategory.color}`}>
                  {bmi.toFixed(1)} ({bmiCategory.category})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Waist-to-Height:</span>
                <span className={`text-sm font-medium ${waistToHeight > 0.5 ? 'text-red-600' : 'text-green-600'}`}>
                  {waistToHeight.toFixed(2)} {waistToHeight > 0.5 ? '(High Risk)' : '(Normal)'}
                </span>
              </div>
            </div>
          </div>

          {/* Cardiovascular */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Cardiovascular
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Blood Pressure:</span>
                <span className={`text-sm font-medium ${bpCategory.color}`}>
                  {data.systolicBP}/{data.diastolicBP}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resting HR:</span>
                <span className={`text-sm font-medium ${heartRateCategory.color}`}>
                  {data.restingHeartRate} bpm
                </span>
              </div>
            </div>
          </div>

          {/* Metabolic */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Metabolic Health
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Glucose:</span>
                <span className={`text-sm font-medium ${glucoseCategory.color}`}>
                  {data.glucose} mg/dL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">HbA1c:</span>
                <span className={`text-sm font-medium ${hba1cCategory.color}`}>
                  {data.hba1c}%
                </span>
              </div>
            </div>
          </div>

          {/* Lipid Profile */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Lipid Profile
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Chol:</span>
                <span className={`text-sm font-medium ${cholesterolCategory.color}`}>
                  {data.cholesterol} mg/dL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">HDL:</span>
                <span className={`text-sm font-medium ${hdlCategory.color}`}>
                  {data.hdlCholesterol} mg/dL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">LDL:</span>
                <span className={`text-sm font-medium ${ldlCategory.color}`}>
                  {data.ldlCholesterol} mg/dL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Triglycerides:</span>
                <span className={`text-sm font-medium ${triglyceridesCategory.color}`}>
                  {data.triglycerides} mg/dL
                </span>
              </div>
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Lifestyle
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Exercise:</span>
                <span className={`text-sm font-medium ${
                  data.exerciseFrequency === 'high' ? 'text-green-600' :
                  data.exerciseFrequency === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.exerciseFrequency.charAt(0).toUpperCase() + data.exerciseFrequency.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sleep:</span>
                <span className={`text-sm font-medium ${
                  data.sleepQuality === 'excellent' || data.sleepQuality === 'good' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.sleepHours}h ({data.sleepQuality})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Stress:</span>
                <span className={`text-sm font-medium ${
                  data.stressLevel === 'low' ? 'text-green-600' :
                  data.stressLevel === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.stressLevel.charAt(0).toUpperCase() + data.stressLevel.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Risk Factors
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Smoking:</span>
                <span className={`text-sm font-medium ${
                  data.smokingStatus === 'never' ? 'text-green-600' :
                  data.smokingStatus === 'former' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.smokingStatus.charAt(0).toUpperCase() + data.smokingStatus.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Family History:</span>
                <span className={`text-sm font-medium ${
                  !data.heartDiseaseFamily && !data.diabetesFamily && !data.strokeFamily ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.heartDiseaseFamily || data.diabetesFamily || data.strokeFamily ? 'Present' : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-600" />
          Personalized Health Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                rec.priority === 'critical' ? 'border-red-500 bg-red-50' :
                rec.priority === 'high' ? 'border-orange-500 bg-orange-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    rec.priority === 'critical' ? 'bg-red-100' :
                    rec.priority === 'high' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      rec.priority === 'critical' ? 'text-red-600' :
                      rec.priority === 'high' ? 'text-orange-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{rec.category}</h4>
                    <p className="text-sm text-gray-700">{rec.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Health Summary & Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
            <ul className="space-y-1 text-gray-700">
              {data.smokingStatus === 'never' && <li>• Non-smoker</li>}
              {data.exerciseFrequency === 'high' && <li>• Regular exercise</li>}
              {data.sleepQuality === 'excellent' || data.sleepQuality === 'good' && <li>• Good sleep quality</li>}
              {data.dietQuality === 'excellent' || data.dietQuality === 'good' && <li>• Healthy diet</li>}
              {data.stressLevel === 'low' && <li>• Low stress levels</li>}
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-orange-700 mb-2">Areas to Monitor</h4>
            <ul className="space-y-1 text-gray-700">
              {bmi >= 25 && <li>• Weight management</li>}
              {data.systolicBP >= 130 && <li>• Blood pressure</li>}
              {data.glucose >= 100 && <li>• Blood sugar levels</li>}
              {data.cholesterol >= 200 && <li>• Cholesterol levels</li>}
              {data.stressLevel === 'high' || data.stressLevel === 'very-high' && <li>• Stress management</li>}
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Immediate Actions</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Schedule doctor visit</li>
              <li>• Start health tracking</li>
              <li>• Set realistic goals</li>
              <li>• Build support system</li>
              <li>• Regular monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Important Medical Disclaimer</h4>
            <p className="text-sm text-yellow-800">
              This comprehensive assessment is for educational and informational purposes only and should not replace professional medical advice, 
              diagnosis, or treatment. The risk calculations are based on general population data and may not account for all individual factors. 
              Always consult with qualified healthcare providers for personalized medical guidance, especially if you have concerning symptoms or 
              high-risk results. Regular medical checkups and professional health screenings are essential for maintaining optimal health.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105"
      >
        Take New Comprehensive Assessment
      </button>
    </div>
  );
};

export default RiskAssessment;
