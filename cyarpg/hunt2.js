let contractAddress = {    
    hunt2Addr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6"
  };
  let contractAbi = {
  
    hunt2: [
   
      "function g1() public view virtual returns(uint256)",
      "function g2(uint256 _id) public view returns(uint,uint256,address[]memory winner,uint box)",
      "function g4()public view returns(uint depo,uint sapp,uint ruby,uint eme,uint wes,uint ars)",
     
      ]
      
 
  };

  let H2Sync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let hunt2Contract = new ethers.Contract(contractAddress.hunt2Addr, contractAbi.hunt2, provider);
    let htvl = await hunt2Contract.g1();
    document.getElementById("Htvl").innerHTML = (htvl/1e18).toFixed(6);
  };

  
  let Myt = async () => {
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
    let hunt2Contract = new ethers.Contract(contractAddress.hunt2Addr,contractAbi.hunt2,signer);
    let mybox = await hunt2Contract.getbox(await signer.getAddress());
    let gg4 = await hunt2Contract.g4();
    let hhsapp = gg4.sapp;
    let hhruby = gg4.ruby;
    let hheme = gg4.eme;
    let hhwes = gg4.wes;
    let hhars = gg4.ars;   
    
    document.getElementById("Mybox").innnerHTML = (mybox);  
    document.getElementById("Ruby").innnerHTML = (hhruby); 
    document.getElementById("Eme").innnerHTML =  (hheme); 
    document.getElementById("Wes").innnerHTML =  (hhwes); 
    document.getElementById("Ars").innnerHTML =  (hhars);
    document.getElementById("Sapp").innnerHTML = (hhsapp);  

    console.log(mybox);
   }
  


 
  (async () => {
    H2Sync();
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