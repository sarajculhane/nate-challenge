## Nate Web Automation Challenge

This is my submission for the Nate Web Automation challenge, which asks to write an automated program that navigates through a series of webpages that require user input actions from the first page to final while also simultaneously logging these pages and modifying DOM elements.

### Tech Stack
The following technologies were used primarily:

- **Javascript & Node.js**
- **Puppeteer** (Node library for Web automation API that works with Node & Chronium)
- **Mocha/Chai**  (Testing)

The NPM packages `Diff` and `colors` were also used for logging of changes between pages after execution. 


I chose these technologies because of my familarity with JS/Node and used Puppeteer because of its compatibility with Node and Chrome developer tools. While this was my first time using Puppeteer and I have yet to try most other popular automation tools, I feel that its APIs were more than sufficient for the required tasks and appreciated the ease of integrating with my chosen environment. 

Similarly, I used Mocha/Chai because I have some exposure to them previously. 

### Testing

Given the requirements, I thought it would be most important to test application's ability to run End to End, particularly while using differet valid key-value pairs than what was provided. While my test a handful of different specs, its primary intent is to simply show the successful navigation, not to test at a granular level. Although these tests are fairly straightforward, I feel that the logging provided makes up for any gaps, eg. the logs demonstrate that the `nate-action-type` and `nate-dict-type` have be added as required even though the tests do not.



### Change Logs

The `logs` directory stores the full HTML representation of each page before and after the executed actions. Additionally, the delta between the before and after of each file is logged to the console with color coded detail in Node once the after file is generated (deltas shown by line). As noted in the tech stack section, two npm packages, `Diff` and `colors` were used to accomplish this. 

Example of logging for page 1 (red is removed/edited line and green added/edited):

![ScreenShot](/logs/example-log.png)


### Install and Run

To run the application or the associated tests:

```
npm install
npm start
npm test
```
