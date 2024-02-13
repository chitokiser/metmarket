let contractAddress = {
    degameAddr: "0x43EFCFF8429299c7305bf432d3E81D47f86B9F29",  //degame addr

  };
  let contractAbi = {
  
    degame: [
    " function g1() public view virtual returns(uint256)",
    "function g2(address user) public view virtual returns(uint256)",
    " function  g3() public view returns(uint)",
    "function  g5() public view returns(uint) ",
    " function  getdepo(address user) public view returns(uint)", 
    " function  gettax(address user) public view returns(uint)",  //나의 세금
    "function getsum( ) public view returns(uint) ",
    "function totaltax( ) public view returns (uint256)",
    "function memberjoin(address _mento) public ",
    "function charge (uint pay)public",
    "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,address,address)",
    "function withdraw( )public returns(bool)",
    "function mentoadd(address _mento)public"

    ],


  };
  
    let Degametop = async () => {
  const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
  const bnbPrice = parseFloat(responseBinanceTicker.data.price);
  document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
  document.getElementById("cPrice").innerHTML=(bnbPrice).toFixed(4);
  document.getElementById("cPrice2").innerHTML= parseFloat(1/bnbPrice).toFixed(4);
  
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    
         let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, provider);
         let tvl = await degameContract .g1(); 
         let mem = await degameContract .getsum(); 
   
         document.getElementById("Cyatvl").innerHTML = parseFloat(tvl/1e18).toFixed(2);
         document.getElementById("Mem").innerHTML = parseInt(mem);
        //  document.getElementById("Ttax").innerHTML = parseFloat(ttax/1e18).toFixed(4);
        //  document.getElementById("Jack").innerHTML = parseInt(jack);
        //  document.getElementById("Jack1").innerHTML =  parseFloat((100000-jack)/1000).toFixed(2);
        //  document.getElementById("Jack2").innerHTML =  parseFloat(100000/jack).toFixed(4);
            
      

 
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
    
        let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, signer);
    
        try {
          await degameContract.memberjoin(document.getElementById('mentoaddress').value);
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };
// 멘토데이타 입력
var dataArray = [
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f"
  ];
  
  // Function to select and display random data
  function displayRandomData() {
    // Select a random item from the array
    var randomIndex = Math.floor(Math.random() * dataArray.length);
    var randomData = dataArray[randomIndex];
  
    // Display the random data
    document.getElementById("randomData").textContent = randomData;
  }
  
  // Event listener for button click
  document.getElementById("randomButton").addEventListener("click", displayRandomData);


  function autoFillMentoAddress() {
    // Retrieve the printed mentoaddress
    var mentoaddress = document.getElementById('randomData').textContent;
  
    document.getElementById('mentoaddress').value = mentoaddress;
  }
  
  document.getElementById("randomButton").addEventListener("click", autoFillMentoAddress);

    
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
    
        let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, signer);
    
        try {
          await degameContract.mentoadd(document.getElementById('Mento').value);
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
      let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, signer);

      let my = await degameContract.myinfo(await signer.getAddress());
      let tpoint =  parseInt(await my[0]);  //누적 인출현황
      let point =  parseInt(await my[1]);   // depo
      let mytax =  parseInt(await my[2]);  //세금
      let mymenty =  parseInt(await my[4]); //멘티수
      let mento = (await my[5]); //나의 멘토
      let agent = (await my[6]); //나의 에이젼트

      document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
      document.getElementById("Point").innerHTML= (point/1E18).toFixed(4); 
      document.getElementById("Mytax").innerHTML= (mytax/1E18).toFixed(4); 
      document.getElementById("Mymenty").innerHTML= (mymenty);
      document.getElementById("Mymento").innerHTML= (mento);
      document.getElementById("Myagent").innerHTML=(agent); 
     
    };
  
  
    let Charge = async () => {
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
    
      let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, signer);
      const quantity = ethers.utils.parseUnits(document.getElementById('cyaInput').value, 18);
        try {
          await degameContract.charge(quantity);
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
  
      let degameContract = new ethers.Contract(contractAddress.degameAddr, contractAbi.degame, signer);
  
      try {
        await degameContract.withdraw();
  
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  

  
  
  
  
   
        Degametop ();
     