import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

export const SearchBar = ({ navigation }) => {
  const [text, setText] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPokemons(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item, index) => index.toString()} // clé unique pour chaque item
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item?.name?.fr ?? "Nom inconnu"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles de la liste
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // fond doux
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // ombre sur Android
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
