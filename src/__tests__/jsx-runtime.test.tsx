import { describe, expect, it } from "vitest";
import { Fragment } from "../jsx-runtime";

describe("jsx-runtime", () => {
  it("properly converts the function call to proper elements", () => {
    expect(<div />).toBeInstanceOf(HTMLDivElement);
    expect(<a />).toBeInstanceOf(HTMLAnchorElement);
  });

  it("can handle fragments", () => {
    expect(<></>).toBeInstanceOf(DocumentFragment);
    expect(<Fragment></Fragment>).toBeInstanceOf(DocumentFragment);
  });

  it("can handle custom document fragments", () => {
    class MyCustomDocumentFragment extends DocumentFragment {}

    expect(
      <MyCustomDocumentFragment></MyCustomDocumentFragment>,
    ).toBeInstanceOf(MyCustomDocumentFragment);

    const inner = <div />;
    const withChildren = (
      <MyCustomDocumentFragment>{inner}</MyCustomDocumentFragment>
    );

    expect(withChildren.children[0]).toBe(inner);
  });

  it("can handle the true document fragment class", () => {
    expect(<DocumentFragment></DocumentFragment>).toBeInstanceOf(
      DocumentFragment,
    );

    const DocFrag = DocumentFragment;

    const elementInner = <span />;
    const fragmentRoot = <DocFrag>{elementInner} </DocFrag>;

    expect(fragmentRoot).toBeInstanceOf(DocumentFragment);
    expect(fragmentRoot.children[0]).toBe(elementInner);
  });
});
