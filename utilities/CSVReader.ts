import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

interface TestData {
    operation: string
    computername: string
    computertoedit: string
    introduced: string
    discontinued: string
    company: string
}

//Read thru .csv test data file found under testdata folder. Filter based on the value of operation.
export async function readCSV(filePath: string, operation: string): Promise<TestData[]> {
    return new Promise<TestData[]>((resolve, reject) => {
        const results: TestData[] = []
        fs.createReadStream(path.resolve(__dirname, '..', 'testdata', filePath))
            .pipe(csv()) // Read without headers to get raw rows
            .on('data', (data) => {
                // Check the 'operation' value
                if (data.operation === operation) {
                    results.push(data as TestData);
                }
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error))
    })
}
