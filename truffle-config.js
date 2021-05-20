const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';


module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            network_id: '*',
            gas: 6000000
        },
        // Rinkeby testnet
        rinkeby: {
            provider: function() {
              return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/Kuo1lxDBsFtMnaw6GiN2")
            },
            network_id: '4',
            gas: 6000000,
            gasPrice: 10000000000 // 10 Gwei
        },
    },
    compilers: {
        solc: {
            version: '0.5.3',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        enableTimeouts:false,
        timeout: 300000000
    }
}
