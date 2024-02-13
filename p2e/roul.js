// Define contract address and ABI
let address3 = {
    roulAddr: "0x9898C50e9D63Ff596B83de78E9a55220FFB44208"  // Address of the roul contract
  };
  
  let abi3 = {
    roul: [
      "function single(uint8 _win, uint bet) public",
      "function jack( ) public view returns (uint256)",
      "function  jackprice() public view returns(uint)",
      "event result(uint num1)"
    ],
  };
  
 
  let updateRoulette = async () => {

    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    
    // Create a contract instance for the soccer contract
    let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul, provider);
    
    let jack1 = await roulContract.jackprice();
    
    document.getElementById("Jackpot").innerHTML = parseFloat(jack1/1e18).toFixed(2);
  
  }
    
  updateRoulette();
  