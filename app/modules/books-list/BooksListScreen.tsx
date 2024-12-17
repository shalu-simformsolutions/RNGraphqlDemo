import { useQuery, useSubscription } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../../assets';
import { BookCard } from '../../components';
import { AppConst, ROUTES, Strings } from '../../constants';
import { useAuthContext } from '../../context';
import {
  BOOK_ADDED_SUBSCRIPTION,
  BOOK_DELETED_SUBSCRIPTION,
  GET_BOOKS,
} from '../../graphql';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { Colors } from '../../theme';
import styles from './BooksListStyles';
import { Book, BooksData } from './BooksListTypes';

/**
 * The BooksListScreen component
 * @returns A ReactElement.
 */
const BooksListScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {setToken} = useAuthContext();
  const {data, loading, error, refetch} = useQuery<BooksData>(GET_BOOKS);
  const [booksList, setBooksList] = useState<Book[]>([]);

  // Subscriptions
  const {data: addedBookData} = useSubscription(BOOK_ADDED_SUBSCRIPTION);
  const {data: deletedBookData} = useSubscription(BOOK_DELETED_SUBSCRIPTION);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              Strings.logout,
              Strings.logoutAlertMessage,
              [
                {
                  text: Strings.cancel,
                  style: 'destructive',
                },
                {
                  text: Strings.confirm,
                  style: 'default',
                  onPress: async () => {
                    try {
                      await AsyncStorage.removeItem(AppConst.authToken);
                      setToken(null);
                    } catch (err) {
                      Alert.alert(
                        Strings.error,
                        Strings.failedLogoutErrorMessage,
                      );
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <Image source={Icons.logout} style={styles.headerRightIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (data?.books) {
      setBooksList(data.books);
    }
  }, [data]);

  // Handle book addition subscription
  useEffect(() => {
    if (addedBookData?.bookAdded) {
      setBooksList(prevBooks => [...prevBooks, addedBookData?.bookAdded]);
    }
  }, [addedBookData]);

  // Handle book deletion subscription
  useEffect(() => {
    if (deletedBookData?.bookDeleted) {
      setBooksList(prevBooks =>
        prevBooks?.filter(book => book?.id !== deletedBookData?.bookDeleted),
      );
    }
  }, [deletedBookData]);  

  if (loading)
    return (
      <ActivityIndicator
        style={styles.loader}
        size="small"
        color={Colors.black}
      />
    );
  if (error) return <Text style={styles.error}>Error: {error?.message}</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(ROUTES.AddBook)}>
        <Text style={styles.addButtonText}>{Strings.addNewBook}</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={booksList}
        keyExtractor={(item: Book) => item?.id}
        renderItem={({item}) => <BookCard book={item} />}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default BooksListScreen;
