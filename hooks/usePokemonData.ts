import { useState, useEffect } from 'react';
import { Pokemon } from '@/types';
import { ERROR_POKEMON } from '@/constants/ErrorPokemon';

type PokemonToFetch = {
    name: string;
    url: string;
  };

type FetchResponse = {
  pokemons: PokemonToFetch[];
  nextUrl: string;
};

async function fetchListData(url: string): Promise<FetchResponse> {
  if (!url) return { pokemons: [], nextUrl: '' };
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return { pokemons: data.results, nextUrl: data.next };
  } catch (err) {
    console.error("Failed to load initial pokemons:", err);
    return { pokemons: [], nextUrl: '' };
  }
}

async function fetchPokemonDetails(urls: string[]): Promise<Pokemon[]> {
  const promises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      const data: Pokemon = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching/parsing JSON:", err);
      return ERROR_POKEMON;
    }
  });
  const results = await Promise.allSettled(promises);
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : ERROR_POKEMON
  );
}

export function usePokemonData(initialUrl: string) {
  const [fetchData, setFetchData] = useState<FetchResponse>({ pokemons: [], nextUrl: initialUrl });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchListData(initialUrl).then(data => setFetchData(data));
  }, [initialUrl]);

  useEffect(() => {
    if (fetchData.pokemons.length > 0) {
      fetchPokemonDetails(fetchData.pokemons.map(p => p.url)).then(newPokemons => {
        setPokemons(prev => prev.concat(newPokemons));
      });
    }
  }, [fetchData.pokemons]);

  return { pokemons, fetchNext: () => fetchListData(fetchData.nextUrl).then(data => setFetchData(data)) };
}