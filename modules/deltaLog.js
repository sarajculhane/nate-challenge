require('colors')
const Diff = require('diff')
const fs = require('fs')

// This `deltaLog` function adds logging of differences in the HTML output directly in Node console
// for each page by line before and after every execution


const deltaLog = async (page) => {

    try {
      // File path to read from
      let fileBefore = `./logs/before/${page}.html` 
      let fileAfter = `./logs/after/${page}.html`

      // Read files and convert to strings
      let before = fs.readFileSync(fileBefore).toString()
      let after = fs.readFileSync(fileAfter).toString()

      // use `Diff` npm package (https://www.npmjs.com/package/diff) 
      // and `colors` (https://www.npmjs.com/package/colors) to get difference in files and add color code
      // Green shows modification of a line from the after file
      // Red shows original line from the before file
      // Grey shows unchanged lines

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