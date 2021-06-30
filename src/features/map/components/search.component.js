import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon="map"
        placeholder="Search for a location"
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        value={searchKeyword}
      />
    </SearchContainer>
  );
};
