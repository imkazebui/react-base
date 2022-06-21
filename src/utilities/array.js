export const removeDuplicatesArray = (arr) =>
  arr.filter((item, index, self) => self.indexOf(item) === index);

export const groupBy = (array, key) =>
  array.reduce((acc, cur) => {
    (acc[cur[key]] = acc[cur[key]] || []).push(cur);
    return acc;
  }, {});
