import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, Strings } from '../constants';
import { useAuthContext } from '../context';
import {
  AddBookScreen,
  BooksListScreen,
  SigninScreen,
  SignupScreen,
} from '../modules';
import { Colors, scale } from '../theme';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} RootStackParamList is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [Home] - The Home screen.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [ROUTES.SignIn]: undefined;
  [ROUTES.SignUp]: undefined;
  [ROUTES.BooksList]: undefined;
  [ROUTES.AddBook]: undefined;
};

/**
 * Creating a stack navigator with the type of RootStackParamList.
 * @returns {StackNavigator} - The root stack navigator.
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * Common header options for the authenticated screens
 */
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: scale(18),
  },
};

/**
 * The main App container.
 * @returns {React.ReactNode} The main App container.
 */
const AppContainer = (): React.ReactNode => {
  const {token} = useAuthContext();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: true}}>
        {token ? (
          <>
            <RootStack.Screen
              name={ROUTES.BooksList}
              options={{
                ...commonHeaderOptions,
                title: Strings.booksCollection,
              }}
              component={BooksListScreen}
            />
            <RootStack.Screen
              name={ROUTES.AddBook}
              options={{
                ...commonHeaderOptions,
                title: '',
                headerBackTitle: Strings.back,
              }}
              component={AddBookScreen}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name={ROUTES.SignIn}
              options={{
                headerShown: false,
              }}
              component={SigninScreen}
            />
            <RootStack.Screen
              name={ROUTES.SignUp}
              options={{
                headerShown: false,
              }}
              component={SignupScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
