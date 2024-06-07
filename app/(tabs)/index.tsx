import React from "react";

import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Pokemon } from "@/assets/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "@/assets/styles";
import Stats from "@/components/pokemon-related/Stats";
import BasicInfo from "@/components/pokemon-related/BasicInfo";

export default function HomeScreen() {
  const [favPokemon, setFavPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const checkStorage = async () => {
      const stored = await AsyncStorage.getItem("favPokemon");
      if (stored) {
        setFavPokemon(JSON.parse(stored));
      }
    };

    checkStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favPokemon", JSON.stringify(favPokemon));
  }, [favPokemon]);

  const handleUnfav = () => {
    setFavPokemon(null);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={
            favPokemon?.sprites.front_default ??
            require("@/assets/images/partial-react-logo.png")
          }
          style={styles.headerImageStyle}
        />
      }
    >
      {favPokemon ? (
        <>
          {/* there is flashing but fixing it is a bother */}
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">This is your favorite pokemon!</ThemedText>
          </ThemedView>
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleUnfav}
              accessibilityLabel="Button to unfav pokemon"
            >
              <ThemedText style={{ color: "white" }}>Not Anymore</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/*is the use of spread justified here?*/}
          <BasicInfo {...favPokemon} />
          <Stats statsArray={favPokemon.stats} />
        </>
      ) : (
        <ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">
              Here your favorite pokemon will show!
            </ThemedText>
          </ThemedView>
          {/* here will be a navigation link to the list */}
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}
