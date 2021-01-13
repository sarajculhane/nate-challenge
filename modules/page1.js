   const fs = require('fs') 
    
    // Page One Automation

    const selectButton = async (page) => {
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
                        console.log('clicked on start')
                        // Array.from(document.querySelectorAll('*')).forEach( (val) => {
                        //     if(!val.hidden) val.setAttribute('nate-visible', 'true')
                        //     })
                        setTimeout(() => location.href='./page2.html', 2000)
                        
                        
                    }  
                    button.onclick =  () => onClick();
                    
                }
                )
            }))
            await page.hover(buttonSelector) // triggers the mouseover so that the proper attributes are added to the button element
            
             await page.click(buttonSelector)
             fs.writeFileSync('logs/after/page1.html', await page.content()) // writes html file for page1 into logs directory after execution
            
        } catch(err) {
            console.log('the error', err)
        }
    }

    module.exports = selectButton