import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pokemon } from "@/assets/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavPokemonContextType {
  favPokemon: Pokemon | null;
  setFavPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const FavPokemonContext = createContext<FavPokemonContextType | undefined>(
  undefined
);

export const useFavPokemon = () => {
  const context = useContext(FavPokemonContext);
  if (context === undefined) {
    throw new Error("useFavPokemon must be used within a FavPokemonProvider");
  }
  return context;
};

interface FavPokemonProviderProps {
  children: ReactNode;
}

export const FavPokemonProvider: React.FC<FavPokemonProviderProps> = ({
  children,
}) => {
  const [favPokemon, setFavPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    AsyncStorage.setItem("favPokemon", JSON.stringify(favPokemon));
  }, [favPokemon]);

  return (
    <FavPokemonContext.Provider value={{ favPokemon, setFavPokemon }}>
      {children}
    </FavPokemonContext.Provider>
  );
};
