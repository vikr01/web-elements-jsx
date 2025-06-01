/**
 * Not very well-documented yet, but this follows the syntax set by Typescript/Babel
 * https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-namespace
 * https://babeljs.io/docs/babel-plugin-transform-react-jsx#importsource
 **/

import type { HtmlTags } from "html-tags";

type CustomTagElementNameSuperType = {[key: string]: Element};

type TagClassMapMerged<TStrToClass extends CustomTagElementNameSuperType> = Omit<HTMLElementTagNameMap, keyof TStrToClass> & TStrToClass;
type Tag<T extends CustomTagElementNameSuperType> = keyof TagClassMapMerged<T>;

export function jsx<T extends CustomTagElementNameSuperType, TTag extends Tag<T>>(tag: TTag, props: Readonly<Record<string, string>>): TagClassMapMerged<T>[TTag] {
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

export type IntrinsicElements<T extends CustomTagElementNameSuperType> = {
	[K in Tag<T>]: any;
};

type El = Element;
export type { El as Element };

export default function build<
	T extends CustomTagElementNameSuperType,
	>() {
	const _jsx = jsx as <TTag extends Tag<T>>(...args: Parameters<typeof jsx<T, TTag>>)=>ReturnType<typeof jsx<T, TTag>>;
	return {
		jsx: _jsx,
		jsxs: _jsx,
		jsxDEV: _jsx,
	};
}
