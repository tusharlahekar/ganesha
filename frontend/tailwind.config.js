module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#f39c12',
        maroon: '#6b0f1a',
        gold: '#d8a74b',
        ivory: '#fdf9f3'
      },
      fontFamily: {
        heading: ['"Cinzel Decorative"', '"Garamond"', 'serif'],
        body: ['"Inter"', '"Segoe UI"', 'sans-serif']
      },
      backgroundImage: {
        temple: "url('/temple-texture.svg')"
      }
    }
  },
  plugins: []
};
