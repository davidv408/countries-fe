import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView } from "./home-view/HomeView";
import { CountryView } from "./country-view/CountryView";

export const ViewMode = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

export const ThemeContext = React.createContext({
  viewMode: ViewMode.LIGHT,
  toggleViewMode: () => {},
});

export interface Country {
  id: string;
  name: string;
  population: string;
  region: string;
  capital: Array<string> | null;
  imageURL: string;
}

export const App: React.FC = () => {
  const [viewMode, setViewMode] = React.useState(ViewMode.LIGHT);

  const toggleViewMode = () => {
    if(viewMode === ViewMode.LIGHT) {
      setViewMode(ViewMode.DARK);
    } else {
      setViewMode(ViewMode.LIGHT);
    }
  };

  return (
    <ThemeContext.Provider value={{viewMode, toggleViewMode}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/countries/:id" element={<CountryView />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};
