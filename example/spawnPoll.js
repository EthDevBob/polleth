/* polleth.js
// test spawning of a new contract from Ropsten deployement of polleth contract
*/
var web3 = new Web3(web3.currentProvider);
var pollethAddress = '0x460EfF952e6eF2F139C8148BEcb0366E3fCfc69d' // Ropsten TestNet
var pollethABI = [{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"polls","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_options","type":"uint8"}],"name":"spawnPoll","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfPolls","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newPoll","type":"address"}],"name":"NewPoll","type":"event"}]
var polleth = web3.eth.contract(pollethABI).at(pollethAddress)

// Load Listener to get user values
var sendButton = document.getElementById('send')

web3.version.getNetwork((err, netId) => {
  if (err) {
      console.log('Ethereum Network Error')
  }
  else if (netId == '3') {
      console.log('Connected to Ropsten Testnet')
      var account = web3.eth.accounts[0];
      if (account) {
        sendButton.addEventListener('click', function(){
          var options = document.getElementById('numberOfOptions').value
          if (options) {
            var tx = {
              from: account,
              to: pollethAddress,
              data: polleth.spawnPoll.getData(options)
            }
            web3.eth.sendTransaction(tx, function(err,data){
              if (!err) {
                txData = 'https://etherscan.io/tx/' + data + " RECEIVED!"
                console.log(data)
                document.getElementById('txData').innerHTML = txData
              }
              else {
                console.log(err)
              }
            });
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