const Web3 = require('web3')

//global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))


global.BigNumber = require('bignumber.js')


global.FnxTokenSol = artifacts.require('./FnxToken.sol')
global.FnxTokenABI = artifacts.require('./FnxToken.sol').abi
//global.CfncToken = web3.eth.contract(CfncTokenABI)


global.OWNER_ADDRESS = '0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e'.toLowerCase();
global.USER1_ADDRESS = '0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8'.toLowerCase();
global.USER2_ADDRESS = '0xf851B2eDAe9D24876ed7645062331622e4f18A05'.toLowerCase();


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