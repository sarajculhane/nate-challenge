require('colors')
const Diff = require('diff')
const fs = require('fs')

// This `deltaLog` function adds console logging of difference 
// in the html output between each line before and after each execution


const deltaLog = async (page) => {

    try {
      // File path to read
      let fileBefore = `./logs/before/${page}.html` 
      let fileAfter = `./logs/after/${page}.html`

      // Read files and convert to strings
      let before = fs.readFileSync(fileBefore).toString()
      let after = fs.readFileSync(fileAfter).toString()

      // use `Diff` npm package (https://www.npmjs.com/package/diff) 
      // and `colors` (https://www.npmjs.com/package/colors) to get difference in files and add color code
      // green shows modification of a line from the after file
      // red shows original line from the before file
      // grey shows unchanged lines

      const change = Diff.diffLines(before, after)
        change.forEach((line) => {

        const color = line.added ? 'green' :
          line.removed ? 'red' : 'grey'
          console.log(line.value[color])
        
      });
    } catch(err) {
      console.log(err)
    }

}

module.exports = deltaLog;