import { Country, ThemeContext, ViewMode } from "../App";
import React from "react";
import "./HomeView.css";
import { FilterByCountryNameInput } from "./FilterByCountryNameInput";
import { CountryList } from "./CountryList";
import { FilterByRegionDropdown } from "./FilterByRegionDropdown";
import { Header } from "../shared/Header";
import { LoadingPage } from "../shared/LoadingPage";

export const HomeView: React.FC = () => {
  const { viewMode } = React.useContext(ThemeContext);
  const [isDoneLoading, setIsDoneLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [allCountries, setAllCountries] = React.useState<null | Country[]>(
    null
  );

  /**
   * Add an event listener for when the page is done loading, use that as an indication
   * whether or not to show a loading page.
   * Fetch from /countries/.
   * Remove the event listeners when component unmounts.
   */
  React.useEffect(() => {
    const onPageLoad = () => {
      setIsDoneLoading(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
    }

    void (async () => {
      try {
        const response = await fetch("http://localhost:3001/countries");
        const data = await response.json();
        setAllCountries(data);
      } catch (e) {
        console.log("Error: ", e);
      }
    })();

    return () => window.removeEventListener("load", onPageLoad);
  }, []);

  /** Get the unique set of Region names */
  const regions = React.useMemo(() => {
    if (!allCountries) {
      return;
    }

    const set = new Set<string>();
    for (const country of allCountries) {
      set.add(country.region);
    }
    return Array.from(set);
  }, [allCountries]);

  /* When searchText or regionFilter changes, re-compute the filteredCountries list */
  const filteredCountries = React.useMemo(() => {
    if (!allCountries) {
      return;
    }

    const searchTextUpperCase = searchText.toUpperCase();
    const regionFilterUpperCase = regionFilter.toUpperCase();

    return allCountries.filter((country) => {
      return (
        country.name.toUpperCase().includes(searchTextUpperCase) &&
        country.region.toUpperCase().includes(regionFilterUpperCase)
      );
    });
  }, [allCountries, searchText, regionFilter]);

  if (!isDoneLoading || !allCountries || !regions || !filteredCountries) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Header />
      <div
        className={`home-view ${viewMode === ViewMode.DARK ? "dark-mode" : ""}`}
      >
        <div className="filters">
          <FilterByCountryNameInput setSearchText={setSearchText} />
          <FilterByRegionDropdown
            regions={regions}
            setRegionFilter={setRegionFilter}
          />
        </div>
        <CountryList filteredCountries={filteredCountries} />
      </div>
    </React.Fragment>
  );
};
