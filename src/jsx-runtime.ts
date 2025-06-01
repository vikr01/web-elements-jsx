import jsxRuntimeBuilder, {
  type Element as _Element,
  type IntrinsicElements as _IntrinsicElements
} from './jsx-runtime-builder';

type TagToElementMap = Record<never, never>;

const {jsx, jsxs, jsxDEV} = jsxRuntimeBuilder<TagToElementMap>();

export {
  jsx,
  jsxs,
  jsxDEV,
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends _IntrinsicElements<TagToElementMap> {}
    interface Element extends _Element {}
  }
}
