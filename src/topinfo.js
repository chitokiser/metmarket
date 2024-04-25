 
      const cA = {
        cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
        cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",   
        cyabankAddr:"0x35E2930578b14E30eE0563f601dafAe8Fb9C3E36",  //MUTBANK
        erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748"
      };
      const cB = {
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

      const topData= async () => {

         // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);

document.getElementById("cPrice2").innerHTML=(1/bnbPrice).toFixed(4);


        // ethers setup
        let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let cyadexContract = new ethers.Contract(cA.cyadexAddr,cB.cyadex, provider); 
        let dexBal = await cyadexContract.balance();
        document.getElementById("Tvl").innerHTML=  parseFloat(dexBal/1e18).toFixed(2); 
          
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

   
      const addTokenMut = async () => {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: "0x1194f2159065bE4C391d405eeB01F336cCCd86B2",  //mut 
              symbol: "MUT",
              decimals: 0, 
              // image: tokenImage,
            },
          },
        });
      }
   


 topData();
      
      