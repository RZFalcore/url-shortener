import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateLinkPage from "./pages/CreateLinkPage";
import LinkDetailsPage from "./pages/LinkDetailsPage";
import LinksPage from "./pages/LinksPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreateLinkPage />
        </Route>
        <Route path="/details/:id">
          <LinkDetailsPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  } else {
    return <Switch></Switch>;
  }
};
