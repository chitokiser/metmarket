let Address = {
    cctAddr: "0xB5F293F2E89f9207EbBffFc996847260BC91d8ab"
  };
let Abi = {
    cct: [
      "function buy(uint num,string memory _phone)public",
      "function g4(uint no) public view returns( string memory name,uint256 price,uint256 pc,uint256 pn)",
      "function g1() public view virtual returns(uint256)",
      "function  g6(address user) public view returns(uint)",  //나의 캐쉬백
      "function  g7(uint num) public view returns(uint)", //상품별 추정캐쉬백
      "function  totaltax() public view returns(uint)"
    ],

  };

  let topDataSync2 = async () => {

   
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let cctContract = new ethers.Contract(Address.cctAddr, Abi.cct, provider);
       let get1 = await cctContract.g1(); //cct가격
       let get2 = await cctContract.totaltax(); //cct가격
       document.getElementById("G1").innerHTML=  parseFloat(get1/1e18).toFixed(2);
       document.getElementById("G2").innerHTML=  parseFloat(get2/1e18).toFixed(2);
       
       //1번상품
       let p1cashback = await cctContract.g7(1);
       document.getElementById("P1cash").innerHTML=  parseFloat(p1cashback/1e18).toFixed(2);
       let p1 = await cctContract.g4(1);
   
       let p1name  = await p1[0];
       let p1price  = await p1[1];
       let p1pc  = await p1[2];
       let p1pn  = await p1[3];
   
     
       document.getElementById("P1name").innerHTML = (p1name);
       document.getElementById("P1price").innerHTML = (p1price);
       document.getElementById("P1pc").innerHTML = (p1pc);
       document.getElementById("P1pn").innerHTML = (p1pn);

  };

  let Buyp = async () => {
   
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

    let cctContract = new ethers.Contract(Address.cctAddr, Abi.cct, signer);
    
    try {
      await cctContract.buy(document.getElementById('number')); 
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
};


  (async () => {
    topDataSync2();
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