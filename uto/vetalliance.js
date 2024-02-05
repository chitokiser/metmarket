let vetAddress = {
    vetAddr: "0x6D27F6B5F0eCc4792141D8DC3e9C2b01065A973b",  //vet alliance
  };

  let vetAbi = {
  
    vet: [
    "function registration(string memory name,uint rate,address owner) public",
    "function buy(uint id,uint fee)public",
    "function charge (uint amount)public",
    "function save( )public",
    "function bet( )public",
    "function outpay(uint id )public",
    " function g1() public view virtual returns(uint256)",
    " function  g3() public view returns(uint)",
    "function  g7(address user) public view virtual returns(uint)",
    "function  g8(address user) public view returns(uint)",
    "function  g10(address user) public view returns(uint)",
    "function g11() public view virtual returns(uint256)", //계약이 가지고 있는 vet시가
    "function tiketprice() public view virtual returns(uint256)", 
    "function allis(uint256 num) public view returns(string memory name,uint256 rate,address owner,uint256 pay,uint256 totalpay,uint256 id)", 
    "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256)",

    ],
   
  };
  
    let Vtop = async () => {

  
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    
          let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, provider);
         let tprice = await vetContract.tiketprice(); 
         let casht = await vetContract.g1(); 
         let vtvl = await vetContract.g3(); 
  
         document.getElementById("Tprice").innerHTML=  parseInt(tprice);
         document.getElementById("Cashtotal").innerHTML = parseFloat(casht/1e18).toFixed(2);
         document.getElementById("Vtvl").innerHTML=  parseInt(vtvl);
  

          //1번가맹점
       let as1= await vetContract.allis(0);
       let a1name  = await as1[0];
       let a1rate  = await as1[1];
       let a1owner  = await as1[2];
       let a1depo  = await as1[3];
       let a1tdepo  = await as1[4];
       let a1id  = await as1[5];
   
     
       document.getElementById("A1name").innerHTML = (a1name);
       document.getElementById("A1rate").innerHTML = (a1rate/10);
       document.getElementById("A1depo").innerHTML =  parseFloat(a1depo/1e18).toFixed(2);
       document.getElementById("A1tdepo").innerHTML =  parseFloat(a1tdepo/1e18).toFixed(2);
       document.getElementById("A1id").innerHTML = (a1id);
       document.getElementById("A1owner").innerHTML = (a1owner);



      //2번가맹점
      let as2= await vetContract.allis(1);
      let a2name  = await as2[0];
      let a2rate  = await as2[1];
      let a2owner  = await as2[2];
      let a2depo  = await as2[3];
      let a2tdepo  = await as2[4];
      let a2id  = await as2[5];
  
      document.getElementById("A2name").innerHTML = (a2name);
      document.getElementById("A2rate").innerHTML = (a2rate/10);
      document.getElementById("A2depo").innerHTML =  parseFloat(a2depo/1e18).toFixed(2);
      document.getElementById("A2tdepo").innerHTML =  parseFloat(a2tdepo/1e18).toFixed(2);
      document.getElementById("A2id").innerHTML = (a2id);
      document.getElementById("A2owner").innerHTML = (a2owner);


   };
 
  

    
    let Vlogin = async () => {
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
      let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
      let myg7 = await vetContract.g7(await signer.getAddress());
      document.getElementById("Myg7").innerHTML= parseFloat(myg7/1e18).toFixed(2); 
      
       let my = await vetContract.myinfo(await signer.getAddress());
       let mypv =  parseInt(await my[0]);
       let myrp =  parseInt(await my[1]);
       let mytiket =  parseInt(await my[2]);

     document.getElementById("Mypv").innerHTML= parseFloat(mypv/1e18).toFixed(2); 
     document.getElementById("Myrp").innerHTML= parseFloat(myrp/1e18).toFixed(2);
     document.getElementById("Mytiket").innerHTML= (mytiket);
   
    
    };
  
  
    let Buyt = async () => {  //티겟구매
     
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
  
       let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
      
      try {
        await vetContract.charge(document.getElementById('tiketnum').value); 
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    
  };
  
  
  
    let Aidbuy = async () => {
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
      let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
      const quantity = ethers.utils.parseUnits(document.getElementById('fee').value, 18);
      try {
        await vetContract.buy(document.getElementById('aid').value,quantity);
        
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  

    let Outpay = async () => {
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
        let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
        
        try {
          await vetContract.outpay(document.getElementById('aid2').value);
          
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };
 
  
      let Saverp = async () => {
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
        let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
        
        try {
          await vetContract.save();
          
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };


      
      let Bet = async () => {
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
        let vetContract = new ethers.Contract(vetAddress.vetAddr, vetAbi.vet, signer);
        
        try {
          await vetContract.bet();
          
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };


  
    (async () => {
      Vtop();
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