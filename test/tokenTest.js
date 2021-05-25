
// javascript:  transact with deployed Uniswap Factory contract - createExchange

let Web3 = require("web3");
//const Tx = require('ethereumjs-tx')

//var abi = '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

require('./constant.js')
require('truffle-test-utils').init()

////////////////////////////////////////////////////////////////////////////////////

let FnxTokenInstance,
    FnxTokenInstanceAddress

const MAX_FNX = 176495407;
////////////////////////////////////////////////////////////////////////////////////////

contract('PnxToken', async (accounts) => {

    it('[90000000] Deploy contracts', async () => {
        // unlock accounts
        FnxTokenInstance = await FnxTokenSol.new(accounts[1],accounts[2],{from:accounts[0]});
        FnxTokenInstanceAddress = FnxTokenInstance.address
        console.log('[INFO] PnxTokenInstance address:', FnxTokenInstanceAddress);
    })


    it('[90000100] check Pnx ,should success ', async () => {
        let user1Bal = await FnxTokenInstance.balanceOf(accounts[1]);
        user1Bal = web3.utils.fromWei(user1Bal);
        assert.equal(user1Bal,MAX_FNX,"max fnx not equal balance of user1")
    })

    it('[90000200] transfer Pnx ,should success ', async () => {
        var preTokens = await FnxTokenInstance.balanceOf(accounts[1]);

        let ret = await FnxTokenInstance.transfer(accounts[2],web3.utils.toWei(""+MAX_FNX) ,{from:accounts[1]});
        assert.equal(ret.receipt.status,true);

        var gotTokens = await FnxTokenInstance.balanceOf(accounts[2]);
        gotTokens = web3.utils.fromWei(gotTokens);
        assert.equal(gotTokens,MAX_FNX,"max fnx not equal balance of user1")

        let user1Bal = await FnxTokenInstance.balanceOf(accounts[1]);
        user1Bal = web3.utils.fromWei(user1Bal);
        assert.equal(user1Bal,0,"balance of user1 is not 0")

    })


    it('[90000300] approve Pnx ,should success ', async () => {

        var preTokens = await FnxTokenInstance.balanceOf(accounts[2]);

        let ret = await FnxTokenInstance.approve(accounts[3], web3.utils.toWei(""+MAX_FNX),{from:accounts[2]});
        assert.equal(ret.receipt.status,true);
        ret = await FnxTokenInstance.transferFrom(accounts[2],accounts[1],web3.utils.toWei(""+MAX_FNX),{from:accounts[3]});
        assert.equal(ret.receipt.status,true);

        sleep(200)
        var gotTokens = await FnxTokenInstance.balanceOf(accounts[2]);
        gotTokens = web3.utils.fromWei(gotTokens);
        assert.equal(gotTokens,0,"balance of user1 is not 0")

    })

    it('[90000300] change name ,should success ', async () => {
        let ret = await FnxTokenInstance.changeTokenName("cPhoenix","cPhx",{from:accounts[2]});
        assert.equal(ret.receipt.status,true);
        let name = await FnxTokenInstance.name();
        assert.equal(name,"cPhoenix","name is not match")
        let symbol = await FnxTokenInstance.symbol();
        assert.equal(symbol,"cPhx","fymbole is not match")
    })

})