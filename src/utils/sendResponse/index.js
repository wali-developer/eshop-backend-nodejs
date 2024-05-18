export const sendResponse = (res, status, success, ...rest) => {
  res.status(status).json({
    success,
    ...rest,
  });
};
