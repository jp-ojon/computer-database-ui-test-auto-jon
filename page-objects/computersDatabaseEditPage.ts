import { Locator, Page } from "@playwright/test"
import { ComputersDatabaseAddNewPage } from "../page-objects/computersDatabaseAddNewPage";

//extends ComputersDatabaseAddNewPage, common elements and locators found.
export class ComputersDatabaseEditPage extends ComputersDatabaseAddNewPage {
    readonly saveThisComputerButton: Locator

    constructor(page: Page) {
        super(page)
        this.saveThisComputerButton = this.page.locator('//input[@value="Save this computer"]')
    }


    /**
     * This method will click the Save This Computer Button
     */
    async clickSaveThisComputerButton() {
        await this.saveThisComputerButton.click()
    }
}