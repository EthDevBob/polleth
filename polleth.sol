pragma solidity ^0.4.23;


contract Polleth {

    event NewPoll(address newPoll);

    address public owner;
    address[] public polls;
    uint public numberOfPolls;

    constructor() public{
        owner = msg.sender;
    }

    function spawnPoll(uint8 _options, bool _multipleChoice) public returns(address) {
        Poll newPoll = new Poll(_options, _multipleChoice, msg.sender);
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

    event VoteCast(address _voter, bool _hasVoted);

    address public owner;
    bool private ipfsSet;
    string public ipfsHash;
    uint8 public numberOfOptions;
    bool private multipleChoice;
    uint[] public votes;
    uint public voteCount;
    mapping (address => bool) public hasVoted;

    constructor(uint8 _options, bool _multipleChoice, address _creator) public {
        require(numberOfOptions == 0);
        uint8 i;
        owner = _creator;
        numberOfOptions = _options;
        for (i = 0; i < numberOfOptions; i++) {
            votes.push(0);
        }
    }

    function setIpfsHash(string _hash) public returns(bool) {
        require(msg.sender == owner);
        require(ipfsSet == false);
        ipfsHash = _hash;
        ipfsSet = true;
        return true;
    }

    function voteForOption(uint8 _option) public returns(bool) {
        require(hasVoted[msg.sender] != true);
        votes[_option] += 1;
        voteCount += 1;
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, hasVoted[msg.sender]);
        return true;
    }

    function voteForOptions(uint8[] _options) public returns(bool) {
        require(hasVoted[msg.sender] != true);
        uint8 i;
        for (i = 0; i < _options.length; i++) {
            votes[_options[i]] += 1;
        }
        voteCount += 1;
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, hasVoted[msg.sender]);
        return true;
    }
    
    function withdrawFunds() public payable returns(bool) {
        require(msg.sender == owner);
        msg.sender.transfer(address(this).balance);
        return true;
    }
}