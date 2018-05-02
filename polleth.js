/* polleth.js
// test spawning of a new contract from Ropsten deployement of polleth contract
*/
const pollethAddress = '0x460EfF952e6eF2F139C8148BEcb0366E3fCfc69d' // Ropsten TestNet
const pollethABI = [{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"polls","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_options","type":"uint8"}],"name":"spawnPoll","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfPolls","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newPoll","type":"address"}],"name":"NewPoll","type":"event"}]
const polleth = web3.eth.contract(pollethABI).at(pollethAddress)
// Define Gas Price / Limit
let gasPriceInGwei = 2
let gasPriceInWei = web3.toWei(gasPriceInGwei, 'gwei')
let gasPriceInHex = web3.toHex(gasPriceInWei)
let gasLimit = 3000000
let gasLimitInHex = web3.toHex(gasLimit)
// Load Listener to get user values
let sendButton = document.getElementById('send')
let numberOfOptions, rawLoad, txData

web3.version.getNetwork((err, netId) => {
  if (err) {
      console.log('Ethereum Network Error')
  }
  else if (netId == '3') {
      console.log('Connected to Ropsten Testnet')
      var account = web3.eth.accounts[0];
      if (account) {
        sendButton.addEventListener('click', function(){
          numberOfOptions = document.getElementById('numberOfOptions').value
          if (numberOfOptions) {
            spawnNewPoll();
          }
        });
      }
      else {
          console.log('Not Logged Into MetaMask')
      }
  }
  else {
      console.log('Not Connected to Ropsten Testnet')
  }
})
function spawnNewPoll(){
  web3.eth.getTransactionCount(web3.eth.accounts[0], function(err, data){
    if (data){
      // Build, Sign, Send, Show
      // Build that shit
      rawLoad = {
        "from": web3.eth.accounts[0],
        "to": pollethAddress,
        "gas": gasLimitInHex,
        "gasPrice": gasPriceInHex,
        "value": 0x0,
        "nonce": web3.toHex(data),
        "data": polleth.spawnPoll(numberOfOptions)
      }
      web3.eth.sendTransaction(rawLoad, function(err,hash){
        if (!err) {
          txData = 'https://etherscan.io/tx/' + hash
          console.log(hash)
          document.getElementById('txData').innerHTML = txData
        }
        else {
          console.log(err)
        }
      });
    }
  })
}