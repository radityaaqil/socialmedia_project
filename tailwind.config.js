const { background } = require("@chakra-ui/react")

module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        "darkprimary":"#1a1a1d",
        "darksecondary":"#4e4e50",
        "pinkprimary":"#6f2232",
        "pinksecondary":"#950740",
        "pinktertiary":"#c3073f",
      },
      // animation: {
      //   'text':'text 5s ease infinite',
      // },
      keyframes: {
        'move-bg' : {
          to : {
            backgroundPosition: '400% 0'
          }
        }
          // 'text': {
          //     '0%, 100%': {
          //       'background-size':'200% 200%',
          //         'background-position': 'left center'
          //     },
          //     '50%': {
          //       'background-size':'200% 200%',
          //         'background-position': 'right center'
          //     }
          // },
      },
      animation : {
        'move-bg':'move-bg 8s infinite linear',
      }
    },
  },
  plugins: [
    require("tailwindcss-autofill"),
    require("tailwindcss-shadow-fill"),
    require("tailwindcss-text-fill"),
  ],
}
