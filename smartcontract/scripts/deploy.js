async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);
  

  // Deploy First
    // const First = await ethers.getContractFactory('MyToken');
    // const first = await First.deploy("Almur","AH");
    const first = "0x3f3e2a9cedbb30b1d3c7c29b2b7cf9dc3c1e68e2";

  // Deploy Second
    const Second = await ethers.getContractFactory('CrowdFund');
    const second = await Second.deploy(first);

  //  console.log( "First: " + first.address );
   console.log( "Second: " + second.address ); 

}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})

// const contractAddress = "0xb9239033275de5748a04658190d6dfb39859fad5";
// const tokenAddress = "0x3f3e2a9cedbb30b1d3c7c29b2b7cf9dc3c1e68e2";