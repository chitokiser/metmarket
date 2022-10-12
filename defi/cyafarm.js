 // testnet
 let contractAddress = {
  cyafarmAddr: "0x6686C2298A8cDe6eACC975da5E2316641f934854",
  cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
  cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
  erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9 "
};
 let contractAbi = {

  cyafarm: [
    "function seeding(uint256 pay) public",
    "function withdraw( )public",
    "function g1( ) public view virtual returns(uint256)",
    "function pllength( ) public view returns(uint)",
    "function getpl(uint num) public view returns(uint)",
    "function allportinfo(uint num) public view returns(uint depo,uint depon,uint portn,address owner,uint start)",
    "function getperiod(uint num) public view returns(uint)",
    "function getvalue(uint num) public view returns(uint)",
    "function getmywin( ) public view returns(uint) ",
    "function getmydepo( ) public view returns(uint)",
    "function getmyseedmoney( ) public view returns(uint)",
    "function getmyfarm(uint num) public view returns(uint) ",
    "function getmygain( ) public view returns(uint)",
    "function getmyjack( ) public view returns(uint)", 
    "function remain( ) public view returns(uint256)"
  ],
  cyadex: [
    "function getprice() public view returns(uint256)",
    "function balance() public view returns(uint256)",
    "function buy() payable public",
    "function sell(uint256 num) public"
  ],
  cyacoop: [
    "function getprice() public view returns(uint256)",
    "function allow() public view returns(uint256)",
    "function sum() public view returns(uint256)",
    "function g1() public view returns(uint256)"
  ],
  erc20: [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)",
    "function balanceOf(address tokenOwner) public override view returns (uint256)"
  ],
};


const topDataSync = async () => {
  // ethers setup
  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
  const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr,contractAbi.cyafarm,provider);
  //농장개수
  const fsum = await cyafarmContract.remain();
  //농장생성순서
  const creatnum = await cyafarmContract.pllength();
  //계약잔고
  const fcyabal = await cyafarmContract.g1();
 
  document.getElementById("farmtotal").innerHTML = (fsum);
  document.getElementById("farmnum").innerHTML = (creatnum);
  document.getElementById("fcyatvl").innerHTML = (fcyabal/1e18).toFixed(6);
  document.getElementById("fcyatvl100").innerHTML = (fcyabal/1e20).toFixed(6);
  document.getElementById("fcyatvl1000").innerHTML = (fcyabal/1e21).toFixed(6);

};

let fwithdraw = async () => {  //해결완료  에러메세지 작동함
  const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
  const signer = userProvider.getSigner();

  const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);

  try {
    await cyafarmContract.withdraw();
  } catch(e) {  
    alert(e.data.message.replace('execution reverted: ',''))
  }
};

let memberLogin = async () => {
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
  let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  let mydepo = await cyafarmContract.getmydepo();
  let mygain = await cyafarmContract.getmygain();
  let mywin = await cyafarmContract.getmywin();
  let myseed = await cyafarmContract.getmyseedmoney();
  let myjack = await cyafarmContract.getmyjack(); 
  
  var tmp_val="";
  for(i=1; i<13; i++){
   if (cyafarmContract.getmyfarm(i) != null  && cyafarmContract.getmyfarm(i) != "" ){
   if(tmp_val!=""){
      tmp_val = tmp_val+",";
   }
   tmp_val = tmp_val+i;
   }
   }
  
  document.getElementById("myfarms").innerHTML = tmp_val;
  document.getElementById("farmdepo").innerHTML=(mydepo/1e18).toFixed(6);  //예치금 총액
  document.getElementById("farmgain").innerHTML = (mygain/1e18).toFixed(6); //순이익 총액
  document.getElementById("farmwin").innerHTML = (mywin/1e18).toFixed(6); //인출 총액
  document.getElementById("farmseed").innerHTML = (myseed/1e18).toFixed(6); //남아있는 예치금
  document.getElementById("farmjack").innerHTML = (myjack/1e18).toFixed(6); //찾을 돈
  // document.getElementById("myfarms").innerHTML = (newstring);
};



let buyfarm = async () => {
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
  let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  let amount = ethers.utils.parseUnits(document.getElementById('seed').value, 18);  //입력금액을 인자로 하여 시딩함.

  try {
    await cyafarmContract.seeding(amount);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
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


