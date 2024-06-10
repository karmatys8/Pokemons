export interface Stat {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export interface Pokemon {
    height: number,
    id: number,
    name: string,
    sprites: {
        back_default: string,
        back_female: string | null,
        back_shiny: string,
        back_shiny_female: string | null,
        front_default: string,
        front_female: string | null,
        front_shiny: string,
        front_shiny_female: string | null,
    },
    stats: Stat[],
    weight: number
}

export const errorPokemon = {
    name: "ERROR",
    sprites: {
      front_default: "",
      back_default: "",
      back_shiny: "",
      front_shiny: "",
      back_female: null,
      back_shiny_female: null,
      front_female: null,
      front_shiny_female: null,
    },
    height: 0,
    weight: 0,
    stats: [],
    id: -1,
  };

export const defaultPokemon = {
    height: 3,
    id: 16,
    name: "pidgey",
    sprites: {
        back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png",
        back_female: null,
        back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/16.png",
        back_shiny_female: null,
        front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
        front_female: null,
        front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/16.png",
        front_shiny_female: null,
    },
    stats: [
    {
      base_stat: 40,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
    },
    {
      base_stat: 40,
      effort: 0,
      stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
    },
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 56,
      effort: 1,
      stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
    },
  ],
  weight: 18,
};