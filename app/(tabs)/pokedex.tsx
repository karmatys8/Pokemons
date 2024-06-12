import React, { useState } from "react";

import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/pokemon-related/Card";

import { styles } from "@/assets/styles";
import { Pokemon } from "@/types";
import PokemonModal from "@/components/pokemon-related/PokemonModal";
import { usePokemonData } from "@/hooks/usePokemonData";

function Pokedex() {
  const { pokemons, fetchNext } = usePokemonData(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [focusedPokemon, setFocusedPokemon] = useState<Pokemon | null>(null);

  return (
    <ThemedView style={localStyles.container}>
      <PokemonModal
        isModalVisible={focusedPokemon !== null}
        pokemon={focusedPokemon}
        setFocusedPokemon={setFocusedPokemon}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pokemon List</ThemedText>
      </ThemedView>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            img={item.sprites.front_default}
            handlePress={() => {
              setFocusedPokemon(item);
            }}
          />
        )}
        keyExtractor={(item) => item.name}
        onEndReached={fetchNext}
      />
    </ThemedView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
  },
});

export default React.memo(Pokedex);
