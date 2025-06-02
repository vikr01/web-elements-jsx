import jsxRuntimeBuilder, {
  type Element as _Element,
  type IntrinsicElements as _IntrinsicElements,
} from "./jsx-runtime-builder";

type TagToElementMap = Record<never, never>;

const { jsx, jsxs, jsxDEV, Fragment } = jsxRuntimeBuilder<TagToElementMap>();

export { jsx, jsxs, jsxDEV, Fragment };

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type IntrinsicElements = _IntrinsicElements<TagToElementMap>;
  export type Element = _Element;
}
