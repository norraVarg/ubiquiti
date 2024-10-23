# Ubiquiti Assignment

This project is a Ubiquiti assignment application. You can view the deployed app [here](https://ubiquiti-nine.vercel.app/).

## Table of Contents
- [Requirements](#requirements)
- [Additional Features](#additional-features)
- [Automation Tests](#automation-tests)
- [Tools and Technologies](#tools-and-technologies)
- [How to Run](#how-to-run)
  - [Run App Locally](#run-app-locally)
  - [Run Unit Tests](#run-unit-tests)
  - [Run E2E Tests](#run-e2e-tests)


### Requirements
- Implement UI/UX according to the Figma file.
- Handle unexpected interface/contract changes from the backend gracefully.
- Implement features/functions such as:
  - Search devices
  - Filter devices
  - Browse devices in list view and grid view
  - Device details page with navigation

### Additional Features
#### Search and Filter
- Search devices by both product name and abbreviation.
- Debounce search to reduce API calls and UI re-rendering.
- Provide a clear search button.

#### UI/UX Enhancements
- Hover on search results to see device reviews with device images and more details.
- Add hover effects for list view and grid view to highlight the device being checked.
- Implement responsive design to ensure the UI looks good on devices with different resolutions.

#### Device Details Page
- Update the URL with the device ID for easy sharing when navigating devices on the device details page.
- Display a notification in the device details page when the filter is active.
- Toggle JSON display between raw and prettified formats.
- Provide a button to copy JSON to the clipboard.

### Automation Tests
- Unit tests
- Component tests
- E2E tests

### Tools and Technologies
React, Redux RTK, Tailwind CSS, TypeScript, Vite, Vitest, Cypress, zod.


### How to Run

#### Run App Locally

(_Recommended: Use Node.js version 20 and Google Chrome for the best experience._)

To run the app locally, follow these steps:


1. Install Dependencies:
  ```bash
  npm install
  ```

2. Run the App Locally:
  ```bash
  npm run dev
  ```

3. Open the App:
  Open your browser and navigate to `http://localhost:5173`.


#### Run Unit Tests
To run unit tests, use the following command:
```bash
npm test
```

#### Run E2E Tests
To run end-to-end tests with Cypress, use the following command:
```bash
npm run cy
```
