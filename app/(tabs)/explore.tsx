import React, { useEffect, useState } from "react";

import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/pokemon-related/Card";

import { styles } from "@/assets/styles";
import { Pokemon, errorPokemon } from "@/assets/types";
import PokemonModal from "@/components/pokemon-related/PokemonModal";

interface PokemonToFetch {
  name: string;
  url: string;
}

interface FetchResponse {
  pokemons: PokemonToFetch[];
  nextUrl: string;
}

interface ApiResponse {
  results: PokemonToFetch[];
  next: string;
}

function Pokedex() {
  const [fetchData, setFetchData] = useState<FetchResponse>({
    pokemons: [],
    nextUrl: "",
  });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [focusedPokemon, setFocusedPokemon] = useState<Pokemon | null>(null);

  const fetchListData = async (url: string) => {
    if (url === null) return; // if we fetched every pokemon already

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data: ApiResponse = await response.json();
        setFetchData({ pokemons: data.results, nextUrl: data.next });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (err) {
      console.error("Failed to load initial pokemons:", err);
    }
  };

  useEffect(() => {
    fetchListData("https://pokeapi.co/api/v2/pokemon");
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async (urls: string[]) => {
      const promises = urls.map(async (url): Promise<Pokemon> => {
        try {
          const response = await fetch(url);
          const data: Pokemon = await response.json();
          return data;
        } catch (err) {
          console.error("Error fetching/parsing JSON:", err);
          return errorPokemon;
        }
      });

      try {
        const results = await Promise.allSettled(promises);
        const validResults = results.map((result): Pokemon => {
          if (result.status === "fulfilled") {
            return result.value;
          } else {
            console.error("Fetch error:", result.reason);
            return errorPokemon;
          }
        });
        setPokemons((curr) => curr.concat(validResults));
      } catch (error) {
        console.error("Unexpected error during fetch operations:", error);
      }
    };

    if (fetchData.pokemons.length > 0) {
      fetchPokemonDetails(fetchData.pokemons.map((obj) => obj.url));
    }
  }, [fetchData]);

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
        onEndReached={() => fetchListData(fetchData.nextUrl)}
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
