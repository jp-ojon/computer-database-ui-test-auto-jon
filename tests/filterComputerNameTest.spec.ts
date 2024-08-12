import { test, expect } from '@playwright/test'
import { PageObjectsManager } from '../page-objects/pageObjectsManager'
import { readCSV } from '../utilities/CSVReader';

interface TestData {
    operation: string
    computername: string
    computertoedit: string
    introduced: string
    discontinued: string
    company: string
}
let testData: TestData[]
const websiteLink: string = process.env.WEBSITELINK ?? ''

test.describe('Filtering Computers by Name', () => {

    test.beforeAll(async () => {
        // Load CSV data before running tests, load only operation = 'filter'
        testData = await readCSV('testdata.csv', 'filter')
    })


    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to website
        await page.goto(websiteLink)
    })

    test('US-02: As an inventory manager, filter computer by names using at least two letters in the search field.', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //for each line within the .csv testdata file that corresponds to the expected operation, run the following.
        for (const testdata of testData) {
            console.log(testdata.operation + ',' + testdata.computername + ',' + testdata.computertoedit + ',' + testdata.discontinued + ',' + testdata.introduced + ',' + testdata.company)

            //Step 2: Enter value on the search field
            await pom.computersDatabaseMainPageObject().fillFilterSearchFieldBox(testdata.computername)

            //Step 3: Click on the "Filter by Name" button
            await pom.computersDatabaseMainPageObject().clickFilterByNameButton()

            //Step 4: Verify Search Results
            //Extract all text contents of each entry within the table
            const computersTableResultsText = await pom.computersDatabaseMainPageObject().computersTableResults.allTextContents()

            // Iterate over each link text
            for (const Text of computersTableResultsText) {
                console.log(Text)
                // Assert that the text content includes the value
                expect(Text).toContain(testdata.computername);
            }

            //Optional Step: In case another loop is needed
            await page.goto(websiteLink)
        }
    })
})