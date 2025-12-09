import { createContext, useContext, useState, useEffect } from 'react';
import { initSession, trackEvent } from '../utils/analytics';

const ABTestContext = createContext();

// Available variants
export const VARIANTS = {
  BLUE: 'blue',
  INDIGO: 'indigo'
};

// Color schemes for each variant
export const COLOR_SCHEMES = {
  [VARIANTS.BLUE]: {
    name: 'Deep Blue',
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gradient: 'from-blue-600 to-cyan-600',
    hover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    bg: 'bg-blue-600'
  },
  [VARIANTS.INDIGO]: {
    name: 'Corporate Indigo',
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    gradient: 'from-indigo-600 to-purple-700',
    hover: 'hover:bg-indigo-700',
    text: 'text-indigo-600',
    bg: 'bg-indigo-600'
  }
};

export const ABTestProvider = ({ children }) => {
  const [variant, setVariant] = useState(null);
  const [colorScheme, setColorScheme] = useState(null);

  useEffect(() => {
    // Check if user already has a variant assigned
    let assignedVariant = localStorage.getItem('ab_test_variant');

    if (!assignedVariant) {
      // Randomly assign a variant (50/50 split)
      const variants = Object.values(VARIANTS);
      assignedVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem('ab_test_variant', assignedVariant);

      // Track the assignment
      trackEvent('ab_test_assigned', { variant: assignedVariant });
    }

    setVariant(assignedVariant);
    setColorScheme(COLOR_SCHEMES[assignedVariant]);

    // Initialize analytics session with variant
    initSession(assignedVariant);
  }, []);

  const switchVariant = (newVariant) => {
    if (VARIANTS[newVariant.toUpperCase()]) {
      localStorage.setItem('ab_test_variant', newVariant);
      setVariant(newVariant);
      setColorScheme(COLOR_SCHEMES[newVariant]);
      trackEvent('ab_test_manual_switch', { variant: newVariant });

      // Reload to apply changes throughout the app
      window.location.reload();
    }
  };

  return (
    <ABTestContext.Provider value={{ variant, colorScheme, switchVariant }}>
      {children}
    </ABTestContext.Provider>
  );
};

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }
  return context;
};
