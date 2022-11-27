let contractAddress = {
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    catAddr: "0xE9f81b32E6cEca07819806B827AEA1C71C53d257"
  };
  let contractAbi = {
    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],
    cyacoop: [
      "function getprice() public view returns(uint256)",
      "function allow() public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256 allocya,uint256 exp,uint8 level,uint256 booster)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function memberjoin(uint256 _num) public",
      "function automemberjoin() public",
      "function levelup() public returns(bool)",
      "function geteps(address user) external view returns (uint256)",
      "function withdraw() public returns(bool)",
      "function mentolength() public view returns(uint256)",
      "function addmento() public",
      "function buybooster() public",
      "function buycat(uint _num) public returns(bool)",
      "function sellcat(uint num) public returns(bool)"
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    cat: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, provider);

    let cyacoopPrice = await cyacoopContract.getprice();
    let totalsold = 1000000000 - await cyacoopContract.g6();

    // oustanding shares of cya
    document.getElementById("outstandingCoin").innerHTML = (totalsold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    document.getElementById("catprice").innerHTML = ((cyacoopPrice)/1e18).toFixed(6);
    // market cap
    document.getElementById("marketCap").innerHTML = ((cyacoopPrice*totalsold)/1e18).toFixed(6);

    // contract balance
    document.getElementById("contractBalance").innerHTML = parseFloat(ethers.utils.formatUnits(await cyacoopContract.g1(), 18)).toFixed(6);

    // total mentor
    document.getElementById("totalMentor").innerHTML = await cyacoopContract.mentolength();
  };

  

  let catmemberLogin = async () => {
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
    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);
    let catContract = new ethers.Contract(contractAddress.catAddr, contractAbi.cat, signer);
    
  
    // my cat
    let g7 = await cyacoopContract.g7(await signer.getAddress());
    document.getElementById("myCat").innerHTML = await g7;
    
    // my cat value
    document.getElementById("myCatValue").innerHTML = parseFloat(ethers.utils.formatUnits((g7 * await cyacoopContract.getprice()).toString(), 18)).toFixed(6);

    // eps
    document.getElementById("eps").innerHTML = parseFloat(ethers.utils.formatUnits(await cyacoopContract.geteps(await signer.getAddress()), 18)).toFixed(3);

    // epsLeftTime
    let g2 = await cyacoopContract.g2();
    let seconds = parseInt(g2.allocya);
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((seconds + 604800 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    let g3 =  parseInt(await catContract.getdepot(await signer.getAddress()));
    let left2 = parseInt((g3 + 31536000 ) - nowt);  
    let days = parseInt(left2/60/60/24);
    let hours = parseInt(left2/3600)%24;
    let mins = parseInt((left2/60)%60);
    let secs = left2%60;
    document.getElementById("epsLeftTime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
    document.getElementById("sellLeftTime").innerHTML = left2 > 0 ? `${days}일${hours}시간${mins}분${secs}초` : ''; 
  };


  let withdraw = async () => {
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

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);

    try {
      await cyacoopContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Buycat = async () => {
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

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);

    try {
      await cyacoopContract.buycat(document.getElementById('buyAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let sellCat = async () => {
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

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);

    try {
      await cyacoopContract.sellcat(document.getElementById('sellAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  const addcat = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xE9f81b32E6cEca07819806B827AEA1C71C53d257",
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

      })();