const puppeteer = require('puppeteer');
const fs = require('fs')
const {selectButton, selectCity, hidePopUp, completeForm} = require('./modules')

const dictObj = {
    city: "london",
    name: "nate", 
    password: "07000000000", 
    email: "nate@nate.tech", 
    gender: "female"
}


const app = async (dict) => {
    // Launch Chrome/Chromium instance with Puppeteer and go to page one
    const entry = 'https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html'
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(entry);

        await page.exposeFunction("selectButton", selectButton)
        await page.exposeFunction("selectCity", selectCity)
        await page.exposeFunction("hidePopUp", hidePopUp)
        await page.exposeFunction("completeForm", completeForm)
        selectButton(page)
        selectCity(page, dict)
        hidePopUp(page)
        completeForm(page, dict)

}

app(dictObj)

module.exports = app;