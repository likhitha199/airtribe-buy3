import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux'
import { Notifications } from '@mantine/notifications';
import AppRouter from './routes/route.jsx'
import { store } from './store/store.js';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'

const theme = createTheme({});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <AppRouter />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
