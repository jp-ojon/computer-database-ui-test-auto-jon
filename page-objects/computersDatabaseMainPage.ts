import { Locator, Page } from "@playwright/test"

export class ComputersDatabaseMainPage {
    page: Page
    readonly computerDatabaseHeader: Locator
    readonly addNewComputerButton: Locator
    readonly filterSearchFieldBox: Locator
    readonly filterByNameButton: Locator
    readonly alertMessage: Locator
    readonly computersTable: Locator
    readonly computersTableResults: Locator
    computerToEdit: Locator

    constructor(page: Page) {
        this.page = page
        this.computerDatabaseHeader = this.page.locator('//header[@class="topbar"]//a')
        this.addNewComputerButton = this.page.locator('a#add')
        this.filterSearchFieldBox = this.page.locator('input#searchbox')
        this.filterByNameButton = this.page.locator('input#searchsubmit')
        this.alertMessage = this.page.locator('div.alert-message')
        this.computersTable = this.page.locator('table.computers')
        this.computersTableResults = this.computersTable.locator('a[href*="/computers/"]')
    }

    /**
     * This method will click the Add New Computer Button
     */
    async clickAddNewComputerButton() {
        await this.addNewComputerButton.click()
    }

    /**
     * This method will fill the Filter Search Field Box
     * @param value 
     */
    async fillFilterSearchFieldBox(value: string) {
        await this.filterSearchFieldBox.fill(value)
    }

    /**
     * This method will click the Filter By Name Button
     */
    async clickFilterByNameButton() {
        await this.filterByNameButton.click()
    }

    /**
     * This method will click the Computer to edit based on the value
     * @param value should be the same exact value
     */
    async clickComputerToSelect(value: string) {
        const xpathExpression = `//a[contains(@href, "computers") and text()="${value}"]`
        this.computerToEdit = this.page.locator(xpathExpression)
        await this.computerToEdit.click()
    }
}