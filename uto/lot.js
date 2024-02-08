let contractAddress = {
    cctbankAddr: "0xC9AC8cD01Fab388d28a5A3416E2F9f7cac0dA0d2",  //LOT로 바꾸기 귀찮아서 그냥 cct 사용함
    erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",  //CYAToken 주소
    cctAddr: "0x97c29C2EC9fe37AFA2635477992618796A618"
  };
  let contractAbi = {
  
    cctbank: [
    " function g1() public view virtual returns(uint256)",
    " function  g3() public view returns(uint)",
    "function  g5() public view returns(uint) ",
    " function  g6(address user) public view returns(uint)", //배당금 레버리지 이전
    "function g11() public view virtual returns(uint256)",  //유통량
    "function getsum( ) public view returns(uint) ",
    "function getprice( ) public view returns (uint256)",
    "function totaltax( ) public view returns (uint256)",
    "function memberjoin(address _mento) public ",
    "function  g8(address user) public view returns(uint)",
    "function  getdepo(address user) public view returns(uint)",
    "function  getlevel(address user) public view returns(uint)",
    "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
    "function withdraw( )public returns(bool)",
    "function allowcation( )public returns(bool)",
    "function buylot(uint _num) public returns(bool) ",
    "function selllot(uint _num) public returns(bool) ",
    "function levelup() public ",
    "function mentoadd(address _mento)public",
    "event reward(uint amount);"
    ],
    erc20: [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)"
      ],
      cct: [
        "function getdepot(address user) external view returns (uint256)"
      ]
  
  };
  
    let Lottop = async () => {
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
         let tvl2 = await cctbankContract.g11(); //유통량
         let ttax = await cctbankContract.totaltax(); 
         document.getElementById("Lprice").innerHTML=  parseFloat(cprice/1e18).toFixed(4);
         document.getElementById("Mem").innerHTML = parseInt(mems+60);
         document.getElementById("Tvl").innerHTML = parseFloat(tvl/1e18).toFixed(2);
         document.getElementById("Tvl2").innerHTML = parseInt(tvl2);
         document.getElementById("Ttax").innerHTML = parseFloat(ttax/1e18).toFixed(4);


         cctbankContract.on('reward', (amount) => {
            // Handle incoming event data
            console.log('레버리지된금액:',amount);
            
            // Display the event on your webpage as needed
            // For example, update an HTML element with the event data
            document.getElementById('eventData').innerText = `레버리지된 금액: ${amount/1e18}`;
        });
    
  
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
  
      let lotContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);
  
      try {
        await lotContract.memberjoin(document.getElementById('mentoaddress').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
    
    let Mentoadd = async () => {
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
    
        let lotContract = new ethers.Contract(contractAddress.cctbankAddr, contractAbi.cctbank, signer);
    
        try {
          await lotContract.mentoadd(document.getElementById('Mento').value);
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
      let mypay = await vetContract.g6(await signer.getAddress());
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
      document.getElementById("Mypay").innerHTML=(mypay*mylev/1e18).toFixed(4); 
      document.getElementById("Expneeded").innerHTML= (levelexp - myexp);
      document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다. 
       
    
    
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
  

    let Allowcation = async () => {
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
          await vetContract.allowcation();
    
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };
  
    let Lbuy = async () => {
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
        await cctbankContract.buylot(document.getElementById('buycustnum').value);
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
        await cctbankContract.selllot(document.getElementById('sellcustnum').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  
  
    const Addlot = async () => {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: "0x4D687f146517a3a5cC1f13B282d96350a88a56d2",
            symbol: "LOT",
            decimals: 0, 
            // image: tokenImage,
          },
        },
      });
    }
  
  
    (async () => {
      Lottop();
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