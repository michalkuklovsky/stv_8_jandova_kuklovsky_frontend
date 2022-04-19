import React, {useState} from 'react';
import { Searchbar } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { List } from 'react-native-paper';

const MyComponent = () => {
    const [expanded, setExpanded] = React.useState(true);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
      <List.Section title="Accordions">
        <List.Accordion
          title="Uncontrolled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
  
        <List.Accordion
          title="Controlled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    );
  };

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.search}
        />
    );
};

const styles = StyleSheet.create({
    search: {
        top: 20,
        marginHorizontal: 10,
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
