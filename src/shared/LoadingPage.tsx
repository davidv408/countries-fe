import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

export const LoadingPage: React.FC = () => {
  return (
    <Segment style={{width: '100vw', height: '100vh'}}>
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    </Segment>
  );
};
