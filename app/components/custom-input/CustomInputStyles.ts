import { StyleSheet } from 'react-native';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} theme - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
