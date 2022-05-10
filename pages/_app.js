import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Layout from '../layouts/Layout/layout';
import { useStore } from '../utils/store';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const App = function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const store = useStore(pageProps?.initialReduxState);
  const PageLayout = Component?.Layout || Layout;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLayout>{Component && <Component {...pageProps} />}</PageLayout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};
export default App;
