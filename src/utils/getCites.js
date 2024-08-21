export const getCites = (data) => {
  if (data) {
    const newObj = {};
    data.map((el) => {
      if (!newObj[el.city]) newObj[el.city] = false;
    });
    return newObj;
  }
};
