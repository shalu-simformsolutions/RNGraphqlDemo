import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomInput } from '../../components';
import { Strings } from '../../constants';
import { ADD_BOOK, GET_BOOKS } from '../../graphql';
import { Colors } from '../../theme';
import styles from './AddBookStyles';

const AddBookScreen = () => {
  const authorInputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const navigation = useNavigation();

  const [addBook, { loading }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      Alert.alert(Strings.success, Strings.bookAddedMessage);
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert(Strings.error, error?.message);
    },
  });

  const handleAddBook = () => {
    if (!title || !authorName) {
      Alert.alert(Strings.validationError, Strings.emptyValidationMessage);
      return;
    }
    addBook({ variables: { title, authorName } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{Strings.addNewBook}</Text>
      <CustomInput
        label={Strings.formBookLabel}
        placeholder={Strings.formBookPlaceholder}
        value={title}
        onChangeText={setTitle}
        keyboardType='default'
        returnKeyType='next'
        autoCapitalize="none"
        onSubmitEditing={() => authorInputRef.current?.focus()}
      />
      <CustomInput
        ref={authorInputRef}
        label={Strings.formAuthorLabel}
        placeholder={Strings.formAuthorPlaceholder}
        value={authorName}
        onChangeText={setAuthorName}
        keyboardType='default'
        returnKeyType='done'
        autoCapitalize="none"
        onSubmitEditing={handleAddBook}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddBook}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>{Strings.addBook}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>{Strings.cancel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBookScreen;
