import { describe, expect, it } from "vitest";
import { Fragment } from "../jsx-runtime";

describe("jsx-runtime", () => {
  it("properly converts the function call to proper elements", () => {
    expect(<div />).toBeInstanceOf(HTMLDivElement);
    expect(<a />).toBeInstanceOf(HTMLAnchorElement);
  });

  it("can handle document fragments", () => {
    expect(<></>).toBeInstanceOf(DocumentFragment);
    expect(<Fragment></Fragment>).toBeInstanceOf(DocumentFragment);
  });

  it("can handle custom document fragments", () => {
    class MyCustomDocumentFragment extends DocumentFragment {}

    expect(
      <MyCustomDocumentFragment></MyCustomDocumentFragment>,
    ).toBeInstanceOf(MyCustomDocumentFragment);
  });
});
