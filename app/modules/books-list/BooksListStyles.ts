import {StyleSheet} from 'react-native';
import {Colors, scale} from '../../theme';

/**
 * A StyleSheet object that contains all of the Book list screen styles.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(14),
  },
  loader: {
    marginTop: scale(20),
  },
  error: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: scale(20),
  },
  listContent: {
    paddingBottom: scale(20),
  },
  addButton: {
    backgroundColor: Colors.black,
    paddingVertical: scale(12),
    paddingHorizontal: scale(18),
    borderRadius: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    alignSelf: 'flex-end',
    marginBottom: scale(18),
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: scale(6),
  },
  addButtonText: {
    color: Colors.white,
    fontSize: scale(13),
    fontWeight: 'bold',
    marginLeft: scale(5),
  },
  headerRightIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: Colors.white,
  },
});

export default styles;
