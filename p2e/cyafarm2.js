 
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
  
 
     //1번농장
   
     let Depo = await cyafarmContract.allportinfo(1);
     let period  = await cyafarmContract.getperiod(1);
     let value = await cyafarmContract.getvalue(1);
   
     document.getElementById("portdepo").innerHTML = (Depo.depo / 1e18).toFixed(6);
     document.getElementById("portdepon").innerHTML = (Depo.depon);
     document.getElementById("portowner").innerHTML = (Depo.owner);
     document.getElementById("porttime").innerHTML = (period);
     document.getElementById("portvalue").innerHTML = (value / 1e18).toFixed(6);
   
   
     //3번농장
     let depo3 = await cyafarmContract.allportinfo(3);
     let period3 = await cyafarmContract.getperiod(3);
     let value3 = await cyafarmContract.getvalue(3);
   
     document.getElementById("portdepo3").innerHTML = (depo3.depo / 1e18).toFixed(6);
     document.getElementById("portdepon3").innerHTML = (depo3.depon);
     document.getElementById("portowner3").innerHTML = (depo3.owner);
     document.getElementById("porttime3").innerHTML = (period3);
     document.getElementById("portvalue3").innerHTML = (value3 / 1e18).toFixed(6);
   
     //4번농장
     let depo4 = await cyafarmContract.allportinfo(4);
     let period4 = await cyafarmContract.getperiod(4);
     let value4 = await cyafarmContract.getvalue(4);
   
     document.getElementById("portdepo4").innerHTML = (depo4.depo / 1e18).toFixed(6);
     document.getElementById("portdepon4").innerHTML = (depo4.depon);
     document.getElementById("portowner4").innerHTML = (depo4.owner);
     document.getElementById("porttime4").innerHTML = (period4);
     document.getElementById("portvalue4").innerHTML = (value4 / 1e18).toFixed(6);
   
     //5번농장
     let depo5 = await cyafarmContract.allportinfo(5);
     let period5 = await cyafarmContract.getperiod(5);
     let value5 = await cyafarmContract.getvalue(5);
   
     document.getElementById("portdepo5").innerHTML = (depo5.depo / 1e18).toFixed(6);
     document.getElementById("portdepon5").innerHTML = (depo5.depon);
     document.getElementById("portowner5").innerHTML = (depo5.owner);
     document.getElementById("porttime5").innerHTML = (period5);
     document.getElementById("portvalue5").innerHTML = (value5 / 1e18).toFixed(6);
   
     //6번농장
     let depo6 = await cyafarmContract.allportinfo(6);
     let period6 = await cyafarmContract.getperiod(6);
     let value6 = await cyafarmContract.getvalue(6);
   
     document.getElementById("portdepo6").innerHTML = (depo6.depo / 1e18).toFixed(6);
     document.getElementById("portdepon6").innerHTML = (depo6.depon);
     document.getElementById("portowner6").innerHTML = (depo6.owner);
     document.getElementById("porttime6").innerHTML = (period6);
     document.getElementById("portvalue6").innerHTML = (value6 / 1e18).toFixed(6);
    
     //8번농장
     let depo8 = await cyafarmContract.allportinfo(8);
     let period8 = await cyafarmContract.getperiod(8);
     let value8 = await cyafarmContract.getvalue(8);
   
     document.getElementById("portdepo8").innerHTML = (depo8.depo / 1e18).toFixed(6);
     document.getElementById("portdepon8").innerHTML = (depo8.depon);
     document.getElementById("portowner8").innerHTML = (depo8.owner);
     document.getElementById("porttime8").innerHTML = (period8);
     document.getElementById("portvalue8").innerHTML = (value8 / 1e18).toFixed(6);
   
   
     //10번농장
     let depo10 = await cyafarmContract.allportinfo(10);
     let period10 = await cyafarmContract.getperiod(10);
     let value10 = await cyafarmContract.getvalue(10) / 1e18;
   
     document.getElementById("portdepo10").innerHTML = (depo10.depo / 1e18).toFixed(6);
     document.getElementById("portdepon10").innerHTML = (depo10.depon);
     document.getElementById("portowner10").innerHTML = (depo10.owner);
     document.getElementById("porttime10").innerHTML = (period10);
     document.getElementById("portvalue10").innerHTML = (value10).toFixed(6);
   
     //11번농장
     let depo11 = await cyafarmContract.allportinfo(11);
     let period11 = await cyafarmContract.getperiod(11);
     let value11 = await cyafarmContract.getvalue(11);
   
     document.getElementById("portdepo11").innerHTML = (depo11.depo / 1e18).toFixed(6);
     document.getElementById("portdepon11").innerHTML = (depo11.depon);
     document.getElementById("portowner11").innerHTML = (depo11.owner);
     document.getElementById("porttime11").innerHTML = (period11);
     document.getElementById("portvalue11").innerHTML = (value11 / 1e18).toFixed(6);
    
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
  
  
  