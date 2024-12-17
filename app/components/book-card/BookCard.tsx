import { useMutation } from '@apollo/client';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import { Strings } from '../../constants';
import { DELETE_BOOK, GET_BOOKS } from '../../graphql';
import styles from './BookCardStyles';
import { BookCardPropTypes } from './BookCardTypes';

const BookCard: React.FC<BookCardPropTypes> = ({ book }) => {
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (error: { message: string }) => Alert.alert(Strings.error, error?.message),
  });

  const handleDelete = () => {
    Alert.alert(Strings.deleteBook, `${Strings.deleteMessage} "${book.title}"?`, [
      {
        text: Strings.cancel,
        style: 'cancel',
      },
      {
        text: Strings.delete,
        onPress: async () => {
          try {
            await deleteBook({ variables: { id: book.id } });
            Alert.alert(Strings.success, Strings.bookDeletedMessage);
          } catch (err) {
            console.error(err);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{book?.title}</Text>
      <Text style={styles.author}>{Strings.by} {book?.author?.name}</Text>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Image source={Icons.delete} style={styles.deleteIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default BookCard;
