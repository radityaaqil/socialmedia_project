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
    pinktertiary:"#c3073f",
  },
  colorScheme:{
    darkprimary:"#1a1a1d",
    darksecondary:"#4e4e50",
    pinkprimary:"#6f2232",
    pinksecondary:"#950740",
    pinktertiary:"#c3073f",
  }
})

export default theme