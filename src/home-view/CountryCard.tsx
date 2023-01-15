import React from "react";
import { Link } from "react-router-dom";
import { Country } from "../App";
import "./CountryCard.css";

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const { id, name, population, region, capital, imageURL } = country;

  return (
    <Link className="country-card" to={`/countries/${id}`} state={{ id }}>
      <img width="100%" height="auto" src={imageURL} />
      <div className="text-content">
        <h3>{name}</h3>
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital ? capital.join(", ") : "-"}</p>
      </div>
    </Link>
  );
};
