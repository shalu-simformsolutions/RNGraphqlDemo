/**
 * A simple collection of colors used in the project.
 */

// Define types for all color keys
type Colors =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'error'
  | 'shadowColor'
  | 'orange'
  | 'lightBlue'
  | 'red'
  | 'darkBlue'
  | 'transparent'
  | 'offWhite'
  | 'duskyBlue'
  | 'lightBlack'
  | 'white'
  | 'black'
  | 'transparentBlack'
  | 'transparentWhite'
  | 'silver';

// Define a Record of colors with their hex values
const colors: Record<Colors, string> = {
  // Theme colors
  primary: '#141414',
  secondary: '#F1C336',
  gray: '#646E79',
  error: '#E53E3E',
  shadowColor: '#000',
  orange: '#F39C3C',
  lightBlue: '#3787FC',
  red: '#DD2C2C',
  darkBlue: '#374dfc',
  transparent: 'transparent',
  offWhite: '#F9F6EE',
  duskyBlue: '#007bff',
  lightBlack: '#28282B',
  silver: '#f5f5f5',
  white: '#FFFFFF',
  black: '#000000',
  transparentBlack: '#00000000',
  transparentWhite: '#FFFFFF00',
};

export default colors;
