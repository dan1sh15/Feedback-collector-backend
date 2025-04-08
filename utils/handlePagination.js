/********************************************************************
 * Handles pagination logic by calculating page number, items per page, 
 * and offset based on the provided parameters or defaults.
 *
 * @param {String|Number} pageParam - The current page number from the request, typically a string.
 * @param {String|Number} perPageParam - The number of items per page, typically a string.
 * @param {Object} defaults - An object containing default values for page and perPage.
 * @param {Number} defaults.page - The default page number if no valid pageParam is provided.
 * @param {Number} defaults.perPage - The default number of items per page if no valid perPageParam is provided.
 *
 * @return {Object} - An object containing:
 *                    - {Number} page: The current page number.
 *                    - {Number} perPage: The number of items per page.
 *                    - {Number} offset: The calculated offset for database queries.
 *
 * @throws {Error} - Throws an error if the provided page or perPage parameters are invalid.
 ********************************************************************/

const handlePagination = (pageParam, perPageParam, defaults) => {

    // Extract default values for page and items per page from the defaults object.
    // If defaults are not provided, use 1 as the default page and 10 as the default perPage.
    const defaultPage = defaults.page || 1;
    const defaultPerPage = defaults.perPage || 10;

    // Parse the page and perPage parameters from the request.
    // Use defaults if the parameters are invalid or not provided.
    let page = parseInt(pageParam, 10) || 0;
    const perPage = parseInt(perPageParam, 10) || defaultPerPage;

    // Validate the page and perPage parameters
    if (isNaN(page) || page < 0) {
        throw new Error("Invalid page number.");
    }
    if (isNaN(perPage) || perPage < 1) {
        throw new Error("Invalid perPage number.");
    }

    // Page logic
    // Calculate the offset for database queries and handle special cases for page 0.
    let offset;
    if (page !== 0) {

        // If page is not 0, calculate the offset as page * perPage.
        offset = page * perPage;

        // Increment the page to simulate "next page" logic.
        page++; // Move to the next page

    } else {

        // If page is 0, treat it as the first page with an offset of 0.
        offset = 0; // Special case: page 0 is treated as page 1
        page = 1; // Set page to 1 as a default behavior for page 0.
    }

    // Return the calculated pagination values.
    return { page, perPage, offset };
};

module.exports = handlePagination;
