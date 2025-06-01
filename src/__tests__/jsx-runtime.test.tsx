import { describe, expect, test } from "vitest";

describe("jsx-runtime", () => {
	test("properly converts the function call to proper elements", () => {
		expect(<div/>).toBeInstanceOf(HTMLDivElement);
		expect(<a/>).toBeInstanceOf(HTMLAnchorElement);
	});
});
