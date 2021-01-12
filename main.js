const puppeteer = require('puppeteer');

const page = async () => {
    const browser = await puppeteer.launch({headless: false});
    
    const page = await browser.newPage();
    const buttonSelector = 'input[type=button]'
    await page.waitForTimeout(1000)
    
    // page one

    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');
    const pageOneBeforeClick = await page.content()

    if(page.$(buttonSelector)) {
        try{

            await page.click(buttonSelector)
            .then(() => page.evaluate(() => document.querySelector(buttonSelector).setAttribute('nate-action-type', 'click')))
                
        } catch(err) {
            console.log('the error', err)
        }

        // page two

        const selectClick= '.custom-select-trigger'
        
        try {
            const val = '#content-section > div > div > div > span:nth-child(1)'
            await page.waitForTimeout(15000)

            
            await page.click(selectClick).then(() => page.evaluate(() => document.querySelector('.custom-select-trigger').setAttribute('nate-action-type', 'click')))
            
            

            const getSelector = await page.evaluate( () => {
                let child;
                const options = [...document.querySelectorAll('.custom-option')]

                for(let i = 0; i < options.length; i++) {
                    if(options[i].innerHTML.toLowerCase() === 'london') child = i+1
    
                }
                
                return `#content-section > div > div > div > span:nth-child(${child})`
            })

            await page.waitForTimeout(4000)

            await page.click(getSelector).then((e) => console.log('london clicked')).then(() => page.evaluate(() => {
                let selector = document.querySelector('.custom-select-trigger')
                selector.setAttribute('nate-action-type', 'click')
                selector.setAttribute('nate-dic-key', 'city')

            
            }))
            await page.click('#next-page-btn')
        } catch(err) {
            console.log(err, 'select error')
        }
        
    }
    
    // page 3

    await page.waitForSelector('#popup').then(() => page.evaluate(() => {
        let popup = document.getElementById('popup')
        popup.style.display = 'none'
    }))

    await page.waitForSelector('#name')
    const dictObj = {
        city: "london",
        name: "nate", 
        password: "07000000000", 
        email: "nate@nate.tech", 
        gender: "female"
    }
    const completeForm = async (dict) => {
        try{
            await page.type('#name', dict.name, {delay: 500})
            await page.type('#pwd', dict.password, {delay: 500})
            await page.type('#phone', '15555555555')
            await page.type('#email', dict.email, {delay: 500})

            await page.evaluate((dict) => {
                const checkboxes = [...document.querySelectorAll('input[class=form-check]')]
                for(let box of checkboxes) {
                    if(!box.checked && box.value === 'female') box.checked = true
                    if(box.checked && box.value !== 'female') box.checked = false
                }
            })

        } catch(err) {
            console.log('form err', err)
        }
    }
    completeForm(dictObj)
}

page()

