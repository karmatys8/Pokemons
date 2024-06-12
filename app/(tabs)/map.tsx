import React, { useState } from "react";

import MapView, { Marker, LongPressEvent } from "react-native-maps";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

import { Pokemon } from "@/types";
import { DEFAULT_POKEMON } from "@/constants/DefaultPokemon";
import { useFavPokemon } from "@/contexts/FavPokemon";
import PokemonModal from "@/components/pokemon-related/PokemonModal";

type EncounterData = {
  pokemon: Pokemon;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function Map() {
  const [markers, setMarkers] = useState<EncounterData[]>([]);
  const [focusedPokemon, setFocusedPokemon] = useState<Pokemon | null>(null);
  const { favPokemon } = useFavPokemon();

  const handleAddPin = (event: LongPressEvent) => {
    event.persist();

    const newEncounter: EncounterData = {
      pokemon: favPokemon ?? DEFAULT_POKEMON,
      coordinates: event.nativeEvent.coordinate,
    };
    setMarkers((curr) => [...curr, newEncounter]);
  };

  return (
    <ThemedView style={localStyles.container}>
      <PokemonModal
        isModalVisible={focusedPokemon !== null}
        setFocusedPokemon={setFocusedPokemon}
        pokemon={focusedPokemon}
      />
      <MapView style={localStyles.map} onLongPress={handleAddPin}>
        {markers.map((marker) => (
          <Marker
            coordinate={marker.coordinates}
            onPress={() => setFocusedPokemon(marker.pokemon)}
            key={`${marker.coordinates.latitude} ${marker.coordinates.longitude}`}
          />
        ))}
      </MapView>
    </ThemedView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
