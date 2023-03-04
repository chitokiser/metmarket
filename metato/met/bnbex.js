
        const contractAddress = {
          cyadex2Addr: "0x7E0f523CF51686c422881d4437759438C8eCDEF5",
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
            "function sell(uint256 num) public",
            "function priceup(uint256 num)public"
          ],
          cyadex2: [
            "function cyabuy() payable public",
            "function getprice() public view returns(uint256)",
            "function bnbsell(uint256 num) public",
            "function balance()public view returns(uint256)",
            "function priceup(uint256 num)public",
            "function cyabalances() public view returns(uint256)",
            "function g1(address user) public view returns(uint256)",
            "function g2(address user) public view returns(uint256)"
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
         
    
  
          // ethers setup
          const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
          const cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex, provider);
          const bnbp = await cyadex2Contract.getprice();
        


          document.getElementById("Bnbp").innerHTML = (bnbp);
        };
     
        const Addcya = async () => {
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
  
   

      const Cyabuy = async () => {
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
        const cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex2, signer);
        try {
          await cyadex2Contract.cyabuy({ value: ethers.utils.parseUnits(document.getElementById('bnbInput').value, 'ether') });
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
       
       
      };




      let Priceup = async () => {
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
       
       
        //cyadex1에서 가격 업 함..remix abi가 잘못됨
        const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
        try {
          await cyadexContract.priceup(document.getElementById('Upprice').value);
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
        
        
      };

 

      let Bnbsell = async () => {
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

        let amount = ethers.utils.parseUnits(document.getElementById('cyaInput2').value, 18);

        // Approve
        let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
        if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadex2Addr) < amount) {
          await erc20.approve(contractAddress.cyadex2Addr, 2^256-1);
        }
        // Sell
        let cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex2, signer);
       
        try {
          await cyadex2Contract.bnbsell(amount);
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
        
        let cyadex2Contract = new ethers.Contract(contractAddress.cyadex2Addr, contractAbi.cyadex2, userProvider);
        let selectElement = document.getElementById('bnbInput');
        let selectElement2 = document.getElementById('cyaInput2');

        selectElement.addEventListener('change', async (event) => {
          if (event.target.value < 0.001) {
            c
          } else {
            document.getElementById('bnbOutput').value=event.target.value*parseFloat(await cyadex2Contract.getprice())/1000
          }
        });
       
        selectElement2.addEventListener('change', async (event) => {
          if (event.target.value < 0.001) {
           c
          } else{
          document.getElementById('cyaOutput2').value=event.target.value/parseFloat(await cyadex2Contract.getprice())*900
          }
        })
        })();


        
        
        
          
          
          