import { useABTest } from '../contexts/ABTestContext';
import { VARIANTS } from '../contexts/ABTestContext';

/**
 * Hook to get dynamic color classes based on the current A/B test variant
 */
export const useThemeColors = () => {
  const { variant, colorScheme } = useABTest();

  if (!variant || !colorScheme) {
    // Return default blue theme
    return {
      variant: VARIANTS.BLUE,
      gradient: 'from-cyan-500 to-blue-600',
      gradientHover: 'hover:shadow-cyan-500/50',
      text: 'text-cyan-400',
      textHover: 'hover:text-cyan-300',
      border: 'border-cyan-500',
      bgPrimary: 'bg-cyan-500',
      bgGlow: 'bg-cyan-500/10',
      colorScheme
    };
  }

  // Map variants to color classes
  const colors = {
    [VARIANTS.BLUE]: {
      variant: VARIANTS.BLUE,
      gradient: 'from-cyan-500 to-blue-600',
      gradientHover: 'hover:shadow-cyan-500/50',
      text: 'text-cyan-400',
      textHover: 'hover:text-cyan-300',
      textDark: 'text-blue-600',
      border: 'border-cyan-500',
      borderHover: 'hover:border-cyan-500',
      bgPrimary: 'bg-cyan-500',
      bgSecondary: 'bg-blue-600',
      bgGlow: 'bg-cyan-500/10',
      bgGlow2: 'bg-purple-500/10',
      colorScheme
    },
    [VARIANTS.INDIGO]: {
      variant: VARIANTS.INDIGO,
      gradient: 'from-indigo-600 to-purple-700',
      gradientHover: 'hover:shadow-indigo-500/50',
      text: 'text-indigo-400',
      textHover: 'hover:text-indigo-300',
      textDark: 'text-indigo-600',
      border: 'border-indigo-500',
      borderHover: 'hover:border-indigo-500',
      bgPrimary: 'bg-indigo-600',
      bgSecondary: 'bg-purple-700',
      bgGlow: 'bg-indigo-500/10',
      bgGlow2: 'bg-purple-500/10',
      colorScheme
    }
  };

  return colors[variant];
};
