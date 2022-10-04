 // testnet
 let contractAddress = {
    cyatrainAddr: "0x336c89f3eF1d5710c29A532B097cd37f89074195",
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9 "
  };
   let contractAbi = {
   
    cyatrain: [
      "function geton(uint fee) public",
      "function getoff( )public",
      "function stp() public view virtual returns(uint256)",
      "function tp() public view virtual returns(uint256)",
     "function g1() public view virtual returns(uint256)",
      "function g2(address user) public view virtual returns(uint256)",
      "function g3(address user) public view returns(uint)",
      "function g4(address _user) public view returns(uint depo,uint jack,uint mynum,uint mytn)",
      "function g5(address user) public view virtual returns(uint256)"
    ],


    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],

    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)",
      "function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)",
      "function balanceOf(address tokenOwner) public override view returns (uint256)"
    ],
  };
  
  
  let TDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyatrainContract = new ethers.Contract(contractAddress.cyatrainAddr,contractAbi.cyatrain,provider);
    let trainbal = await cyatrainContract.g1();
    let Stp = await cyatrainContract.stp();
    let Tp = await cyatrainContract.tp();
    

    document.getElementById("tbones").innerHTML = (trainbal/1e19).toFixed(6);
    document.getElementById("tbalan").innerHTML = (trainbal/1e18).toFixed(6);
    document.getElementById("hi").innerHTML = (trainbal/1e20).toFixed(6);
    document.getElementById("low").innerHTML = (trainbal/1e21).toFixed(6);
    document.getElementById("getstp").innerHTML = (Stp);
    document.getElementById("gettp").innerHTML = (Tp);
    
   
  };
  let Geton = async () => {
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
    let cyatrainContract = new ethers.Contract(contractAddress.cyatrainAddr, contractAbi.cyatrain, signer);
    let amount = ethers.utils.parseUnits(document.getElementById('tiketprice').value, 18);  //입력금액을 인자로 하여 시딩함.
  
    try {
      await cyatrainContract.geton(amount);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  

  let TmemberLogin = async () => {
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
    let cyatrainContract = new ethers.Contract(contractAddress.cyatrainAddr, contractAbi.cyatrain, signer);
    let g4 = await cyatrainContract.g4(await signer.getAddress());
    let g3 = await cyatrainContract.g3(await signer.getAddress());
    let gain = g3 + g4.jack;
   
   
    document.getElementById("getmydepo").innerHTML=(g4.depo/1e18).toFixed(6);  //예치금 총액
    document.getElementById("getmynum").innerHTML = (g4.mynum);
    document.getElementById("getmytn").innerHTML = (g4.mytn);
    document.getElementById("getmyjack").innerHTML = (g4.jack/1e18).toFixed(6); //남아있는 예치금
    document.getElementById("mygain").innerHTML = (gain/1e18).toFixed(6); //찾을 돈
  
  };
   
   

    let Getoff = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatrainAddr, contractAbi.cyatrain, signer);
    
    
      try {
        await cyatreeContract.getoff();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };


  (async () => {
  TDataSync();
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
  
  let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, userProvider);
  
  let selectElement = document.getElementById('bnbInput');
  let selectElement2 = document.getElementById('cyaInput');
  
  selectElement.addEventListener('change', async (event) => {
    if (event.target.value < 0.001) {
      alert("now enough value");
    } else {
      document.getElementById('bnbOutput').value=event.target.value*parseFloat(await cyadexContract.getprice())/1000
    }
  });
  selectElement2.addEventListener('change', async (event) => {
    document.getElementById('cyaOutput').value=event.target.value/parseFloat(await cyadexContract.getprice())*980
  })
  })();
  
  
  