import React, { Dispatch, SetStateAction } from "react";
import { Input } from "semantic-ui-react";

interface FilterByCountryNameInputProps {
  setSearchText: Dispatch<SetStateAction<string>>;
}

export const FilterByCountryNameInput: React.FC<
  FilterByCountryNameInputProps
> = ({ setSearchText }) => {
  return (
    <Input
      icon="search"
      iconPosition="left"
      placeholder="Search for a country..."
      onChange={(_, { value }) => {
        setSearchText(value);
      }}
    />
  );
};
