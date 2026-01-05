const buildResponse = (code, response = {}, message) => {
  return { success: true, code, response, message };
};

export default buildResponse;
