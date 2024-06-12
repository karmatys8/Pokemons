import React from "react";

import { Pressable } from "react-native";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "@/assets/styles";
import Stats from "@/components/pokemon-related/Stats";
import BasicInfo from "@/components/pokemon-related/BasicInfo";
import { useFavPokemon } from "@/contexts/FavPokemon";

export default function HomeScreen() {
  const { favPokemon, setFavPokemon } = useFavPokemon();

  useEffect(() => {
    const checkStorage = async () => {
      const stored = await AsyncStorage.getItem("favPokemon");
      if (stored) {
        setFavPokemon(JSON.parse(stored));
      }
    };

    checkStorage();
  }, []);

  const handleUnfav = () => {
    setFavPokemon(null);
  };

  const renderFallback = (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Here your favorite pokemon will show!
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );

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
      {!favPokemon ? (
        renderFallback
      ) : (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">This is your favorite pokemon!</ThemedText>
          </ThemedView>
          <ThemedView style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonStyle}
              onPress={handleUnfav}
              accessibilityLabel="Button to unfav pokemon"
            >
              <ThemedText style={{ color: "white" }}>Not Anymore</ThemedText>
            </Pressable>
          </ThemedView>
          <BasicInfo {...favPokemon} />
          <Stats statsArray={favPokemon.stats} />
        </>
      )}
    </ParallaxScrollView>
  );
}
