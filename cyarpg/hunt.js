let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    huntAddr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6"
  };
  let contractAbi = {
  
    hunt: [
      
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_cya",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_cyacoop",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_custallow",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "jeweltype",
              "type": "uint256"
            }
          ],
          "name": "reward",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "armoup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "attup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "boxdown",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "boxprice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "bp",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "buybox",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_answer",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_level",
              "type": "uint256"
            }
          ],
          "name": "creat",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_custallow",
              "type": "address"
            }
          ],
          "name": "custallowup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "defup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "depoup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_family",
              "type": "address"
            }
          ],
          "name": "faup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "g1",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "g2",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "winner",
              "type": "address[]"
            },
            {
              "internalType": "uint256",
              "name": "box",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "g3",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "g4",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "depo",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sapp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ruby",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "eme",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "wes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ars",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "g5",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tid",
              "type": "uint256"
            }
          ],
          "name": "g6",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getarmo",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getatt",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getbox",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getdef",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getpower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getweapon",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tid",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_answer",
              "type": "string"
            }
          ],
          "name": "hunting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "myinfo",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "depo",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "mybox",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "att",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "def",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weapon",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "armo",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "power",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sapp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ruby",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "eme",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "wes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ars",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "mytresure",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "powerup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "sellbox",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "sp",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_staff",
              "type": "address"
            },
            {
              "internalType": "uint8",
              "name": "_num",
              "type": "uint8"
            }
          ],
          "name": "staffup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tax",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tid",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "ts",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "level",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "box",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "unbox",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "weaponup",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "winners",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      
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
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, provider);
    let htvl = await huntContract.g1();
    let boxp =  await huntContract.boxprice();
    let hwin =  await huntContract.winners();
    document.getElementById("Boxprice").innerHTML = (boxp/1e18).toFixed(6);
    document.getElementById("Winners").innerHTML = (hwin);
    document.getElementById("Htvl").innerHTML = (htvl/1e18).toFixed(6);
   
  };

  

  let Hlogin = async () => {
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
    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);
    let g4 = await huntContract.g4();
    let hsapp = g4.sapp;
    let hruby = g4.ruby;
    let heme = g4.eme;
    let hwes = g4.wes;
    let hars = g4.ars;
    
    const mybox = (await huntContract.getbox(await signer.getAddress()));
    

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
    document.getElementById("Mybox").innnerHTML = (mybox);  
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
    
    
   

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop,signer);
    let g2 = await cyacoopContract.g2();
    let mylevel = g2.level;
    let myexp = g2.exp;
    let levelexp = (2**g2.level)*10000;
    let mybooster = g2.booster;
     
    // level
    document.getElementById("Level").innerHTML = (mylevel);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다.
    document.getElementById("Exp").innerHTML = parseInt(myexp);
    document.getElementById("Expneeded").innerHTML = parseInt(levelexp - myexp);
    document.getElementById("Mybooster").innerHTML = parseInt(mybooster);
    
    document.getElementById("Ruby").innnerHTML = parseInt(hruby); 
    document.getElementById("Eme").innnerHTML =  parseInt(heme); 
    document.getElementById("Wes").innnerHTML =  parseInt(hwes); 
    document.getElementById("Ars").innnerHTML =  parseInt(hars);
    document.getElementById("Sapp").innnerHTML = parseInt(hsapp); 

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
      let tid = document.getElementById('Tid').value;
      let answer = document.getElementById('Answer').value;
    
      try {
        await huntContract.hunting(tid-1,answer);
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