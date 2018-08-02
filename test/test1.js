var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var browser = webdriverio.remote(options);
var chai = require('chai');
var assert = require('chai').assert;



describe('Moduscreate Budgeting app', function() {
    this.timeout(99999999);

    it('should Verify User is able to add expenses under Category :Kids from the category list', function () {
        return browser
            .init()
            .url('https://budget.modus.app/#/budget')  // launch url
            .selectByVisibleText('//*[@name="categoryId"]',"Kids").then(function(){  // selects Kids from dropdown
                this.click()
              })
            .pause(3000)
            .setValue('//*[@name="description"]','Kids birthday Funcity') // enters description
            .pause(3000)
            .setValue('//*[@name="value"]',200)  // enters amount
            .pause(3000)
            .click('//*[@type="submit"]')  // clicks Add button
            .end()
    });

    it('should verify total inflow /outflow and working balance calculation under Budget tab', function(){
        return browser
            .init()
            .url('https://budget.modus.app/#/budget')
            .getText('//*[@id="root"]/main/section/div/div/div[1]/div/div[1]').then(function(inflowval){  //fetches Total Inflow amount as Integer
                 initialInflowValue = inflowval.substr(1)
                 newinitialInflowValue = parseInt(initialInflowValue.replace(',',''))  //removes '-' and $ sign , converts string to int
            })
            .getText('//*[@id="root"]/main/section/div/div/div[3]/div/div[1]').then(function(outflowval){  //fetches Total Outflow amount as Integer
                initialoutflowValue = outflowval.substr(1)
                newinitialoutflowValue = parseInt(initialoutflowValue.replace(',',''))   //removes '-' and $ sign , converts string to int
            })
            .getText('//*[@id="root"]/main/section/div/div/div[5]/div/div[1]').then(function(workingBal){ //fetches Workign balance  as Integer
                initialWorkignBalance = workingBal.substr(1)
                newinitialWorkignBalance = parseInt(initialWorkignBalance.replace(',',''))   //removes '-' and $ sign , converts string to int
            })
            .selectByVisibleText('//*[@name="categoryId"]',"Travel").then(function(){
                this.click()
            })
            .pause(3000)
            .setValue('//*[@name="description"]','Travel expenses')
            .pause(3000)
            .setValue('//*[@name="value"]',200)
            .pause(3000)
            .click('//*[@type="submit"]')   //adds travel expenses and now will verify the new amounts
            .getText('//*[@id="root"]/main/section/div/div/div[1]/div/div[1]').then(function(inflowval){
                finalInflowValue = inflowval.substr(1)
                newfinalInflowValue = parseInt(finalInflowValue.replace(',',''))
                assert.equal(newfinalInflowValue,newinitialInflowValue)  //assertion for updated Inflow amount
            })
            .getText('//*[@id="root"]/main/section/div/div/div[3]/div/div[1]').then(function(outflowval){
                finaloutflowValue = outflowval.substr(1)
                newfinaloutflowValue = parseInt(finaloutflowValue.replace(',',''))
                assert.equal(newfinaloutflowValue,newinitialoutflowValue+200 )   //assertion for updated Outflow amount

            })
            .getText('//*[@id="root"]/main/section/div/div/div[5]/div/div[1]').then(function(workingBal){
                finalWorkignBalance = workingBal.substr(1)
                newfinalWorkignBalance = parseInt(finalWorkignBalance.replace(',',''))
                assert.equal(newfinalWorkignBalance,newinitialWorkignBalance-200 )  //passing scenario   //assertion for updated Working balance 
                assert.equal(newfinalWorkignBalance,newinitialWorkignBalance-800 ) // Failing scenario  // comment this line to pass the test

            })
            .end()

    })
    


   
});

