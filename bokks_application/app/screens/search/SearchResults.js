import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import { List,  Card, Title, Paragraph, Searchbar, TextInput, Text  } from 'react-native-paper';
import {appURL} from '../../Constants';

// const Dropdown = ({title, first, second, firstPress, secondPress}) => {
//     const [expanded, setExpanded] = React.useState(true);
  
//     const handlePress = () => setExpanded(!expanded);
  
//     return (
//         <List.Accordion
//           title={title}
//         //   left={props => <List.Icon {...props} icon="folder" />}
//           expanded={expanded}
//           onPress={handlePress}>
//           <Pressable onPress={firstPress}>
//               <List.Item title={first} />
//           </Pressable>
//           <Pressable onPress={secondPress}>
//             <List.Item title={second} />
//           </Pressable>
//         </List.Accordion>
//     );
//   };

export const Book = ({navigation, book}) => {
    const onPressed = () => {
        navigation.navigate("BookDetail", {id: book.id})
    }

    return (
        // <View>
        <Pressable onPress={onPressed}>
            <Card style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={{ uri: appURL+'books/'+book.id+'/'+book.img_path }} />
                </View>
                <Title style={styles.imgTitle}> {book.title} </Title>
                <Paragraph style={styles.imgSub}> {book.price} € </Paragraph>
            </Card>
        </Pressable>
        // </View>
    )
}

const searchURL = appURL + 'search';


const SearchResults = ({navigation, route}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [filterby, setFilterby] = useState('');
    const [orderby, setOrderby] = useState('');
    const [ordertype, setOrdertype] = useState('');
    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const onChangeSearch = query => setSearchQuery(query);

    // onChangeSearch();

    const Dropdown = ({title, first, second, firstPress, secondPress}) => {
        const [expanded, setExpanded] = React.useState(true);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
            <List.Accordion
              title={title}
            //   left={props => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}>
              <Pressable onPress={firstPress}>
                  <List.Item title={first} />
              </Pressable>
              <Pressable onPress={secondPress}>
                <List.Item title={second} />
              </Pressable>
            </List.Accordion>
        );
    };

    useEffect(() => {
        fetch(route.params.url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setBooks(json.books);
                // setSum(getTotalSum(cart));
                // navigation.navigate();
            })
            .catch(error => alert(error))
            .finally(() => {
                setLoading(false);
            });
    }, [route, isLoading]);

    return (
        <View>
            <View style={styles.searchView}>
                <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.search}
            />
            </View>

            <View style={styles.mainContainer}>
                        <FlatList
                            data={books}
                            keyExtractor={( {id}, index) => id}
                            renderItem={({item}) => (<Book book={item} navigation={navigation} />)}
                            numColumns={2}
                            styles={styles.booksList}
                            contentContainerStyle={styles.listContainer}
                            nestedScrollEnabled={true}
                        />
                    </View>

            {/* <View>

            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    search: {
        top: 20,
        marginHorizontal: 10,
        // paddingBottom: 10,
    },
    searchView: {
        paddingBottom: 40,
    },
    dropdownView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    filterView: {
        width: '45%',
        // margin: 5,
    },
    btn: {
        width: 200,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#a3c6ff",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
      },
      btnText: {
        color: "black",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
      },
      mainContainer:{
        padding: 10,
        flexWrap: "wrap",
        height: "100%",
    },
    titleContainer:{
        padding: 8,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: "500",
        textAlign: "center",
        color: "black",
    },
    booksList: {
        // flexGrow: 1,
        backgroundColor: "blue",
        height: "100%",
    },
    listContainer: {
        marginHorizontal: 8,
    },
    logo: {
        width: 100,
        height: 140,
        borderRadius: 10,
    },
    imageContainer: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 8,
    },
    card: {
        width: 140,
        // height: 240,
        borderRadius: 10,
        shadowOpacity: 0.25,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
    },
    imgSub: {
        paddingLeft: 6,
    },
  });

export default SearchResults;
