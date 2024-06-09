interface Colors {
  light: {
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
    error: string;
  };
  dark: {
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
    error: string;
  };
}

export const Colors: Colors = {
  light: {
    primary: 'white',
    secondary: '#EEEEEE',
    textPrimary: '#180E19',
    textSecondary: '#909090',
    error: '#BA1818',
  },
  dark: {
    primary: '#180E19',
    secondary: '#909090',
    textPrimary: '#FFFFFF',
    textSecondary: 'white',
    error: '#ff0000',
  },
};
