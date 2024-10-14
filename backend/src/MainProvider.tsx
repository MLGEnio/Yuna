"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { ApolloProvider } from '@apollo/client';
import { client } from "./helpers/apollo";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>{children}</Provider>
      </ApolloProvider>
    </>
  );
};

export default MainProvider;
