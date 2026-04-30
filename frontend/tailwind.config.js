module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#EF3B33',
        maroon: '#8E0D3C',
        gold: '#FDA1A2',
        ivory: '#FFF5F6',
        blackcurrant: '#1D1842'
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
