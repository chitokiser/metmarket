 
 let contractAddress = {
    cyafarmAddr: "0x6686C2298A8cDe6eACC975da5E2316641f934854"
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

  
  
    //12번농장
     let depo12 = await cyafarmContract.allportinfo(12);
     let period12 = await cyafarmContract.getperiod(12);
     let value12 = await cyafarmContract.getvalue(12);
   
     document.getElementById("portdepo12").innerHTML = (depo12.depo / 1e18).toFixed(6);
     document.getElementById("portdepon12").innerHTML = (depo12.depon);
     document.getElementById("portowner12").innerHTML = (depo12.owner);
     document.getElementById("porttime12").innerHTML = (period12);
     document.getElementById("portvalue12").innerHTML = (value12 / 1e18).toFixed(6);

       //2번농장
       let depo2 = await cyafarmContract.allportinfo(2);
       let period2 = await cyafarmContract.getperiod(2);
       let value2 = await cyafarmContract.getvalue(2);
     
       document.getElementById("portdepo2").innerHTML = (depo2.depo / 1e18).toFixed(6);
       document.getElementById("portdepon2").innerHTML = (depo2.depon);
       document.getElementById("portowner2").innerHTML = (depo2.owner);
       document.getElementById("porttime2").innerHTML = (period2);
       document.getElementById("portvalue2").innerHTML = (value2 / 1e18).toFixed(6);

        //7번농장
     let depo7 = await cyafarmContract.allportinfo(7);
     let period7 = await cyafarmContract.getperiod(7);
     let value7 = await cyafarmContract.getvalue(7);
   
     document.getElementById("portdepo7").innerHTML = (depo7.depo / 1e18).toFixed(6);
     document.getElementById("portdepon7").innerHTML = (depo7.depon);
     document.getElementById("portowner7").innerHTML = (depo7.owner);
     document.getElementById("porttime7").innerHTML = (period7);
     document.getElementById("portvalue7").innerHTML = (value7 / 1e18).toFixed(6);
    
   
  };
  

  
  (async () => {
  topDataSync();
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
  
  const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, userProvider);
  
  const selectElement = document.getElementById('bnbInput');
  const selectElement2 = document.getElementById('cyaInput');
  
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
  
  
  