let contractAddress = {
    sstallowAddr: "0xa4A8fAd0A19CD620323E64718f9CA5CC5a31dF4e",  
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    sstAddr: "0x9E15F2A5Ee9b7B8316353F9ccC48131bD97C599F"
  };
let contractAbi = {

  
    sstallow: [
      "function getprice() public view returns(uint256)",
      "function buysst(uint _num) public",
      "function sellsst(uint _num)public returns(bool)",
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
    sst: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let SsttopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, provider);
    let sstprice = await sstallowContract.getprice();
    let totalsold = 100000000 - await sstallowContract.g6();
    let mtvl =  await sstallowContract.g1();

    
    document.getElementById("Sstprice").innerHTML = ((sstprice)/1e18).toFixed(6);
    document.getElementById("Soldsst").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("Sstcap").innerHTML = ((sstprice*totalsold)/1e18).toFixed(6);//시가총액
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
    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, signer);
    let mysst = sstallowContract.g7(await signer.getAddress());
    let mysstvalue = await sstallowContract.getprice() * await mysst;
    let myeps = sstallowContract.geteps(await signer.getAddress());
    
    document.getElementById("Mysst").innerHTML = await mysst;
    document.getElementById("Mysstvalue").innerHTML=(mysstvalue/1e18).toFixed(6); 
    document.getElementById("Myeps").innerHTML = (await myeps/1e18).toFixed(18); 
   
    let sstContract =  new ethers.Contract(contractAddress.sstAddr, contractAbi.sst, signer);
    let at = parseInt(await sstContract.getdepot(await signer.getAddress()));
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((at + 604800 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    
    let g3 =  parseInt(await sstContract.getdepot(await signer.getAddress()));
    let left2 = parseInt((g3 + 31536000 ) - nowt);  
    let days = parseInt(left2/60/60/24);
    let hours = parseInt(left2/3600)%24;
    let mins = parseInt((left2/60)%60);
    let secs = left2%60;
    document.getElementById("Sstallowtime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` :'';
    document.getElementById("Sstselltime").innerHTML = left2 > 0 ? `${days}일${hours}시간${mins}분${secs}초` : ''; 

  };


  let Addsst = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x9E15F2A5Ee9b7B8316353F9ccC48131bD97C599F",
          symbol: "SST",
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

    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, signer);

    try {
      await sstallowContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Mbuysst = async () => {
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

    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, signer);

    try {
      await sstallowContract.buysst(document.getElementById('Buynum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Msellsst = async () => {
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

    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, signer);

    try {
      await sstallowContract.sellsst(document.getElementById('Sellnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };




  (async () => {
    SsttopDataSync();
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