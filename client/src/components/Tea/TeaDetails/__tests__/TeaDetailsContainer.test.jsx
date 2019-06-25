import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import TeaDetailsContainer from "../TeaDetailsContainer";
import { TeaDetailsContainerClass } from "../TeaDetailsContainer";

let mockFunc;
let mockTeaFlash;
beforeEach(() => {
  mockFunc = jest.fn();
  mockTeaFlash = jest.fn();
});
afterEach(cleanup);

describe("TeaDetailsContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(dataFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );
    expect(queryByTestId("teadetails")).toBeTruthy();
  });
});

describe("TeaDetailsContainer flash", () => {
  test("tea detail renders with flash message after update", () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={dataFixture.basicTea}
        flash={"on"}
      />
    );
    expect(queryByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", () => {
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={dataFixture.basicTea}
        flash={"on"}
      />
    );
    fireEvent.click(getByTestId("flash"), "off");
    expect(mockTeaFlash).toBeCalledWith("off");
  });
});

describe("teaDetails interactions", () => {
  test("user clicks edit to update tea", () => {
    const { getByTestId, history } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={dataFixture.basicTea}
        flash={"on"}
      />
    );
    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toMatch("/update-tea/");
  });
});