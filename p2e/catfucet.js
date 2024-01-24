 
      const contractAddress = {
        catfaucetAddr: "0x08EDcf65D041217D74bF250d5b48dde34e9B19AF",
      
      };
      const contractAbi = {
        catfaucet: [
          "function catwithdraw()public",
          "function getpay()public view returns(uint256)",
          "function mycat() public view returns(uint256)",
          "function mycut() public view returns(uint256)",
          "function allowt() public view returns(uint256)",
          "function gettime() public view returns(uint256)",
          "function catbalances() public view returns(uint256)",
          "function mycutbalances(address user) public view returns(uint256)"
        ]
      
      };

      const topDataSync = async () => {
    


       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let catfaucetContract = new ethers.Contract(contractAddress.catfaucetAddr, contractAbi.catfaucet, provider);
       let catpay = await catfaucetContract.getpay();
       let get3 = await catfaucetContract.catbalances();
       
       document.getElementById("Catpay").innerHTML=  (catpay);
       document.getElementById("Get3").innerHTML=  (get3);
    
     };
  


  
  let catLogin = async () => {
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
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let signer = userProvider.getSigner();
    let catfaucetContract = new ethers.Contract(contractAddress.catfaucetAddr, contractAbi.catfaucet, signer);
    let catfaucetContract2 = new ethers.Contract(contractAddress.catfaucetAddr, contractAbi.catfaucet,provider);
    let catpay = await catfaucetContract2.getpay();
    let mYcat = parseInt(await catfaucetContract.mycat());
    let mYcut = parseInt(await catfaucetContract.mycut());
    let myallowt = parseInt(await catfaucetContract.gettime()); 
    console.log(myallowt)

    document.getElementById("myCut").innerHTML = (mYcut);
    document.getElementById("myCat").innerHTML = (mYcat);
    document.getElementById("myCutvalue").innerHTML = parseInt(mYcut*(catpay/1500));
   
    
    let nowt = Math.floor(new Date().getTime()/ 1000);
    let left = parseInt((myallowt + 604800)- nowt );
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("epsLeftTime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
  };


  let Catwithdraw = async () => {
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

    let catfaucetContract = new ethers.Contract(contractAddress.catfaucetAddr, contractAbi.catfaucet, signer);

    try {
      await catfaucetContract.catwithdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


topDataSync();