 // testnet
 let contractAddress = {
    cyatree2Addr: "0x4Ac4bf6971aC54bd6aa1ec0b943CBB4Fd0A65b67"

  };
   let contractAbi = {
   
    cyatree2: [
      "function memberjoin(address _mento)public",
      "function check() public",
      "function withdraw()public",
      "function expush()public",
      "function g1() public view virtual returns(uint256)",
      "function g2(address user) public view virtual returns( uint256 depo,uint256 totaldepo,uint256 dep,uint256 mynum,uint256 asum,uint8 wc,uint push,uint256 pushpay)",
      "function  g3() public view returns(uint)",
      "function  g4() public view returns(uint)",
      "function  g6(address user) public view returns(uint)",
      "function getsum() public view returns(uint)",
      "function thistimepoint() public view returns(uint)",  //이번에 받을 수당
      "function happy() public view returns(uint)",
      "function totaltax() public view returns(uint)"
    ]


  };
  
  
  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let cyatreeContract = new ethers.Contract(contractAddress.cyatree2Addr,contractAbi.cyatree2,provider);
    
    let treebal = await cyatreeContract.g1();
    let tcut = await cyatreeContract.g3();
    let tsum = await cyatreeContract.getsum();
    let getcut = await cyatreeContract.g4();  //참가비 지불시 얻게 되는 cut개수
    let gettax = await cyatreeContract.totaltax();  //cut 토탈세금
   
    document.getElementById("Ttvl").innerHTML = parseFloat(treebal/1e18).toFixed(0);
    document.getElementById("G3").innerHTML = parseInt(tcut);
    document.getElementById("Tsum").innerHTML = parseInt(tsum);
    document.getElementById("G4").innerHTML = parseInt(getcut);
    document.getElementById("Totaltax").innerHTML = parseInt(gettax/1e18);
    
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
    
        let cyatree2Contract = new ethers.Contract(contractAddress.cyatree2Addr, contractAbi.cyatree2, signer);
    
        try {
          await cyatree2Contract.memberjoin(document.getElementById('mentoaddress').value);
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
    
        let cyatree2Contract = new ethers.Contract(contractAddress.cyatree2Addr, contractAbi.cyatree2, signer);
        let get2 = await cyatree2Contract.g2(await signer.getAddress());
        let sum =  parseInt(await cyatree2Contract.getsum());
        let total =  parseInt(get2.totaldepo);  
        let totalpush =  parseInt(get2.pushpay);
        let totaldep = parseInt(total-totalpush);
        console.log(totaldep);
        document.getElementById("Dep").innerHTML =  (get2.dep); 
        document.getElementById("Dep10").innerHTML =  (get2.dep*10); 
        document.getElementById("Push").innerHTML =  parseFloat(get2[6]/1e18).toFixed(0);
         document.getElementById("Depo").innerHTML=  parseFloat(get2.depo /1e18).toFixed(0);//cya인출가능액
         document.getElementById("Depo2").innerHTML=  parseFloat(get2.depo /1e18).toFixed(0);//cya인출가능액
         document.getElementById("Totaldep").innerHTML =  parseFloat(totaldep /1e18 ).toFixed(0); //cya누적수당
         
         document.getElementById("Pushpay").innerHTML = parseFloat(get2.pushpay/1e18).toFixed(0);
         
         let mynum =  parseInt(get2.mynum);  
         let asum =  parseInt(get2.asum); 
         let dep =  parseInt(get2.dep);     
         let bar =  parseInt(sum-(mynum + asum));   
         
         console.log(bar);  
         console.log(dep);  
        document.getElementById("Sum").innerHTML = (asum);          
        document.getElementById("Bar").style.width = `${(bar/dep)*100}%`;

 
 document.getElementById("Mywc").innerHTML =  (10-get2.wc);
    
    };  


    let Expush = async () => {
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
        let cyatreeContract = new ethers.Contract(contractAddress.cyatree2Addr, contractAbi.cyatree2, signer);
      
      
        try {
          await cyatreeContract.expush();
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatree2Addr, contractAbi.cyatree2, signer);
    
    
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatree2Addr, contractAbi.cyatree2, signer);
    
    
      try {
        await cyatreeContract.withdraw();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
   // 호출 코드
 topDataSync();

 