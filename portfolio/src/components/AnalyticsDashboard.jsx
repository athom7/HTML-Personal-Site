import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChartBar, HiX, HiDownload, HiRefresh } from 'react-icons/hi';
import { getAnalyticsSummary, exportAnalyticsData } from '../utils/analytics';
import { useABTest } from '../contexts/ABTestContext';

const AnalyticsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const { variant, switchVariant } = useABTest();

  const loadAnalytics = () => {
    const summary = getAnalyticsSummary();
    setAnalytics(summary);
  };

  useEffect(() => {
    if (isOpen) {
      loadAnalytics();
    }
  }, [isOpen]);

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleExport = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${Date.now()}.json`;
    a.click();
  };

  const handleVariantSwitch = () => {
    const newVariant = variant === 'blue' ? 'indigo' : 'blue';
    switchVariant(newVariant);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        title="View Analytics"
      >
        <HiChartBar size={24} />
      </motion.button>

      {/* Dashboard Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Dashboard Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-slate-900 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <HiChartBar className="text-cyan-400" />
                    Analytics Dashboard
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadAnalytics}
                      className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                      title="Refresh"
                    >
                      <HiRefresh size={20} />
                    </button>
                    <button
                      onClick={handleExport}
                      className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                      title="Export Data"
                    >
                      <HiDownload size={20} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <HiX size={20} />
                    </button>
                  </div>
                </div>

                {analytics && (
                  <div className="space-y-6">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-slate-400">Total Visits</div>
                        <div className="text-3xl font-bold text-white">{analytics.totalVisits}</div>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-slate-400">Total Sessions</div>
                        <div className="text-3xl font-bold text-white">{analytics.totalSessions}</div>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-slate-400">Last 7 Days</div>
                        <div className="text-3xl font-bold text-cyan-400">{analytics.last7DaysSessions}</div>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-slate-400">Avg. Duration</div>
                        <div className="text-3xl font-bold text-cyan-400">
                          {formatDuration(analytics.averageSessionDuration)}
                        </div>
                      </div>
                    </div>

                    {/* Current A/B Test Variant */}
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-white">Current Variant</h3>
                        <button
                          onClick={handleVariantSwitch}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600 transition-colors"
                        >
                          Switch to {variant === 'blue' ? 'Indigo' : 'Blue'}
                        </button>
                      </div>
                      <div className="text-2xl font-bold text-cyan-400 capitalize">{variant}</div>
                      <div className="text-sm text-slate-400 mt-1">
                        You are currently seeing the {variant} color scheme
                      </div>
                    </div>

                    {/* A/B Test Results */}
                    {Object.keys(analytics.variantStats).length > 0 && (
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">A/B Test Results</h3>
                        <div className="space-y-4">
                          {Object.entries(analytics.variantStats).map(([variantName, stats]) => (
                            <div key={variantName} className="border-l-4 border-cyan-500 pl-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="text-lg font-semibold text-white capitalize">
                                  {variantName}
                                </div>
                                <div className="text-sm text-slate-400">{stats.sessions} sessions</div>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <div className="text-slate-400">Avg. Duration</div>
                                  <div className="text-cyan-400 font-semibold">
                                    {formatDuration(Math.round(stats.avgDuration))}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-slate-400">Avg. Sections</div>
                                  <div className="text-cyan-400 font-semibold">
                                    {stats.avgSections.toFixed(1)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section Popularity */}
                    {Object.keys(analytics.sectionPopularity).length > 0 && (
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Section Popularity</h3>
                        <div className="space-y-2">
                          {Object.entries(analytics.sectionPopularity)
                            .sort(([, a], [, b]) => b - a)
                            .map(([section, count]) => {
                              const maxCount = Math.max(...Object.values(analytics.sectionPopularity));
                              const percentage = (count / maxCount) * 100;
                              return (
                                <div key={section}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300 capitalize">{section}</span>
                                    <span className="text-slate-400">{count} visits</span>
                                  </div>
                                  <div className="w-full bg-slate-700 rounded-full h-2">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Info */}
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-sm text-slate-400">
                        <p className="mb-2">
                          <strong className="text-slate-300">Privacy-first analytics:</strong> All data is stored locally in your browser.
                          No external tracking or data collection.
                        </p>
                        <p>
                          Use the export button to download your analytics data as JSON.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnalyticsDashboard;
