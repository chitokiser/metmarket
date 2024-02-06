let contractAddress = {
  cctbankAddr: "0x58B27e740CBB0414eA3e606Cd67680b11D029D4e",  //vet로 바꾸기 귀찮아서 그냥 cct 사용함
  erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",  //CYAToken 주소
  cctAddr: "0x97c29C2EC9fe37AFA2635477992618796A618"
};
let contractAbi = {

  cctbank: [
  " function g1() public view virtual returns(uint256)",
  " function  g3() public view returns(uint)",
  "function  g5() public view returns(uint) ",
  "function g11() public view virtual returns(uint256)",
  " function getsum( ) public view returns(uint) ",
  "function getprice( ) public view returns (uint256)",
  "function totaltax( ) public view returns (uint256)",
  "function memberjoin(address _mento) public ",
  "function  g8(address user) public view returns(uint)",
  "function  getdepo(address user) public view returns(uint)",
  "function  getlevel(address user) public view returns(uint)",
  " function getpay(address user) public view returns (uint256)",
  " function allowt(address user) public view returns (uint256)",
  "function gettime( ) public view returns (uint256)",
  "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
  "function withdraw( )public returns(bool)",
  "function buyvet(uint _num) public returns(bool) ",
  "function sellvet(uint _num) public returns(bool) ",
  "function levelup() public ",

  ],
  erc20: [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)"
  ],
  cct: [
    "function getdepot(address user) external view returns (uint256)"
  ]
};

  let Vettop = async () => {
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
document.getElementById("cPrice").innerHTML=(bnbPrice).toFixed(4);
document.getElementById("cPrice2").innerHTML= parseFloat(1/bnbPrice).toFixed(4);

       const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
  
        let cctbankContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, provider);
       let cprice = await cctbankContract.getprice(); 
       let mems = parseInt (await cctbankContract.getsum()); //회원총원
       let tvl = await cctbankContract.g1(); 
       let tvl2 = await cctbankContract.g11(); 
       let ttax = await cctbankContract.totaltax(); 
       document.getElementById("Vetprice").innerHTML=  parseFloat(cprice/1e18).toFixed(6);
       document.getElementById("Mem").innerHTML = parseInt(mems+20);
       document.getElementById("Tvl").innerHTML = parseFloat(tvl/1e18).toFixed(2);
       document.getElementById("Tvl2").innerHTML = parseInt(tvl2);
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

    let vetContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await vetContract.memberjoin(document.getElementById('mentoaddress').value);
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
    let vetContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);
    let mycct = await vetContract.g8(await signer.getAddress());
    let mycctvalue = await vetContract.getprice() * await mycct;
    document.getElementById("Mycct").innerHTML=(mycct); 
    document.getElementById("Mytvl").innerHTML=(mycctvalue/1e18).toFixed(4); 

    let my = await vetContract.myinfo(await signer.getAddress());
    let tpoint =  parseInt(await my[0]);
    let point =  parseInt(await my[1]);
    let myexp =  parseInt(await my[2]);
    let mylev =  parseInt(await my[3]);
    let mento = (await my[6]);
    let agent = (await my[7]);
    let levelexp = parseInt(2**mylev*10000);
    document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
    document.getElementById("Point").innerHTML= (point/1E18).toFixed(4); 
    document.getElementById("Myexp").innerHTML= (myexp);
    document.getElementById("Mylev").innerHTML= (mylev);
    document.getElementById("Mylev2").innerHTML= (mylev);
    document.getElementById("Mymento").innerHTML= (mento);
    document.getElementById("Myagent").innerHTML= (agent);
    document.getElementById("Expneeded").innerHTML= (levelexp - myexp);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다. 
     
    let myt = parseInt(await vetContract.allowt(await signer.getAddress()));
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

    let vetContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);

    try {
      await vetContract.withdraw();

    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Vbuy = async () => {
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
      await cctbankContract.buyvet(document.getElementById('buycustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Vsell = async () => {
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
      await cctbankContract.sellvet(document.getElementById('sellcustnum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  const Addvet = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x9aFB0Bf81f742515B93ad1EeDF1cF3A59f300E2F",
          symbol: "VET",
          decimals: 0, 
          // image: tokenImage,
        },
      },
    });
  }


  (async () => {
    Vettop();
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