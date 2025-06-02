/**
 * Not very well-documented yet, but this follows the syntax set by Typescript/Babel
 * https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-namespace
 * https://babeljs.io/docs/babel-plugin-transform-react-jsx#importsource
 **/

type CustomTagElementNameMapSuperType = { [key: string]: Element };

type TagClassMapMerged<TStrToClass extends CustomTagElementNameMapSuperType> =
  Omit<HTMLElementTagNameMap, keyof TStrToClass> & TStrToClass;
type Tag<T extends CustomTagElementNameMapSuperType> =
  keyof TagClassMapMerged<T>;

const FRAGMENT: { new (): DocumentFragment } = DocumentFragment;

type FragmentProps<T extends DocumentFragment> = Readonly<{
  children?:
    | undefined
    | null
    | Parameters<T["append"]>
    | Parameters<T["append"]>[0];
}>;
type AllowedFragmentTypes<T extends DocumentFragment> =
  | typeof FRAGMENT
  | { new (): T };

export type JsxFn<
  TCustomTagElementNameMap extends CustomTagElementNameMapSuperType,
> = {
  <TFrag extends DocumentFragment = DocumentFragment>(
    tag: AllowedFragmentTypes<TFrag>,
    props: FragmentProps<TFrag>,
  ): TFrag;
  <TTag extends Tag<TCustomTagElementNameMap>>(
    tag: TTag,
    props: Readonly<Record<string, string>>,
  ): TagClassMapMerged<TCustomTagElementNameMap>[TTag];
};

function jsxFragment<TFrag extends DocumentFragment = DocumentFragment>(
  tag: AllowedFragmentTypes<TFrag>,
  props: FragmentProps<TFrag>,
): TFrag {
  let fragmentContainer: TFrag;
  if (tag === FRAGMENT) {
    fragmentContainer = document.createDocumentFragment() as TFrag;
  } else if (
    tag === DocumentFragment ||
    (typeof tag === "function" && tag.prototype instanceof DocumentFragment)
  ) {
    fragmentContainer = new tag() as TFrag;
  } else {
    throw new Error(`Invalid JSX fragment received: ${tag?.name ?? tag}`);
  }

  const children = props?.children;

  if (children != null) {
    if (Array.isArray(children)) {
      fragmentContainer.append(...children);
    } else {
      fragmentContainer.append(children);
    }
  }

  return fragmentContainer;
}

export function jsx<
  T extends CustomTagElementNameMapSuperType,
  TTag extends Tag<T>,
  TFrag extends DocumentFragment = DocumentFragment,
>(
  tag: TTag | AllowedFragmentTypes<TFrag>,
  props: Readonly<Record<string, string>>,
): TagClassMapMerged<T>[TTag] | TFrag {
  if (
    tag === FRAGMENT ||
    tag === DocumentFragment ||
    (typeof tag === "function" && tag.prototype instanceof DocumentFragment)
  ) {
    return jsxFragment<TFrag>(tag as AllowedFragmentTypes<TFrag>, props);
  }

  if (typeof tag === "function") {
    throw new Error("This is not supported yet.");
  }

  const element = document.createElement(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tag as any,
  ) as TagClassMapMerged<T>[typeof tag];

  for (const key in props) {
    const v = props[key];

    if (key === "children") {
      element.append(v);
      continue;
    }

    element.setAttribute(key, v);
  }

  return element;
}

export default function build<
  T extends CustomTagElementNameMapSuperType,
>(): Readonly<{
  jsx: JsxFn<T>;
  jsxs: JsxFn<T>;
  jsxDEV: JsxFn<T>;
  Fragment: typeof FRAGMENT;
}> {
  const _jsx = jsx as JsxFn<T>;

  return {
    jsx: _jsx,
    jsxs: _jsx,
    jsxDEV: _jsx,
    Fragment: FRAGMENT,
  };
}

export type IntrinsicElements<T extends CustomTagElementNameMapSuperType> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in Tag<T>]: any;
};

type El = Element | DocumentFragment;
export type { El as Element };
