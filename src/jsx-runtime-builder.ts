/**
 * Not very well-documented yet, but this follows the syntax set by Typescript/Babel
 * https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-namespace
 * https://babeljs.io/docs/babel-plugin-transform-react-jsx#importsource
 **/

type CustomTagElementNameMapSuperType = {[key: string]: Element};

type TagClassMapMerged<TStrToClass extends CustomTagElementNameMapSuperType> = Omit<HTMLElementTagNameMap, keyof TStrToClass> & TStrToClass;
type Tag<T extends CustomTagElementNameMapSuperType> = keyof TagClassMapMerged<T>;

const fragmentSymbol: unique symbol = Symbol('fragment');

export type JsxFn<TCustomTagElementNameMap extends CustomTagElementNameMapSuperType> = {
	<TFrag extends DocumentFragment = DocumentFragment>(tag: typeof fragmentSymbol | TFrag, props: Readonly<{children?: undefined | null | string | Element}> | undefined | never): TFrag;
	<TTag extends Tag<TCustomTagElementNameMap>>(tag: TTag, props: Readonly<Record<string, string>>): TagClassMapMerged<TCustomTagElementNameMap>[TTag]
};

export function jsx<
		T extends CustomTagElementNameMapSuperType,
		TTag extends Tag<T>
	>(tag: TTag | typeof fragmentSymbol, props: Readonly<Record<string, string>>): TagClassMapMerged<T>[TTag] | DocumentFragment {
		if (tag === fragmentSymbol) {
			const fragmentContainer = document.createDocumentFragment();
			const children = props?.children ?? null;
			if (children !== null) {

			}
			return fragmentContainer;
		}

	const element = document.createElement((tag as any)) as TagClassMapMerged<T>[typeof tag];

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

type ForcedFragmentTypeByTypescript = {new (...args: any[]): DocumentFragment};

export default function build<
	T extends CustomTagElementNameMapSuperType,
	>(): Readonly<{
		jsx: JsxFn<T>,
		jsxs: JsxFn<T>,
		jsxDEV: JsxFn<T>,
		Fragment: ForcedFragmentTypeByTypescript,
	}> {
	const _jsx = jsx as JsxFn<T>;

	return {
		jsx: _jsx,
		jsxs: _jsx,
		jsxDEV: _jsx,
		Fragment: fragmentSymbol as unknown as ForcedFragmentTypeByTypescript,
	};
}

export type IntrinsicElements<T extends CustomTagElementNameMapSuperType> = {
	[K in Tag<T>]: any;
};

type El = Element | DocumentFragment;
export type { El as Element };
