   const fs = require('fs')
   const deltaLog = require('./deltaLog')
    // Page One Automation

    const selectButton = async (page) => {
        try{
            await page.waitForTimeout(1000) // ensure page is fully loaded 
            const buttonSelector = 'input[type=button]' // the selector for the target button
        
                
            fs.writeFileSync('logs/before/page1.html', await page.content()) // writes html file for page1 into `logs/before` directory prior to execution
            
            
            
            // Wait for selector to be present then use page.evaluate to manipulate the button's attributes directly
            
            /*
            Since we must add the `nate-action-type` attribute and logged the post execution html, 
            we do not want to the redirect to page 2 to occur until after these two things have happened. The following changes prevent this:

            - Remove the onclick attribute on the button temporarily
            - Add an event listener that changes the button's onclick attribute on mouseover 
                onclick which will 
                1) Add the `nate-action-type` 
                2) Set the onclick attribute to the target location again
                3) Set location directly so it redirects on first click
            */
            await page.waitForSelector(buttonSelector).then(() => page.evaluate(() => {
                let button = document.querySelector('input[type=button]')
                button.removeAttribute('onclick')
                button.addEventListener('mouseover', () =>  {
                    const onClick = () => {
                        button.setAttribute('nate-action-type', 'click')
                        button.setAttribute('onclick', "location.href='./page2.html'")
                        setTimeout(() => location.href='./page2.html', 2000)
                        
                        
                    }  
                    button.onclick =  () => onClick();
                    
                }
                )
            }))
            
            await page.hover(buttonSelector) // triggers the mouseover so that the proper attributes are added to the button element
            
            await page.click(buttonSelector).then(async () => { // click on button selector
                fs.writeFileSync('logs/after/page1.html', await page.content())
                   deltaLog('page1')
           
            })
            // Logging (true on all pages)
            // 1) Writes html file for page1 into `logs/after` directory
            // 2) The `deltaLog` function then logs the delta in lines between before/after files to the console after execution
            
             
        } catch(err) {
            console.log('page 1 error', err)
        }
    }

    module.exports = selectButton;