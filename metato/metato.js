let contractAddress = {
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    mttallowAddr: "0xdD28f7FA21c951aB00A8a46Df9aD81F57a7ceFA8",  
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    mttAddr: "0xa2d18FEFA4f67C4F7531F3C29A76b9680915b380"
  };
let contractAbi = {
    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],
    mttallow: [
      "function getprice() public view returns(uint256)",
      "function buymetato(uint _num) public returns(bool)",
      "function sellmetato(uint _num)public returns(bool)",
      "function tetex( )public returns(bool)",
      "function airdrop(address _mento )public returns(bool)",
      "function withdraw( )public returns(bool)",
      "function allowt(address user) public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      " function g8(address user) public view virtual returns(uint256)",
      "function getprice() external view returns (uint256)",
      "function geteps(address user) external view returns (uint256)" 
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    mtt: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let MtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, provider);
    let mttprice = await mttallowContract.getprice();
    let totalsold = 100000000 - await mttallowContract.g6();
    let mtvl =  await mttallowContract.g1();

    
    document.getElementById("Mttprice").innerHTML = ((mttprice)/1e18).toFixed(6);
    document.getElementById("Soldmtt").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("Mttcap").innerHTML = ((mttprice*totalsold)/1e18).toFixed(6);//시가총액
    document.getElementById("Mtvl").innerHTML = (mtvl/1e18).toFixed(6);

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
    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, signer);
    let mymtt = mttallowContract.g7(await signer.getAddress());
    let mymttvalue = await mttallowContract.getprice() * await mymtt;
    let myeps = mttallowContract.geteps(await signer.getAddress());
    
    document.getElementById("Mymtt").innerHTML = await mymtt;
    document.getElementById("Mymttvalue").innerHTML=(mymttvalue/1e18).toFixed(6); 
    document.getElementById("Myeps").innerHTML = (await myeps/1e18).toFixed(6); 
   
 
    let at = parseInt(await mttallowContract.allowt(await signer.getAddress()));
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((at + 604800 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    let mttContract =  new ethers.Contract(contractAddress.mttAddr, contractAbi.mtt, signer);
    let g3 =  parseInt(await mttContract.getdepot(await signer.getAddress()));
    let left2 = parseInt((g3 + 31536000 ) - nowt);  
    let days = parseInt(left2/60/60/24);
    let hours = parseInt(left2/3600)%24;
    let mins = parseInt((left2/60)%60);
    let secs = left2%60;
    
    document.getElementById("Mttallowtime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` :'';
    document.getElementById("Mttselltime").innerHTML = left2 > 0 ? `${days}일${hours}시간${mins}분${secs}초` : ''; 

  };


  const Addmtt = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xa2d18FEFA4f67C4F7531F3C29A76b9680915b380",
          symbol: "MTT",
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

    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, signer);

    try {
      await mttallowContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Mbuymtt = async () => {
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

    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, signer);

    try {
      await mttallowContract.buymetato(document.getElementById('Buynum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Msellmtt = async () => {
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

    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, signer);

    try {
      await mttallowContract.sellmetato(document.getElementById('Sellnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  const Addmetato = async () => {
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
    })();