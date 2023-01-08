let contractAddress = {
    satallowAddr: "0x9B72171dc4d66AfB09b7A5e9f596d76965dba328",  
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    satAddr: "0x51d99256f2bceA10359388E84aC1a47fab199BfC"
  };
let contractAbi = {

  
    satallow: [
      "function getprice() public view returns(uint256)",
      "function buysat(uint _num) public",
      "function sellsat(uint _num)public returns(bool)",
      "function withdraw( )public",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view virtual returns(uint256)",
      "function g8(address user) public view returns( uint256 )",
      "function geteps(address user) public view returns (uint256)" 
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    sat: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let SattopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    let satallowContract = new ethers.Contract(contractAddress.satallowAddr, contractAbi.satallow, provider);
    let satprice = await satallowContract.getprice();
    let totalsold = 100000000 - await satallowContract.g6();
    let mtvl =  await satallowContract.g1();

    
    document.getElementById("Satprice").innerHTML = ((satprice)/1e18).toFixed(6);
    document.getElementById("Soldsat").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("Satcap").innerHTML = ((satprice*totalsold)/1e18).toFixed(6);//시가총액
    document.getElementById("Sattvl").innerHTML = (mtvl/1e18).toFixed(6);

  };
  
  let MmemberLogin = async () => {
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
    let mysat = satallowContract.g7(await signer.getAddress());
    let mysatvalue = await satallowContract.getprice() * await mysat;
    let myeps = satallowContract.geteps(await signer.getAddress());
    
    document.getElementById("Mysat").innerHTML = await mysat;
    document.getElementById("Mysatvalue").innerHTML=(mysatvalue/1e18).toFixed(6); 
    document.getElementById("Myeps").innerHTML = (await myeps/1e18).toFixed(18); 
   
    let satContract =  new ethers.Contract(contractAddress.satAddr, contractAbi.sat, signer);
    let at = parseInt(await satContract.getdepot(await signer.getAddress()));
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((at + 604800 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    
    let g3 =  parseInt(await satContract.getdepot(await signer.getAddress()));
    let left2 = parseInt((g3 + 31536000 ) - nowt);  
    let days = parseInt(left2/60/60/24);
    let hours = parseInt(left2/3600)%24;
    let mins = parseInt((left2/60)%60);
    let secs = left2%60;
    document.getElementById("Satallowtime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` :'';
    document.getElementById("Satselltime").innerHTML = left2 > 0 ? `${days}일${hours}시간${mins}분${secs}초` : ''; 

  };


  let Addsat = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x51d99256f2bceA10359388E84aC1a47fab199BfC",
          symbol: "SAT",
          decimals:0, 
        },
      },
    });
  }

  let Mwithdraw = async () => {
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
      await satallowContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Mbuysat = async () => {
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
      await satallowContract.buysat(document.getElementById('Buynum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Msellsat = async () => {
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
      await satallowContract.sellsat(document.getElementById('Sellnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };




  (async () => {
    SattopDataSync();
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
    })();