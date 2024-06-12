import React from "react";

import { Modal, Pressable, StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { Pokemon } from "@/types";
import { styles } from "@/assets/styles";
import BasicInfo from "./BasicInfo";
import Stats from "./Stats";
import { useFavPokemon } from "@/contexts/FavPokemon";

type StatsProps = {
  isModalVisible: boolean;
  setFocusedPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  pokemon: Pokemon | null;
};

const PokemonModal: React.FC<StatsProps> = ({
  isModalVisible,
  setFocusedPokemon,
  pokemon,
}) => {
  const { setFavPokemon } = useFavPokemon();

  const handleClose = () => {
    setFocusedPokemon(null);
  };

  const handleFav = () => {
    setFavPokemon(pokemon);
    handleClose();
  };

  const renderCloseButton = (
    <Pressable
      style={localStyles.closeButton}
      onPress={handleClose}
      accessibilityLabel="Close Modal"
    >
      <ThemedText style={{ fontSize: 18 }}>X</ThemedText>
    </Pressable>
  );

  const renderFavButton = (
    <ThemedView style={styles.buttonContainer}>
      <Pressable
        style={styles.buttonStyle}
        onPress={handleFav}
        accessibilityLabel="Button to fav pokemon"
      >
        <ThemedText style={{ color: "white" }}>Yes, indeed, I do.</ThemedText>
      </Pressable>
    </ThemedView>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleClose}
    >
      <ThemedView style={localStyles.centeredView}>
        <ThemedView style={localStyles.modalView}>
          {renderCloseButton}
          <ThemedView style={styles.stepContainer}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Do you fancy this pokemon?</ThemedText>
            </ThemedView>
            {renderFavButton}
            {pokemon && (
              <>
                <BasicInfo {...pokemon} />
                <Stats statsArray={pokemon.stats} />
              </>
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: -20,
    marginRight: -20,
    marginBottom: 20,
    padding: 5,
  },
});

export default PokemonModal;
