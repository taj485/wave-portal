// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {

    //state variable
    // stroed permanently in contract storage
    uint256 totalWaves;

    struct person {
        address location;
        uint256 waveCount;
    }

    person[] waveStorage;


    constructor(){
        console.log("My first contract :D");
    }

    // public functions become available to call on the blockchain
    //similar to api endpoint
    function wave() public {
        totalWaves += 1;

        //msg.sender is the wallet address for the person who called the function
        //We know exactly who called the function because in order to even 
        //call a smart contract function, you need to be connected with a valid wallet!
        console.log("%s has waved!", msg.sender);
        // we can change this function so that only our address is allowed to send a wave. 
        //Or, maybe have it where only your friends can wave at you!

        waveStorage.push(person({location: msg.sender, waveCount: 1}));
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("wa have total of %s wave!", totalWaves);

        uint arrayLength = waveStorage.length;
        for (uint i=0; i<arrayLength; i++){
            console.log(waveStorage[i].location);
        }
        return totalWaves;
    }
}