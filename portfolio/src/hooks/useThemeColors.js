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
    [VARIANTS.PURPLE]: {
      variant: VARIANTS.PURPLE,
      gradient: 'from-purple-500 to-pink-600',
      gradientHover: 'hover:shadow-purple-500/50',
      text: 'text-purple-400',
      textHover: 'hover:text-purple-300',
      textDark: 'text-purple-600',
      border: 'border-purple-500',
      borderHover: 'hover:border-purple-500',
      bgPrimary: 'bg-purple-500',
      bgSecondary: 'bg-pink-600',
      bgGlow: 'bg-purple-500/10',
      bgGlow2: 'bg-pink-500/10',
      colorScheme
    }
  };

  return colors[variant];
};
