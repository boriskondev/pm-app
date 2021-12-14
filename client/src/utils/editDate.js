const editDate = (date) => {
  let [year, month, day] = date.slice(0, 10).split("-");
  return `${day}.${month}.${year}`;
};

export default editDate;
