import { shallow } from "enzyme";
import Table from "./Table";
import dummyJson from "../../dummy/couponList.json";
import { getColumns } from "../../constants/couponTableConfig";

describe("Table Component", () => {
  const handleSortMock = jest.fn();
  const couponList = dummyJson.data.coupon;
  const firstIndex = 1;

  it("should shallow without crashing", () => {
    const wrapper = shallow(
      <Table
        columns={getColumns(firstIndex)}
        dataSource={couponList}
        handleSort={handleSortMock}
      />
    );
    expect(wrapper.find("#table-comp")).toHaveLength(1);
  });
});
