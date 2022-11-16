let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    battleAddr: "0xf96cf2dd0Adbdd214Df30Eb9DdBE0B9885Ef352c"
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
        "function g11() public view  returns(uint256)",
        "function g12() public view  returns(uint256)",
        "function tp() public view returns(uint256)",
        "function g13() public view virtual returns(uint256)",
        "function g14(address user) public view virtual returns(uint256)",
        "function getch() public view virtual returns(uint,address,uint,uint,string memory)",
        "function getde() public view virtual returns(uint,address,uint,uint,string memory)"
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
    let battleContract = new ethers.Contract(contractAddress.battleAddr, contractAbi.battle,signer);
    let bdepo = await battleContract.g12();
    let batt =  await battleContract.g7(await signer.getAddress());
    let bdef =  await battleContract.g8(await signer.getAddress());
    let bbuff = await battleContract.g11();
    
    document.getElementById("Bdepo").innerHTML =  (bdepo/1e18).toFixed(6);
    document.getElementById("Batt").innerHTML = (batt);   //공격력
    document.getElementById("Bdef").innerHTML = (bdef);   //방어력
    document.getElementById("Bbuff").innerHTML = (bbuff); 

    let gc = await battleContract.getch();
    let bat = await gc[0];  //공력시간
    let benemy = await gc[1];
    let bfm = await gc[2];
    let bbatt = await gc[3];  //마지막 전투 공격력
    let bmessage = await gc[4];
    
    document.getElementById("Bmessage").innerHTML = (bmessage); 
    document.getElementById("Benemy").innerHTML = (benemy); 
    document.getElementById("Bfm").innerHTML = (bfm/1e18).toFixed(6); 
    document.getElementById("Bbatt").innerHTML = (bbatt); 

    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((bat+86400 ) - nowt); 
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("Att").innerHTML = left > 0 ? `${hour}시간${min}분${sec}초` : '';
   
    let gd = await battleContract.getde();
    let bdt = await gd[0];  //방어시간
    let bdenemy = await gd[1];
    let bdfm = await gd[2];
    let bamo = await gd[3];  //마지막 전투 공격력
    let bdmessage = await gd[4];
    
    document.getElementById("Bdmessage").innerHTML = (bdmessage); 
    document.getElementById("Bdenemy").innerHTML = (bdenemy); 
    document.getElementById("Bdfm").innerHTML = (bdfm/1e18).toFixed(6); 
    document.getElementById("Bbamo").innerHTML = (bamo); 
   
    let dleft = parseInt((bdt+86400 ) - nowt); 
    let dhour = parseInt(dleft/3600)%24;
    let dmin = parseInt((dleft/60)%60);
    let dsec = dleft%60;
    document.getElementById("Bdt").innerHTML = dleft > 0 ? `${dhour}시간${dmin}분${dsec}초` : '';



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
  
    try {
      await battleContract.withdraw();
      
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

