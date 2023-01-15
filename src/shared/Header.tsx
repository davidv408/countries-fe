import { Button, Icon } from "semantic-ui-react";
import React from "react";
import { ThemeContext, ViewMode } from "../App";
import "./Header.css";

export const Header: React.FC = () => {
  const { viewMode, toggleViewMode } = React.useContext(ThemeContext);

  return (
    <div className="heading">
      <div
        className={`heading-content ${viewMode === ViewMode.DARK ? "dark-mode" : ""}`}
      >
        <h1>Where in the world?</h1>
        <Button basic onClick={toggleViewMode}>
          <Icon
            name={viewMode === ViewMode.LIGHT ? "moon outline" : "sun outline"}
          />
          {viewMode === ViewMode.LIGHT ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
      <div className="hr" />
    </div>
  );
};
