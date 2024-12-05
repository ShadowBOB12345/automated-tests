# Test Automation for website lalafo.kg 

## Description 
This project is designed for automated testing of the functionality of the website lalafo.kg using the Playwright library. The main goal is to check the correctness of the product search and price filtering.

## What is implemented in the project:
- Tests are implemented to search for products by name and apply price filtering
- Using the Page Object Model to organize tests
- Integration with Playwright to automate interaction with the site

## Testing website
[lalago.kg](https://lalafo.kg)

## Programming language
The project was implemented on TypeScript using Playwright

## Installation
1. Clone project from remote repository on GitHub
    ```
    git clone https://github.com/kamila-12/automated-test.git
    ```
2. Install Node.js
    ```
    npm install
    ```
3. Install Playwright

    ```
    npm init playwright@latest
    ```
    

## Run tests and reports
- For running test should be used next command

    ```
    npx playwright test
    ```
- For runnig reports should be used next command

    ```
    npx playwright show-report
    ```

## Structure of project

```
/lalafo_search
│── /enviroments
├── /node_modules           # Project dependencies that are installed using npm
├── /pages                  # The folder with the page model (Page Object Model)
│   ├── OrgAccountPage.ts   # The page model for working with the site lalafa.kg
|
├── /tests                  # The folder with tests
│   ├── filtering.search.spec.ts # Tets for filtering and searching products
│   
├── /test-examples          # The folder with example test
    ├── demo-todo-app.spec.ts
    ├── example.spec.ts
│
└── .gitignore              # A file for ignoring unnecessary files in git
├── package-lock.json       # The file with project dependencies
├── package.json            # Project configuration file, dependencies
├── playwright.config.ts    # Configuration file Playwright
├── README.md               # The file with information about project

```
## Test cases

| Test Name               | Reproduction Steps                                  | Expected Result                             | Actual Result                               |
|-------------------------|-----------------------------------------------------|---------------------------------------------|---------------------------------------------|
| Search product          | 1. Open the website.                                | The homepage opens.                         | The homepage opens.                         |
|                         | 2. Click the "Search" button.                       | A search field appears.                     | A search field appears.                     |
|                         | 3. Enter "table" in the search field and press "Enter". | Search results are displayed on the page. | Search results are displayed on the page.   |
| Price Filtering     | 1. Enter "table" in the search field.               | The product "table" is found on the site.   | The product "table" is found on the site.   |
|                         | 2. Set the price from 3000 to 10000 and click "Filter". | Products within the specified range are shown. | Products outside the specified range are shown. |

## Links to test cases
- /tests/filtering.search.spec.ts – Tests related to search functionality and price filtering.