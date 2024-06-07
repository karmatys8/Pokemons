import React, { useEffect, useState } from "react";

import { FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/pokemon-related/Card";

import { styles } from "@/assets/styles";
import { Pokemon, PokemonListEntry, PokemonToFetch } from "@/assets/types";

interface ApiResponse {
  results: PokemonToFetch[];
}

export default function TabTwoScreen() {
  const [tmp, setTmp] = useState<PokemonToFetch[]>([]);
  const [pokemons, setPokemons] = useState<PokemonListEntry[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");

        if (response.ok) {
          const data: ApiResponse = await response.json();
          setTmp(data.results);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    async function fetchData(urls: string[]) {
      const promises = urls.map(async (url): Promise<PokemonListEntry> => {
        try {
          const response = await fetch(url);
          const data: Pokemon = await response.json();
          return {
            name: data.name,
            image: data.sprites.front_default,
          };
        } catch (err) {
          console.error("Error fetching/parsing JSON:", err);
          return { name: "ERROR", image: "" };
        }
      });

      try {
        const completeResults = await Promise.allSettled(promises);
        const validResults = completeResults.map((result): PokemonListEntry => {
          if (result.status === "fulfilled") {
            return result.value;
          } else {
            console.error("Fetch error:", result.reason);
            return { name: "ERROR", image: "" };
          }
        });
        setPokemons((curr) => curr.concat(validResults));
      } catch (error) {
        console.error("Unexpected error during fetch operations:", error);
      }
    }

    if (tmp.length > 0) {
      fetchData(tmp.map((obj) => obj.url));
    }
  }, [tmp]);

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pokemon List</ThemedText>
      </ThemedView>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => <Card name={item.name} img={item.image} />}
        keyExtractor={(item) => item.name}
      />
    </ThemedView>
  );
}
