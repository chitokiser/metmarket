let contractAddress = {
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    custallowAddr: "0xccD9EE2067A19B0064651E97d09efeA5582B3ac0",  
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    custAddr: "0xB96fefF9a0D1B13738b432dCC7F5Ced0109f4D73"
  };
let contractAbi = {
    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],
    custallow: [
      "function getprice() public view returns(uint256)",
      "function buycust(uint _num) public returns(bool)",
      "function sellcust(uint _num)public returns(bool)",
      "function winmoneywithdraw( )public returns(bool)",
      "function withdraw( )public returns(bool)",
      "function allowt(address user) public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function getprice() external view returns (uint256)",
      "function geteps(address user) external view returns (uint256)" 
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    cust: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, provider);
    let custallowPrice = await custallowContract.getprice();
    let totalsold = 100000000 - await custallowContract.g6();
    let ctvl =  await custallowContract.g1();

    // oustanding shares of cya
    document.getElementById("soldcust").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("custprice").innerHTML = ((custallowPrice)/1e18).toFixed(6);
    // market cap
    document.getElementById("custCap").innerHTML = ((custallowPrice*totalsold)/1e18).toFixed(6);//시가

    // contract balance
    document.getElementById("custbal").innerHTML = (ctvl/1e18).toFixed(6);

  };
  
  let CmemberLogin = async () => {
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
    let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, signer);
    let mycust = custallowContract.g7(await signer.getAddress());
    let mycustvalue = await custallowContract.getprice() * await mycust;
    let myeps = custallowContract.geteps(await signer.getAddress());
    
    document.getElementById("myCUST").innerHTML = await mycust;
    document.getElementById("myCUSTValue").innerHTML=(mycustvalue/1e18).toFixed(6); 
    document.getElementById("Ceps").innerHTML = (await myeps/1e18).toFixed(6); 
   
 
   let g2 = await custallowContract.allowt(await signer.getAddress());
 
   
    // let nowt = Math.floor(new Date().getTime() / 1000);
    // let left = parseInt((at + 604800 ) - nowt); 
    // let day = parseInt(left/60/60/24);
    // let hour = parseInt(left/3600)%24;
    // let min = parseInt((left/60)%60);
    // let sec = seconds%60;
    // let g3 =  parseInt(await catContract.getdepot(await signer.getAddress()));
    // let left2 = parseInt((g3 + 31536000 ) - nowt);  
    // let days = parseInt(left2/60/60/24);
    // let hours = parseInt(left2/3600)%24;
    // let mins = parseInt((left2/60)%60);
    // let secs = left2%60;;
    
    document.getElementById("epsLeftTime").innerHTML = (g2);
    
    // document.getElementById("epsLeftTime").innerHTML = left > 0 ? `${day}:${hour}:${min}:${sec}` : '0일0시0분0초';
    // document.getElementById("sellLeftTime").innerHTML = left2 > 0 ? `${days}:${hours}:${mins}:${secs}` : '0일0시0분0초'; 

  };


  const addTokenCust = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xB96fefF9a0D1B13738b432dCC7F5Ced0109f4D73",
          symbol: "CUST",
          decimals: 18, 
          // image: tokenImage,
        },
      },
    });
  }

  let Cwithdraw = async () => {
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

    let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, signer);

    try {
      await custallowContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Cbuycust = async () => {
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

    let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, signer);

    try {
      await custallowContract.buycust(document.getElementById('buycustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Csellcust = async () => {
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

    let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, signer);

    try {
      await custallowContract.sellcust(document.getElementById('sellcustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  const addcust = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xB96fefF9a0D1B13738b432dCC7F5Ced0109f4D73",
          symbol: "CUST",
          decimals: 0, 
          // image: tokenImage,
        },
      },
    });
  }



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