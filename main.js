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

/*
Notes

- Need to figure out how to set attribute with click on the submit
- Make sure to append all keys to the respective elements
- Add comments into code
- Valid with different values
- Simplify / modulate code where possible

*/



const app = async (dict) => {
    // Launch Chrome/Chromium instance with Puppeteer and go to page one
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');

    const flagVisible = async () => await page.evaluate( () => {
        Array.from(document.querySelectorAll('*')).forEach( (val) => {
            
            if(val.style.display === 'none' || val.hidden) 
            {
                val.childNodes.forEach((child) => child.remove('nate-visible'))

            } else val.setAttribute('nate-visible', 'true')
            })
    })

        await page.exposeFunction("flagVisible", flagVisible)
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

