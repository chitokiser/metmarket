
        const contractAddress = {
            cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
            cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
            erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9"
          };
          const contractAbi = {
            cyadex: [
              "function getprice() public view returns(uint256)",
              "function balance() public view returns(uint256)",
              "function buy() payable public",
              "function getshoper() public view returns(uint256)",
              "function sell(uint256 num) public"
            ],
            cyacoop: [
              "function getprice() public view returns(uint256)",
              "function allow() public view returns(uint256)",
              "function sum() public view returns(uint256)",
              "function g1() public view returns(uint256)"
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
            document.getElementById("cyaPrice").innerHTML=(bnbPrice/1000).toFixed(4);
    
            // ethers setup
            const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
            const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, provider);
            const cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, provider);
    
            const cyadexPrice = await cyadexContract.getprice();
            const cyacoopPrice = await cyacoopContract.getprice();
            const allows = await cyacoopContract.allow();
            const members = await cyacoopContract.sum();
            const cyabal = await cyacoopContract.g1();
    
            // cyadex price
            document.getElementById("cyaPrice2").innerHTML=(1000/cyadexPrice).toFixed(6);
            
            // cyacoop price
            document.getElementById("catPrice").innerHTML=(cyacoopPrice/1e18).toFixed(6);
    
            // allocation
            document.getElementById("allocation").innerHTML=(allows/1e18).toFixed(6);
    
            // members
            document.getElementById("members").innerHTML=(members);
           
            // cyadex TVL
            document.getElementById("tvl").innerHTML=parseFloat(ethers.utils.formatUnits(await cyadexContract.balance(), 18)).toFixed(6);
            // cyabalance 
            document.getElementById("cyatvl").innerHTML = (cyabal/1e18).toFixed(6);
          };
       
          const addTokenCya = async () => {
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
    

          const buyCya = async () => {
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
  
          const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
          await cyadexContract.buy({ value: ethers.utils.parseUnits(document.getElementById('bnbInput').value, 'ether') });
        };
  
        const sellCya = async () => {
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
  
          const quantity = ethers.utils.parseUnits(document.getElementById('cyaInput').value, 18);
  
          // Approve
          const erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
          if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < quantity) {
            await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
          }
          // Sell
          const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
          await cyadexContract.sell(quantity);
        };
  
        let DmemberLogin = async () => {
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
          let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
          let mybnbpoint = await cyadexContract.getshoper();
    
          document.getElementById("Getmypoint").innerHTML = (mybnbpoint/1e18).toFixed(6);
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
          
          