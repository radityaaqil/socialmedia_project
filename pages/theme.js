import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'Nunito, sans-serif',
  },
  colors:{
    darkprimary:"#1a1a1d",
    darksecondary:"#4e4e50",
    pinkprimary:"#6f2232",
    pinksecondary:"#950740",
    // pinktertiary:"#c3073f",
    pinktertiary: {
      50: "rgba(195, 7, 63, 1)",
      100: "rgba(195, 7, 63, 1)",
      200: "rgba(195, 7, 63, 1)",
      300: "rgba(195, 7, 63, 1)",
      400: "rgba(195, 7, 63, 1)",
      500: "rgba(195, 7, 63, 1)",
      600: "rgba(195, 7, 63, 1)",
      700: "rgba(195, 7, 63, 1)",
      800: "rgba(195, 7, 63, 1)",
      900: "rgba(195, 7, 63, 1)",
    },
    shadows:'none'
  },
  // colorScheme:{
  //   darkprimary:"#1a1a1d",
  //   darksecondary:"#4e4e50",
  //   pinkprimary:"#6f2232",
  //   pinksecondary:"#950740",
  //   pinktertiary:"#c3073f",
  // },
})

export default theme