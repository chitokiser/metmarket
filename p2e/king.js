let contractAddress2 = {  
    kingAddr:"0xE087f9C4C0b367b8a9AbaFB2501262Bca1BaF9E3",
  
  };
  let contractAbi2 = {
    king: [
      "function battleking( )public",
      "function battlequeen( )public",
      "function battleknight( )public",
      "function AIbattle( )public",
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
      "function g10( ) public view  returns(uint256)",
      "function getmy( ) public view  returns(uint,uint,string memory,uint)",
      "function myinfo(address) public view returns(uint,uint,string memory,uint,uint)",
      "function kingstory() public view returns(uint256)",
      "function king() public view returns(address)",
      "function queen() public view returns(address)",
      "function knight() public view returns(address)",
      "function totaldepo() public view returns(uint)",
      "function fee() public view returns(uint)",
      "function withdraw( )public",
      "function charge(uint pay)public"
    ]
  

  };

  let KSync = async () => {
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, provider);
    let ktvl = await kingContract.g6();
    let kkingstory = await kingContract.kingstory();
    let kking = await kingContract.king();
    let kqueen = await kingContract.queen();
    let kknight = await kingContract.knight();
    let kpower = await kingContract.g8();
    let qpower = await kingContract.g9();
    let total = await kingContract.totaldepo();
    let tiket = await kingContract.fee();


    document.getElementById("Ktvl").innerHTML = parseInt(ktvl);
    document.getElementById("Kingstory").innerHTML = parseInt(kkingstory);
    document.getElementById("Kingfee").innerHTML = parseInt(tiket*3);
    document.getElementById("Queenfee").innerHTML = parseInt(tiket*2);
    document.getElementById("Knightfee").innerHTML = parseInt(tiket);
    document.getElementById("Monsterfee").innerHTML = parseInt(tiket);
    document.getElementById("Mpay").innerHTML = parseInt(total/10);
    document.getElementById("King").innerHTML = (kking);
    document.getElementById("Queen").innerHTML = (kqueen);
    document.getElementById("Knight").innerHTML = (kknight);
    document.getElementById("Kpower").innerHTML = (kpower);
    document.getElementById("Qpower").innerHTML = (qpower);
    document.getElementById("Ktax").innerHTML = parseInt(total/100);
    document.getElementById("Qtax").innerHTML = parseInt(total/250);
    document.getElementById("Ntax").innerHTML =  parseInt(total/500);
  };
  
  let Charge = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.charge(document.getElementById('chargenum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Battleking = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.battlequeen();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


 
  let BattleAi = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.AIbattle();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };




  let Kwithdraw = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);
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
    document.getElementById("Kdepo").innerHTML = parseInt(kdepo);
    document.getElementById("Klastdem").innerHTML = (klastdem);
    
    
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((kallowt+86400 ) - nowt); 
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("Kallowt").innerHTML = left > 0 ? `${hour}시간${min}분${sec}초` : '';
  
     };
     




     (async () => {
      KSync();
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0xCC",
            rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
            chainName: "opBNB",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://opbnbscan.com"]
        }]
    });
   
      })();

