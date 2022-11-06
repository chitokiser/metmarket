let contractAddress = {
    cyaadAddr: "0x918f1CDDccB50FF8B7Dca5a13c9a81d321A392F5"
   
  };
  let contractAbi = {
 
    cyaad: [
      "function creatad(string memory _home,string memory _metainfo)public",
      "function withdraw( )public" ,
      "function g1() public view virtual returns(uint256)",
      "function g2() public view virtual returns(uint256)",
      "function g3() public view virtual returns(uint256)",
      "function g4() public view virtual returns(uint256)",
      "function remain() public view virtual returns(uint256)",
      "function tax() public view virtual returns(uint256)",
    ]
  };

  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyaadContract = new ethers.Contract(contractAddress.cyaadAddr, contractAbi.cyaad, provider);
    let cyatvl = await cyaadContract.g1();
    let adfee =  await cyaadContract.g3();
    let ta =  await cyaadContract.remain();
    let gtax =  await cyaadContract.tax();
    document.getElementById("Cyatvl").innerHTML = ((cyatvl)/1e18).toFixed(6);
    document.getElementById("Ta").innerHTML = (ta);
    document.getElementById("Adfee").innerHTML = ((adfee)/1e18).toFixed(6);
    document.getElementById("Tax").innerHTML = ((gtax)/1e18).toFixed(6);
  };

  

  let AmemberLogin = async () => {
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
    let cyaadContract = new ethers.Contract(contractAddress.cyaadAddr, contractAbi.cyaad, signer);
    let myjack =  await cyaadContract.g4();

    document.getElementById("Myjack").innerHTML = ((myjack)/1e18).toFixed(6);
 
  };


  let withdraw = async () => {
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

    let cyaadContract = new ethers.Contract(contractAddress.cyaadAddr, contractAbi.cyaad, signer);

    try {
      await cyaadContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Abuyad = async () => {
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
    let cyaadContract = new ethers.Contract(contractAddress.cyaadAddr, contractAbi.cyaad, signer);
    let url = document.getElementById('Url').value;
    let imgurl =  document.getElementById('Imgurl').value;

    try {
      await cyaadContract.creatad(url,imgurl);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  (async () => {
    topDataSync();
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