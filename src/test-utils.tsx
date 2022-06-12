import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { queries, Queries } from "@testing-library/dom";
import * as rtl from "@testing-library/react";
import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { shoppingCartReducer } from "./shopping";
import { State } from "./store";

interface RenderOptions<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
> extends Omit<rtl.RenderOptions<Q, Container, BaseElement>, "wrapper"> {
  preloadedState?: ConfigureStoreOptions<State>["preloadedState"];
}

export * from "@testing-library/react";

export const render = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: ReactElement,
  { preloadedState, ...options }: RenderOptions<Q, Container, BaseElement> = {}
) => {
  const store = configureStore({
    reducer: {
      shoppingCart: shoppingCartReducer,
    },
    preloadedState,
  });
  const Providers: FunctionComponent<
    PropsWithChildren<Record<string, unknown>>
  > = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { ...rtl.render(ui, { ...options, wrapper: Providers }), store };
};
