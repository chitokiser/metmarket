let contractAddress = {
    cctbankAddr: "0xf8Ff3D3E07aeacbc72f81d1A2AcEB8c06f8c429a",  
    erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",  //CYAToken 주소
    cctAddr: "0x97c29C2EC9fe37AFA2635477992618796A618"
  };
let contractAbi = {
 
    cctbank: [
      "function buycct(uint _num) public returns(bool)",
      "function dcbuycct( ) public returns(bool) ",
      "function sellcct(uint _num)public returns(bool)",
      "function dcsellcct(uint num)public returns(bool)",
      "function withdraw( )public returns(bool)",
      "function allowt(address user) public view returns(uint256)",
      "function g1() public view virtual returns(uint256)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function  g8(address user) public view returns(uint)",
      "function g11() public view virtual returns(uint256)",
      "function price() external view returns (uint256)",
      "function sum() external view returns (uint256)",
      "function gettime( ) external view returns (uint256)",
      "function g2(address user) external view returns( uint256 totaldepo,uint256 exp,uint256 level,address mento)",
      "function memberjoin(address _mento) public",
      "function levelup() public",
      "function dctoken() external view returns (uint256)",
      "function totaltax() external view returns (uint256)",
      "function getpay(address user) public view returns (uint256)"

    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    cct: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let topDataSync = async () => {
    // ethers setup
           // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
document.getElementById("cPrice").innerHTML=(bnbPrice).toFixed(4);
document.getElementById("cPrice2").innerHTML= parseFloat(1/bnbPrice).toFixed(4);

       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, provider);
       let cprice = await cctbankContract.price(); //cct가격
       let mems = (await cctbankContract.sum()); //회원총원
       let tvl = await cctbankContract.g1(); //잔고
       let tvl2 = await cctbankContract.g11(); 
       let dumping = await cctbankContract.dctoken(); 
       let ttax = await cctbankContract.totaltax(); 
       document.getElementById("Cctprice").innerHTML=  parseFloat(cprice/1e18).toFixed(4);
       document.getElementById("Dprice").innerHTML=  parseFloat(cprice/2e18).toFixed(4);
       document.getElementById("Mem").innerHTML = parseInt(mems+20);
       document.getElementById("Tvl").innerHTML = parseFloat(tvl/1e18).toFixed(2);
       document.getElementById("Tvl2").innerHTML = parseInt(tvl2);
       document.getElementById("Dumping").innerHTML = parseInt(dumping);
       document.getElementById("Ttax").innerHTML = parseFloat(ttax/1e18).toFixed(4);

  };


  let Memberjoin = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();

    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.memberjoin(document.getElementById('mentoaddress').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  
  let MemberLogin = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);
    let mycct = await cctbankContract.g8(await signer.getAddress());
    let mycctvalue = await cctbankContract.price() * await mycct;
    document.getElementById("Mycct").innerHTML=(mycct); 
    document.getElementById("Mytvl").innerHTML=(mycctvalue/1e18).toFixed(4); 

    let my = await cctbankContract.g2(await signer.getAddress());
    let myexp =  parseInt(await my[1]);
    let mylev =  parseInt(await my[2]);
    let mymento = (await my[3]);
    let levelexp = parseInt(mylev*20000);
   
    document.getElementById("Myexp").innerHTML= (myexp);
    document.getElementById("Mylev").innerHTML= (mylev);
    document.getElementById("Mylev2").innerHTML= (mylev);
    document.getElementById("Mymento").innerHTML= (mymento);
    document.getElementById("Expneeded").innerHTML= (levelexp);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다. 
     
    let myt = parseInt(await cctbankContract.allowt(await signer.getAddress()));
    let time2 = parseInt(604800); 
    let nowt = Math.floor(new Date().getTime()/ 1000);
    let left = parseInt((myt + time2)- nowt );
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;

    document.getElementById("Left").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
  
  };


  let Levelup = async () => {
   
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();

    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);
    
    try {
      await cctbankContract.levelup(); 
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  
};

  let Withdraw = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();

    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  let Cbuy = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.buycct(document.getElementById('buycustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Dbuy = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.dcbuycct();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Csell = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();

    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.sellcct(document.getElementById('sellcustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Dsell = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();

    let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await cctbankContract.dcsellcct(document.getElementById('Dsellnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  const Addcct = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x97c29C2EC9fe37AFA26367E5477992618796A618",
          symbol: "CCT",
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
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
 
    })();