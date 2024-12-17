import { StyleSheet } from 'react-native';
import { Colors, scale } from '../../theme';

/**
 * A StyleSheet object that contains all of the add new book screen styles.
 */
const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: scale(16),
      backgroundColor: Colors.silver
    },
    header: {
      fontSize: scale(20),
      fontWeight: 'bold',
      marginBottom: scale(16),
      color:Colors.black,
    },
    button: {
      padding:scale(12),
      marginTop: scale(14),
      backgroundColor: Colors.black,
      borderRadius: scale(6),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: scale(14),
      fontWeight: '500',
      color: Colors.white,
    },
    cancelButton: {
      padding: scale(14),
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: scale(13),
      color: Colors.red
    },
  });

export default styles();
