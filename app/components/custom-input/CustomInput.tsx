import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './CustomInputStyles';
import { CustomInputProps } from './CustomInputTypes';

const CustomInput = forwardRef<TextInput, CustomInputProps & TextInputProps>(
  ({ label, placeholder, value, onChangeText, ...rest }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
      </View>
    );
  }
);
export default CustomInput;
