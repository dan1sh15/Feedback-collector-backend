// Utility module to standardize API response formats
module.exports = {
  /**
   * Returns a standardized success response
   *
   * @param {Object} data - The response payload
   * @param {string} message - Custom message for the response
   * @param {number} code - HTTP status code (default: 200)
   * @param {string} status - Status of the response (default: "success")
   * @returns {Object} Structured success response object
   */
  successResponse: (
    data = {},
    message = "Successfully",
    code = 200,
    status = "success"
  ) => {
    // Check if data already contains a 'data' property
    if (data.data !== undefined) {
      // Avoid nesting 'data.data' if it's already structured
      return {
        status: status,
        code: code,
        message: message,
        ...data, // Spread the existing data object directly into the response
      };
    }

    // Wrap raw data inside a 'data' field
    return {
      status: status,
      code: code,
      message: message,
      data: data,
    };
  },

  /**
   * Returns a standardized error response
   *
   * @param {number} code - HTTP status code (default: 500)
   * @param {string} message - Custom error message (default: "Internal server error")
   * @returns {Object} Structured error response object
   */
  errorResponse: (code = 500, message = "Internal server error") => {
    return {
      success: false,
      code,
      message,
    };
  },
};
