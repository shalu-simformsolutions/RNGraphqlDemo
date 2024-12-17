import {StyleSheet} from 'react-native';
import {Colors, scale} from '../../../theme';

/**
 * A StyleSheet object that contains all of the signin screen styles.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: Colors.silver,
    justifyContent: 'center',
  },
  logo: {
    width: scale(120),
    height: scale(120),
    alignSelf: 'center',
    bottom: scale(60),
  },
  mainFormView: {
    marginTop: scale(30),
  },
  header: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'left',
  },
  signInButton: {
    backgroundColor: Colors.primary,
    padding: scale(14),
    borderRadius: scale(6),
    alignItems: 'center',
    marginTop: scale(10),
  },
  signInButtonText: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: scale(16),
    alignItems: 'center',
    textAlign: 'center',
    fontSize:  scale(12),
  },
  hyperLinkText: {
    color: Colors.duskyBlue,
    fontSize:  scale(12),
    fontWeight: '600',
  },
});

export default styles;
