const Web3 = require('./lib/web3')
const IPFS = require('./lib/ipfs-mini');

module.exports = Polleth;

function Polleth(){
    var web3 = new Web3(web3.currentProvider);
    var pollethAddress = '0x7724ba8E1dbfcD41657F1560D6468Eb560A11C9C' // Ropsten TestNet
    var pollethABI = [{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_options","type":"uint8"},{"name":"_multipleChoice","type":"bool"}],"name":"spawnPoll","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"polls","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfPolls","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newPoll","type":"address"}],"name":"NewPoll","type":"event"}]
    var polleth = web3.eth.contract(pollethABI).at(pollethAddress)
    var ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
}

Polleth.prototype.spawnPoll = async function spawnPoll(options, multipleChoice) {
    var account = web3.eth.accounts[0];
    if (account && options) {
        var tx = { from: account, to: pollethAddress, data: polleth.spawnPoll.getData(options, multipleChoice) }
        web3.eth.sendTransaction(tx, function (err, data) {
            if (!err) {
                console.log(data)
            } else {
                console.log(err)
            }
        });
    }
}
