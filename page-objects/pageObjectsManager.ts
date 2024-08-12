import {Page} from '@playwright/test'
import {ComputersDatabaseMainPage} from '../page-objects/computersDatabaseMainPage'
import {ComputersDatabaseAddNewPage} from '../page-objects/computersDatabaseAddNewPage'
import {ComputersDatabaseEditPage} from '../page-objects/computersDatabaseEditPage'

//Page Object Manager which contains all page objects.
export class PageObjectsManager{
    page: Page
    computersDatabaseMainPage: ComputersDatabaseMainPage
    computersDatabaseAddNewPage: ComputersDatabaseAddNewPage
    computersDatabaseEditPage: ComputersDatabaseEditPage

    constructor(page: Page){
        this.page = page
        this.computersDatabaseMainPage = new ComputersDatabaseMainPage(page)
        this.computersDatabaseAddNewPage = new ComputersDatabaseAddNewPage(page)
        this.computersDatabaseEditPage = new ComputersDatabaseEditPage(page)
    }

    computersDatabaseMainPageObject(){
        return this.computersDatabaseMainPage
    }

    computersDatabaseAddNewPageObject(){
        return this.computersDatabaseAddNewPage
    }

    computersDatabaseEditPageObject(){
        return this.computersDatabaseEditPage
    }
}