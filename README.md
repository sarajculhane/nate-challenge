## Nate Web Automation Challenge

This is my submission for the Nate Web Automation challenge, which asks to write a program to navigate the link provided from the first page to final after submitting a form.

### Tech Stack
The following technologies were used primarily:


- **Javascript & Node.js**
- **Puppeteer** (Node library and Web automation API that works with Node & Chronium)
- **Mocha/Chai**  (Testing)

The NPM packages `Diff` and `colors` were also used for logging. 


I chose these technologies because of my familarity with JS/Node and used Puppeteer because of it's compatibility with Node and Chrome developer tools. While this was my first time using Puppeteer and I have not tried other popular automation tools, I feel that it's APIs were more than sufficient for the required tasks and appreciated the ease of integrating with my chosen environment. 

Similarly, I used Mocha/Chai because I have some exposure to them previously. 

### Run and Testing

Given the requirements, I thought the most important thing to test would be the application's ability to run with valid key-value pairs aside from what was provides.  While my test has several different specs, it is intended just to show this.  Although this test is fairly straightforward, I think that other possible tests like ensuring that the `nate-action-type` and `nate-dict-type` are present would be cumbersome for something that can be shown by looking at the changes in the logs.

To run the application or the associated tests:

```
npm install
npm start
npm test
```

### Change Logs

The `logs` directory stores the full html representation of each page before and after the execution actions. Additionally, the delta between the before and after of each file is logged to the console with color coded detail in Node once the after file is generated (by line). As noted in the tech stack section, two npm packages, `Diff` and `colors` where used to accomplish this. Example of this shown below for page 1 (red is removed/edited line and green added/edited):

![ScreenShot](/logs/example-log.png)

