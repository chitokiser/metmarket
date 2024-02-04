

let Address = {
    cctAddr: "0x7c0b0Cec4674E81582d5332eDCe5D1E6a2f39998",
    kycAddr: "0x6bbAca1ccEF61A0FB60f38d65Db6abBA357F7051",
  };
let Abi = {
    cct: [
      "function buy(uint num)public",
      "function g4(uint no) public view returns( string memory name,uint256 price,uint256 pc,uint256 pn)",
      "function g1() public view virtual returns(uint256)",
      "function  g6(address user) public view returns(uint)",  //나의 캐쉬백
      "function  g7(uint num) public view returns(uint)", //상품별 추정캐쉬백
      "function  totalcct() public view returns(uint)",
      "function  myinfo(address user) public view returns(uint256,uint256,uint256)",
      " function  totalcash() public view returns(uint)",
      "function withdraw( )public returns(bool)",
      "function getcust(uint id)external view returns (address[] memory)",
      "function getname(address user)external view returns (string[] memory)"
    ],

    kyc: [
      "function memberjoin(string memory _name,string memory _house,string memory _phone,string memory _email,uint _birth)public ",
      "function modify(string memory _name,string memory _house,string memory _phone,string memory _email,uint _birth)public ",
      "function g1(address user) public view returns(string memory name,string memory house,string memory phone,string memory email,uint birth,uint time)",
     
    ],

  };

  let topDataSync2 = async () => {

   
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let cctContract = new ethers.Contract(Address.cctAddr, Abi.cct, provider);
       let get1 = await cctContract.g1(); //cct가격
       let get2 = await cctContract.totalcash(); //누적 지원금
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


         //2번상품
         let p2cashback = await cctContract.g7(2);
         document.getElementById("P2cash").innerHTML=  parseFloat(p2cashback/1e18).toFixed(2);
         let p2 = await cctContract.g4(2);
     
         let p2name  = await p2[0];
         let p2price  = await p2[1];
         let p2pc  = await p2[2];
         let p2pn  = await p2[3];
     
       
         document.getElementById("P2name").innerHTML = (p2name);
         document.getElementById("P2price").innerHTML = (p2price);
         document.getElementById("P2pc").innerHTML = (p2pc);
         document.getElementById("P2pn").innerHTML = (p2pn);

     


       
         //3번상품
         let p3cashback = await cctContract.g7(3);
         document.getElementById("P3cash").innerHTML=  parseFloat(p3cashback/1e18).toFixed(2);
         let p3 = await cctContract.g4(3);
     
         let p3name  = await p3[0];
         let p3price  = await p3[1];
         let p3pc  = await p3[2];
         let p3pn  = await p3[3];
     
       
         document.getElementById("P3name").innerHTML = (p3name);
         document.getElementById("P3price").innerHTML = (p3price);
         document.getElementById("P3pc").innerHTML = (p3pc);
         document.getElementById("P3pn").innerHTML = (p3pn);

       let buylist1 = await cctContract.getcust(1);
       document.getElementById("Blist1").innerHTML = (buylist1);

       let buylist2= await cctContract.getcust(2);
       document.getElementById("Blist2").innerHTML = (buylist2);
       let buylist3= await cctContract.getcust(3);
       document.getElementById("Blist3").innerHTML = (buylist3);
     

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
      await cctContract.buy(document.getElementById('Productnum').value); 
    } catch(e) { 
        alert(e.data.message.replace('execution reverted: ',''))
    }
};



let Cashback = async () => {
   
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
      await cctContract.withdraw(); 
    } catch(e) { 
        alert(e.data.message.replace('execution reverted: ',''))
    }
}



let Plogin = async () => {
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
    let my = await cctContract.myinfo(await signer.getAddress());
    
    let mypay =  (await my[0]);
    let mytotalpay =  (await my[1]);
    document.getElementById("Mypay").innerHTML= parseFloat(mypay/1e18).toFixed(2);
    document.getElementById("Mytotalpay").innerHTML= parseFloat(mytotalpay/1e18).toFixed(2);
    
  };



  let Getname = async () => {
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
      let plist = await cctContract.getname(document.getElementById("Address").value);
      console.log(plist);
  
      var outputDiv = document.getElementById("output");

      // Create a new unordered list element
      var ul = document.createElement("ul");

      // Iterate over the elements of the array
      plist.forEach(function(item) {
          // Create a new list item element
          var li = document.createElement("li");
          // Set the text content of the list item
          li.textContent = item;
          // Append the list item to the unordered list
          ul.appendChild(li);
      });

      // Append the unordered list to the output div
      outputDiv.appendChild(ul);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  let Kyc = async () => {
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
  var name = document.getElementById('name').value;
  var address = document.getElementById('add').value;
  var mobile = document.getElementById('mobile').value;
  var email = document.getElementById('mail').value;
  var birthdate = document.getElementById('ymd').value;

  try {
    await kycContract.memberjoin(name,address,mobile,email,birthdate);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }

    
  };



  let Modify = async () => {
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
  var name = document.getElementById('rname').value;
  var address = document.getElementById('radd').value;
  var mobile = document.getElementById('rmobile').value;
  var email = document.getElementById('rmail').value;
  var birthdate = document.getElementById('rymd').value;

  try {
    await kycContract.modify(name,address,mobile,email,birthdate);
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