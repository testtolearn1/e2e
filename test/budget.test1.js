var webdriverio = require('webdriverio');
var assert = require('chai').assert;
var budgetPage = require('../lib/page-objects/budget.page');




describe('Moduscreate Budgeting app', function() {
    this.timeout(99999999);
    var browser = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });


    browser.addCommand('getTotalInflowAmount', budgetPage.getTotalInflowAmount.bind(browser));
    browser.addCommand('getTotalOutflowAmount', budgetPage.getTotalOutflowAmount.bind(browser));
    browser.addCommand('getWorkingBalance', budgetPage.getWorkingBalance.bind(browser));


    beforeEach(function(){
        return browser.init().url('https://budget.modus.app/#/budget');
    });

    it('should Verify User is able to add expenses under Category :Kids from the category list', function () {
        return browser
            .selectByVisibleText(budgetPage.categoryDropdown,"Kids").then(function(){  // selects Kids from dropdown
                this.click()
              })
            .pause(3000)
            .setValue(budgetPage.descriptionText,'Kids birthday Funcity') // enters description
            .pause(3000)
            .setValue(budgetPage.valueTextBox,200)  // enters amount
            .pause(3000)
            .click(budgetPage.addButton)  // clicks Add button
    });

    it('should verify total inflow /outflow and working balance calculation under Budget tab', function(){
        return browser
            .init()
            .url('https://budget.modus.app/#/budget')
            .getText(budgetPage.totalInflowText).then(function(inflowval){  //fetches Total Inflow amount as Integer
                 initialInflowValue = inflowval.substr(1)
                 newinitialInflowValue = parseInt(initialInflowValue.replace(',',''))  //removes '-' and $ sign , converts string to int
            })
            .getText(budgetPage.totalOutFlowText).then(function(outflowval){  //fetches Total Outflow amount as Integer
                initialoutflowValue = outflowval.substr(1)
                newinitialoutflowValue = parseInt(initialoutflowValue.replace(',',''))   //removes '-' and $ sign , converts string to int
            })
            .getText(budgetPage.workingBalanceText).then(function(workingBal){ //fetches Workign balance  as Integer
                initialWorkignBalance = workingBal.substr(1)
                newinitialWorkignBalance = parseInt(initialWorkignBalance.replace(',',''))   //removes '-' and $ sign , converts string to int
            })
            .selectByVisibleText(budgetPage.categoryDropdown,"Travel").then(function(){
                this.click()
            })
            .pause(3000)
            .setValue(budgetPage.descriptionText,'Travel expenses')
            .pause(3000)
            .setValue(budgetPage.valueTextBox,200)
            .pause(3000)
            .click(budgetPage.addButton)   //adds travel expenses and now will verify the new amounts
            .getText(budgetPage.totalInflowText).then(function(inflowval){
                finalInflowValue = inflowval.substr(1)
                newfinalInflowValue = parseInt(finalInflowValue.replace(',',''))
                assert.equal(newfinalInflowValue,newinitialInflowValue)  //assertion for updated Inflow amount
            })
            .getText(budgetPage.totalOutFlowText).then(function(outflowval){
                finaloutflowValue = outflowval.substr(1)
                newfinaloutflowValue = parseInt(finaloutflowValue.replace(',',''))
                assert.equal(newfinaloutflowValue,newinitialoutflowValue+200 )   //assertion for updated Outflow amount

            })
            .getText(budgetPage.workingBalanceText).then(function(workingBal){
                finalWorkignBalance = workingBal.substr(1)
                newfinalWorkignBalance = parseInt(finalWorkignBalance.replace(',',''))
                assert.equal(newfinalWorkignBalance,newinitialWorkignBalance-200 )  //passing scenario   //assertion for updated Working balance 
                assert.equal(newfinalWorkignBalance,newinitialWorkignBalance-800 ) // Failing scenario  // comment this line to pass the test

            })

    })
    

    afterEach(function(){
        return browser.end();
    })
    
   
});

