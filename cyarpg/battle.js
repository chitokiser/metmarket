let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    huntAddr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6",
    battleAddr: "0x7dDe57bfe9aBC5aA9E7Ef3A9e42E2b9400B608F4"
  };
  let contractAbi = {
    battle: [
        "function inbattle( )public",
        "function charge(uint pay)public",
        "function taunt(uint num)public",
        "function battle( )public returns(bool)", 
        "function surrender( )public",
        "function AIbattle( )public",
        "function endwar( )public",
        "function feeup(uint _num)public",
        "function luckup(uint _num)public",
        "function cutup(address _cut )public",
        "function withdraw(uint num)public",
        "function g1(address user) public view returns(uint256)",
        "function g2(address user) public view returns(uint256)",
        "function g3(address user) public view returns(uint256)",
        "function g4(address user) public view returns(uint256)",
        "function g5(address user) public view  returns(uint256)",
        "function g6() public view  returns(uint256)",
        "function g7(address user) public view  returns(uint256)",
        "function g8(address user ) public view  returns(uint256)",
        "function g9(address user ) public view  returns(uint256)",
        "function g10(address user) public view  returns(uint256)",
        "function g11(address user) public view  returns(uint256)",
        "function g12() public view  returns(uint256)",
        "function tp() public view returns(uint256)",
        "function g13() public view virtual returns(uint256)",
        "function g14(address user) public view virtual returns(uint256)",
        "function getmy() public view virtual returns(uint,uint,uint,uint,address,uint,uint,uint,string memory)"
   
   ],
  
    hunt: [
        "function creat(string memory _answer,uint _level)public",
        "function hunting(uint _tid,string memory _answer)public",
        "function buybox(uint num)public",
        "function sellbox(uint num)public",
        "function huntregi( )public",
        "function powerup( )public",
        "function attup( )public",
        "function defup( )public",
        "function weaponup( )public",
        "function armoup( )public",
        "function unbox(uint num)public",
        "function g1() public view virtual returns(uint256)",
        "function g2(uint256 _id) public view returns(uint,uint256,address[]memory winner,uint box)",
        "function g4()public view returns(uint depo,uint sapp,uint ruby,uint eme,uint wes,uint ars)",
        "function getatt(address user) public view returns(uint)",
        "function getdef(address user) public view returns(uint)",
        "function getweapon(address user) public view returns(uint)",
        "function getarmo(address user) public view returns(uint)",
        "function getpower(address user) public view returns(uint)",
        "function getbox(address user) public view returns(uint)",
        "function boxprice() public view returns(uint256)",
        "function winners() public view returns(uint256)"
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
      ]

  };

  let BtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let battleContract = new ethers.Contract(contractAddress.battleAddr, contractAbi.battle, provider);
    
    let btp = await battleContract.tp();
    let btvl = await battleContract.g13();
    document.getElementById("Bts").innerHTML = (btp);
    document.getElementById("Btvl").innerHTML = (btvl/1e18).toFixed(6);

  };

  let Inbattle = async () => {
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
    
    let battleContract = new ethers.Contract(contractAddress.battleAddr, contractAbi.battle, signer);
  
    
    try {
      await battleContract.inbattle();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  let Charge = async () => {
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
    
    let battleContract = new ethers.Contract(contractAddress.battleAddr, contractAbi.battle, signer);
    let quantity = ethers.utils.parseUnits(document.getElementById('Cyainput').value, 18);
    
    try {
      await battleContract.charge(quantity);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  
  (async () => {
    BtopDataSync();
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

