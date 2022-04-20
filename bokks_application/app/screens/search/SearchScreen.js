import React, {useState} from 'react';
import { Searchbar, TextInput } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { List } from 'react-native-paper';

const Dropdown = ({title, first, second, bool}) => {
    const [expanded, setExpanded] = React.useState(true);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
        <List.Accordion
          title={title}
        //   left={props => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}>
          <List.Item title={first} />
          <List.Item title={second}/>
        </List.Accordion>
    );
  };

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

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
                    <Dropdown title={'Filter by'} first={'author'} second={'genre'}/>
                </View>
                <View style={styles.filterView}>
                    <Dropdown title={'Order by'} first={'price'} second={'release_year'}/>
                </View>
            </View>
            <View style={styles.dropdownView}>
                <View style={styles.filterView}>
                    <TextInput label={'Filter'} onChangeText={text => setFilter(text)}/>
                </View>
                <View style={styles.filterView}>
                    <Dropdown title={'Order type'} first={'ascending'} second={'descending'}/>
                </View>
            </View>
            
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
    root: {
      backgroundColor: '#fff',
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      // alignSelf: 'center',
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    heading: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: '600',
    },
    input: {
      height: 60,
      marginBottom: 10,
    },
    btn: {
      height: 60,
      borderRadius: 25,
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
    },
    btnContent: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
    },
  });
export default SearchScreen;
