import React, { FC, useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../../assets';
import { CustomInput } from '../../../components';
import { Strings } from '../../../constants';
import styles from './SignupStyles';
import { useSignUp } from './useSignup';

/**
 * The SignupScreen component
 * @returns A ReactElement.
 */
const SignupScreen: FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    handleLoginNavigation,
  } = useSignUp();

  return (
    <View style={styles.container}>
      <Image source={Icons.bookLogo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.header}>{Strings.signUp}</Text>
      <View style={styles.mainFormView}>
        <CustomInput
          label={Strings.formNameLabel}
          placeholder={Strings.formNamePlaceholder}
          value={name}
          onChangeText={setName}
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize="none"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />
        <CustomInput
          ref={emailInputRef}
          label={Strings.formEmailLabel}
          placeholder={Strings.formEmailPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          returnKeyType='next'
          autoCapitalize="none"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <CustomInput
         ref={passwordInputRef}
          label={Strings.formPasswordLabel}
          placeholder={Strings.formPasswordPlaceholder}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize="none"
          onSubmitEditing={handleSignup}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <Text style={styles.signUpButtonText}>{Strings.signUp}</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          {Strings.alreadyHaveAccount}
          <Text style={styles.hyperLinkText} onPress={handleLoginNavigation}>
            {Strings.signIn}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
