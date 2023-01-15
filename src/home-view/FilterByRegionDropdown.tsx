import React, { Dispatch, SetStateAction } from "react";
import { Country } from "../App";
import { Dropdown } from "semantic-ui-react";

interface FilterByCountryNameInputProps {
  regions: Array<string>;
  setRegionFilter: Dispatch<SetStateAction<string>>;
}

export const FilterByRegionDropdown: React.FC<
  FilterByCountryNameInputProps
> = ({ regions, setRegionFilter }) => {
  const dropdownOptions = regions.map((region) => {
    return {
      key: region,
      text: region,
      value: region,
    };
  });
  return (
    <Dropdown
      clearable
      options={dropdownOptions}
      placeholder="Filter by Region"
      selection
      onChange={(_, { value }) => {
        if (typeof value === "string") {
          setRegionFilter(value);
        }
      }}
    />
  );
};
