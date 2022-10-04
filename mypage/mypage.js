let contractAddress = {
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    catAddr: "0xE9f81b32E6cEca07819806B827AEA1C71C53d257"
  };
  let contractAbi = {
    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
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
    ],
    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    cat: [
      "function getdepot(address user) external view returns (uint256)"
    ]
  };

  let topDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, provider);

  
    // total mentor
    document.getElementById("totalMentor").innerHTML = await cyacoopContract.mentolength();
  };

  let signupGuild = async () => {
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

    // Approve
    let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
    if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < ethers.utils.parseUnits("0.05", 18)) {
      await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
    }

    await cyacoopContract.memberjoin(document.getElementById('mentorNumInput').value);
  }

  let autoSignupGuild = async () => {
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

    // Approve
    let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
    if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < ethers.utils.parseUnits("0.05", 18)) {
      await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
    }

    await cyacoopContract.automemberjoin();
  }

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

    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);
    let catContract = new ethers.Contract(contractAddress.catAddr, contractAbi.cat, signer);
    
    // g2
    let g2 = await cyacoopContract.g2();
    let mylevel = g2.level;
    let myexp = g2.exp;
    let levelexp = (2**g2.level)*10000;

    // level
    document.getElementById("level").innerHTML = (mylevel);
    document.getElementById("levelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다.
    document.getElementById("exp").innerHTML = parseInt(myexp);
    document.getElementById("expneeded").innerHTML = parseInt(levelexp - myexp);

    // myBooster
    document.getElementById("myBooster").innerHTML = g2.booster;
  };

  let levelUp = async () => {
    if (document.getElementById("level").value !== '-') {
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

  let withdraw = async () => {
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
      await cyacoopContract.withdraw();
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

    // Approve
    let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
    if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < 5e17) {
      await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
    }

    try {
      await cyacoopContract.addmento();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let buyBooster = async () => {
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

    // Approve
    let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
    if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < ethers.utils.parseUnits("0.1", 18)) {
      await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
    }

    await cyacoopContract.buybooster();
  };

  let buyCat = async () => {
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
      await cyacoopContract.buycat(document.getElementById('buyAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let sellCat = async () => {
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
      await cyacoopContract.sellcat(document.getElementById('sellAmount').value);
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
  })();