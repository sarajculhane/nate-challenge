const flagVisible = async (page) => await page.evaluate( () => {
    Array.from(document.querySelectorAll('*')).forEach( (val) => {
        
        if(val.style.display === 'none' || val.hidden) 
        {
            val.childNodes.forEach((child) => child.remove('nate-visible'))

        } else val.setAttribute('nate-visible', 'true')
        })
})

const dictObj = {
    city: "london",
    name: "nate", 
    password: "07000000000", 
    email: "nate@nate.tech", 
    gender: "female"
}

module.exports = {
    flagVisible,
    dictObj
}