const puppeteer = require('puppeteer');

const dictObj = 
{
    city: "london",
    name: "nate", 
    password: "07000000000", 
    email: "nate@nate.tech", 
    gender: "female"
}

const page = async () => {
    const browser = await puppeteer.launch({headless: false});
    
    const page = await browser.newPage();
    const buttonSelector = 'input[type=button]'
    await page.waitForTimeout(1000)
    
    // page one

    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');
    // const button = await page.evaluate(() => {
    //     let btn = document.getElementsByTagName('button')
    //     return btn
    // })
    // console.log(button)
    const pageOneBeforeClick = await page.content()
    // button.addEventListener('click', (e) => { 
    //     e.setAttribute("nate-action-type", "click")
    //     console.log('done')
    // })
    if(page.$(buttonSelector)) {
        try{

            await page.click(buttonSelector).then(() => page.evaluate(() => document.querySelector('.custom-select-trigger').setAttribute('nate-action-type', 'click')))
                
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
                    // console.log(city.getAttribute('data-value'), city.innerHTML.toLowerCase() === 'london')
                }
                
                return `#content-section > div > div > div > span:nth-child(${child})`
            })

            await page.waitForTimeout(4000)

            await page.click(getSelector).then((e) => console.log('london clicked')).then(() => page.evaluate(() => {
                let selector = document.querySelector('.custom-select-trigger')
                selector.setAttribute('nate-action-type', 'click')
                selector.setAttribute('nate-dic-key', 'city')

            
            }))
            // await page.click('#next-page-btn')
            
        } catch(err) {
            console.log(err, 'select error')
        }
        
    }
    

    


    // await page.evaluate(() => {
    //     console.log(document.querySelector('button'))
    // })
}

page()