const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();


    //compile contract and generate files we need to work with our contract under artifacts folder
    const waveContractFactory = await  hre.ethers.getContractFactory("WavePortal");

    //hardhat will create a local eth network just for this contract. 
    //after the script is finished, the network will be destroyed
    const waveContract = await waveContractFactory.deploy();
    // wait for contract to be deployed on blockchain
    await waveContract.deployed();

    console.log("contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    //I am waving to my self :D
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    

    //random person to wave
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    //npx hardhat run scripts/run.js
}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
runMain();
