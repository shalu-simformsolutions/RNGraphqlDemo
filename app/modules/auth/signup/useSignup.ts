import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { AppConst, ROUTES, Strings } from '../../../constants';
import { useAuthContext } from '../../../context';
import { SIGNUP_MUTATION } from '../../../graphql';
import { RootStackParamList } from '../../../navigation/AppNavigation';

export function useSignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setToken } = useAuthContext();
  const [signup] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert(Strings.validationError, Strings.emptyValidationMessage);
      return;
    }
    try {
      const response = await signup({ variables: { name, email, password } });
      const { token } = response.data.signup;
      // Update context and set the token
      setToken(token);
      await AsyncStorage.setItem(AppConst.authToken, token);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'An error occurred');
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate(ROUTES.SignIn);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    handleLoginNavigation,
  };
}
