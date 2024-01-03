 
      const contractAddress = {
        defiAddr: "0x2A73d3B5EDbe3bb4D2E72496b9C9927890186A49",
      };
      const contractAbi = {
    
        defi: [
          "function g1() public view virtual returns(uint256)",
          "function g2() public view returns(uint256)",
          "function time() public view returns(uint256)",
          "function g3() public view virtual returns(uint256)",
          "function g6() public view virtual returns(uint256)",
          "function g8() public view virtual returns(uint256)",
          "function get10() public  view returns (uint256)",
          "function get11() public view returns (uint256)",
          "function get12(address user) public view returns (uint256)",
          "function get13(address user) public view returns (uint256)",
          "function get14(address user) public view returns (uint256)",
          "function get15(address user) public view returns (uint256)",
          "function get16(address user) public view returns (uint256)",
          "function get17() public view returns (uint256)",
          "function get18() public view returns (uint256)",
          "function input(uint _pay)public",
          "function buycat(uint _num) public returns(bool)",
          "function sellcut(uint num)public returns(bool)",
          "function withdraw()public returns(bool)",
        ]
      };

      const topDataSync = async () => {
    
     
       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
     
       let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, provider);
       let defitime = await defiContract.time();
       let catsell = await defiContract.g1();
       let catbuy = await defiContract.g2();
       let defitvl = await defiContract.g6();
       let deficat = await defiContract.g8();
       let tprice = await defiContract.get10();
       let rate = await defiContract.get11(); 
       let yac = await defiContract.get17(); 
       let apr = await defiContract.get18()/100; 
       document.getElementById("Defitime").innerHTML=  (defitime/60/60/24);  //정산기간
       document.getElementById("Catsell").innerHTML=  parseFloat(catsell/1e18).toFixed(4);  //1CAT팔때 가격
       document.getElementById("Catbuy").innerHTML=  parseFloat(catbuy/1e18).toFixed(4);  //1CAT살때 가격
       document.getElementById("Defitvl").innerHTML=  parseFloat(defitvl/1e18).toFixed(4);  //defi cya잔고
       document.getElementById("Deficat").innerHTML=  (deficat) //defi cat잔고
       document.getElementById("Tprice").innerHTML=  parseFloat(tprice/1e18).toFixed(2);  //defi cat시가총액
       document.getElementById("Rate").innerHTML=  parseFloat(rate/100).toFixed(2);  //월 정산 이익율
       document.getElementById("Yac").innerHTML=  (yac); //년 정산횟수
       document.getElementById("Apr").innerHTML=  parseFloat(apr).toFixed(2); //년 이자율 apr
       document.getElementById("Apy").innerHTML=  parseFloat((rate)^yac).toFixed(2); //년 수익률 apy
     };
  

     let Input = async () => {
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
  
      let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, signer);
  
      try {
        await defiContract.input(document.getElementById('cyaAmount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  let defiLogin = async () => {
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
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let signer = userProvider.getSigner();
    let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, signer);
    let defiContract2 = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, provider);
    let mydepo = await(defiContract.get14(await signer.getAddress()));
    let myrate = await(defiContract.get15(await signer.getAddress()));
    let mybenefit = await(defiContract.get12(await signer.getAddress()));
   
    document.getElementById("Mydepo").innerHTML = parseFloat(mydepo/1e18).toFixed(4);;  //내 예치금
    document.getElementById("Myrate").innerHTML=  parseFloat(myrate/100).toFixed(2); //내 이율
    document.getElementById("Mybenefit").innerHTML = parseFloat(mybenefit/1e18).toFixed(4);;  //내 정산금액
    
 
    let day = parseInt(left/60/60/24);
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("Dtime").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
  };


  let Withdraw = async () => {
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

    let defiContract = new ethers.Contract(contractAddress.defiAddr, contractAbi.defi, signer);

    try {
      await defiContract.withdraw();
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