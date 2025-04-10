import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './components/Homescreen';
import { DetailsScreen } from './components/DetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Pokedex">
        <Stack.Screen name= "Pokedex" component={HomeScreen}/>
        <Stack.Screen name= "Pokemon" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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
