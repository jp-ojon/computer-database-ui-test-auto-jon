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

test.describe('Editing the details of a computer', () => {

    test.beforeAll(async () => {
        // Load CSV data before running tests, load only operation = 'edit'
        testData = await readCSV('testdata.csv', 'edit')
    })


    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to website
        await page.goto(websiteLink)
    })

    test('US-03: As an inventory manager, select a computer by name from a list or search bar, edit the details of a specific computer in the system.', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //for each line within the .csv testdata file that corresponds to the expected operation, run the following.
        for (const testdata of testData) {
            console.log(testdata.operation + ',' + testdata.computername + ',' + testdata.computertoedit + ',' + testdata.discontinued + ',' + testdata.introduced + ',' + testdata.company)

            //Step 2: Enter value on the search field
            await pom.computersDatabaseMainPageObject().fillFilterSearchFieldBox(testdata.computertoedit)

            //Step 3: Click on the "Filter by Name" button
            await pom.computersDatabaseMainPageObject().clickFilterByNameButton()

            //Step 4: Select the Computer to Edit
            await pom.computersDatabaseMainPageObject().clickComputerToSelect(testdata.computertoedit)

            //Step 5: Update Computer Details and Submit
            await pom.computersDatabaseEditPageObject().fillComputerNameField(testdata.computername)
            await pom.computersDatabaseEditPageObject().fillIntroducedDateField(testdata.introduced)
            await pom.computersDatabaseEditPageObject().fillDiscontinutedDateField(testdata.discontinued)
            await pom.computersDatabaseEditPageObject().selectOptionCompanyDropDownList(testdata.company)
            await pom.computersDatabaseEditPageObject().clickSaveThisComputerButton()

            //Step 6: Verify if the Computer Details are Updated
            let expectedMessage = 'Computer ' + testdata.computername +' has been updated'
            await expect(pom.computersDatabaseMainPageObject().alertMessage).toContainText(expectedMessage)

            //Optional Step: In case another loop is needed
            await page.goto(websiteLink)
        }
    })
})