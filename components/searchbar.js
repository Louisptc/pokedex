import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  TextInput
} from "react-native";
import { SafeAreaView, Platform } from 'react-native';


export const SearchBar = ({ navigation }) => {
  const [text, setText] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const window = useWindowDimensions(); // récupère la largeur de l'écran
  const isMobile = window.width < 768;

  // Définir la taille d’un bloc (carte Pokémon)
  const ITEM_WIDTH = 160; // en px
  const SPACING = ITEM_WIDTH; // on veut un espace égal à la largeur d’un bloc

  // Calcul dynamique du nombre de colonnes selon la taille de l'écran
  const numColumns = Math.max(1, Math.floor(window.width / (ITEM_WIDTH + SPACING)));

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPokemons(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
  if (text.length > 2) {
    const results = pokemons.filter((pokemon) => pokemon.name.fr.toLowerCase().includes(text.toLowerCase()));
    setFilteredPokemons(results);
  } 
  else {
    setFilteredPokemons([]);
  }
}, [text,pokemons]);

const dataToDisplay = text.length > 2 ? filteredPokemons : pokemons;

  return (
    <>
    {isMobile ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <TextInput 
        style={styles.searchbar}
        placeholder="Rechercher un Pokemon"
        onChangeText={setText}
        value={text} />

      <FlatList
        data={dataToDisplay}
        numColumns={numColumns}
        columnWrapperStyle={
          numColumns > 1 ? styles.columnWrapper : null
        } // ajoute de l'espacement horizontal
        contentContainerStyle={styles.listContent}

        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
            <Image
              source={{ uri: item?.sprites?.regular }}
              style={styles.image}
            />
            <Text style={styles.itemText}>
              {item?.name?.fr ?? "Nom inconnu"}
            </Text>
          </View>
        )}

      />
    </View>
    </SafeAreaView>
  ) : (

    <View style={styles.container}>
      <TextInput 
        style={styles.searchbar}
        placeholder="Rechercher un Pokemon"
        onChangeText={setText}
        value={text} />

      <FlatList
        data={dataToDisplay}
        numColumns={numColumns}
        columnWrapperStyle={
          numColumns > 1 ? styles.columnWrapper : null
        } // ajoute de l'espacement horizontal
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          
          <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
            <Image
              source={{ uri: item?.sprites?.regular }}
              style={styles.image}
            />
            <Text style={styles.itemText}>
              {item?.name?.fr ?? "Nom inconnu"}
            </Text>
          </View>
        )}

      />
    </View>
  )}
</>
)
}

// Styles
const styles = StyleSheet.create({

  searchbar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 2, // pour un peu d’ombre sur Android
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },  
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-evenly", // espace égal entre les blocs
    marginBottom: 20, // espace vertical entre les rangées
  },
  itemContainer: {
    margin: 15,
    borderRadius: 8,
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
