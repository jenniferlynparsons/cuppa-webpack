import { makeMockStore } from "../../test/testUtils";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import API from "../../lib/api";
import { globalAddTeaType, globalEditTeaType, globalDeleteTeaType, globalGetTeaTypes } from "../globalTeaTypeActions";

const store = makeMockStore(storeFixture.basicStore);

// Required for the API mock scope (must have `mock` prefix)
const mockteaTypePost = teaTypeFixture.teaPostResponse;
const mockteaTypePatch = teaTypeFixture.teaPatchResponse;
const mockteaTypeGet = teaTypeFixture.teaGetResponse;
jest.mock("../../lib/api", () => {
  return {
    post: jest.fn(() => Promise.resolve(mockteaTypePost)),
    patch: jest.fn(() => Promise.resolve(mockteaTypePatch)),
    delete: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve(mockteaTypeGet))
  };
});

beforeEach(() => {
  store.clearActions();
});

describe("globalAddTeaType", () => {
  test("returns a function", () => {
    expect(globalAddTeaType(teaTypeFixture.reducerAddTeaType)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea type data", () => {
    store.dispatch(globalAddTeaType(teaTypeFixture.reducerAddTeaType));
    let spy = jest.spyOn(API, "post");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the ADD_TEATYPE action type and payload", async () => {
    await store.dispatch(globalAddTeaType(teaTypeFixture.reducerAddTeaType));
    expect(store.getActions()[0].payload).toEqual(teaTypeFixture.teaPostResponse);
    expect(store.getActions()[0].type).toEqual("ADD_TEATYPE");
  });
});

describe("globalEditTeaType", () => {
  test("returns a function", () => {
    expect(globalEditTeaType(teaTypeFixture.reducerEditTeaType)).toBeInstanceOf(Function);
  });
  test("it calls 'patch' on the API with the correct path and the tea type data", () => {
    store.dispatch(globalEditTeaType(teaTypeFixture.reducerEditTeaType));
    let spy = jest.spyOn(API, "patch");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the EDIT_TEATYPE action type and payload", async () => {
    await store.dispatch(globalEditTeaType(teaTypeFixture.reducerEditTeaType));
    expect(store.getActions()[0].payload).toEqual(teaTypeFixture.teaPatchResponse);
    expect(store.getActions()[0].type).toEqual("EDIT_TEATYPE");
  });
});

describe("globalDeleteTeaType", () => {
  test("returns a function", () => {
    expect(globalDeleteTeaType(storeFixture.basicStore.teas.teaIDs[1])).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea type data", () => {
    store.dispatch(globalDeleteTeaType(storeFixture.basicStore.teas.teaIDs[1]));
    let spy = jest.spyOn(API, "delete");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the DELETE_TEATYPE action type and payload", async () => {
    await store.dispatch(globalDeleteTeaType(storeFixture.basicStore.teaTypes.teaTypeIDs[1]));
    expect(store.getActions()[0].payload).toEqual(storeFixture.basicStore.teaTypes.teaTypeIDs[1]);
    expect(store.getActions()[0].type).toEqual("DELETE_TEATYPE");
  });
});

describe("globalGetTeaTypes", () => {
  test("returns a function", () => {
    expect(globalGetTeaTypes(storeFixture.basicStore.teaTypes)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea type data", () => {
    store.dispatch(globalGetTeaTypes(storeFixture.basicStore.auth.user.id));
    let spy = jest.spyOn(API, "get");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the GET_TEATYPES action type and payload", async () => {
    await store.dispatch(globalGetTeaTypes());
    expect(store.getActions()[0].payload).toEqual(teaTypeFixture.basicTeaTypes);
    expect(store.getActions()[0].type).toEqual("GET_TEATYPES");
  });
});
