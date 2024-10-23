# Ubiquiti Assignment

This project is a Ubiquiti assignment application. You can view the deployed app [here](https://ubiquiti-nine.vercel.app/).

## Table of Contents
- [Requirements](#requirements)
- [Additional Features](#additional-features)
- [Automation Tests](#automation-tests)
- [How to Run](#how-to-run)
  - [Run App Locally](#run-app-locally)
  - [Run Unit Tests](#run-unit-tests)
  - [Run E2E Tests](#run-e2e-tests)


### Requirements
- Implement UI/UX according to Figma design.
- Handle unexpected interface/contract from backend gracefully.
- Implement features/functions such as:
  - Search devices
  - Filter devices
  - Browse devices in list view and grid view
  - Device details page with navigation

### Additional Features
- Search devices by both product name and abbreviation.
- Hover on search result to see device review with device image and more details.
- Debounce search to reduce API calls and UI re-rendering.
- Add hover effect for list view and grid view to highlight the device being checked.
- Provide clear search button.
- Highlight filter is activated when navigating in device details page.
- Toggle JSON displaying between raw and prettified format/style.
- Provide button to copy JSON to clipboard.
- Practice responsive design so the UI looks good on devices with different resolutions.

### Automation Tests
- Unit tests
- Component tests
- E2E tests

## How to Run
### Run App Locally

_Recommended: Use Node.js version 20 and Google Chrome for the best experience._

To run the app locally, follow these steps:


1. **Install Dependencies**:
  ```bash
  npm install
  ```

2. **Run the App Locally**:
  ```bash
  npm run dev
  ```

3. **Open the App**:
  Open your browser and navigate to `http://localhost:5173`.


### Run Unit Tests
To run unit tests, use the following command:
```bash
npm test
```

### Run E2E Tests
To run end-to-end tests with Cypress, use the following command:
```bash
npm run cy
```

