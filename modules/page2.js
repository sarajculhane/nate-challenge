const fs = require('fs')
const deltaLog = require('./deltaLog')

// Page Two Automation

const selectCity = async (page, dict) => {
    try {
        const selectClick= '.custom-select-trigger' // a click on this element will trigger the drop down menu
        await page.waitForTimeout(16000) // page takes a long time to load so adding a timeout before executing script further

        fs.writeFileSync('logs/before/page2.html', await page.content()) // logging before state as in page1
        // click on the element and set the correct nate-action-type
        await page.click(selectClick).then(() => page.evaluate(() => document.querySelector('.custom-select-trigger').setAttribute('nate-action-type', 'click')))
        
        
        // Given that there are multiple choices for cities, we need to determine which selector is associated with that city
        // Here, we can just iterate through the custom-options class and then return the selector index that matches the child index
        const getSelector = await page.evaluate( (dict) => {
            let child;
            const options = [...document.querySelectorAll('.custom-option')]

            for(let i = 0; i < options.length; i++) {
                if(options[i].innerHTML.toLowerCase() === dict.city.toLowerCase()) child = i+1

            }
            
            return `#content-section > div > div > div > span:nth-child(${child})`  
        }, dict)

        await page.waitForTimeout(5000)
        await page.click(getSelector).then((e) => console.log(`${dict.city} clicked`)).then(() => page.evaluate(() => {
            let selector = document.querySelector('.custom-select-trigger')
            selector.setAttribute('nate-action-type', 'click')
            selector.setAttribute('nate-dic-key', 'city')

            // add the necessary attributes for 'action-type' / 'dic-type'  

        
        })).then(async () => { // logging
            fs.writeFileSync('logs/after/page2.html', await page.content())
            deltaLog('page2')
       
        })
        
        await page.click('#next-page-btn')
    } catch(err) {
        console.log('page 2 error',err)
    }

}

module.exports = selectCity