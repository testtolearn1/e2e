
var budgetPage = {

    /**
     * define elements
     */
    categoryDropdown:  '//*[@name="categoryId"]',
    descriptionText:   '//*[@name="description"]',
    valueTextBox:   '//*[@name="value"]',
    addButton:   '//*[@type="submit"]',
    totalInflowText:  '//*[@id="root"]/main/section/div/div/div[1]/div/div[1]',
    totalOutFlowText:   '//*[@id="root"]/main/section/div/div/div[3]/div/div[1]',
    workingBalanceText:   '//*[@id="root"]/main/section/div/div/div[5]/div/div[1]',

    getTotalInflowAmount: function () {
        return this
           .getText('//*[@id="root"]/main/section/div/div/div[1]/div/div[1]').then(function(inflowval){  //fetches Total Inflow amount as Integer
                inflowValue = inflowval.substr(1)
                inflowValueInteger = parseInt(inflowValue.replace(',',''))   //removes '-' and $ sign , converts string to int
                return inflowValueInteger;
            })
    },

    getTotalOutflowAmount: function () {
        return this
            .getText('//*[@id="root"]/main/section/div/div/div[3]/div/div[1]').then(function(outflowval){  //fetches Total Outflow amount as Integer
                outflowValue = outflowval.substr(1)
                outflowValueInteger = parseInt(outflowValue.replace(',',''))   //removes '-' and $ sign , converts string to int
                return outflowValueInteger;
            })      
    },

    getWorkingBalance: function(){
        return this
         .getText('//*[@id="root"]/main/section/div/div/div[5]/div/div[1]').then(function(workingBal){ //fetches Workign balance  as Integer
                WorkignBalance = workingBal.substr(1)
                WorkignBalanceInteger = parseInt(WorkignBalance.replace(',',''))   //removes '-' and $ sign , converts string to int
                return WorkignBalanceInteger;
            })
    }

};


module.exports = budgetPage;