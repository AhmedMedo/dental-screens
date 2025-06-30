import React, { useState } from 'react';
import { Heart, AlertTriangle, CheckCircle, Edit3, Save, X, Plus } from 'lucide-react';
import { OralHealthAssessment } from '../types/dental';

interface OralHealthAssessmentProps {
  assessment: OralHealthAssessment;
  onAssessmentUpdate: (assessment: OralHealthAssessment) => void;
}

export const OralHealthAssessmentComponent: React.FC<OralHealthAssessmentProps> = ({
  assessment,
  onAssessmentUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAssessment, setEditedAssessment] = useState(assessment);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-700 bg-green-100 border-green-200';
      case 'good': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'fair': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'poor': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const handleSave = () => {
    onAssessmentUpdate(editedAssessment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAssessment(assessment);
    setIsEditing(false);
  };

  const addIssue = () => {
    setEditedAssessment({
      ...editedAssessment,
      issues: [...editedAssessment.issues, '']
    });
  };

  const updateIssue = (index: number, value: string) => {
    const newIssues = [...editedAssessment.issues];
    newIssues[index] = value;
    setEditedAssessment({
      ...editedAssessment,
      issues: newIssues
    });
  };

  const removeIssue = (index: number) => {
    const newIssues = editedAssessment.issues.filter((_, i) => i !== index);
    setEditedAssessment({
      ...editedAssessment,
      issues: newIssues
    });
  };

  const addRiskFactor = () => {
    setEditedAssessment({
      ...editedAssessment,
      riskFactors: [...editedAssessment.riskFactors, '']
    });
  };

  const updateRiskFactor = (index: number, value: string) => {
    const newRiskFactors = [...editedAssessment.riskFactors];
    newRiskFactors[index] = value;
    setEditedAssessment({
      ...editedAssessment,
      riskFactors: newRiskFactors
    });
  };

  const removeRiskFactor = (index: number) => {
    const newRiskFactors = editedAssessment.riskFactors.filter((_, i) => i !== index);
    setEditedAssessment({
      ...editedAssessment,
      riskFactors: newRiskFactors
    });
  };

  const addRecommendation = () => {
    setEditedAssessment({
      ...editedAssessment,
      recommendations: [...editedAssessment.recommendations, '']
    });
  };

  const updateRecommendation = (index: number, value: string) => {
    const newRecommendations = [...editedAssessment.recommendations];
    newRecommendations[index] = value;
    setEditedAssessment({
      ...editedAssessment,
      recommendations: newRecommendations
    });
  };

  const removeRecommendation = (index: number) => {
    const newRecommendations = editedAssessment.recommendations.filter((_, i) => i !== index);
    setEditedAssessment({
      ...editedAssessment,
      recommendations: newRecommendations
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Oral Health Assessment
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </button>
        </div>

        <div className="space-y-6">
          {/* Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gum Health</label>
              {isEditing ? (
                <select
                  value={editedAssessment.gumHealth}
                  onChange={(e) => setEditedAssessment({
                    ...editedAssessment,
                    gumHealth: e.target.value as OralHealthAssessment['gumHealth']
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              ) : (
                <span className={`px-3 py-2 rounded-lg font-medium border ${getHealthColor(assessment.gumHealth)}`}>
                  {assessment.gumHealth.charAt(0).toUpperCase() + assessment.gumHealth.slice(1)}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Oral Hygiene</label>
              {isEditing ? (
                <select
                  value={editedAssessment.oralHygiene}
                  onChange={(e) => setEditedAssessment({
                    ...editedAssessment,
                    oralHygiene: e.target.value as OralHealthAssessment['oralHygiene']
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              ) : (
                <span className={`px-3 py-2 rounded-lg font-medium border ${getHealthColor(assessment.oralHygiene)}`}>
                  {assessment.oralHygiene.charAt(0).toUpperCase() + assessment.oralHygiene.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Issues */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Current Issues
              </label>
              {isEditing && (
                <button
                  onClick={addIssue}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Issue
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                {editedAssessment.issues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={issue}
                      onChange={(e) => updateIssue(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter issue..."
                    />
                    <button
                      onClick={() => removeIssue(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editedAssessment.issues.length === 0 && (
                  <p className="text-gray-500 text-sm italic py-2">No issues recorded</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {assessment.issues.length > 0 ? (
                  assessment.issues.map((issue, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                      {issue}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic py-2">No issues recorded</p>
                )}
              </div>
            )}
          </div>

          {/* Risk Factors */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Risk Factors</label>
              {isEditing && (
                <button
                  onClick={addRiskFactor}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Factor
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                {editedAssessment.riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={factor}
                      onChange={(e) => updateRiskFactor(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter risk factor..."
                    />
                    <button
                      onClick={() => removeRiskFactor(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editedAssessment.riskFactors.length === 0 && (
                  <p className="text-gray-500 text-sm italic py-2">No risk factors identified</p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {assessment.riskFactors.length > 0 ? (
                  assessment.riskFactors.map((factor, index) => (
                    <div key={index} className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg">
                      {factor}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic py-2">No risk factors identified</p>
                )}
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Recommendations
              </label>
              {isEditing && (
                <button
                  onClick={addRecommendation}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Recommendation
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                {editedAssessment.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={recommendation}
                      onChange={(e) => updateRecommendation(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter recommendation..."
                    />
                    <button
                      onClick={() => removeRecommendation(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editedAssessment.recommendations.length === 0 && (
                  <p className="text-gray-500 text-sm italic py-2">No recommendations added</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {assessment.recommendations.length > 0 ? (
                  assessment.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {recommendation}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic py-2">No recommendations added</p>
                )}
              </div>
            )}
          </div>

          {/* Save/Cancel buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                Save Assessment
              </button>
              <button
                onClick={handleCancel}
                className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};