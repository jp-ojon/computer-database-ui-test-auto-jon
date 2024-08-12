import { Locator, Page } from "@playwright/test"

export class ComputersDatabaseAddNewPage {
    page: Page
    readonly computerNameField: Locator
    readonly introducedDateField: Locator
    readonly discontinutedDateField: Locator
    readonly companyDropDownList: Locator
    readonly createThisComputerButton: Locator

    constructor(page: Page) {
        this.page = page
        this.computerNameField = this.page.locator('input#name')
        this.introducedDateField = this.page.locator('input#introduced')
        this.discontinutedDateField = this.page.locator('input#discontinued')
        this.companyDropDownList = this.page.locator('select#company')
        this.createThisComputerButton = this.page.locator('//input[@value="Create this computer"]')
    }

    /**
     * This method will fill the Computer Name Field with the input value
     * @param value 
     */
    async fillComputerNameField(value: string) {
        await this.computerNameField.fill(value)
    }
    
    /**
     * This method will fill the Introduced Date Field with the input value
     * @param value should follow format MMMM-DD-YY
     */
    async fillIntroducedDateField(value: string) {
        await this.introducedDateField.fill(value)
    }

    /**
     * This method will fill the Discontinued Date Field with the input value
     * @param value should follow format MMMM-DD-YY
     */
    async fillDiscontinutedDateField(value: string) {
        await this.discontinutedDateField.fill(value)
    }

    /**
     * This method will select the option on the Company drop down list based on the value
     * @param value company is case sensitive and should be the same exact as the available options
     */
    async selectOptionCompanyDropDownList(value: string) {
        await this.companyDropDownList.selectOption(value)
    }

    /**
     * This method will click the Create This Computer Button
     */
    async clickCreateThisComputerButton() {
        await this.createThisComputerButton.click()
    }
}