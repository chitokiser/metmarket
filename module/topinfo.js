//cyaex&topinfo
let contractAddress = {
  cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
  cyadex2Addr: "0x7E0f523CF51686c422881d4437759438C8eCDEF5",
  cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
  erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
  mttAddr: "0xa2d18FEFA4f67C4F7531F3C29A76b9680915b380"
};
let contractAbi = {
  cyadex: [
    "function getprice() public view returns(uint256)",
    "function balance() public view returns(uint256)",
    "function buy() payable public",
    "function sell(uint256 num) public"
  ],
  cyadex2: [
    "function cyabuy() payable public",
    "function bnbsell(uint256 num) public",
    "function balance()public view returns(uint256)",
    "function cyabalances() public view returns(uint256)",
    "function g1(address user) public view returns(uint256)",
    "function g2(address user) public view returns(uint256)"
  ],
  cyacoop: [
    "function getprice() public view returns(uint256)",
    "function allow() public view returns(uint256)",
    "function sum() public view returns(uint256)",
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
  document.getElementById("bnbPrice").innerHTML=bnbPrice.toFixed(4);
  document.getElementById("cyaPrice").innerHTML=(bnbPrice/1000).toFixed(4);

  // ethers setup
  let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
  let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, provider);
  let cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex2, provider);
  let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, provider);
  let cyadexPrice = await cyadexContract.getprice();
  let cyacoopPrice = await cyacoopContract.getprice();

  let members = await cyacoopContract.sum();
  let cyabal = await cyacoopContract.g1();
  let catsold = await cyacoopContract.g6();
  let tvl = await cyadexContract.balance();

  // cyadex price
  document.getElementById("cyaPrice2").innerHTML=(1000/cyadexPrice).toFixed(4);
  
  // members *2 허수적용
  document.getElementById("members").innerHTML=(members);  
  // cyadex TVL
  document.getElementById("tvl").innerHTML=(tvl/1e18).toFixed(4);
  // cyadex2 TVL
  document.getElementById("tvl2").innerHTML=parseFloat(ethers.utils.formatUnits(await cyadex2Contract.balance(), 18)).toFixed(4);
  // cyabalance 
  document.getElementById("cyatvl").innerHTML = (cyabal/1e18).toFixed(4);
  // catsold 
  document.getElementById("Catsold").innerHTML = (1000000000-catsold);
  
  // cyacoop price
  document.getElementById("catPrice").innerHTML=(cyacoopPrice/1e18).toFixed(4);

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

