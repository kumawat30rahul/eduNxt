// Common headers for all requests

export const commonHeaders = {
  "Content-Type": "application/json", // Default content type for most requests
};

export const getHeaders = {
  "Content-Type": "application/json", // Default content type for most requests
};
// Headers specific to POST requests
export const postHeaders = {
  ...commonHeaders,
  "Content-Type": "application/json", // Ensures POST uses JSON data format
};
