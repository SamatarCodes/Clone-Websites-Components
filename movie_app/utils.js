// * Debounce function helper
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // wrapper = call many several times in a row
  return (...args) => {
    // check if timeoutId is defined
    if (timeoutId) {
      // if it is...clear it
      clearTimeout(timeoutId);
    }

    // New execution of the func
    timeoutId = setTimeout(() => {
      // call the func and take all the arguments (arrays) and pass it as seperate arguments to original function
      // Same as func(arg1, arg2, arg3)
      func.apply(null, args);
    }, delay);
  };
};
