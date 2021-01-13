const { expect } = require('chai');
const puppeteer = require('puppeteer')
const sinon = require('sinon')
const app = require('../main')
const fs = require('fs')


const dictObj = {
  city: "london",
  name: "nate", 
  password: "07000000000", 
  email: "nate@nate.tech", 
  gender: "female"
}

describe('Initial Test Set Up - Checking basic execution', () => {
  let sandbox;
  let page;
  let browser;
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');
  })

  afterEach(async () => {
    await page.close
  })

describe('Page One Execution', async () => {

  it('The "Start" button exists', async() => {
    let buttonSelector = 'input[type=button]'
    
    button = await page.waitForSelector(buttonSelector)
    expect(button).to.exist

    })
    it('The "Start" button is clicked', async() => {
    let buttonSelector = 'input[type=button]'
    
    button = await page.waitForSelector(buttonSelector)
    await button.click()
    
    // done()
    })

    // it('The "Start" button is has nate-action-type attribute', async() => {
    //   let buttonSelector = 'input[type=button]'
      
    //   button = await page.waitForSelector(buttonSelector)
    //   await button.click()

    //   })

    })

    describe( 'Page Two Execution', () => {
      let pageTwo;
      it('The city selection page loads', async (done) => {
        // await page.waitForTimeout(5000)
        await page.waitForSelector('#time-container').done()
        // expect(pageTwo).to.include('miliseconds')
        // let timeSelector = '#time-container'
        // await page.waitForSelector(buttonSelector)
        
        // dropdown = await page.waitForSelector(dropdownSelector)
        // await dropdown.click().done()
      }).timeout(10000)

      // it('The city selection dropdown is clicked', async () => {
      //   let dropdownSelector = '.custom-select-trigger'
      //   await page.waitForTimeout(10000)
      //   dropdown = await page.waitForSelector(dropdownSelector)
      //   await dropdown.click().done()
      // })
    })
  })
