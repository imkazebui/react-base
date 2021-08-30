export const removeDuplicatesArray = (arr) => {
  return arr.filter((item, index, self) => self.indexOf(item) == index);
};
