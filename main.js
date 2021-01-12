const puppeteer = require('puppeteer');
const fs = require('fs')

const dictObj = {
    city: "london",
    name: "nate", 
    password: "07000000000", 
    email: "nate@nate.tech", 
    gender: "female"
}

const app = async (dict) => {
    // Launch Chrome/Chromium instance with Puppeteer and go to page one
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html');

    const flagVisible = async () => await page.evaluate( () => {
        Array.from(document.querySelectorAll('*')).forEach( (val) => {
            if(val.style.display !== 'none') val.setAttribute('nate-visible', 'true')
            })
    })

        await page.exposeFunction("flagVisible", flagVisible)
    // Page One Automation

    const selectButton = async () => {
        try{
            await page.waitForTimeout(1000) // ensure page is fully loaded 
            const buttonSelector = 'input[type=button]' // the selector for the target button
        
            await page.evaluate(  () => {
                flagVisible()
                // Array.from(document.querySelectorAll('*')).forEach( (val) => {
                //     if(!val.hidden) val.setAttribute('nate-visible', 'true')
                //     })
            })
                
            fs.writeFileSync('logs/before/page1.html', await page.content()) // writes html file for page1 into logs directory prior to execution
            
            
            
            // Wait for selector to be present then use page.evaluate to manipulate the button directly
            
            /*
            Since we must add the `nate-action-type` attribute and log the post execution html, 
            we do not want to the redirect to page 2 to occur until after these two things have happened. The following changes prevent this:

            - Remove the onclick attribute on the button
            - Add an event listener that changes the button's onclick attribute on mouseover 
                onclick will 
                1) add the `nate-action-type` 
                2) set the onclick attribute to the target location 
                3) set location directly so it redirects on first click
            */
            await page.waitForSelector(buttonSelector).then(() => page.evaluate(() => {
                let button = document.querySelector('input[type=button]')
                button.removeAttribute('onclick')
                button.addEventListener('mouseover', () =>  {
                    const onClick = () => {
                        button.setAttribute('nate-action-type', 'click')
                        button.setAttribute('onclick', "location.href='./page2.html'")
                        // flagVisible()
                        flagVisible()
                        // Array.from(document.querySelectorAll('*')).forEach( (val) => {
                        //     if(!val.hidden) val.setAttribute('nate-visible', 'true')
                        //     })
                        setTimeout(() => location.href='./page2.html', 3000)
                        
                        
                    }  
                    button.onclick =  () => onClick();
                    
                }
                )
            }))
            await page.hover(buttonSelector) // triggers the mouseover so that the proper attributes are added to the button element
            
             await page.click(buttonSelector)  // 
             fs.writeFileSync('logs/after/page1.html', await page.content()) // writes html file for page1 into logs directory after execution
            
        } catch(err) {
            console.log('the error', err)
        }
    }

        
        
        // Page Two Automation

        const selectCity = async () => {
        try {
            const selectClick= '.custom-select-trigger' // a click on this element will trigger the drop down menu
            await page.waitForTimeout(15000) // page takes a long time to load so adding a timeout before executing script further
            await page.evaluate(() => flagVisible())
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

            await page.waitForTimeout(4000)
            
            await page.click(getSelector).then((e) => console.log('london clicked')).then(() => page.evaluate(() => {
                let selector = document.querySelector('.custom-select-trigger')
                selector.setAttribute('nate-action-type', 'click')
                selector.setAttribute('nate-dic-key', 'city')

                // add the necessary attributes for 'action-type' / 'dic-type'  

            
            }))
            // await page.evaluate(() => flagVisible())
            fs.writeFileSync('logs/after/page2.html', await page.content()) // logging
            await page.click('#next-page-btn')
        } catch(err) {
            console.log(err, 'select error')
        }

    }
        
    
    
    // Page 3 Automation

   //  Just set the display property of popup to none to hide it

   const hidePopUp = async () => {
       try {
            await page.waitForSelector('#popup').then(() => page.evaluate(() => {
                let popup = document.getElementById('popup')
                popup.style.display = 'none'
            }))} catch(err) {
                console.log(err)
            }
        

}



    // Complete Form Function will fill out the form with the data from the dictionary object

    /*
      Page.type method is used to input the value and then we will also add the necessary attributes for 'action-type' / 'dic-type'
     
    */
    const completeForm = async (dict) => {
        try{
            await page.waitForSelector('#name')
            // await page.evaluate(() => flagVisible() // wait for form selector to appear
            fs.writeFileSync('logs/before/page3.html', await page.content())

            await page.type('#name', dict.name, {delay: 100}).then(() => page.evaluate(() => 
            {
            document.querySelector('#name').setAttribute('nate-action-type', 'input')
            document.querySelector('#name').setAttribute('nate-dic-key', 'name')
        }))
            
            await page.type('#pwd', dict.password, {delay: 100}).then(() => page.evaluate(() => 
            {
            document.querySelector('#pwd').setAttribute('nate-action-type', 'input')
            document.querySelector('#pwd').setAttribute('nate-dic-key', 'password')
        }))
            await page.type('#phone', '15555555555').then(() => page.evaluate(() => 
            {
            document.querySelector('#phone').setAttribute('nate-action-type', 'input')
            document.querySelector('#phone').setAttribute('nate-dic-key', 'phone')
        }))
            await page.type('#email', dict.email, {delay: 100}).then(() => page.evaluate(() => 
            {
            document.querySelector('#email').setAttribute('nate-action-type', 'input')
            document.querySelector('#email').setAttribute('nate-dic-key', 'email')
        }))

            /*
                For the gender field, we need to both ensure that the correct box is checked AND that the incorrect is not
                This can be done by selecting all the form-check selectors and then setting the box.checked true 
                as the correct field / false for the incorrect.
                After that, we use page.evaluate again to set the attributes on the .form-check class
            */

            
        await page.evaluate((dict) => {
                const checkboxes = [...document.querySelectorAll('input[class=form-check]')]
                for(let box of checkboxes) {
                    if(!box.checked && box.value === dict.gender) box.checked = true
                    if(box.checked && box.value !== dict.gender) box.checked = false
                }
            }, dict).then(() => page.evaluate(() => document.querySelector('input[class=form-check]').setAttribute('nate-action-type', 'checked')))

            // await page.evaluate(() => flagVisible())
            fs.writeFileSync('logs/after/page3.html', await page.content())
            await page.click('#btn').then(() => page.evaluate(() => document.querySelector('#bth')))


        } catch(err) {
            console.log('form err', err)
        }
    }
    selectButton()
    selectCity()
    hidePopUp()
    completeForm(dict)

}

app(dictObj)

/*
Notes

- Need to figure out how to set attribute with click on the submit
- Make sure to append all keys to the respective elements
- Add comments into code
- Valid with different values
- Simplify / modulate code where possible

*/

  //       Object.keys(dict).filter((key) => key !== 'gender' && key!=='password' ).forEach(async (key) => 
    //       {await page.type(`#${key}`, dict[key], {delay: 500})
          
    //         await page.evaluate((key) => 
    //         {
    //         console.log(key)
    //         document.querySelector(`#${key}`).setAttribute('nate-action-type', 'input')
    //         document.querySelector(`#${key}`).setAttribute('nate-dic-key', `${key}`)
    //     })
    // })