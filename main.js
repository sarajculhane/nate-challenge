const puppeteer = require('puppeteer');
const fs = require('fs')

const app = async () => {
    const browser = await puppeteer.launch({headless: false});
    
    const page = await browser.newPage();
    const buttonSelector = 'input[type=button]'
    
    // page one

    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');
    await page.waitForTimeout(1000)
    fs.writeFileSync('logs/before/page1.html', await page.content())


        try{
            

            await page.waitForSelector(buttonSelector).then(() => page.evaluate(() => {
            try {  
                let button = document.querySelector('input[type=button]')
                button.removeAttribute('onclick')
                button.addEventListener('mouseover', () =>  {
                    const onClick = () => {
                        button.setAttribute('nate-action-type', 'click')
                        button.setAttribute('onclick', "location.href='./page2.html'")
                        console.log([...document.querySelectorAll('*')])
                        setTimeout(() => location.href='./page2.html', 5000)
                        
                        
                    }  
                    button.onclick =  () => onClick();
                    
                }
                )
            } catch(err) {
                console.log(err, 'from the event listener')
            }
            }))
            // await page.waitForTimeout(5000)
            // await page.waitForSelector(buttonSelector)
            await page.hover(buttonSelector)
            // fs.writeFileSync('logs/after/page1.html', await page.content())
            
             await page.click(buttonSelector) 
             fs.writeFileSync('logs/after/page1.html', await page.content())
            
        } catch(err) {
            console.log('the error', err)
        }
        
        // page two

        const selectClick= '.custom-select-trigger'
        try {
            
            await page.waitForTimeout(15000)
            fs.writeFileSync('logs/before/page2.html', await page.content())
            
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
            fs.writeFileSync('logs/after/page2.html', await page.content())
            await page.click('#next-page-btn')
        } catch(err) {
            console.log(err, 'select error')
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
    fs.writeFileSync('logs/before/page3.html', await page.content())
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
            }).then(() => page.evaluate(() => document.querySelector('input[class=form-check]').setAttribute('nate-action-type', 'checked')))
            fs.writeFileSync('logs/after/page3.html', await page.content())
            await page.click('#btn').then(() => page.evaluate(() => document.querySelector('#bth').setAttribute('nate-action-type', 'click')))

        } catch(err) {
            console.log('form err', err)
        }
    }
    completeForm(dictObj)

}

app()

/*
Notes

- Need to figure out how to set attribute with click on the submit
- Make sure to append all keys to the respective elements
- Add comments into code
- Valid with different values
- Simplify / modulate code where possible

*/