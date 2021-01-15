const fs = require ('fs')

const hidePopUp = async (page) => {
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
 const completeForm = async (page,dict) => {
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
         }, dict).then(() => page.evaluate(() => {
             
            document.querySelector('input[class=form-check]').setAttribute('nate-action-type', 'checked')
            document.querySelector('input[class=form-check]').setAttribute('nate-dict-key', 'gender')
         })
            )

         // await page.evaluate(() => flagVisible())
         fs.writeFileSync('logs/after/page3.html', await page.content())
         await page.click('#btn').then(() => page.evaluate(() => document.querySelector('#bth')))


     } catch(err) {
         console.log('form err', err)
     }
 }

 module.exports = {
     hidePopUp,
     completeForm
 }
