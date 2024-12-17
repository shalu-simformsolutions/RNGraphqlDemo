import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthContext } from '../../../context';
import { AppConst, ROUTES, Strings } from '../../../constants';
import { LOGIN_MUTATION } from '../../../graphql';
import { RootStackParamList } from '../../../navigation/AppNavigation';

export function useSignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setToken } = useAuthContext();
  const [login] = useMutation(LOGIN_MUTATION);

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert(Strings.validationError, Strings.emptyValidationMessage);
      return;
    }
    try {
      const response = await login({ variables: { email, password } });
      const { token } = response.data.login;
      // update context and set the token
      setToken(token);
      await AsyncStorage.setItem(AppConst.authToken, token);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate(ROUTES.SignUp);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignin,
    handleSignUpNavigation,
  };
}
