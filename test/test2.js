var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var browser = webdriverio.remote(options);
var chai = require('chai');
var assert = require('chai').assert;



describe('Moduscreate Budgeting app', function() {
    this.timeout(99999999);

    it('should add all groceries category expenses from the list and verify against reports data ', function () {
        return browser
            .init()
            .url('https://budget.modus.app/#/budget')
            .getTagName('tr').then(function(val){
                xpatharr = []
                tableArr =[]
                sum =0 , incomesum =0

                rowscount = val.length   // counts the items in list to iterate though amounts for a particular category like Groceries
                console.log('This is number of rows in the list', rowscount)    
                for(var i = 1 ; i<=rowscount; i++){
                    newxpath = '//*[@id="root"]/main/section/table/tbody/tr['+i+']/td[1]/div[2]'  // creates dynamic xpath 
                    xpatharr.push(newxpath)    //pushes the xpath for each line item in an array
                }

                xpatharr.forEach(function(xelem){
                    browser.getText(xelem).then(function(valueString){
                        console.log("This is valueString ", valueString)
                        if(valueString === 'Groceries'){    //this block adds up all the expenses made under Groceries category from the list
                            i= (xpatharr.indexOf(xelem))+1

                            newAmtxpath = '//*[@id="root"]/main/section/table/tbody/tr['+i+']/td[3]/div[2]'  // xpath for amount
                            this.getText(newAmtxpath).then(function(valueAmount){
                            console.log("This is amount", valueAmount)

                            newvalueAmount = valueAmount.substr(2)  // remove '-' sign and $ , and converts the string to an integer so as to calculate sum of expenses under the given category
                            finalvalueAmount = parseFloat(newvalueAmount.replace(',',''))

                            sum = sum + finalvalueAmount;   // total expense sum for groceries
                            console.log("this is Expense sum", sum)

                             })
    
                        } else if(valueString === 'Income') {  // This calculates sum for Income
                            i= (xpatharr.indexOf(xelem))+1

                            newAmtxpath = '//*[@id="root"]/main/section/table/tbody/tr['+i+']/td[3]/div[2]'
                            this.getText(newAmtxpath).then(function(valueAmount){
                            console.log("This is amount", valueAmount)

                            newvalueAmount = valueAmount.substr(1) //remove $ sign and converts string to int for calculations
                            finalvalueAmount = parseFloat(newvalueAmount.replace(',',''))

                            incomesum = incomesum + finalvalueAmount;
                            console.log("this is incomesum", incomesum)

                            })
                        } else {
                            return false;
                        }
                    })
                })
            })
            
            .pause(3000)
            .click('//*[@href="#/reports"]')  //  moves to reports tab and verifies the amount displayed for groceries should match the calculated one in above lines of code
            .pause(3000)
            .isVisible("//*[text()='Groceries']").then(function(val){
                assert.equal(val,true )
            })
            .isVisible("//*[text()='$423.34']").then(function(val){
            assert.equal(sum,423.34 )   //pass scenario
            assert.equal(val,true )    //pass scenario
           // assert.equal(sum,4233.34 )  //failed scenario : comment this line to completely pass the test, uncomment to check failed scenario

            })


    });

});
