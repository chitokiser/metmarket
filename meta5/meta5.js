let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    meta5Addr: "0x4213ae7dd30FE130DB04B28a7D9bB7fA9666880E"
  };
  let contractAbi = {
  
    meta5: [
       "function creat(uint _account,string memory _pass1,string memory _pass2,uint _balan )public",
       "function memberjoin(address _mento)public",
       "function buy(uint _account)public",
       "function sell(uint _account,uint _balan)public",
       "function withdraw( )public",
       "function confirm(uint _account)public",
       "function cencell(uint _account)public",
       "function t1set(uint _num,uint _account)public",
       "function balanset(uint _account,uint _balan)public",
       "function g1() public view virtual returns(uint256)",
       "function g3(address user) public view virtual returns(uint256)",
       "function getpass1(uint _account) public view returns(string memory)",
       "function getpass2(uint _account) public view returns(string memory)",
       "function getbalan(uint _account) public view returns(uint256)",
       "function getmymetalength() public view returns(uint256)",
       "function getmymeta(uint num) public view returns(uint256)",
       "function getmydepo() public view returns(uint256)",
       "function getl1(uint _id) public view returns(uint256)",
       "function getl2(uint _id) public view returns(uint256)",
       "function getl3(uint _id) public view returns(uint256)",
       "function gett4(uint _id) public view returns(uint256)",
       "function gett5(uint _id) public view returns(uint256)",
       "function t1lengeth() public view returns(uint256)",
       "function t2lengeth() public view returns(uint256)",
       "function t3lengeth() public view returns(uint256)",
       "function t4lengeth() public view returns(uint256)",
       "function t5lengeth() public view returns(uint256)",
       "function owner(uint _num) public view returns(address)",
       "function getstate(uint _account) public view  returns(uint256)",
       "function getlevel(address user) public view  returns(uint256)"
      ],
      
      cyacoop: [
        "function getprice() public view returns(uint256)",
        "function allow() public view returns(uint256)",
        "function g1() public view returns(uint256)",
        "function g2() public view returns(uint256 allowt, uint256 exp, uint8 level, uint256 booster)",
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
      ]

  };

  let MtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, provider);
 
  };

 




  let Memberjoin = async () => {
    
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
      
      try {
        await meta5Contract.memberjoin(document.getElementById('mentoaddr').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };


  let Buy = async () => {
    
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
      
      try {
        await meta5Contract.buy(document.getElementById('Account').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };

  let Sell = async () => {
    
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
    let anum = document.getElementById('Anum').value;
    let price1 =  document.getElementById('Price1').value;
    try {
      await meta5Contract.sell(anum,price1);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
};


let Withdraw = async () => {
    
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
 
  try {
    await meta5Contract.withdraw();
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
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
    HtopDataSync();
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