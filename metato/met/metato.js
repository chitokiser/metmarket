let contractAddress = {
    metallowAddr: "0xaDd161Bd2b891ac74FEBc6116fb22CEaa015a691",  
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    metAddr: "0xb0f78f9577A851b7a1BA5Ac246c6adB1E2ECbcEA"
  };
let contractAbi = {
  cyacoop: [
    "function getprice() public view returns(uint256)",
    "function allow() public view returns(uint256)",
    "function g1() public view returns(uint256)",
    "function g2() public view returns(uint256 allowt, uint256 exp, uint8 level, uint256 booster)",
    "function g6() public view returns(uint256)",
    "function g7(address user) public view returns(uint256)",
    "function memberjoin(uint256 _num) public",
    "function automemberjoin() public",
    "function levelup() public returns(bool)",
    "function geteps(address user) external view returns (uint256)",
    "function withdraw() public returns(bool)",
    "function mentolength() public view returns(uint256)",
    "function addmento() public",
    "function boosting() public",
    "function buycat(uint _num) public returns(bool)",
    "function sellcat(uint num) public returns(bool)"
  ],
  
    metallow: [
      "function getprice() public view returns(uint256)",
      "function buymet(uint _num) public",
      "function allow() public view returns(uint256)",
      "function sellmet(uint _num)public returns(bool)",
      "function getlevel(address user) public view virtual returns(uint256)",
      "function withdraw( )public returns(bool)",
      "function allowt(address user) public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256)",
      "function g6() public view returns(uint256)",
      "function automemberjoin( )public",
      "function g7(address user) public view returns(uint256)",
      "function g8(address user) public view virtual returns(uint256)",
      "function price() external view returns (uint256)",
      "function getsold( ) public view returns( uint256 )",
      "function geteps(address user) external view returns (uint256)" 
    ],

    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    met: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let MtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, provider);
  
    let totalsold = await metallowContract.getsold();
    let cyabalan = await metallowContract.g1() /1e18;
    let metprice =  await metallowContract.price();
    let meteps = (metprice/1e19/2)*12;
    let metprice3 =  metprice/1e18;
    let metcap =  (metprice*totalsold)/1e18;
    document.getElementById("Soldmet").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //유통총량
    document.getElementById("Metcap").innerHTML = (metcap).toFixed(6);//시가총액
    document.getElementById("Mtvl").innerHTML = (100000000-totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //계약에 가지고 있는 MET 잔고
    document.getElementById("Metprice2").innerHTML = (metprice/1e18).toFixed(10); 
    document.getElementById("Meteps").innerHTML = (meteps).toFixed(10); 
    document.getElementById("Metroi").innerHTML = (meteps/metprice3*100).toFixed(2);
    document.getElementById("Metper").innerHTML = (metprice3/meteps).toFixed(2);  
    document.getElementById("Metpbr").innerHTML = ((metcap/cyabalan)).toFixed(2); 
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
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, signer);
    let mymet = metallowContract.g7(await signer.getAddress());
    let mymetvalue = await metallowContract.price() * await mymet;
    let myallow = metallowContract.geteps(await signer.getAddress());
    let mylevel = metallowContract.getlevel(await signer.getAddress());

    document.getElementById("Mymet").innerHTML = await mymet;
    document.getElementById("Mymetvalue").innerHTML=(mymetvalue/1e18).toFixed(6); 
    document.getElementById("Myallow").innerHTML = (await myallow/1e18).toFixed(10); 
    document.getElementById("Mylevel").innerHTML = await mylevel;

    let metContract =  new ethers.Contract(contractAddress.metAddr, contractAbi.met, signer);
    let at = parseInt(await metContract.getdepot(await signer.getAddress()));
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((at + 2592000 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    
    document.getElementById("Metallowtime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` :'';
   

  };


  const Addmet = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xb0f78f9577A851b7a1BA5Ac246c6adB1E2ECbcEA",
          symbol: "MET",
          decimals:0, 
        },
      },
    });
  }


  let Automember = async () => {
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

    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, signer);

    try {
      await metallowContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Mbuymet = async () => {
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
      await metallowContract.buymet(document.getElementById('Buynum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Msellmet = async () => {
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
      await metallowContract.sellmet(document.getElementById('Sellnum').value);
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