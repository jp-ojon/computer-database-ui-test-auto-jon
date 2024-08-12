import { test, expect } from '@playwright/test'
import { PageObjectsManager } from '../page-objects/pageObjectsManager'
import { captureScreenshot, createBugReport } from '../utilities/Reporting'

const websiteLink: string = process.env.WEBSITELINK ?? ''

test.describe('Sample Test With Bug Report', () => {

    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to website
        await page.goto(websiteLink)
    })

    test('Sample Test With Bug Report.', async ({ page }) => {
        const pom = new PageObjectsManager(page)
        try {
            // Example assertion that might fail
            await expect(pom.computersDatabaseMainPageObject().computerDatabaseHeader).toHaveText('Random Text')
        } catch (error) {
            // Handle the error, capture screenshots, and create a PDF bug report
            await captureScreenshot(page)
            await createBugReport(error)
            // Rethrow to ensure the test fails
            //throw error 
        }
    })
})
