 // testnet
 let contractAddress = {
    cyatreeAddr: "0xF2f1538de563fE49fA784dD8E46bb6ced504Ed5c"

  };
   let contractAbi = {
   
    cyatree: [
      "function memberjoin()public",
      "function check() public",
      "function withdraw()public",
      "function g1() public view virtual returns(uint256)",
      "function g2() public view returns(uint256 depo,uint256 dep,uint256 mynum,uint8 wc)",
      "function getsum() public view returns(uint)",
      "function thistimepoint() public view returns(uint)",  //이번 수확할 가치
      "function happy() public view returns(uint)",
      "function lastman() public view returns(address)",
      "function getsum( ) public view returns(uint)"
   
    ]


  };
  
  
  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr,contractAbi.cyatree,provider);
    //계약잔고
    let treebal = await cyatreeContract.g1();
    //누적 기여자 수
    let treesum = await cyatreeContract.getsum();
    //생명열매 시세
    const thappy = await cyatreeContract.happy();
    console.log(treebal);
  
    document.getElementById("ttvl").innerHTML = parseInt(treebal);
    document.getElementById("tsum").innerHTML = parseInt(treesum);
    document.getElementById("happy").innerHTML = parseInt(thappy);
    
   
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);

      try {
        await cyatreeContract.memberjoin();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };

     let TmemberLogin = async () => { 
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
      let thishappy = await cyatreeContract.thistimepoint();
      let g2 = await cyatreeContract.g2();
      let sum = await cyatreeContract.getsum();
      document.getElementById("thappy").innerHTML=(thishappy);  //이번 
      document.getElementById("mywc").innerHTML =  (15-g2.wc); //남아 있는 CYA Token인출 티켓
      document.getElementById("tdep").innerHTML =  (g2.dep ); //나의 깊이
      document.getElementById("tmynum").innerHTML =  (g2.mynum); //나의 깊이
      document.getElementById("Tjack").innerHTML =  (g2.depo); //현재 인출가능 CYA Token
      document.getElementById("RipeBar").style.width = `${(sum -g2.mynum)/g2.dep*100}%`; 
    
    };  
 
    let Tcheck = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
    
    
      try {
        await cyatreeContract.check();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };

    let Twithdraw = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
    
    
      try {
        await cyatreeContract.withdraw();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
   // 호출 코드
 topDataSync();

 