
import { Text, View } from '@/components/Themed';
import { REALTIME_DB } from '@/constants/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { get, ref, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you want to use MaterialCommunityIcons

interface DetailProps {
    book: any;
}

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Icon size="50" name="chevron-left" onPress={() => navigation.goBack() } />
            <Text style={{ fontSize: 20}}>Book Detail</Text>
        </View>
    );
  };

export const Detail: React.FC<DetailProps> = () => {
    var { book_name, author_name, cover_page, id, rating, brief_summary, borrowed }= useLocalSearchParams();
    const [buttonTextString, setButtonText] = useState('Borrow This Book');
    const [borrowedState, setBorrowedState] = useState(false);
    const idB = id as any - 1;
    const bookRef = ref(REALTIME_DB, 'books/' + idB);
    const borrowedRef = ref(REALTIME_DB, 'borrowed');

    useEffect(() => {
        if (borrowed === 'true') {
          setBorrowedState(true);
          setButtonText('Return This Book');
        }
      }, []);

    const handleBorrow = () => {
        if (!borrowedState) {
            Alert.alert('Borrow Confirmation', 'Are you sure you want to borrow this book?', [
              {
                text: 'Yes',
                onPress: () => {

                  get(borrowedRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        var b = snapshot.val();
                        if(b.borrowed < 2) {
                            setButtonText('Return This Book');
                            setBorrowedState(true);
                            update(bookRef, { borrowed: true });
                            set(borrowedRef, { borrowed: b.borrowed + 1 });
                        }else {
                            Alert.alert('Borrow Limit Reached', 'You can only borrow 2 books at a time');
                        }
                    }
                  }).catch((error) => {
                    console.error(error);
                  });
                }
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed')
              }
            ]);
          } else {
            Alert.alert('Return Confirmation', 'Are you sure you want to return this book?', [
              {
                text: 'Yes',
                onPress: () => {
                  setButtonText('Borrow This Book');
                  setBorrowedState(false);
                  update(bookRef, { borrowed: false });

                  get(borrowedRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        var b = snapshot.val();
                        set(borrowedRef, { borrowed: b.borrowed - 1 });
                    } else {          }
                  }).catch((error) => {
                    console.error(error);
                  });
                }
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed')
              }
            ]);
          }
    }

    return (
        <>
            <BackButton />
            <ScrollView>
                <Image source={{ uri: cover_page }} style={styles.cardImage} />
                <View style={styles.detailContainer}>
                    <Text style={styles.bookName}>{book_name}</Text>
                    <Text style={styles.author}>{author_name}</Text>
                    <Text style={styles.rating}>{rating}</Text>
                    <Text style={styles.summary}>{brief_summary}</Text>
                </View>
                <TouchableOpacity style={
                    !borrowedState ? styles.button : styles.buttonReturn
                } onPress={handleBorrow}>
                    <Text style={styles.buttonText}>{buttonTextString}</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
       
    );
}

const styles = {
    detailContainer: {
        padding: 20,
        paddingTop: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    cardImage: {
        marginHorizontal: -40,
        width: '140%',
        height: '100%',
    },
    bookName: {
        marginVertical: 10,
        fontSize: 26,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 18,
        color: 'gray',
    },
    rating: {
        marginVertical: 10,
        fontSize: 18,
        color: 'orange',
    },
    summary: {
        marginVertical: 5,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonReturn:
    {
        backgroundColor: '#FF3B30',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
}

export default Detail;