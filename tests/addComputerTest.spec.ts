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

test.describe('Adding a Computer to the System', () => {

    test.beforeAll(async () => {
        // Load CSV data before running tests, load only operation = 'add'
        testData = await readCSV('testdata.csv', 'add')
    })


    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to website
        await page.goto(websiteLink)
    })

    test('US-01: As an inventory manager, add a computer to the system including its introduction and discontinuation dates, to track product lifecycles, identify outdated equipment.', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //for each line within the .csv testdata file that corresponds to the expected operation, run the following.
        for (const testdata of testData) {
            console.log(testdata.operation + ','+ testdata.computername + ','+ testdata.computertoedit + ','+ testdata.discontinued + ','+ testdata.introduced + ','+ testdata.company)

            //Step 2: Click the "Add a computer" Button:
            await pom.computersDatabaseMainPageObject().clickAddNewComputerButton()

            //Step 3: Fill out the Add New Computer Details Form and Submit
            await pom.computersDatabaseAddNewPageObject().fillComputerNameField(testdata.computername)
            await pom.computersDatabaseAddNewPageObject().fillIntroducedDateField(testdata.introduced)
            await pom.computersDatabaseAddNewPageObject().fillDiscontinutedDateField(testdata.discontinued)
            await pom.computersDatabaseAddNewPageObject().selectOptionCompanyDropDownList(testdata.company)
            await pom.computersDatabaseAddNewPageObject().clickCreateThisComputerButton()

            //Step 4: Verify if the Computer is Added
            let expectedMessage = 'Computer ' + testdata.computername +' has been created'
            await expect(pom.computersDatabaseMainPageObject().alertMessage).toContainText(expectedMessage)

            //Step 5: Verify if the entered details of the newly created computer match the input
            //Note: Computer is not added to the list even if we did a thorough search, and even if we add the same exact computer multiple times.

            //Optional Step: In case another loop is needed
            await page.goto(websiteLink)
        }
    })
})