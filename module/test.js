 // testnet
 let contractAddress = {
    cyafarmAddr: "0x6686C2298A8cDe6eACC975da5E2316641f934854",

  };
   let contractAbi = {
  
    cyafarm: [
      "function seeding(uint256 pay) public",
      "function withdraw( )public",
      "function g1( ) public view virtual returns(uint256)",
      "function pllength( ) public view returns(uint)",
      "function getpl(uint num) public view returns(uint)",
      "function allportinfo(uint num) public view returns(uint depo,uint depon,uint portn,address owner,uint start)",
      "function getperiod(uint num) public view returns(uint)",
      "function getvalue(uint num) public view returns(uint)",
      "function getmywin( ) public view returns(uint) ",
      "function getmydepo( ) public view returns(uint)",
      "function getmyseedmoney( ) public view returns(uint)",
      "function getmyfarm(uint num) public view returns(uint) ",
      "function getmygain( ) public view returns(uint)",
      "function getmyjack( ) public view returns(uint)", 
      "function remain( ) public view returns(uint256)"
    ],
   
  };
  
  
  const topDataSync = async () => {
    // ethers setup
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr,contractAbi.cyafarm,provider);
    //농장개수
    const fsum = await cyafarmContract.remain();
    //농장생성순서
    const creatnum = await cyafarmContract.pllength();
    //계약잔고
    const fcyabal = await cyafarmContract.g1();
   
    document.getElementById("farmtotal").innerHTML = (fsum);
    document.getElementById("farmnum").innerHTML = (creatnum);
    document.getElementById("fcyatvl").innerHTML = (fcyabal/1e18).toFixed(6);
    document.getElementById("fcyatvl100").innerHTML = (fcyabal/1e20).toFixed(6);
    document.getElementById("fcyatvl1000").innerHTML = (fcyabal/1e21).toFixed(6);
  
  };
  
  let fwithdraw = async () => {  //해결완료  에러메세지 작동함
    const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
  
    const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  
    try {
      await cyafarmContract.withdraw();
    } catch(e) {  
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  
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
    let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    let mydepo = await cyafarmContract.getmydepo();
    let mygain = await cyafarmContract.getmygain();
    let mywin = await cyafarmContract.getmywin();
    let myseed = await cyafarmContract.getmyseedmoney();
    let myjack = await cyafarmContract.getmyjack(); 

    document.getElementById("farmdepo").innerHTML=(mydepo/1e18).toFixed(6);  //예치금 총액
    document.getElementById("farmgain").innerHTML = (mygain/1e18).toFixed(6); //순이익 총액
    document.getElementById("farmwin").innerHTML = (mywin/1e18).toFixed(6); //인출 총액
    document.getElementById("farmseed").innerHTML = (myseed/1e18).toFixed(6); //남아있는 예치금
    document.getElementById("farmjack").innerHTML = (myjack/1e18).toFixed(6); //찾을 돈
    document.getElementById("myfarms").innerHTML = (item);
    
    let farmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    let  item= await farmContract.getmyfarm(6); 
  
  };
  
  let myLogin = async () => {
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
    let myfarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    

    let  item= await myfarmContract.getmyfarm(6); 
    let farms = [];
    if(item ===6){farms.push(item)};
    
    let newstring = farms.join(",")
    document.getElementById("myfarms").innerHTML = (newstring);

    //for(i=1; i<13; i++){
    //  if (myfarmContract.getmyfarm(6) === 6 )
    //   {farms.push(6)}
    //    // }
    // if(myfarmContract.getmyfarm(6) ===6) {
    //     return (6);
  
    // let newstring = farms.join(",")
   
    // document.getElementById("myfarms").innerHTML = (newstring)
    
   
    // //else if(cyafarmContract.getmyfarm(2) === 2 ){farms.push(2)}
   
    // let newstring = farms.join(",");
  
    // document.getElementById("myfarms").innerHTML = (item);
    
    // let farmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    // let  item= await farmContract.getmyfarm(6); 
   
    // for(i=1; i<13; i++){
    // if (cyafarmContract.getmyfarm(i) === i ){farms.push(i)}
    // }
    // //else if(cyafarmContract.getmyfarm(2) === 2 ){farms.push(2)}
    
    // let newstring = farms.join(",");
   
  };
  
  
  
  let buyfarm = async () => {
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
    let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    let amount = ethers.utils.parseUnits(document.getElementById('seed').value, 18);  //입력금액을 인자로 하여 시딩함.
  
    try {
      await cyafarmContract.seeding(amount);
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
  
  
  