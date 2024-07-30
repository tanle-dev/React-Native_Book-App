import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

interface BookCardProps {
    book: any
}

export const BookCard: React.FC<BookCardProps> = ({book}) => {
    const navigation = useNavigation();

    const handleCardPress = (book: any) => {
      
      var book_name = book.book_name;
      var author_name = book.author_name;
      var cover_page = book.cover_page;
      var id = book.id;
      var rating = book.rating;
      var brief_summary = book.brief_summary;
      var borrowed = book.borrowed;

      router.push({ pathname: `home/detail`, params: { book_name, author_name, cover_page, id, rating, brief_summary, borrowed } });
    };

    return (
        <TouchableOpacity
            key={book.id}
            style={styles.cardContainer}
            onPress={() => handleCardPress(book)}
            >
              <View style={styles.cardLeft}>
                <Image source={{ uri: book.cover_page }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.brandText}>{book.book_name}</Text>
                  <Text style={styles.amountText}>{book.author_name}</Text>
                </View>
              </View>
            
            <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    width: '98%',
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
    minHeight: 60,
    marginLeft: 20,
  },
  brandText: {
    fontSize: 20,
    maxWidth: 200,
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
    marginLeft: -10,
    color: '#666666',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cardLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});