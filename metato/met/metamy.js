let contractAddress = {

    metallowAddr: "0xaDd161Bd2b891ac74FEBc6116fb22CEaa015a691" 
    
  };
  let contractAbi = {
 
    metallow: [
      "function addmento( ) public",
      "function automemberjoin( )public",
      "function levelup( )public returns(bool)",
      "function mentolength() public view returns(uint)",
      "function getlevel(address user) public view virtual returns(uint256)",
      "function getexp(address user) public view virtual returns(uint256)" 
    ],
 
  };

  let MtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, provider);
    
    // total mentor
    document.getElementById("totalMentor").innerHTML = await metallowContract.mentolength();
  };



  let Aguild = async () => {
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
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, signer);

    try {
      await metallowContract.automemberjoin();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
    


  let Mlogin = async () => {
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
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow,signer);
    
    let g1 = await metallowContract.getlevel(await signer.getAddress());
    let g2 = await metallowContract.getexp(await signer.getAddress());
    let levelexp = (2**g1)*10000;
   
    // level
    document.getElementById("Level").innerHTML = (g1);
    document.getElementById("LevelBar").style.width = `${g2/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다.
    document.getElementById("Exp").innerHTML = parseInt(g2);
    document.getElementById("Expneeded").innerHTML = parseInt(levelexp - g2);

  };




  let levelUp = async () => {
   {
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

      let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, signer);
      
      try {
        await metallowContract.levelup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };


  let addMento = async () => {
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
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, signer);

   
    try {
      await metallowContract.addmento();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  (async () => {
    MtopDataSync();
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