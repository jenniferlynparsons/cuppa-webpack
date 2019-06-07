import React from "react";
import { shallow } from "enzyme";
import Footer from "../";

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Footer {...setupProps} />);
};

describe("footer rendering", () => {
  test("footer renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
