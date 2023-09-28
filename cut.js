 
      const contractAddress = {
        cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
        cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",   
        cyabankAddr:"0xE823F9d04faF94a570409DC0076580ba74820B4c",
        erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",
        cut: "0xE3Db99b8fBd7154201eA7F6326390787d1c53614",
      };
      const contractAbi = {
        cyadex: [
          "function getprice() public view returns(uint256)",
          "function balance() public view returns(uint256)",
          "function cyabalances() public view returns(uint256)",
          "function buy() payable public",
          "function sell(uint256 num) public"
        ],
        cyamem: [
          "function sum() public view returns(uint256)",
          "function catbal() public view returns(uint256)"
        ],

        cyabank: [
          "function g1() public view virtual returns(uint256)",
          "function price() public view returns(uint256)",
          "function g6() public view virtual returns",
          "function g7() public view virtual returns(uint256)",
          "function g8(address user) public view virtual returns(uint256)",
          "function g10() public view virtual returns(uint256)",
          "function allow() public view returns(uint256)",
          "function allowt() public view returns(uint256)",
          "function g11() public view virtual returns(uint256)",
          "function geteps(address user) external view returns (uint256)",
          "function gettime( ) external view returns (uint256)",
          "function getcat(address user) public view virtual returns(uint256)",
          "function withdraw( )public returns(bool)",
          "function buycut(uint _num) public returns(bool)",
          "function sellcut(uint num)public returns(bool)",
          "function g9(address user) public view virtual returns(uint256)"
        ],
        erc20: [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)"
        ],
        cut: [
          "function getdepot(address user) external view returns (uint256)"
        ]
      };

      const topDataSync = async () => {

         // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
document.getElementById("cPrice").innerHTML=(bnbPrice/1000).toFixed(4);


        
        let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, provider);
      
        
        const cyadexPrice = await cyadexContract.getprice();
        let dexBal = await cyadexContract.balance();
        let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, provider);
        let mems = await cyamemContract.sum();
        let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, provider);
        let allows = await cyabankContract.allow();
        let cyabankPrice = await cyabankContract.price();
        let cyatvl = await cyabankContract.g1();  //cya 보유량
        let cutcir = await cyabankContract.g11();  //cut유통량
       
        document.getElementById("cyaPrice2").innerHTML=  parseFloat(1000/cyadexPrice).toFixed(3);
        document.getElementById("tvl").innerHTML=  parseFloat(dexBal/1e18).toFixed(3);  //안전금고 잔고 합사
        document.getElementById("cyaCir").innerHTML = (cutcir);
        document.getElementById("cyaCir2").innerHTML = (cutcir);
        document.getElementById("mem").innerHTML = parseInt(mems);
        document.getElementById("cutPrice").innerHTML=(cyabankPrice/1e18).toFixed(6);
        document.getElementById("cutPrice2").innerHTML=(cyabankPrice/1e18).toFixed(6);
        document.getElementById("allocation").innerHTML=(allows/1e18).toFixed(6);
        document.getElementById("marketCap").innerHTML=((cyabankPrice/1e18)*cutcir).toFixed(3);
        document.getElementById("Cyabal").innerHTML = (cyatvl/1e18).toFixed(3);

       
      };


      
      const addTokenCut = async () => {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: "0xE3Db99b8fBd7154201eA7F6326390787d1c53614",
              symbol: "CUT",
              decimals: 0, 
              // image: tokenImage,
            },
          },
        });
      }

      const addTokenCat = async () => {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: "0xA33A68441cCE5133D23887172161d57C73be30ea",
              symbol: "CAT",
              decimals: 0, 
              // image: tokenImage,
            },
          },
        });
      }
  let cutmemberLogin = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "204",
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
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3');
    let signer = userProvider.getSigner();
    let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, signer);
    let cyabankContract2 = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank,provider);
    let bankprice = await cyabankContract2.price();
    let mycut = parseInt(await cyabankContract.g8(await signer.getAddress()));
    let mypower = parseInt(await cyabankContract.g9(await signer.getAddress()));
    let mycat = parseInt(await cyabankContract.getcat(await signer.getAddress()));
  
  
    document.getElementById("myCut").innerHTML = (mycut).toFixed(0);
    document.getElementById("myCutvalue").innerHTML = (mycut*(bankprice/1e18)).toFixed(6);
    document.getElementById("myPower").innerHTML = (mypower);
    document.getElementById("myCat").innerHTML = (mycat);
   // document.getElementById("eps").innerHTML = parseFloat(ethers.utils.formatUnits(await cyabankContract.geteps(await signer.getAddress()), 18)).toFixed(18);

    let left = parseInt(await cyabankContract.gettime());
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;

    document.getElementById("epsLeftTime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
  };


  let withdraw = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"],
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

    let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, signer);

    try {
      await cyabankContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Powerup = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5"],
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

    let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, signer);

    try {
      await cyabankContract.powerup(document.getElementById('catAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Buycut = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5"],
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

    let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, signer);

    try {
      await cyabankContract.buycut(document.getElementById('buyAmount').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let sellCut = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet.nodereal.io/v1/3dc8527e1718485b86dd869bd840f562"],
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

    let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, signer);

    try {
      await cyabankContract.sellcut(document.getElementById('sellAmount').value);
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