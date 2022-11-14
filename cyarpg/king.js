let contractAddress = {  
    kingAddr: "0x1B802C4b0523570ACe09acB8fA31FBBF70AC04A6"
  };
  let contractAbi = {
    king: [
      "function battleking( )public",
      "function battlequeen( )public",
      "function battleknight( )public",
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
      "function getmy( ) public view returns(uint,uint,string memory,uint,uint)",
      "function myinfo(address) public view returns(uint,uint,string memory,uint,uint)",
      "function g11(address user) public view  returns(uint256)",
      "function g12() public view virtual returns(uint256)",  
      "function g13( ) public view  returns(uint256)",
      "function kingstory() public view returns(uint256)",
      "function g14(address user) public view virtual returns(uint256)",
      "function king() public view returns(address)",
      "function queen() public view returns(address)",
      "function knight() public view returns(address)",
      "function withdraw( )public"
    ]
  

  };

  let KtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let kingContract = new ethers.Contract(contractAddress.kingAddr, contractAbi.king, provider);
    let ktvl = await kingContract.g6();
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
    document.getElementById("Ktax").innerHTML = (ktvl/1e20).toFixed(6);
    document.getElementById("Qtax").innerHTML = (ktvl/25e19).toFixed(6);
    document.getElementById("Ntax").innerHTML = (ktvl/50e19).toFixed(6);
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
      await kingContract.battleknight();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Kwithdraw = async () => {
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
      await kingContract.withdraw();
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

  
  let Queentax = async () => {
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
      await kingContract.queentax();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Knigthtax = async () => {
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
      await kingContract.knighttax();
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
    let kget = await kingContract.myinfo(await signer.getAddress());
    let kallowt = kget[0];
    let kbuff = kget[1];
    let kmessage = kget[2]; 
    let kdepo = kget[3]; 
    let klastdem = kget[4]; 
    let myatt = await kingContract.g7(await signer.getAddress());
   
    
    document.getElementById("Myatt").innerHTML = (myatt);
    document.getElementById("Kbuff").innerHTML = (kbuff);  //전투 경험치
    document.getElementById("Kmessage").innerHTML = (kmessage);
    document.getElementById("Kdepo").innerHTML = (kdepo/1e18).toFixed(6);;
    document.getElementById("Klastdem").innerHTML = (klastdem);
    
    
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((kallowt+86400 ) - nowt); 
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("Kallowt").innerHTML = left > 0 ? `${hour}시간${min}분${sec}초` : '';
  
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

