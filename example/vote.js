/* polleth.js
// test spawning of a new contract from Ropsten deployement of polleth contract
*/
var web3 = new Web3(web3.currentProvider);
var pollAddress = '0xc478566d81629b6ac6992ccbe0716e7c5439d8a3' // Ropsten TestNet
var pollABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"setIpfsHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfOptions","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_options","type":"uint8[]"}],"name":"voteForOptions","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ipfsHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"voteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_option","type":"uint8"}],"name":"voteForOption","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_options","type":"uint8"},{"name":"_multipleChoice","type":"bool"},{"name":"_creator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_hasVoted","type":"bool"}],"name":"VoteCast","type":"event"}]
var poll = web3.eth.contract(pollABI).at(pollAddress)

// Load Listener to get user values
var sendButton = document.getElementById('send')

web3.version.getNetwork((err, netId) => {
  if (err) {
    console.log('Ethereum Network Error')
  } else if (netId == '3') {
    console.log('Connected to Ropsten Testnet')
    var account = web3.eth.accounts[0];
    if (account) {
      sendButton.addEventListener('click', function () {
        var options = document.getElementById('numberOfOptions').value
        if (options) {
          var tx = {
            from: account,
            to: pollAddress,
            data: poll.voteForOption.getData(options)
          }
          web3.eth.sendTransaction(tx, function (err, data) {
            if (!err) {
              txData = 'https://etherscan.io/tx/' + data + " RECEIVED!"
              console.log(data)
              document.getElementById('txData').innerHTML = txData
            } else {
              console.log(err)
            }
          });
        }
      });
    } else {
      console.log('Not Logged Into MetaMask')
    }
  } else {
    console.log('Not Connected to Ropsten Testnet')
  }
})