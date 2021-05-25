const Web3 = require('web3')

//global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))


global.BigNumber = require('bignumber.js')


global.FnxTokenSol = artifacts.require('./PnxToken.sol')
global.FnxTokenABI = artifacts.require('./PnxToken.sol').abi
//global.CfncToken = web3.eth.contract(CfncTokenABI)


global.sleep = function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

global. wait = function (conditionFunc) {
    var loopLimit = 100;
    var loopTimes = 0;
    while (!conditionFunc()) {
        sleep(1000);
        loopTimes++;
        if(loopTimes>=loopLimit){
            throw Error("wait timeout! conditionFunc:" + conditionFunc)
        }
    }
}