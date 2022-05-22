import {
  CombinedState,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";
import { queries, Queries } from "@testing-library/dom";
import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from "@testing-library/react";
import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { shoppingCartReducer } from "./shopping";
import { State } from "./store";

export * from "@testing-library/react";

interface RenderOptions<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
> extends Omit<RtlRenderOptions<Q, Container, BaseElement>, "wrapper"> {
  preloadedState?: PreloadedState<CombinedState<NoInfer<State>>>;
}

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
  const Providers: FunctionComponent<PropsWithChildren<{}>> = ({
    children,
  }) => <Provider store={store}>{children}</Provider>;
  return { ...rtlRender(ui, { ...options, wrapper: Providers }), store };
};
