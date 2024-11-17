// Defines a debounce function to limit the rate at which a function can fire.
const debounce = (func, delay) => {
    let timerId; // Holds a reference to the timeout between calls.
    return (...args) => {
      clearTimeout(timerId); // Clears the current timeout, if any, to reset the debounce timer.
      timerId = setTimeout(() => {
          func.apply(this, args); // Calls the passed function after the specified delay with the correct context and arguments.
      }, delay);
    };
  };

  // Returns the mouse position
const getMousePos = e => {
  return { 
      x : e.clientX, 
      y : e.clientY 
  };
};

// Returns the window width and height
const getWinSize = () => {
  return { 
      width: window.innerWidth, 
      height: window.innerHeight 
  };
};

const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export {
  debounce,
  getMousePos,
  getWinSize,
  isFirefox,
};