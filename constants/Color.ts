interface Colors {
  light: {
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
  };
  dark: {
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export const Colors: Colors = {
  light: {
    primary: 'white',
    secondary: '#EEEEEE',
    textPrimary: '#180E19',
    textSecondary: '#909090',
  },
  dark: {
    primary: '#180E19',
    secondary: '#909090',
    textPrimary: '#FFFFFF',
    textSecondary: 'white',
  },
};
