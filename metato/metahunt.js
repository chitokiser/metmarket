let contractAddress = {

    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    metahuntAddr: "0x22A58D3f1280A24c06Ec585DbacF6345d4cd64ee"
    
  };
  let contractAbi = {
   metahunt: [
      "function creat(string memory _answer,uint _level)public",
      "function hunting(uint _tid,string memory _answer)public",
      "function withdraw( )public",
      "function buybox(uint num)public",
      "function g1() public view virtual returns(uint256)",
      "function getbox(address user) public view returns(uint)",
      "function boxprice() public view returns(uint)",
      "function winners() public view returns(uint)",
      "function tid() public view returns(uint)"
    ],
    cyacoop: [
      "function getprice() public view returns(uint256)",
      "function allow() public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256 allowt, uint256 exp, uint8 level, uint256 booster)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function memberjoin(uint256 _num) public",
      "function automemberjoin() public",
      "function levelup() public returns(bool)",
      "function geteps(address user) external view returns (uint256)",
      "function withdraw() public returns(bool)",
      "function mentolength() public view returns(uint256)",
      "function addmento() public",
      "function buybooster() public",
      "function buycat(uint _num) public returns(bool)",
      "function sellcat(uint num) public returns(bool)"
    ],
 
  };

  let MhtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, provider);
    let bprice = await metahuntContract.boxprice();
    let win = await metahuntContract.winners();
    let hmtvl = await metahuntContract.g1();
    let hmtid = await metahuntContract.tid();
    //console.log(bprice);
    document.getElementById("Bprice").innerHTML = (bprice /1e18);
    document.getElementById("Win").innerHTML = (win);
    document.getElementById("Hmtvl").innerHTML = (hmtvl/1e18);
    document.getElementById("Hmtid").innerHTML = (hmtid);
    
  };




let Buybox = async () => {
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x38",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          chainName: "Binance Smart Chain",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://bscscan.com/"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, signer);
  let b1 = document.getElementById('buybox1').value;
  try {
    await metahuntContract.buybox(b1);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};


let Mhunting = async () => {
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x38",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          chainName: "Binance Smart Chain",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://bscscan.com/"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, signer);
  let b2 = document.getElementById('B2').value;
  let b3 = document.getElementById('B3').value;
  try {
    await metahuntContract.hunting(b2,b3);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};

  (async () => {
    MhtopDataSync();
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            chainName: "Binance Smart Chain",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com/"]
        }]
    });
    await userProvider.send("eth_requestAccounts", []);
  })();