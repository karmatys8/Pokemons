import React from "react";
import renderer from "react-test-renderer";
import BasicInfo from "@/components/pokemon-related/BasicInfo";

test("renders correctly", () => {
  const tree = renderer
    .create(<BasicInfo name="nidoking" height={14} weight={620} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
