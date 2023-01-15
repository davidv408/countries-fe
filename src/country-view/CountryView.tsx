import React from "react";
import { Country, ThemeContext, ViewMode } from "../App";
import { Button, Icon } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../shared/Header";
import "./CountryView.css";

interface CountryDetails extends Country {
  subRegion: string | null;
  currencies: Array<string> | null;
  languages: Array<string> | null;
  tld: string | null;
  borderCountries: Array<{ id: string; name: string }> | null;
}

export const CountryView: React.FC = () => {
  const { viewMode } = React.useContext(ThemeContext);
  const { id: countryID } = useParams();
  const [countryDetails, setCountryDetails] =
    React.useState<CountryDetails | null>(null);

  /* Fetch /countries/:id */
  React.useEffect(() => {
    if (!countryID) {
      return;
    }

    void (async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/countries/${countryID}`
        );
        const data = await response.json();
        setCountryDetails(data);
      } catch (e) {
        console.log("Error: ", e);
      }
    })();
  }, [countryID]);

  if (!countryDetails) {
    return null;
  }

  const {
    name,
    population,
    region,
    capital,
    imageURL,
    subRegion,
    currencies,
    languages,
    tld,
    borderCountries,
  } = countryDetails;

  return (
    <React.Fragment>
      <Header />
      <div
        className={`country-view ${
          viewMode === ViewMode.DARK ? "dark-mode" : ""
        }`}
      >
        <Link to={"/"} className="back-button">
          <Button basic>
            <Icon name="arrow left" />
            Back
          </Button>
        </Link>
        <div className="content">
          <img width="100%" height="auto" src={imageURL} />
          <div>
            <h2>{name}</h2>
            <div className="details">
              <div>
                <p>
                  <b>Native Name: </b>
                  {name}
                </p>
                <p>
                  <b>Population: </b>
                  {population}
                </p>
                <p>
                  <b>Region: </b>
                  {region}
                </p>
                <p>
                  <b>Sub Region: </b>
                  {subRegion ?? "-"}
                </p>
                <p>
                  <b>Capital: </b>
                  {capital?.join(", ") ?? "-"}
                </p>
              </div>
              <div>
                <p>
                  <b>Top Level Domain: </b>
                  {tld ?? "-"}
                </p>
                <p>
                  <b>Currencies: </b>
                  {currencies?.join(" ,") ?? "-"}
                </p>
                <p>
                  <b>Languages: </b>
                  {languages?.join(", ") ?? "-"}
                </p>
              </div>
            </div>
            <div className="button-grid">
              <p>
                <b>Border Countries:</b>
              </p>
              {borderCountries
                ? borderCountries.map((e) => {
                    return (
                      <Link
                        to={`/countries/${e.id}`}
                        state={{ id: e.id }}
                        key={e.id}
                      >
                        <Button basic>{e.name}</Button>
                      </Link>
                    );
                  })
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
