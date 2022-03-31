import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { useStore } from '../utils/store';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const App = function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};
export default App;
