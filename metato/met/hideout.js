let contractAddress = {  

    hideoutAddr: "0xE785CBb9e27D1575C385b23863685A3FeDa909ea"
  };
  let contractAbi = {
  
hideout: [
    "function infoup(uint _id,string memory _info2,uint _info3,address _newowner)public",
    "function getinfo1(uint _id) public view returns(string memory)",
    "function getinfo2(uint _id) public view returns(string memory)",
    "function owner(uint _id) public view returns(address)",
    "function getinfo3(uint _id) public view returns(uint)"
      ]
      
 

  };

  let MtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let hideoutContract = new ethers.Contract(contractAddress.hideoutAddr, contractAbi.hideout, provider);
    let a1 = parseInt(23022411001);
    let n1 = await hideoutContract.getinfo2(a1);  //이름
    let i1 = await hideoutContract.getinfo3(a1);  //주민번호
    let o1 = await hideoutContract.owner(a1);  //오너
    document.getElementById("A1").innerHTML = (a1);
    document.getElementById("N1").innerHTML = (n1);
    document.getElementById("I1").innerHTML = (i1);
    document.getElementById("O1").innerHTML = (o1);
 
    let a2 = parseInt(23022411002);
    let n2 = await hideoutContract.getinfo2(a2);  //이름
    let i2 = await hideoutContract.getinfo3(a2);  //주민번호
    let o2 = await hideoutContract.owner(a2);  //오너
    document.getElementById("A2").innerHTML = (a2);
    document.getElementById("N2").innerHTML = (n2);
    document.getElementById("I2").innerHTML = (i2);
    document.getElementById("O2").innerHTML = (o2);

    let a3 = parseInt(23022411003);
    let n3 = await hideoutContract.getinfo2(a3);  //이름
    let i3 = await hideoutContract.getinfo3(a3);  //주민번호
    let o3 = await hideoutContract.owner(a3);  //오너
    document.getElementById("A3").innerHTML = (a3);
    document.getElementById("N3").innerHTML = (n3);
    document.getElementById("I3").innerHTML = (i3);
    document.getElementById("O3").innerHTML = (o3);
   

  };

 




let Mymeta = async () =>{
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
  let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
  let mydepo = await meta5Contract.getmydepo();
  document.getElementById("Getmydepo").innerHTML = (mydepo/1e18).toFixed(6);
  let mymetat = await meta5Contract.getmymetalength();  
  document.getElementById("Mymetat").innerHTML = (mymetat);

}


let Getpass = async () => {
    
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
  let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
  let anum2 = document.getElementById('Anum2').value;
  let mp = await meta5Contract.getpass2(anum2);
  document.getElementById("Mp").innerHTML = (mp);
};




  (async () => {
    MtopDataSync();
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
  })();