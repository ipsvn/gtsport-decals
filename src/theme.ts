"use client";

import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    black?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    black: true;
    white: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    black: true;
    white: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: purple,
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    black: {
      main: '#000'
    },
    white: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: "degular-variable",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "2px"
        }
      }
    }
  }
});

export default theme;
