let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    huntAddr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6"
  };
  let contractAbi = {
  
    hunt: [
        "function creat(string memory _answer,uint _level)public",
        "function hunting(uint _tid,string memory _answer)public",
        "function buybox(uint num)public",
        "function sellbox(uint num)public",
        "function huntregi( )public",
        "function powerup( )public",
        "function attup( )public",
        "function defup( )public",
        "function weaponup( )public",
        "function armoup( )public",
        "function unbox(uint num)public",
        "function g1() public view virtual returns(uint256)",
        "function g2(uint256 _id) public view returns(uint,uint256,address[]memory winner,uint box)",
        "function g4()public view returns(uint depo,uint sapp,uint ruby,uint eme,uint wes,uint ars)",
        "function getatt(address user) public view returns(uint)",
        "function getdef(address user) public view returns(uint)",
        "function getweapon(address user) public view returns(uint)",
        "function getarmo(address user) public view returns(uint)",
        "function getpower(address user) public view returns(uint)",
        "function getbox(address user) public view returns(uint)",
        "function boxprice() public view returns(uint256)",
        "function winners() public view returns(uint256)"
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

  let HtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, provider);
    let hboxprice = await huntContract.boxprice();
    let hwinners = await huntContract.winners();
    let htvl = await huntContract.g1();


    document.getElementById("Boxprice").innerHTML = (hboxprice/1e18).toFixed(6);
    document.getElementById("Winners").innerHTML = (hwinners);
    document.getElementById("Tvl").innerHTML = (htvl/1e18).toFixed(6);

  };

  let Login = async () => {
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
    let g4 = await huntContract.g4();
    let hsapp = g4.sapp;
    let hruby = g4.ruby;
    let heme = g4.eme;
    let hwes = g4.wes;
    let hars = g4.ars;
    
    let hgetbox =  await huntContract.getbox(await signer.getAddress());
    let hgetpower =  await huntContract.getpower(await signer.getAddress());
    let hgetatt =  await huntContract.getatt(await signer.getAddress());
    let hgetdef =  await huntContract.getdef(await signer.getAddress());
    let hgetweapon =  await huntContract.getweapon(await signer.getAddress());
    let hgetarmo =  await huntContract.getarmo(await signer.getAddress());

    let powerexp = (2**hgetpower);
    let attexp = (2**hgetatt);
    let defexp = (2**hgetdef);
    let wesexp = (2**hgetweapon);
    let arsexp = (2**hgetarmo);

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);
    let g2 = await cyacoopContract.g2();
    let mylevel = g2.level;
    let myexp = g2.exp;
    let levelexp = (2**g2.level)*10000;
    let mybooster = g2.booster;
  
    document.getElementById("Getbox").innerHTML = (hgetbox);
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
    document.getElementById("Sapp").innnerHTML =  (hsapp); 
    document.getElementById("Ruby").innnerHTML = (hruby); 
    document.getElementById("Eme").innnerHTML =  (heme); 
    document.getElementById("Wes").innnerHTML =  (hwes); 
    document.getElementById("Ars").innnerHTML =  (hars); 
    //jewel  
   

    // level
    document.getElementById("Level").innerHTML = (mylevel);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다.
    document.getElementById("Exp").innerHTML = parseInt(myexp);
    document.getElementById("Expneeded").innerHTML = parseInt(levelexp - myexp);
    document.getElementById("Mybooster").innerHTML = parseInt(mybooster);

   
  };




  let levelUp = async () => {
    if (document.getElementById("Level").value !== '-') {
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
        await cyacoopContract.levelup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };


  let Powerup = async () => {
    if (document.getElementById("Getpower").value !== '-') {
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
        await huntContract.powerup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };

  let Attup = async () => {
    if (document.getElementById("Getatt").value !== '-') {
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
        await huntContract.attup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };

  let Defup = async () => {
    if (document.getElementById("Getdef").value !== '-') {
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
        await huntContract.defup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };


  let Weaponup = async () => {
    if (document.getElementById("Getweapon").value !== '-') {
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
        await huntContract.weaponup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };


  let Armoup = async () => {
    if (document.getElementById("Getarmo").value !== '-') {
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
        await huntContract.armoup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };



  let Unbox = async () => {
    if (document.getElementById("Getpower").value !== '-') {
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
        await huntContract.unbox(document.getElementById('unboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };

  let Buybox = async () => {
    if (document.getElementById("Getbox").value !== '-') {
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
    }
  };


  let Sellbox = async () => {
    if (document.getElementById("Getbox").value !== '-') {
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
        await huntContract.sellbox(document.getElementById('sellboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };


  let Hunting = async () => {
    if (document.getElementById("Answer").value !== 'null') {
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
      // let tid = document.getElementById("0").value;
      try {
        await huntContract.hunting(0,document.getElementById("Answer"));
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
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