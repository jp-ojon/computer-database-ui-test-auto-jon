import { Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import PDFDocument from 'pdfkit'

const screenshotName = `screenshot-${Date.now()}.png`

export async function captureScreenshot(page: Page) {
    
    const screenshotPath = path.resolve(__dirname, 'screenshots', screenshotName)
    await page.screenshot({ path: screenshotPath })
    console.log(`Screenshot captured: ${screenshotPath}`)
}

export async function createBugReport(error: any) {
    const reportsDir = path.resolve(__dirname, 'reports')
    const doc = new PDFDocument()
    const bugReportPath = path.resolve(__dirname, 'reports', `bug-report-${Date.now()}.pdf`)

    // Ensure the directory exists
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true })
    }

    doc.pipe(fs.createWriteStream(bugReportPath))

    doc.fontSize(16).text('Bug Report', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text('Error Details:')
    doc.text(String(error))
    doc.moveDown()
    doc.text('Screenshots:')
    doc.text('See attached screenshots.')

    const screenshotPath = path.resolve(__dirname, 'screenshots', screenshotName)
    doc.image(screenshotPath, { width: 300 })

    doc.end()
    console.log(`Bug report created: ${bugReportPath}`)
}