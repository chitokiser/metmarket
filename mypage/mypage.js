let contractAddress = {
  cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",
  cutdefiAddr:"0xdFF7cA654021566dFDc00acA9D4d187E6a4ad346",

  };
  let contractAbi = {

      cyamem: [
      "function sum() public view returns(uint256)",
      "function catbal() public view returns(uint256)",
      "function memberjoin(address _mento) public",
      "function mylevellup() public",
      "function mentolevelup( )public",
      "function getmyinfo() public view returns(uint256,uint256,address)",
      "function myinfo() public view returns(uint256 exp,uint256 bonus,address mento)",
      "function bonuswithdraw( )public",
      "function expup(uint256 _num) public",
      "function getmymento(address user)public view returns(address)",
      "function  levelcheck(address user)public view returns(uint256)",
      "function  mentolevelcheck(address user)public view returns(uint256)"
    ],
    cutdefi: [
      "function g1() public view virtual returns(uint256)",
      "function g2() public view returns(uint256)",
      "function g3() public view virtual returns(uint256)",
      "function g6() public view virtual returns(uint256)",
      "function g8() public view virtual returns(uint256)",
      "function withdraw()public returns(bool)",
      "function g18(address user) public view virtual returns(uint256)",
      "function g16(address user) public view virtual returns(uint256)",
    ],

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

    let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);

    try {
      await cyamemContract.memberjoin(document.getElementById('mentoaddress').value);
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
    let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);
    let mylev = parseInt(await cyamemContract.levelcheck(await signer.getAddress()));
    let mymento = (await cyamemContract.getmymento(await signer.getAddress()));  
    let mymentolevel = (await cyamemContract.mentolevelcheck(await signer.getAddress()));
    let levelexp = (2**mylev)*10000;
    let my = await cyamemContract.getmyinfo();
    let myexp =  (await my[0]);
    let mybonus =  (await my[1]);
    document.getElementById("Mylev").innerHTML = (mylev);
    document.getElementById("Mylev2").innerHTML = (mylev);
    document.getElementById("Exp").innerHTML =  (myexp);
    document.getElementById("Expneeded").innerHTML = (levelexp);
    document.getElementById("Mybonus").innerHTML =  (mybonus);
    document.getElementById("Mymento").innerHTML = (mymento);
    document.getElementById("Mymentolevel").innerHTML = (mymentolevel);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다. 

    let cutdefiContract = new ethers.Contract(contractAddress.cutdefiAddr, contractAbi.cutdefi, signer);
    let myfee = parseInt(await cutdefiContract.g18(await signer.getAddress()));
    let totalfee = parseInt(await cutdefiContract.g16(await signer.getAddress()));
    document.getElementById("Myfee").innerHTML=(myfee/1e18).toFixed(4);
    document.getElementById("Totalfee").innerHTML=(totalfee/1e18).toFixed(4);
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

    let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);
    
    try {
      await cyamemContract.mylevellup(); //cat 개수 필요
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  
};


  let Expup = async () => {
   
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

    let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);
    
    try {
      await cyamemContract.expup(document.getElementById('catAmount').value); //cat 개수 필요
      //await cyabankContract.buycut(document.getElementById('buyAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  
};


let Bonuswithdraw = async () => {
   
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

  let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);
  
  try {
    await cyamemContract. bonuswithdraw(); //cat 개수 필요
    //await cyabankContract.buycut(document.getElementById('buyAmount').value);
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

  let cutdefiContract = new ethers.Contract(contractAddress.cutdefiAddr, contractAbi.cutdefi, signer);
  
  try {
    await cutdefiContract. withdraw(); //cutdefi 멘토수당
    //await cyabankContract.buycut(document.getElementById('buyAmount').value);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }

};

let Mentolevelup = async () => {
   
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

  let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, signer);
  
  try {
    await cyamemContract. mentolevelup(); //cat 개수 필요
    //await cyabankContract.buycut(document.getElementById('buyAmount').value);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }

};
