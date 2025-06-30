import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, DollarSign, Plus, Edit, CheckCircle, X } from 'lucide-react';
import { TreatmentPlan } from '../types/dental';

interface TreatmentPlanProps {
  treatmentPlans: TreatmentPlan[];
  onPlanUpdate: (plan: TreatmentPlan) => void;
  onPlanAdd: (plan: TreatmentPlan) => void;
}

export const TreatmentPlanComponent: React.FC<TreatmentPlanProps> = ({
  treatmentPlans,
  onPlanUpdate,
  onPlanAdd,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<TreatmentPlan>>({
    title: '',
    stage: 'pre-op',
    procedures: [],
    estimatedCost: 0,
    startDate: '',
    estimatedCompletion: '',
  });

  const activePlan = treatmentPlans.find(plan => plan.stage !== 'completed') || treatmentPlans[0];

  const getStageColor = (stage: TreatmentPlan['stage']) => {
    switch (stage) {
      case 'pre-op': return 'bg-yellow-100 text-yellow-800';
      case 'procedure': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageProgress = (stage: TreatmentPlan['stage']) => {
    switch (stage) {
      case 'pre-op': return 25;
      case 'procedure': return 50;
      case 'follow-up': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const handleAddPlan = () => {
    if (newPlan.title && newPlan.startDate) {
      onPlanAdd({
        id: Date.now().toString(),
        title: newPlan.title,
        stage: newPlan.stage || 'pre-op',
        procedures: newPlan.procedures || [],
        estimatedCost: newPlan.estimatedCost || 0,
        startDate: newPlan.startDate,
        estimatedCompletion: newPlan.estimatedCompletion || '',
      });
      setNewPlan({
        title: '',
        stage: 'pre-op',
        procedures: [],
        estimatedCost: 0,
        startDate: '',
        estimatedCompletion: '',
      });
      setShowAddModal(false);
    }
  };

  const handleStageUpdate = (planId: string, newStage: TreatmentPlan['stage']) => {
    const plan = treatmentPlans.find(p => p.id === planId);
    if (plan) {
      onPlanUpdate({ ...plan, stage: newStage });
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setNewPlan({
      title: '',
      stage: 'pre-op',
      procedures: [],
      estimatedCost: 0,
      startDate: '',
      estimatedCompletion: '',
    });
  };

  const handleNewPlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('New Plan button clicked'); // Debug log
    setShowAddModal(true);
  };

  // Modal component
  const Modal = () => {
    if (!showAddModal) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Create Treatment Plan</h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Title *</label>
              <input
                type="text"
                value={newPlan.title}
                onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Root Canal Treatment, Comprehensive Restoration"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={newPlan.startDate}
                  onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Completion</label>
                <input
                  type="date"
                  value={newPlan.estimatedCompletion}
                  onChange={(e) => setNewPlan({ ...newPlan, estimatedCompletion: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Cost ($)</label>
              <input
                type="number"
                value={newPlan.estimatedCost}
                onChange={(e) => setNewPlan({ ...newPlan, estimatedCost: parseFloat(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Procedures</label>
              <textarea
                value={newPlan.procedures?.join('\n')}
                onChange={(e) => setNewPlan({
                  ...newPlan,
                  procedures: e.target.value.split('\n').filter(p => p.trim())
                })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter each procedure on a new line:&#10;• Root canal therapy&#10;• Crown placement&#10;• Follow-up examination"
              />
              <p className="text-xs text-gray-500 mt-1">Enter each procedure on a new line</p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={handleAddPlan}
                disabled={!newPlan.title || !newPlan.startDate}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Create Treatment Plan
              </button>
              <button
                onClick={closeModal}
                className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Treatment Plan</h2>
          <button
            onClick={handleNewPlanClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
          >
            <Plus className="w-4 h-4" />
            New Plan
          </button>
        </div>

        {activePlan ? (
          <div className="space-y-6">
            {/* Current Treatment */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">{activePlan.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(activePlan.stage)}`}>
                  {activePlan.stage.charAt(0).toUpperCase() + activePlan.stage.slice(1).replace('-', ' ')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{getStageProgress(activePlan.stage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${getStageProgress(activePlan.stage)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stage Timeline */}
              <div className="relative">
                <div className="flex justify-between items-center">
                  {(['pre-op', 'procedure', 'follow-up', 'completed'] as const).map((stage, index) => {
                    const isActive = stage === activePlan.stage;
                    const isCompleted = getStageProgress(stage) <= getStageProgress(activePlan.stage);
                    
                    return (
                      <div key={stage} className="flex flex-col items-center relative">
                        <button
                          onClick={() => handleStageUpdate(activePlan.id, stage)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isCompleted
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-300 text-gray-500 hover:bg-gray-400'
                          } ${isActive ? 'ring-4 ring-blue-200 scale-110' : 'hover:scale-105'}`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </button>
                        <span className="text-xs text-gray-600 mt-1 capitalize font-medium">
                          {stage.replace('-', ' ')}
                        </span>
                        {index < 3 && (
                          <div
                            className={`absolute top-4 left-8 w-16 h-0.5 transition-colors duration-300 ${
                              getStageProgress(stage) < getStageProgress(activePlan.stage)
                                ? 'bg-blue-600'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Treatment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Timeline
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Start: {new Date(activePlan.startDate).toLocaleDateString()}</p>
                  {activePlan.estimatedCompletion && (
                    <p>Est. Completion: {new Date(activePlan.estimatedCompletion).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Cost Estimate
                </h4>
                <p className="text-lg font-semibold text-green-600">
                  ${activePlan.estimatedCost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Procedures */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Planned Procedures</h4>
              <div className="space-y-2">
                {activePlan.procedures.map((procedure, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{procedure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No active treatment plan</p>
            <p className="text-sm">Click "New Plan" to create one</p>
          </div>
        )}
      </div>

      {/* Render Modal */}
      <Modal />
    </>
  );
};