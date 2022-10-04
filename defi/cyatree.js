 // testnet
 let contractAddress = {
    cyatreeAddr: "0x4Ac4bf6971aC54bd6aa1ec0b943CBB4Fd0A65b67",
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9 "
  };
   let contractAbi = {
   
    cyatree: [
      "function automemberjoin()public",
      "function addautomento() public",
      "function memberjoin(address _mento )public",
      "function check() public",
      "function withdraw()public",
      "function jackpot() public",
      "function g1() public view virtual returns(uint256)",
      "function g2() public view returns(uint256 depo,uint256 dep,uint256 mynum,uint8 wc,uint256 tiket)",
      "function mentolength() public view returns(uint)",
      "function getsum() public view returns(uint)",
      "function thistimepoint() public view returns(uint)",  //이번 수확할 가치
      "function happy() public view returns(uint)",
      "function lastman() public view returns(address)",
      "function getsum( ) public view returns(uint)",
      "function jt() public view returns(uint)" //잭팟 시간
    ],


    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],

    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)",
      "function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)",
      "function balanceOf(address tokenOwner) public override view returns (uint256)"
    ],
  };
  
  
  let tDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr,contractAbi.cyatree,provider);
    //계약잔고
    let treebal = await cyatreeContract.g1();
    //누적 기여자 수
    let treesum = await cyatreeContract.getsum();
    //생명열매 시세
    const thappy = await cyatreeContract.happy();
    //라스트맨
    let tlastman = await cyatreeContract.lastman();
    let tmento = await cyatreeContract.mentolength();
     // 남아있는 생명의 시간
    let g2 = parseInt(await cyatreeContract.jt());
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((g2 + 86400 ) - nowt); 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
   
    document.getElementById("last").innerHTML = left > 0 ? `${day}:${hour}:${min}:${sec}` : '0일0시0분0초';
    document.getElementById("ttvl").innerHTML = (treebal/1e18).toFixed(6);
    document.getElementById("tsum").innerHTML = parseInt(treesum);
    document.getElementById("happy").innerHTML = (thappy/1e18).toFixed(6);
    document.getElementById("lastman").innerHTML = (tlastman);
    document.getElementById("Tmento").innerHTML = parseInt(tmento);
   
  };

   let Tjackpot = async () => {
   
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
      const signer = userProvider.getSigner();
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr,contractAbi.cyatree,signer);
      
      try {
        await cyatreeContract.jackpot();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };

    let Tmentoup = async () => {
   
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
      const signer = userProvider.getSigner();
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr,contractAbi.cyatree,signer);
      
      try {
        await cyatreeContract.addautomento();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };


    
    let Tautomemberjoin = async () => {   //자동회원가입
   
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
      const signer = userProvider.getSigner();
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr,contractAbi.cyatree,signer);
      
      try {
        await cyatreeContract.automemberjoin();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
    let Tmemberjoin = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);

      try {
        await cyatreeContract.memberjoin(document.getElementById('tmento').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };

     let TmemberLogin = async () => { 
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
      let thishappy = await cyatreeContract.thistimepoint();
      let g2 = await cyatreeContract.g2();
      let sum = await cyatreeContract.getsum();
      document.getElementById("thappy").innerHTML=(thishappy/1e18).toFixed(6);  //이번 수확예정 열매가치
      document.getElementById("needtiket").innerHTML = (g2.dep*10); //이번 수확에 필요한 에너지
      document.getElementById("mytiket").innerHTML =  (g2.tiket*10); //나의 에너지
      document.getElementById("mywc").innerHTML =  (15-g2.wc); //남아 있는 CYA Token인출 티켓
      document.getElementById("tdep").innerHTML =  (g2.dep); //나의 깊이
      document.getElementById("tmynum").innerHTML =  (g2.mynum); //나의 깊이
      document.getElementById("Tjack").innerHTML =  (g2.depo/1e18).toFixed(6); //현재 인출가능 CYA Token
      document.getElementById("RipeBar").style.width = `${(sum -g2.mynum)/g2.dep*100}%`; 
    
    };  
 
    let Tcheck = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
    
    
      try {
        await cyatreeContract.check();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };

    let Twithdraw = async () => {
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
      let cyatreeContract = new ethers.Contract(contractAddress.cyatreeAddr, contractAbi.cyatree, signer);
    
    
      try {
        await cyatreeContract.withdraw();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };


  (async () => {
  tDataSync();
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
  
  let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, userProvider);
  
  let selectElement = document.getElementById('bnbInput');
  let selectElement2 = document.getElementById('cyaInput');
  
  selectElement.addEventListener('change', async (event) => {
    if (event.target.value < 0.001) {
      alert("now enough value");
    } else {
      document.getElementById('bnbOutput').value=event.target.value*parseFloat(await cyadexContract.getprice())/1000
    }
  });
  selectElement2.addEventListener('change', async (event) => {
    document.getElementById('cyaOutput').value=event.target.value/parseFloat(await cyadexContract.getprice())*980
  })
  })();
  
  
  