import { describe, expect, test } from "vitest";
import { Fragment } from "../jsx-runtime";

describe("jsx-runtime", () => {
	test("properly converts the function call to proper elements", () => {
		expect(<div/>).toBeInstanceOf(HTMLDivElement);
		expect(<a/>).toBeInstanceOf(HTMLAnchorElement);
	});

	test("can handle document fragments", () => {
		expect(<></>).toBeInstanceOf(DocumentFragment);
		// @ts-expect-error Typescript expects Fragment to be a class not a symbol, even though it passes.
		expect(<Fragment></Fragment>).toBeInstanceOf(DocumentFragment);
	});
});
