import { StyleSheet, Text, View, FlatList } from 'react-native';
import { use } from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, Platform } from 'react-native';


export default function DetailsScreen({ navigation, route }) {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    const { pokedexId } = route.params;
    fetch(`https://tyradex.vercel.app/api/v1/pokemon/${pokedexId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Réponse réseau non OK");
        return res.json();
      })
      .then((data) => setPokemon(data))
      .catch((err) => console.error("Erreur de fetch :", err));
  }, [route.params]);

  if (!pokemon) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{pokemon.name.fr}</Text>
      </View>
    </SafeAreaView>
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