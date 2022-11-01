let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
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
        "function getmy() public view returns(uint,uint,uint,uint,address,uint,uint,uint,string memory)",
        "function myinfo(address user) public view returns(uint,uint,uint,uint,address,uint,uint,uint,string memory)"
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

  let Blogin = async () => {
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
    let g5 = await battleContract.getmy();
    let bmessage = g5.message;
    let benemy= g5.enemy;
    let bdepo = g5.depo;
    // let att = g5.at;
    // let bdt = g5.dt;
    // let baib = g5.aib;
    let bfm = g5.fm;
    let bbuff = g5.buff;
    
    
  
    document.getElementById("Bmessage").innerHTML = (bmessage);
    document.getElementById("Benemy").innerHTML = (benemy);
    document.getElementById("Bdepo").innerHTML = parseInt(bdepo/1e18).toFixed(6);
    // document.getElementById("Baib").innerHTML = (baib);
    document.getElementById("Bfm").innerHTML =  parseInt(bfm/1e18).toFixed(6);
    document.getElementById("Bbuff").innerHTML = parseInt(bbuff);
    
    // document.getElementById("Att").innerHTML = (att);
    // document.getElementById("Bdt").innerHTML = (bdt);
    let batt =  await battleContract.g7(await signer.getAddress());
    let bdef =  await battleContract.g8(await signer.getAddress());
    document.getElementById("Batt").innerHTML = (batt);
    document.getElementById("Bdef").innerHTML = (bdef);
 
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

  let Withdraw = async () => {
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
    let amount = ethers.utils.parseUnits(document.getElementById('Winput').value, 18);
    
    try {
      await battleContract.withdraw(amount);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  
  let Taunt= async () => {
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
    let quantity = ethers.utils.parseUnits(document.getElementById('Tinput').value, 18);
    
    try {
      await battleContract.taunt(quantity);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Endwar= async () => {
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
      await battleContract.endwar();
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Battle = async () => {
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
      await battleContract.battle();
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  let Surrender = async () => {
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
      await battleContract.surrender();
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  let BAIbattle = async () => {
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
      await battleContract.AIbattle();
      
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

