import React from "react";
import renderer from "react-test-renderer";
import Stats from "@/components/pokemon-related/Stats";

test("renders correctly", () => {
  const statsArray = [
    {
      base_stat: 81,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
    {
      base_stat: 102,
      effort: 3,
      stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
    },
    {
      base_stat: 77,
      effort: 0,
      stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 75,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
    },
  ];

  const tree = renderer.create(<Stats statsArray={statsArray} />).toJSON();
  expect(tree).toMatchSnapshot();
});
