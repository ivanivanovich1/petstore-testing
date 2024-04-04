## API Testing Report

This document provides an overview of the test cases implemented for the Pet Store API, ensuring that each endpoint functions as expected under various scenarios. Testing is categorized into functional, negative, and edge case testing.

### 1. GET /pet/{petId}

- **Functional Testing**: Tests if the API correctly returns a pet object by its ID. Expectation: HTTP 200 status code and a pet object with the specified ID.
- **Negative Testing**: Validates the API's response to requests for non-existing pet IDs. Expectation: HTTP 404 status code and an error message indicating the pet was not found.
- **Edge Case Testing**: Assesses how the API handles boundary values for pet IDs. Expectation: Correctly return a pet object for boundary pet ID values.

### 2. PUT /pet

- **Functional Testing**: Checks if the API updates an existing pet's information correctly. Expectation: HTTP 200 status code and the pet's updated information.
- **Negative Testing**: Tests the API's error handling when provided with invalid pet data. Expectation: HTTP 500 status code and an error message.
- **Edge Case Testing**: Evaluates the API's behavior with edge case data for a pet. Expectation: HTTP 200 status code and the pet's updated information reflecting edge case data.

### 3. GET /pet/findByStatus

- **Functional Testing**: Validates if the API correctly returns pets matching specific statuses (available, pending, sold). Expectation: HTTP 200 status code and an array of pets with the specified status.
- **Edge Case Testing**: Tests the API's response when no pets match the given status criteria. Expectation: HTTP 200 status code and an empty array.

### 4. DELETE /pet/{petId}

- **Testing for Non-Existing Pet**: Verifies the API's response when attempting to delete a non-existing pet. Expectation: HTTP 404 status code.

### 5. POST /store/order

- **Functional Testing**: Assesses the API's ability to successfully create an order. Expectation: HTTP 200 status code and confirmation of the order details.

- **Negative Testing**: Tests the API's response to invalid order data. Expectation: HTTP 500 status code and an error message.

This report covers a comprehensive set of tests designed to ensure the robustness and reliability of the Pet Store API across various scenarios.
