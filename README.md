This folder contains e2e tests for ModusCreate Budget app. The detailed testcases and Testplan have been added under the root folder E2E. 
The tests have been written using Javascript webdriverio. The preference of webdriverio over nightmare is its capability to run test over multiple browsers. Nightmare however uses Electron as its executing browser.
Chai.assert has been widely used for assertions.

Also Standalone webdriver with selenium standalone server has been used with mocha as test framework and test runner.
 WDIO Testrunner has been avaoided so as to leverage the utility of using promises and manipulating data using them . 

Tools : Mac OS 
Libraries used : mocha , webdriverio, chai.assert

Steps To Run tests:
1. Clone the project from git@github.com:testtolearn1/e2e.git
2. cd e2e
3. npm i
4. One one shell run $java -jar selenium-server-standalone-3.4.0.jar  to start selenium server
5. On another shell run $mocha test/test1.js   , $mocha test/test2.js The test contain both positive and negative scenarios.
The failing of negative scenarios could be avoided by commenting out line of code as mentioned in the test itself
6. For running reports :  mochawesome is used
$mocha test/test1.js --reporter mochawesome
The reports are generated under /Users/divyagupta/Workspace/budgeting/e2e/mochawesome-report
Copy path ~/Workspace/budgeting/e2e/mochawesome-report/mochawesome.html and paste in browser url , Reports are displayed


TestPlan : Under root folder e2e
Testcases : Under root folder e2e
Note : comments have been added with code for smooth understanding
