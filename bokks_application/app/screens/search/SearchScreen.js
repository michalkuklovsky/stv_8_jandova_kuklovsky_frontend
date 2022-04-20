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


const SearchScreen = ({navigation, route, results}) => {
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
      
        const handlePress = () => {
            setExpanded(!expanded);
            setFilterby('');
        }
      
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

    const sendQuery = () => {
        let query_filter = filter;
        let query_filterby = filterby;
        let query_orderby = orderby;
        let query_ordertype = ordertype;

        let URL = searchURL;

        if (searchQuery === undefined) {
            alert('Search query not provided');
            return;
        }
        else {
            URL += '?query=' + searchQuery;
        }

        if (query_filter !== '') {
            query_filter = 'filter=' + filter;
            URL += '&' + query_filter;
        }
        if (query_filterby !== '') {
            query_filterby = 'filter_by=' + filterby;
            URL += '&' + query_filterby;
        }
        if (query_orderby !== '') {
            query_orderby = 'order_by=' + orderby;
            URL += '&' + query_orderby;
        }
        if (query_ordertype !== '') {
            query_ordertype = 'order_type=' + ordertype;
            URL += '&' + query_ordertype;
        }
        
        navigation.navigate('SearchResults', {url: URL});
    };

        const clear = () => {
            setOrderby('');
            setOrdertype('');
            setFilter('');
            setFilterby('');
        };

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
            
            <View style={styles.dropdownView}>
                <View style={styles.filterView}>
                    {/* <Dropdown title={'Filter by'} first={'author'} second={'genre'}/> */}
                    <Dropdown title={'Filter by'} first={'author'} second={'genre'} 
                    firstPress={() => setFilterby('author')} secondPress={() => setFilterby('genre')}/>
                </View>
                <View style={styles.filterView}>
                    <Dropdown title={'Order by'} first={'price'} second={'release_year'} 
                    firstPress={() => setOrderby('price')} secondPress={() => setOrderby('release_year')}/>
                </View>
            </View>
            
            <View style={styles.dropdownView}>
                <View style={styles.filterView}>
                    <TextInput label={'Filter'} onChangeText={text => setFilter(text)}/>
                </View>
                <View style={styles.filterView}>
                    <Dropdown title={'Order type'} first={'asc'} second={'desc'} 
                    firstPress={() => setOrdertype('asc')} secondPress={() => setOrdertype('desc')}/>
                </View>
            </View>

            <View style={styles.buttonview}>
                <View>
                    <Pressable style={styles.btn} onPress={sendQuery} >
                        <Text  style={styles.btnText}> Search </Text>
                    </Pressable>
                </View>

                <View>
                    <Pressable style={styles.btn} onPress={clear} >
                        <Text  style={styles.btnText}> Clear </Text>
                    </Pressable>
                </View>
            </View>
            

            <View style={styles.mainContainer}>
                        <FlatList
                            data={results}
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
    buttonview: {
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf: 'center',
        justifyContent: 'space-evenly',
        // margin: 5,
    },
    filterView: {
        width: '45%',
        // margin: 5,
    },
    btn: {
        width: 150,
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
  });

export default SearchScreen;
