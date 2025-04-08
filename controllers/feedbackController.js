const handlePagination = require("../utils/handlePagination");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseTemplates");
const Feedback = require("../model/Feedback");

/**
 * @desc Fetch paginated list of feedback entries
 * @route GET /api/feedback
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getFeedback = async (req, res) => {
  try {
    // Extract pagination details from query parameters or use defaults
    const { page, perPage, offset } = handlePagination(
      req.query.page,
      req.query.perPage,
      { page: 0, perPage: 10 }
    );

    // Fetch feedback data and total document count concurrently
    const [feedbackData, totalCount] = await Promise.all([
      Feedback.find()
        .sort({ createdAt: -1 }) // Sort by latest feedback first
        .skip(offset)
        .limit(perPage),
      Feedback.countDocuments(), // Total number of feedback documents
    ]);

    // Calculate total pages for frontend pagination
    const totalPages = Math.ceil(totalCount / perPage);

    // If no feedback data found, return appropriate message
    if (!feedbackData || feedbackData.length === 0) {
      return res.send(successResponse([], "Feedback data not found."));
    }

    // Construct paginated response data
    const data = {
      data: feedbackData,
      page,
      perPage: perPage,
      total: totalCount,
      totalPages: totalPages,
    };

    // Send structured success response
    return res.send(successResponse(data));
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.send(errorResponse());
  }
};

/**
 * @desc Add a new feedback entry
 * @route POST /api/feedback
 * @access Public
 * @param {Object} req - Express request object containing feedback details
 * @param {Object} res - Express response object
 */
exports.addFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    // Validate required fields
    if (!name || !email || !feedback) {
      return res.send(errorResponse(404, "All fields are required"));
    }

    // Prepare feedback payload
    const payload = {
      name,
      email,
      feedback,
    };

    // Insert feedback into the database
    const addResult = await Feedback.create(payload);

    // Handle creation failure
    if (!addResult) {
      return res.send(errorResponse());
    }

    // Return success response
    return res.send(successResponse([], "Feedback added successfully"));
  } catch (error) {
    console.error("Error adding feedback:", error);
    return res.send(errorResponse());
  }
};
