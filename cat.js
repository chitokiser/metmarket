 
      const contractAddress = {
        defiAddr: "0x2A73d3B5EDbe3bb4D2E72496b9C9927890186A49",
      };
      const contractAbi = {
    
        defi: [
          "function g1() public view virtual returns(uint256)",
          "function g2() public view returns(uint256)",
          "function time() public view returns(uint256)",
          "function g3() public view virtual returns(uint256)",
          "function g6() public view virtual returns(uint256)",
          "function g8() public view virtual returns(uint256)",
          "function get10() public  view returns (uint256)",
          "function get11() public view returns (uint256)",
          "function get12(address user) public view returns (uint256)",
          "function get13(address user) public view returns (uint256)",
          "function get14(address user) public view returns (uint256)",
          "function get15(address user) public view returns (uint256)",
          "function get16(address user) public view returns (uint256)",
          "function get17() public view returns (uint256)",
          "function get18() public view returns (uint256)",
          "function input(uint _pay)public",
          "function buycat(uint _num) public returns(bool)",
          "function sellcut(uint num)public returns(bool)",
          "function withdraw()public returns(bool)",
        ]
      };

      const topDataSync = async () => {
    
     
       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
     
       let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, provider);

       let catsell = await defiContract.g1();
       let catbuy = await defiContract.g2();
       let defitvl = await defiContract.g6();
       let deficat = await defiContract.g8();
       let tprice = await defiContract.get10();
   

       document.getElementById("Catsell").innerHTML=  parseFloat(catsell/1e18).toFixed(4);  //1CAT팔때 가격
       document.getElementById("Catbuy").innerHTML=  parseFloat(catbuy/1e18).toFixed(4);  //1CAT살때 가격
       document.getElementById("Defitvl").innerHTML=  parseFloat(defitvl/1e18).toFixed(4);  //defi cya잔고
       document.getElementById("Deficat").innerHTML=  (deficat) //defi cat잔고
       document.getElementById("Tprice").innerHTML=  parseFloat(tprice/1e18).toFixed(2);  //defi cat시가총액
 
     };
  


   
  let Buycat = async () => {
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

    let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, signer);

    try {
      await defiContract.buycat(document.getElementById('buyAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Sellcat = async () => {
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

    let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, signer);

    try {
      await defiContract.sellcut(document.getElementById('sellAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  const addTokenCat = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xA33A68441cCE5133D23887172161d57C73be30ea",
          symbol: "CAT",
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