const setAndUnsetError = (setMethod, message, time) => {
  setMethod(message);
  setTimeout(() => {
    setMethod(false);
  }, time);
};

export default setAndUnsetError;
