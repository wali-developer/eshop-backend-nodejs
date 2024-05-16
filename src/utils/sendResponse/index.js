export const sendResponse = (
  res,
  status,
  success,
  body = null,
  message = null
) => {
  const response = { success };
  if (body !== null) {
    response.body = body;
  }
  if (message !== null) {
    response.message = message;
  }

  res.status(status).json(response);
};
