![Polleth](/img/polleth_banner.png)

Polleth is an Ethereum smart contract that creates simple Poll contracts and hashes the questions and options to the IPFS for simple and cost effective recall.

# Overview
With the emergence of blockchain based social media platforms, there has emerged a desire to create casual polls to embed with user posts. The only current polling Distributed Application (dApp) that exists and is commonly accessible is not targetted at the same casual audience that social media attracts or the use case desires. 

Polleth is created to fill that gap by allowing a user to spawn a simple Poll smart contract with a number of options defined upon creation. The number of options is the only value passed to the Polleth contract used to generate the Poll on the ethereum blockchain. All questions and options are stored on the IPFS along with the Poll's smart contract address for reference. That IPFS hash is then recorded into the Poll's smart contract, providing a two-way association between the Poll's contract and the IPFS entry.

The main goal of Polleth is to allow for developers of web3 enabled social media dApps a simple way to bring polling to their front-ends, and allow for interoperability. The open source nature of the Polleth project means that developers will have the ability to customize the appearance of the Polls, branding, and all aspects of user interaction.

# Concept / Data Flow
## Polleth - Poll Contract Generator
![Polleth Data Flow - Poll Creation](/img/polleth_dataFlow_PollCreation.png)

The Polleth smart contract takes in two parameters when spawnPoll is called:
1. The **number of options** that will be associated with the new poll
2. The **address** of the person generating the new Poll (msg.sender)

The remaining data on the question and options are stored on the IPFS in the form of JSON file which will, correlate against the smart contract when the Poll object is built and injected onto the serving webpage.
```json
{
  "contract":"0xTheContactAddressOfTheNewlySpawnedPoll",
  "owner":"0xTheEthereumAddressOfTheUserCreatingThePoll",
  "question":"The question that is to be populated in the Poll object once built on the webpage",
  "option":[
    "An array of options",
    "Which will be a length determined by how many options were submitted",
    "And will be correlated based on their index nubmer against the votes in the smart contract"
  ]
}
```

The IPFS Hash is returned and then stored in a separate call to the Poll contract to **setIpfsHash("QmHashSring")**. This can only be set once, and can only be set when **msg.sender** is the **owner**(original msg.sender) who spawned the new Poll from the Polleth contract.

Once the IPFS Hash has been stored, all data is available on the Ethereum blockchain and IPFS to build the Poll object on the page.
(This is where things start to get dicey, because I am not sure how CORS will come into play here, and how much MetaMask will play nicely with embedded objects accessing the globally scoped web3 object.)

The Poll object is built by providing the IPFS Hash (HTML ID for the Poll object), which will allow a destination address to query the IPFS for the JSON file to use for interacting with the new Poll Contract. From this JSON, a new "Poll" can be created to show the questions and options, and correlate those against a new web3.Poll object for interacting with the smart contract.

(Insert Data Flow for Poll contract here...)

Upon submission, a web3.sendTransaction is made to the Poll contract address with the **poll.voteForOption.getData(option)** method as the data in the RPC payload. (where 'option' is the index of the option being voted for by the caller. A vote will only be recorded if the **hasVoted\[address\]** is **false**, at which point the index of **votes\[option\]** and **voteCount** will each be incremented by 1, and **hasVoted\[address\]** will be set to **true**. An event will be emitted from the contract alerting any interface listening for changes to query the Poll smart contract for an updated **voteCount** and individual **votes\[\*\]** values, allow all results interfaces to show the most up-to-date results.

(totally a work in progress...)
