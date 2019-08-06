import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../../../test/__fixtures__/teaTypeFixture";
import { TeaTypeEditorContainerClass } from "../TeaTypeEditorContainer";

let mockFunc;
let mockAdd;
let mockEdit;

beforeEach(() => {
  mockFunc = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockAdd = jest.fn(() => Promise.resolve(storeFixture.addedStore));
  mockEdit = jest.fn(() => Promise.resolve(storeFixture.updatedStore));
});

describe("teaTypeEditor form success", () => {
  test("editor form submit succesfully adds tea type", async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaTypeEditorContainerClass
        teaTypes={teaTypeFixture.teaTypes}
        userID={dataFixture.mockUserID}
        getTeaTypes={mockFunc}
        addTeaType={mockAdd}
      />
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.name }
    });
    fireEvent.change(getByTestId("brewtimemin"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.brewTimeMin }
    });
    fireEvent.change(getByTestId("brewtimesec"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.brewTimeSec }
    });
    expect(getByTestId("teatypeeditorform")).toHaveFormValues({
      name: teaTypeFixture.basicTeaTypeFormValues.name,
      brewTimeMin: teaTypeFixture.basicTeaTypeFormValues.brewTimeMin,
      brewTimeSec: teaTypeFixture.basicTeaTypeFormValues.brewTimeSec
    });

    fireEvent.click(getByTestId("submit"));
    expect(queryByTestId("flash")).toHaveTextContent(/Black/);
  });

  test("editor form succesfully updates tea type", async () => {
    const { getByTestId } = renderWithRouter(
      <TeaTypeEditorContainerClass
        teaTypes={teaTypeFixture.teaTypes}
        userID={dataFixture.mockUserID}
        currentTeaType={teaTypeFixture.basicTeaType}
        edit={true}
        getTeaTypes={mockFunc}
        editTeaType={mockEdit}
        editFlash={mockEdit}
        history={dataFixture.history}
      />
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaTypeFixture.updatedTeaTypeFormValues.name }
    });

    expect(getByTestId("teatypeeditorform")).toHaveFormValues({
      name: teaTypeFixture.updatedTeaType.name
    });

    fireEvent.click(getByTestId("submit"));
    expect(dataFixture.history.push).toHaveBeenCalledWith("/tea-types/");
  });
});

describe("teaTypeEditor form failure", () => {
  describe("editor onSubmit returns an error message if data is invalid", () => {
    test("missing information for new tea type", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaTypeEditorContainerClass
          teaTypes={teaTypeFixture.teaTypes}
          userID={dataFixture.mockUserID}
          currentTeaType={""}
          getTeaTypes={mockFunc}
          editTeaType={mockEdit}
          editFlash={mockEdit}
          history={dataFixture.history}
        />
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(2);
    });

    test("missing information for existing tea type", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaTypeEditorContainerClass
          teaTypes={teaTypeFixture.teaTypes}
          userID={dataFixture.mockUserID}
          currentTeaType={teaTypeFixture.missingDataTeaType}
          getTeaTypes={mockFunc}
          editTeaType={mockEdit}
          editFlash={mockEdit}
          history={dataFixture.history}
        />
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });
  });
});
