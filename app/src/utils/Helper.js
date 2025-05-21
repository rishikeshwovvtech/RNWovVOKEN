export const apiLogger = (config, result) => {
  /* eslint-disable no-console */
  // console.log(
  //   '🚀🚀🚀🚀🚀==== API CALL ==== 🚀🚀🚀🚀🚀',
  //   '\n\n',
  //   'PAGE URL:====>',
  //   '\n',
  //   JSON.parse(config?.data)?.pageUrl,
  //   '\n\n',
  //   'URL:====>',
  //   '\n',
  //   config.url,
  //   '\n\n',
  //   'BODY:====>',
  //   JSON.parse(config?.data),
  //   '\n\n',
  //   'CONFIG:====>',
  //   config,
  //   '\n\n',
  //   'RESPONSE:====>',
  //   result,
  // );
};

export const throttle = (func, delay) => {
  let throttling = false;

  return (...args) => {
    if (!throttling) {
      throttling = true;
      func(...args);
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
