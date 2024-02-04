let contractAddress = {  
   
    huntAddr: "0xa48eFE1e60D047c8Bc4113e54d96760E33792B55",

    
  };
  let contractAbi = {
  
    hunt: [
      "function faucet()public",
      "function buybox(uint num)public",
      "function powerup( )public",
      "function attup( )public",
      "function defup( )public",
      "function weaponup( )public",
      "function armoup( )public",
      "function depoup(address user,uint num)public",
      "function unbox(uint num)public",
      "function huntregi( )public",
      "function g1() public view virtual returns(uint256)",
      "function g2(address user) public view virtual returns(uint256)",
      "function g4() public view virtual returns(uint mybox,uint,uint,uint,uint,uint)",
      "function getatt(address user) public view returns(uint)",
      "function getdef(address user) public view returns(uint)",
      "function getweapon(address user) public view returns(uint)",
      "function getarmo(address user) public view returns(uint)",
      "function getpower(address user) public view returns(uint)",
      "function getbox(address user) public view returns(uint)",
      "function boxprice() public view returns(uint)" ,
      "function allowt(address user) public view returns(uint)"
    
      ],
      
     
  };

  let HSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, provider);
   
    let boxp =  await huntContract.boxprice();
    let cutbal =  await huntContract.g1();
    document.getElementById("Boxprice").innerHTML = (boxp);
    document.getElementById("Cutbal").innerHTML = (cutbal);
 
    
  };

  


  let Huntregi = async () => {
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

  let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);

    try {
      await huntContract.huntregi();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  let Faucet = async () => {
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

  let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);

    try {
      await huntContract.faucet();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  
 

  let Hlogin = async () => {
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
    let g4 = await huntContract.g4();
    let hsapp = g4[1];
    let hruby = g4[2];
    let heme = g4[3];
    let hwes = g4[4];
    let hars = g4[5];
  
   
    let mybox =  parseInt(await huntContract.getbox(await signer.getAddress()));
    let hgetpower = await huntContract.getpower(await signer.getAddress());
    let hgetatt =  await huntContract.getatt(await signer.getAddress());
    let hgetdef =  await huntContract.getdef(await signer.getAddress());
    let hgetweapon =  await huntContract.getweapon(await signer.getAddress());
    let hgetarmo =  await huntContract.getarmo(await signer.getAddress());
    let powerexp = (2**hgetpower);
    let attexp = (2**hgetatt);
    let defexp = (2**hgetdef);
    let wesexp = (2**hgetweapon);
    let arsexp = (2**hgetarmo);

   
    document.getElementById("Getpower").innerHTML = (hgetpower);
    document.getElementById("Getatt").innerHTML =(hgetatt);
    document.getElementById("Getdef").innerHTML = (hgetdef);
    document.getElementById("Getweapon").innerHTML = (hgetweapon);
    document.getElementById("Getarmo").innerHTML = (hgetarmo);
    document.getElementById("Powerbar").style.width = `${hsapp/powerexp*100}%`;
    document.getElementById("Attbar").style.width = `${hruby/attexp*100}%`;
    document.getElementById("Defbar").style.width = `${heme/defexp*100}%`;
    document.getElementById("Weaponbar").style.width = `${hwes/wesexp*100}%`;
    document.getElementById("Armobar").style.width = `${hars/arsexp*100}%`;
    
   
	let mmybox = document.querySelector("#Mybox");
	mmybox.innerText = mybox;

  let ssapp = document.querySelector("#Sapp");
	ssapp.innerText = hsapp;
  
  let rruby = document.querySelector("#Ruby");
	rruby.innerText = hruby;
  let eeme = document.querySelector("#Eme");
	eeme.innerText = heme;

  let wwes = document.querySelector("#Wes");
	wwes.innerText = hwes;

  let aars = document.querySelector("#Ars");
	aars.innerText = hars;


  let myt = parseInt(await huntContract.allowt(await signer.getAddress()));
  let time2 = parseInt(86400); 
  let nowt = Math.floor(new Date().getTime()/ 1000);
  let left = parseInt((myt + time2)- nowt );
  let day = parseInt(left/60/60/24);
  let hour = parseInt(left/3600)%24;
  let min = parseInt((left/60)%60);
  let sec = left%60;

  document.getElementById("Left").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
  };



  let Powerup = async () => {
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    

      
      try {
        await huntContract.powerup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }

  };

  let Attup = async () => {

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

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.attup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };

  let Defup = async () => {
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
      
      try {
        await huntContract.defup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Weaponup = async () => {
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
      
      try {
        await huntContract.weaponup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Armoup = async () => {
   
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
      
      try {
        await huntContract.armoup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };



  let Unbox = async () => {
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

    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
      
      try {
        await huntContract.unbox(document.getElementById('unboxnum').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };

  let Buybox = async () => {
   
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

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.buybox(document.getElementById('buyboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };



  

  (async () => {
    HSync();
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