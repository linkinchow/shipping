# Shipping
This project builds a shipping scenario based on Ethereum and IPFS.

## Scenario
Following four parties are involved in the scenario.
* Admin: Owner of the smart contract. The admin can get/set role of an address.
* Forwarder: The forwarder can create shipping orders and attach shipping order documents.
* Carrier: The carrier can view shipping orders and documents created by the forwarder. After reviewing them, the carrier can confirm the shipping order by attaching a confirmation letter.
* Shipper: The shipper can review confirmation letters and submit shipping instructions.

## Tools
* [Geth](https://github.com/ethereum/go-ethereum/wiki/geth)
* [go-ipfs](https://github.com/ipfs/go-ipfs)
* [Truffle](https://github.com/trufflesuite/truffle)
* [Ganache](http://truffleframework.com/ganache/)
* [web3.js](https://github.com/ethereum/web3.js/)
* [truffle-contract](https://github.com/trufflesuite/truffle-contract)
* [Angular CLI](https://github.com/angular/angular-cli)

## Environment
This project can be deployed on both localhost and Microsoft Azure Ethereum Consortium

### Localhost
1. Install go-ipfs, Truffle, Ganache and Angular CLI
2. Change variables in data.service.ts
3. truffle compile
4. truffle migrate
5. npm install
6. npm start

### Microsoft Azure Ethereum Consortium:
1. Create a private Microsoft Azure Ethereum Consortium with one or multiple members (depending on your budget). Ideally four members can be created for admin, forwarder, carrier and shipper. Smart contracts are shared among members.
2. Create consortium bridges to connect members
3. Create few VMs and install go-ipfs on them
4. Use `ipfs bootstrap add XXX` command to connect IPFS nodes
5. Make the gateway of one IPFS node public.
6. Create a Microsoft Azure Web App
7. Change variables in data.service.ts
8. Change networks in truffle-config.js
9. truffle compile
10. truffle migrate
11. ng build --prod
12. Upload files in /dist to Azure Web App
