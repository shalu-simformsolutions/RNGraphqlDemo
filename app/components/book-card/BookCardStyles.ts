import {StyleSheet} from 'react-native';
import {Colors, scale} from '../../theme';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} theme - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default StyleSheet.create({
  card: {
    padding: scale(13),
    marginVertical: scale(6),
    backgroundColor: Colors.white,
    borderRadius: scale(6),
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: scale(14),
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  author: {
    fontSize: scale(13),
    color: Colors.gray
  },
  deleteButton: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    padding: scale(8)
  },
  deleteIcon: {
    width: scale(20),
    height: scale(20),
  },
});
