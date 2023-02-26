//cyaex&topinfo
let contractAddress = {
    cyadex2Addr: "0x7E0f523CF51686c422881d4437759438C8eCDEF5",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    metallowAddr: "0xaDd161Bd2b891ac74FEBc6116fb22CEaa015a691"
  };

  let contractAbi = {
  
    cyadex2: [
      "function cyabuy() payable public",
      "function bnbsell(uint256 num) public",
      "function balance()public view returns(uint256)",
      "function cyabalances() public view returns(uint256)",
      "function g1(address user) public view returns(uint256)",
      "function g2(address user) public view returns(uint256)"
    ],
    metallow: [
      "function sum() public view returns(uint256)",
      "function price() public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g6() public view virtual returns(uint256)"
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ]
  };
  
  const topDataSync = async () => {
    // BNB Price
    const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
    const bnbPrice = parseFloat(responseBinanceTicker.data.price);
    document.getElementById("BNBprice").innerHTML=bnbPrice.toFixed(3);
    document.getElementById("CYAprice").innerHTML=(bnbPrice/1000).toFixed(3);
    document.getElementById("CYAprice2").innerHTML=(1000/bnbPrice).toFixed(3);
  
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex2, provider);
    let metallowContract = new ethers.Contract(contractAddress.metallowAddr, contractAbi.metallow, provider);
    let members = await metallowContract.sum();
    let cyatvl = await metallowContract.g1();
    let metprice = await metallowContract.price();
    let tvl = await cyadex2Contract.balance();
    
    // cyadex TVL
    document.getElementById("Tvl").innerHTML=(tvl/1e18).toFixed(3);
    // cyaTVL
    document.getElementById("Cyatvl").innerHTML=(cyatvl/1e18).toFixed(3);

    // met price
    document.getElementById("Metprice").innerHTML=(metprice/1e18).toFixed(3);
    // members *2 허수적용
    document.getElementById("Members").innerHTML=(members);  
    
  };
  
  
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
  
  