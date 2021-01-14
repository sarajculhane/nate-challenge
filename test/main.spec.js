const { expect } = require('chai');
const puppeteer = require('puppeteer')
const sinon = require('sinon')
const app = require('../main')
const fs = require('fs')
const {hidePopUp, completeForm} = require('../modules')


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
  let spy = sinon.spy(console, 'log')
  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');
    
  })

  after(async () => {
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
    
    })

    })

    describe( 'Page Two Execution', () => {
      let pageTwo;
      let sandbox;
      it('The city selection page loads the selection dropdown', async () => {
        // await page.waitForRequest('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page2.html')
        await page.waitForTimeout(15000)
      }).timeout(0)

      it('The city selection dropdown is clicked', async () => {
        let dropdownSelector = '.custom-select-trigger'

        dropdown = await page.waitForSelector(dropdownSelector)
        await dropdown.click()
      }).timeout(0)


      it('The correct city selection is made', async () => {
        let selection = dictObj.city
        let citySelector = '#content-section > div > div > div > span:nth-child(1)'
        await page.waitForTimeout(5000)
        // console.log('london clicked')
        expect(spy.called).to.be.true
        spy.restore()
      }).timeout(0)


      it('The Next button is clicked', async () => {
        await page.click('#next-page-btn')
      }).timeout(0)

    })

    describe( 'Page Three Execution', () => {
      let popup;
      it('Pop up is hidden', async () => {
        let selector = '#popup'
        hidePopUp()
      }).timeout(0)

      it('The Form is successfully submitted', async () => {
        completeForm()
      }).timeout(0)
    })
  })

