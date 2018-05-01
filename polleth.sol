pragma solidity ^0.4.23;


contract Polleth {

    event NewPoll(address newPoll);

    address public owner = msg.sender;
    address[] public polls;
    uint public numberOfPolls = 0;

    function spawnPoll(uint8 _options) public returns(address) {
        Poll newPoll = new Poll(_options, msg.sender);
        polls.push(newPoll);
        numberOfPolls += 1;
        emit NewPoll(newPoll);
        return newPoll;
    }

    function withdrawFunds() public payable returns(bool) {
        require(msg.sender == owner);
        msg.sender.transfer(address(this).balance);
        return true;
    }
}


contract Poll {

    address public owner;
    bool private ipfsSet=false;
    bytes32 public ipfsHash; // need to chop off teh Qm for this to work right
    uint[] public voteCount;
    uint8 public numberOfOptions;
    uint public totalVotes;
    mapping (address => bool) public hasVoted;

    constructor(uint8 _options, address _owner) public {
        require(numberOfOptions == 0);
        uint8 i;
        owner = _owner;
        numberOfOptions = _options;
        for (i = 0; i < numberOfOptions; i++) {
            voteCount.push(0);
        }
    }

    function setIpfsHash(bytes32 _hash) public returns(bool) {
        require(msg.sender == owner);
        require(ipfsSet == false);
        ipfsHash = _hash;
        ipfsSet = true;
        return true;
    }

    function voteForOption(uint _option) public returns(bool) {
        require(hasVoted[msg.sender] != true);
        voteCount[_option] += 1;
        hasVoted[msg.sender] = true;
        return true;
    }
    
    function withdrawFunds() public payable returns(bool) {
        require(msg.sender == owner);
        msg.sender.transfer(address(this).balance);
        return true;
    }
}