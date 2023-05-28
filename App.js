import { StyleSheet, Text, View } from 'react-native';
import { PokedexProvider } from './contexts/PokedexContext';
import { PokemonsList } from './components/PokemonsList';
import { SearchingBar } from './components/SearchingBar';

export default function App() {
  return (
    <PokedexProvider>
      <View>
      <View style={css.mainHeader}>
        <Text style={css.title}>Pokédex</Text>
      </View>
      <SearchingBar />
      <PokemonsList />
    </View>
    </PokedexProvider>
  )
}

const css = StyleSheet.create({
  mainHeader : {
    marginTop : 100,
    marginLeft : 20,
    marginBottom : 25
  },

  title : {
    fontSize : 40,
    fontWeight : 'bold'
  },

  container: {
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
    flexWrap : 'wrap'
  },

  fab : {
    paddingBottom : 20,
    paddingRight : 10
  }
});
