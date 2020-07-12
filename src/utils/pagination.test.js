import { getTotalPage, getPaginationScale } from "./pagination";

describe("getPaginationScale", () => {
  const paginationArr1 = [1, 2, 3, 4, 5]; // page number 1 - 5
  const paginationArr2 = [4, 5, 6, 7, 8]; // page number 4 - 8

  test("should return correct pagination arr when currentPage: 1", () => {
    expect(getPaginationScale(paginationArr1, 1, 10)).toEqual([1, 2, 3, 4, 5]);
  });
  test("should return correct pagination arr when currentPage: 2", () => {
    expect(getPaginationScale(paginationArr1, 2, 10)).toEqual([1, 2, 3, 4, 5]);
  });
  test("should return correct pagination arr when currentPage: 3", () => {
    expect(getPaginationScale(paginationArr1, 3, 10)).toEqual([1, 2, 3, 4, 5]);
  });
  test("should return correct pagination arr when currentPage: 4", () => {
    expect(getPaginationScale(paginationArr1, 4, 10)).toEqual([2, 3, 4, 5, 6]);
  });
  test("should return correct pagination arr when currentPage: 5", () => {
    expect(getPaginationScale(paginationArr1, 5, 10)).toEqual([3, 4, 5, 6, 7]);
  });
  test("should return correct pagination arr when currentPage: 7", () => {
    expect(getPaginationScale(paginationArr2, 7, 10)).toEqual([5, 6, 7, 8, 9]);
  });
  test("should return correct pagination arr when currentPage: 8", () => {
    expect(getPaginationScale(paginationArr2, 8, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});

describe("getTotalPage", () => {
  const totalCount1 = 100;
  const totalCount2 = 81;

  const pageLimit1 = 10;
  const pageLimit2 = 20;

  test(`should return correct total page with totalCount:${totalCount1} and pageLimit:${pageLimit1}`, () => {
    expect(getTotalPage(totalCount1, pageLimit1)).toEqual(10);
  });

  test(`should return correct total page with totalCount:${totalCount1} and pageLimit:${pageLimit2}`, () => {
    expect(getTotalPage(totalCount1, pageLimit2)).toEqual(5);
  });

  test(`should return correct total page with totalCount:${totalCount2} and pageLimit:${pageLimit2}`, () => {
    expect(getTotalPage(totalCount2, pageLimit2)).toEqual(5);
  });
});
