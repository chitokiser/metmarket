let contractAddress = {

    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    metahuntAddr: "0x22A58D3f1280A24c06Ec585DbacF6345d4cd64ee"
    
  };
  let contractAbi = {
    metahunt: [
      "function creat(string memory _answer,uint _level)public",
      "function hunting(uint _tid,string memory _answer)public",
      "function withdraw( )public",
      "function boxpriceup(uint _price)public",
      "function buybox(uint num)public",
      "function depoup(uint num)public ",
      "function unbox(uint num)public",
      "function g1() public view virtual returns(uint256)",
      "function g2(uint256 _id) public view returns(uint,uint256,address[]memory winner,uint box)",
      "function g3(address user) public view virtual returns(uint256)",
      "function g4() public view virtual returns(uint depo,uint,uint,uint,uint,uint)",
      "function g5(address user) public view returns(uint)",
      "function box(uint id) public view returns(uint)",
      "function getbox(address user) public view returns(uint)"
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
      "function boosting() public",
      "function buycat(uint _num) public returns(bool)",
      "function sellcat(uint num) public returns(bool)"
    ],
 
  };

  let MtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, provider);
    
    // total mentor
    document.getElementById("totalMentor").innerHTML = await cyacoopContract.mentolength();
  };



  let Aguild = async () => {
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
      await cyacoopContract.automemberjoin();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
    


  let Munbox = async () => {
    
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

    let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, signer);
    
    try {
      await metahuntContract.unbox(document.getElementById('Unbox').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
};


 


  let Mlogin = async () => {
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
    

    
    let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr,contractAbi.metahunt,signer);    
    let g4 = await metahuntContract.g4();
    let mydepo = g4.depo;
   

    let mmydepo = document.querySelector("#Mydepo");
    mmydepo.innerText = mydepo;
    
    let gold = g4[1];
    let silver = g4[2];
    let peral = g4[3];
    let pla = g4[4];
    let opal = g4[5];
    let mgold = document.querySelector("#Gold");
    mgold.innerText = gold;
    let msilver = document.querySelector("#Silver");
    msilver.innerText = silver;
    let mperal = document.querySelector("#Peral");
    mperal.innerText = peral;
    let mpla = document.querySelector("#Pla");
    mpla.innerText = pla;
    let mopal = document.querySelector("#Opal");
    mopal.innerText = opal;
    let mybox =  parseInt(await metahuntContract.getbox(await signer.getAddress()));
    let mmybox = document.querySelector("#Mybox");
    mmybox.innerText = mybox;

   
  };




  let levelUp = async () => {
   {
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

  
  let Depoup = async () => {
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

    let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, signer);
    let jewel = document.getElementById('jewel').value;
    try {
      await metahuntContract.depoup(jewel);
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
    let metahuntContract = new ethers.Contract(contractAddress.metahuntAddr, contractAbi.metahunt, signer);
    
    try {
      await metahuntContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let addMento = async () => {
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
      await cyacoopContract.addmento();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Buybooster = async () => {
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
      await cyacoopContract.boosting();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  
  };

  let Addcya = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
          symbol: "CYA",
          decimals: 18, 
          // image: tokenImage,
        },
      },
    });
  }

  let Addmetato = async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0xa2d18FEFA4f67C4F7531F3C29A76b9680915b380",
          symbol: "MTT",
          decimals: 0, 
          // image: tokenImage,
        },
      },
    });
  }
    

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