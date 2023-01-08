let contractAddress = {

    satallowAddr: "0x9B72171dc4d66AfB09b7A5e9f596d76965dba328" 
    
  };
  let contractAbi = {
 
    satallow: [
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
    let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow, provider);
    
    // total mentor
    document.getElementById("totalMentor").innerHTML = await satallowContract.mentolength();
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
    let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow, signer);

    try {
      await satallowContract.automemberjoin();
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
    let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow,signer);
    
    let g1 = await satallowContract.getlevel(await signer.getAddress());
    let g2 = await satallowContract.getexp(await signer.getAddress());
    let levelexp = (2**g1)*5e16;
   
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

      let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow, signer);
      
      try {
        await satallowContract.levelup();
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
    let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow, signer);

   
    try {
      await satallowContract.addmento();
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