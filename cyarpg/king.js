let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    huntAddr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6",
    kingAddr: "0x63846a736D143565278FbeF45a8B0c2EA26cD1EF"
  };
  let contractAbi = {
    king: [
      "function battleking( )public",
      "function battlequeen( )public",
      "function battlekningt( )public",
      "function feeup(uint num )public",
      "function kingtax( )public",
      "function queentax( )public",
      "function knighttax( )public",
      "function g1(address user) public view returns(uint256)",
      "function g2(address user) public view returns(uint256)",
      "function g3(address user) public view returns(uint256)",
      "function g4(address user) public view returns(uint256)",
      "function g5(address user) public view  returns(uint256)",
      "function g6() public view  returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function g8( ) public view returns(uint256)",
      "function g9( ) public view returns(uint256)",
      "function g10(address user ) public view  returns(uint256)",
      "function getmy( ) public view returns(uint,uint,string memory)",
      "function g11(address user) public view  returns(uint256)",
      "function g12() public view virtual returns(uint256)",  
      "function kingstory() public view returns(uint256)",
      "function king() public view returns(address)",
      "function queen() public view returns(address)",
      "function knight() public view returns(address)"
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

  let KtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, provider);
    let ktvl = await kingContract.g12();
    let kkingstory = await kingContract.kingstory();
    let kking = await kingContract.king();
    let kqueen = await kingContract.queen();
    let kknight = await kingContract.knight();
    let kpower = await kingContract.g8();
    let qpower = await kingContract.g9();

    document.getElementById("Ktvl").innerHTML = (ktvl/1e18).toFixed(6);
    document.getElementById("Kingstory").innerHTML = (kkingstory);
    document.getElementById("King").innerHTML = (kking);
    document.getElementById("Queen").innerHTML = (kqueen);
    document.getElementById("Knight").innerHTML = (kknight);
    document.getElementById("Kpower").innerHTML = (kpower);
    document.getElementById("Qpower").innerHTML = (qpower);
    document.getElementById("Ktax").innerHTML = (ktvl/1e21).toFixed(6);
    document.getElementById("Qtax").innerHTML = (ktvl/2e21).toFixed(6);
    document.getElementById("Ntax").innerHTML = (ktvl/4e21).toFixed(6);
  };
  

  let Battleking = async () => {
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

    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, signer);

    try {
      await kingContract.battleking();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Battlequeen = async () => {
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

    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, signer);

    try {
      await kingContract.battlequeen();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Battleknight = async () => {
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

    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, signer);

    try {
      await kingContract.battleking();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Kingtax = async () => {
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

    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, signer);

    try {
      await kingContract.kingtax();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Kmember = async () => {
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
    
    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, signer);
    let myatt = await kingContract.g7();
    let kgetmy = await kingContract.getmy();
    let kallowt = kgetmy.allowt;
    let kbuff = kgetmy.buff;
    let kmessage = kgetmy.message;
    document.getElementById("Myatt").innerHTML = (myatt);
    document.getElementById("Kbuff").innerHTML = (kbuff);
    document.getElementById("Kmessage").innerHTML = write(kmessage);
    document.getElementById("Kallowt").innerHTML = (kallowt);
 
     };
     



  (async () => {
    KtopDataSync();
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

