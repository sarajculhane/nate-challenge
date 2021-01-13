const { expect } = require('chai');
const puppeteer = require('puppeteer')


describe('Initial Test Set Up - Checking basic execution', function () {
    // Define global variables
    let browser
    let page
  
    before(async () => {
      browser = await puppeteer.launch()
      page = await browser.newPage()
      await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html')
    })
    after(async () => {
      await browser.close()
    })

describe('Page One Execution - Button Click', async () => {
    let expected = 'input[type=button]';
    let selector;
    it('The correct button element exists on the page',async  () => {
        expected= 'input[type=button]'
        selector = await page.waitForSelector(expected).then(() => expected)
    // const selector = await page.evaluate((expected) => document.querySelector(expected), expected)
    // let selector = await page.evaluate((selector) => {
    //     let button = document.querySelector('input[type=button]')
    //     button.addEventListener('click', (e) => {
    //         console.log(e)
    //         if(e.target.value === 'Start') return 'input[type=button]'
    //     }, selector)
    
    // })

    expect(selector).equals(expected)

    })

    it('The button is clicked',async  () => {
        
    })
  })
})