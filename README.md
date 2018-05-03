![Polleth](/img/polleth_banner.png)

Polleth is an Ethereum smart contract that creates simple Poll contracts and hashes the questions and options to the IPFS for simple and cost effective recall.

# Overview
With the emergence of blockchain based social media platforms, there has emerged a desire to create casual polls to embed with user posts. The only current polling Distributed Application (dApp) that exists and is commonly accessible is not targetted at the same casual audience that social media attracts or the use case desires. 

Polleth is created to fill that gap by allowing a user to spawn a simple Poll smart contract with a number of options defined upon creation. The number of options is the only value passed to the Polleth contract used to generate the Poll on the ethereum blockchain. All questions and options are stored on the IPFS along with the Poll's smart contract address for reference. That IPFS hash is then recorded into the Poll's smart contract, providing a two-way association between the Poll's contract and the IPFS entry.

The main goal of Polleth is to allow for developers of web3 enabled social media dApps a simple way to bring polling to their front-ends, and allow for interoperability. The open source nature of the Polleth project means that developers will have the ability to customize the appearance of the Polls, branding, and all aspects of user interaction.
