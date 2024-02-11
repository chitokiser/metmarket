 
      const contractAddress = {
            cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
            cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",   
            cyabankAddr:"0xE823F9d04faF94a570409DC0076580ba74820B4c",
            erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748"
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
              "function g10() public view virtual returns(uint256)",
              "function allow() public view returns(uint256)",
              "function g11() public view virtual returns(uint256)"
            ],
            erc20: [
              "function approve(address spender, uint256 amount) external returns (bool)",
              "function allowance(address owner, address spender) external view returns (uint256)"
            ]
          };
    
          const topDataSync = async () => {
    
             // BNB Price
  const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
  const bnbPrice = parseFloat(responseBinanceTicker.data.price);
  document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
  document.getElementById("cPrice").innerHTML=(bnbPrice).toFixed(4);
  document.getElementById("cPrice2").innerHTML=(1/bnbPrice).toFixed(4);

    
            // ethers setup
            let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
            let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, provider);
          
            
            let cyadexPrice = await cyadexContract.getprice();
            let dexBal = await cyadexContract.balance();
            let cyamemContract = new ethers.Contract(contractAddress.cyamemAddr, contractAbi.cyamem, provider);
            let mems = await cyamemContract.sum();
            let cyabankContract = new ethers.Contract(contractAddress.cyabankAddr, contractAbi.cyabank, provider);
            let allows = await cyabankContract.allow();
            let cutprice = await cyabankContract.price();
            let cyatvl = await cyabankContract.g1();  //cya 보유량
            let cutcir = await cyabankContract.g11();  //cut유통량
            let eps = (allows)*(10/2000);  //1cut당 1회 배당엑 레벨10기준
            let per = (cutprice/(eps*52));
            
            document.getElementById("tvl").innerHTML=  parseFloat(dexBal/1e18).toFixed(4);  //안전금고 잔고 합산
            document.getElementById("cyaCir").innerHTML = (cutcir);
            document.getElementById("mem").innerHTML = parseInt(mems);
            document.getElementById("cutPrice").innerHTML=(cutprice/1e18).toFixed(4);
            document.getElementById("Eps").innerHTML= (eps/1e18).toFixed(6);
            document.getElementById("Per").innerHTML=  (per).toFixed(4);
          
           
           
          };
       
          const addTokenCya = async () => {
            await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",
                  symbol: "CYA",
                  decimals: 18, 
                  // image: tokenImage,
                },
              },
            });
          }
    

       
   
  
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
          
          