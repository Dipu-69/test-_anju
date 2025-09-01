import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import theme from './theme/muiTheme'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)