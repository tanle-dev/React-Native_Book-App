import { REALTIME_DB } from '@/constants/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BookCard } from './BookCard';



  export default function EditScreenInfo() {
    const navigation = useNavigation();
    const [bookList, setBookList] = useState<{ id: string }[]>([])

    useEffect(() => {
      
      const bookRef = ref(REALTIME_DB, 'books');
      
      onValue(bookRef, (snapshot) => {
        const books = snapshot.val();
        setBookList(books);

        console.log(bookList);
      });
    }, []);

  

    const handleCardPress = (transaction: any) => {
      router.push({ pathname: 'home/detail', params: { amount: transaction.amount, brand: transaction.brand, date: transaction.date, address: transaction.address } });
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
      {
        bookList.map((book): any => (
          <BookCard
            key={book.id}
            book={book}
          />
        )
      )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  amountText: {
    marginTop: 5,
    fontSize: 18,
    color: '#666666',
  },
  arrowText: {
    fontSize: 24,
    color: '#666666',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#666666',
  },
});