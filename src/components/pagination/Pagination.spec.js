import { mount } from "enzyme";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const currentPage = 1;
  const totalCount = 100;
  const pageLimit = 10;
  const onChangeMock = jest.fn();

  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onChange={onChangeMock}
      />
    );
  });

  it("should shallow without crashing", () => {
    expect(wrapper.find("#pagination-comp")).toHaveLength(1);
  });

  it("should trigger onChange when btn-next clicked", () => {
    wrapper.find("#btn-next").simulate("click");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should trigger onChange when btn-prev clicked", () => {
    wrapper.find("#btn-prev").simulate("click");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
