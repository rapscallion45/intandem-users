import { createTheme } from '@mui/material/styles';

/* Create FPL Frog theme instance */
const theme = createTheme({
  /**
   * General Style Overrides
   */
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#efefef',
    },
    highlight: {
      main: '#00ff87',
    },
    background: {
      main: 'white',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  /**
   * Component Specific Overrides
   */
  components: {
    /**
     * Bottom Navigation
     */
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '75px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          // borderTopColor: 'grey', // scssVariables.lightGreyColor,
          zIndex: 1301,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: '70px',
          // color: 'grey', // scssVariables.midGreyColor,
          paddingTop: '12px',
          '&.Mui-selected': {
            paddingTop: '12px',
          },
        },
        label: {
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
    /**
     * Popovers
     */
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: '1301 !important',
        },
      },
    },
    /**
     * Dialogs
     */
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: '1301 !important',
        },
        paper: {
          position: 'inherit',
        },
      },
    },
    /**
     * Drawer
     */
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '100vw',
          maxWidth: '450px',
          height: '100vh',
        },
      },
    },
    /**
     * Paper
     */
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '20px',
        },
      },
    },
  },
});
export default theme;
