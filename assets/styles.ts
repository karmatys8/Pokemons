import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    buttonStyle: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#007AFF",
      borderRadius: 5,
      alignItems: "center",
      cursor: "pointer",
    },
    buttonContainer: {
      maxWidth: 400,
      marginVertical: 10,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    headerImageStyle: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    smallPokemonImage: {
      height: 96,
      aspectRatio: "1 / 1",
      backgroundColor: "#cccccc"
    }
  });