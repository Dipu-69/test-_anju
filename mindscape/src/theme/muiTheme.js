import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3f7eff' },
    secondary: { main: '#33d6a6' },
    info: { main: '#7a5af8' },
    background: { default: '#0b1020', paper: '#0f172a' },
    text: { primary: '#e6edff', secondary: '#c1c9d6' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"'
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 12 } }
    }
  }
})

export default theme