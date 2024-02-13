const Address = {
    cctAddr: "0x7c0b0Cec4674E81582d5332eDCe5D1E6a2f39998", //cctproduct
    kycAddr: "0x6bbAca1ccEF61A0FB60f38d65Db6abBA357F7051",
    cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
  };
  
  const Abi = {
    cct: [
      "function getcust(uint id)external view returns (address[] memory)",
      "function  g3() public view returns(uint)",
      "function  totalcct() public view returns(uint)",
      "function outcct( )public returns(bool)",
    ], 

    kyc: [
        "function g1(address user) public view returns(string memory name,string memory house,string memory phone,string memory email,uint birth,uint time)",
      ],
      cyadex: [
        "function getprice() public view returns(uint256)",
        "function balance() public view returns(uint256)",
        "function cyabalances() public view returns(uint256)",
        "function buy() payable public",
        "function sell(uint256 num) public",
        "function priceup(uint256 num)public"
      ],
  
  };

  let topDataSync2 = async () => {

   
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let cctContract = new ethers.Contract(Address.cctAddr, Abi.cct, provider);
       let get2 = await cctContract.totalcct(); //누적 지원금
       let get3 = await cctContract.g3(); //cct가격
       
       document.getElementById("Totalcct").innerHTML=  (get2);
       document.getElementById("G3").innerHTML=  (get3);
       
  };

  const Priceup = async () => {
    const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
    const signer = userProvider.getSigner();
    const cyadexContract = new ethers.Contract(Address.cyadexAddr, Abi.cyadex, signer);
    try {
      await cyadexContract.priceup(document.getElementById('Bnb').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
    
    
  };




  let Getcust = async () => {
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

  let kycContract = new ethers.Contract(Address.kycAddr, Abi.kyc, signer);

    try {
      let customer = await kycContract.g1(document.getElementById("Getaddress").value);
      
      document.getElementById("Customer Name:").innerHTML=  (customer[0]);
      document.getElementById("Customer Address:").innerHTML=  (customer[1]);
      document.getElementById("Customer Phone:").innerHTML=  (customer[2]);
      document.getElementById("Customer Email:").innerHTML=  (customer[3]);
      document.getElementById("Customer Birth:").innerHTML=  (customer[4]);
      document.getElementById("Customer Time:").innerHTML=  (customer[5]);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  

  let Outcct = async () => {
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
      await cctContract.outcct();
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