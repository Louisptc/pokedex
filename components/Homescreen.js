import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from './searchbar';

export function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <SearchBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});