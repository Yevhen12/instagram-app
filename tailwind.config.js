module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'defaultModal': '0px 0px 6px 0px rgba(0,0,0,0.25)',
      },
      keyframes: {
        modalAnimate: {
          '0%': {width: '700px' },
          '100%': {width: '1050px'}
        },
        likeAnim: {
          '0%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'},
        }
      },
    },
  },
  plugins: [],
}
