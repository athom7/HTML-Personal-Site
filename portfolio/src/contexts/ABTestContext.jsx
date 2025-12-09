import { createContext, useContext, useState, useEffect } from 'react';
import { initSession, trackEvent } from '../utils/analytics';

const ABTestContext = createContext();

// Available variants
export const VARIANTS = {
  BLUE: 'blue',
  PURPLE: 'purple'
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
  [VARIANTS.PURPLE]: {
    name: 'Playful Purple',
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    gradient: 'from-purple-600 to-pink-600',
    hover: 'hover:bg-purple-700',
    text: 'text-purple-600',
    bg: 'bg-purple-600'
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
