import React, { FC, useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../../assets';
import { CustomInput } from '../../../components';
import { Strings } from '../../../constants';
import styles from './SigninStyles';
import { useSignIn } from './useSignin';

/**
 * The SigninScreen component
 * @returns A ReactElement.
 */
const SigninScreen: FC = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignin,
    handleSignUpNavigation,
  } = useSignIn();

  return (
    <View style={styles.container}>
      <Image source={Icons.bookLogo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.header}>{Strings.signIn}</Text>
      <View style={styles.mainFormView}>
        <CustomInput
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
          onSubmitEditing={handleSignin}
        />
        <TouchableOpacity style={styles.signInButton} onPress={handleSignin}>
          <Text style={styles.signInButtonText}>{Strings.signIn}</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          {Strings.DoNotHaveAnAccount}
          <Text style={styles.hyperLinkText} onPress={handleSignUpNavigation}>
            {Strings.signUp}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SigninScreen;
