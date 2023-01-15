import { Country } from "../App";
import { CountryCard } from "./CountryCard";
import React from "react";
import "./CountryList.css";

interface CountryListProps {
  filteredCountries: Country[];
}

export const CountryList: React.FC<CountryListProps> = ({
  filteredCountries,
}) => {
  return (
    <div className="country-list">
      {filteredCountries.map((e: Country) => {
        return <CountryCard key={e.id} country={e} />;
      })}
    </div>
  );
};
