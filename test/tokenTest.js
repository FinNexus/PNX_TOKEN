
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

let mintTokenAmount = 100;

////////////////////////////////////////////////////////////////////////////////////////
contract('FnxToken', async ([owner]) => {

    it('[90000000] Deploy contracts', async () => {

        owner = OWNER_ADDRESS;
        // unlock accounts

        console.log(owner);


        FnxTokenInstance = await FnxTokenSol.new({from:owner});
        FnxTokenInstanceAddress = FnxTokenInstance.address
        console.log('[INFO] FnxTokenInstance address:', FnxTokenInstanceAddress);

    })


    it('[90000100] mint Fnx ,should success ', async () => {

        var preTokens = await FnxTokenInstance.balanceOf(USER1_ADDRESS);

        let ret = await FnxTokenInstance.mint(USER1_ADDRESS,web3.utils.toHex(mintTokenAmount*10**18) ,{from:owner});
       // console.log(ret)

       var gotTokens = await FnxTokenInstance.balanceOf(USER1_ADDRESS);

        console.log("function got tokens=",gotTokens);

        assert.equal(web3.utils.toHex(gotTokens - preTokens),web3.utils.toHex(mintTokenAmount*10**18));

        ret = await FnxTokenInstance.mint(owner,web3.utils.toWei((mintTokenAmount*1000).toString(),"ether") ,{from:owner});

    })


    it('[90000200] transfer Fnx ,should success ', async () => {

        var preTokens = await FnxTokenInstance.balanceOf(USER2_ADDRESS);

        let ret = await FnxTokenInstance.transfer(USER2_ADDRESS,web3.utils.toHex(mintTokenAmount*10**18) ,{from:owner});
        //console.log(ret)

        var gotTokens = await FnxTokenInstance.balanceOf(USER2_ADDRESS);

        console.log("function got tokens=",gotTokens);

        assert.equal(web3.utils.toHex(gotTokens - preTokens),web3.utils.toHex(mintTokenAmount*10**18));
    })


    it('[90000300] approve Fnx ,should success ', async () => {

        var preTokens = await FnxTokenInstance.balanceOf(USER1_ADDRESS);

        let ret = await FnxTokenInstance.approve(USER2_ADDRESS,web3.utils.toHex(mintTokenAmount*10**18) ,{from:owner});
       // console.log(ret)
        ret = await FnxTokenInstance.transferFrom(owner,USER1_ADDRESS,web3.utils.toHex(mintTokenAmount*10**18),{from:USER2_ADDRESS});
        //console.log(ret)

        sleep(200)
        var gotTokens = await FnxTokenInstance.balanceOf(USER1_ADDRESS);

        console.log("function got tokens=",gotTokens);

        assert.equal(web3.utils.toHex(gotTokens - preTokens),web3.utils.toHex(mintTokenAmount*10**18));
    })



})