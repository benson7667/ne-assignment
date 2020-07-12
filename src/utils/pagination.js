/*

Let's say we have totalPage = 10, pagination scale will show only maximum 5 pages  [1,2,3,4,5] 

Scenario: Given current pagination showing [1,2,3,4,5]
user click page 1 or 2 or 3, current active page = 5, pagination scale => [1,2,3,4,5]
user click page 4, current active page = 4, pagination scale => [1,2,3,4,5,6]
user click page 5, current active page = 5, pagination scale => [3,4,5,6,7]


Scenario: Given current pagination showing [4,5,6,7,8]
user click page 4; current active page = 4, pagination scale => [1,2,3,4,5,6]
user click page 5; current active page = 5, pagination scale => [3,4,5,6,7]
user click page 8; current active page = 8, pagination scale => [6,7,8,9,10]

*/
export function getPaginationScale(currArr, newCurrPage, totalPage) {
  const centerNumberIndex = Math.floor(currArr.length / 2);
  const centerNumber = currArr[centerNumberIndex];

  // no changes
  if (newCurrPage === centerNumber) return currArr;

  // shift whole arr to the right until newCurrPage in the center
  if (newCurrPage < centerNumber) {
    let steps = centerNumber - newCurrPage;
    while (steps !== 0 && currArr[0] !== 1) {
      const numberToInsert = currArr[0] - 1;
      currArr.splice(0, 0, numberToInsert);
      currArr.splice(-1, 1);
      steps--;
    }

    // if one more unshow item is last page, display it together
    if (currArr[currArr.length - 1] + 1 === totalPage) {
      return [...currArr, totalPage];
    }
    return currArr;
  }

  // shiflt whole arr to the left until newCurrPage in the center
  if (newCurrPage > centerNumber) {
    let steps = newCurrPage - centerNumber;
    while (steps !== 0 && currArr[currArr.length - 1] !== totalPage) {
      const numberToInsert = currArr[currArr.length - 1] + 1;
      currArr.push(numberToInsert);
      currArr.splice(0, 1);
      steps--;
    }

    // if one more unshow page is first page, display it together
    if (currArr[0] - 1 === 1) {
      return [1, ...currArr];
    }
    return currArr;
  }
}

/*

eg: totalCount: 81, pageLimit: 20, we will still have total 5 pages
eg: totalCount: 100, pageLimit: 20, we have total 5 pages
  
*/
export function getTotalPage(totalCount, pageLimit) {
  const totalPage =
    totalCount % pageLimit === 0
      ? Math.floor(totalCount / pageLimit)
      : Math.floor(totalCount / pageLimit) + 1;

  return totalPage;
}
