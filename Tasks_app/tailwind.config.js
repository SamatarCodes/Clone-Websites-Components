module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse .8s cubic-bezier(0.4, 0, 0.6, 1)',
        disappear: 'disappear .8s  cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        pulse: {
          '0%': { opacity: '0' },
          '50%': { opacity: '.5' },
          '100%': { opacity: '1' },
        },
        disappear: {
          '0%': { opacity: '1' },
          '50%': { opacity: '.5' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
