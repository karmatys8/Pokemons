import React, { useEffect, useState } from "react";

import { FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/pokemon-related/Card";

import { styles } from "@/assets/styles";
import { Pokemon } from "@/assets/types";

interface PokemonToFetch {
  name: string;
  url: string;
}

interface ApiResponse {
  results: PokemonToFetch[];
  next: string;
}

interface PokemonEntry {
  name: string;
  image: string;
}

export default function TabTwoScreen() {
  const [fetchData, setFetchData] = useState<{
    pokemons: PokemonToFetch[];
    nextUrl: string;
  }>({
    pokemons: [],
    nextUrl: "",
  });
  const [pokemons, setPokemons] = useState<PokemonEntry[]>([]);

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
      const promises = urls.map(async (url): Promise<PokemonEntry> => {
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
        const results = await Promise.allSettled(promises);
        const validResults = results.map((result): PokemonEntry => {
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
    };

    if (fetchData.pokemons.length > 0) {
      fetchPokemonDetails(fetchData.pokemons.map((obj) => obj.url));
    }
  }, [fetchData]);

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pokemon List</ThemedText>
      </ThemedView>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => <Card name={item.name} img={item.image} />}
        keyExtractor={(item) => item.name}
        onEndReached={() => fetchListData(fetchData.nextUrl)}
      />
    </ThemedView>
  );
}
