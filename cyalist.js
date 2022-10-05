let contractAddress = {
    cyadex: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    alliance : "0xF1Fc9f4828fa390C728C1dBc800a7e99db31CAd6"
  };
  let contractAbi = {

    erc20: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)"
    ],
    alliance: [
      "function shopinfoup(uint256 _cid,uint256 _sid,uint8 _cr,uint8 _pr,uint256 _bc,uint256 _cc,string memory _name,string memory _web,address _owner,string memory _metainfo)public",
      "function buy(uint256 _sid,uint256 _pay)public returns(bool)",
      "function mypointex( )public returns(bool)",
      "function shopex(uint256 _sid)public returns(bool)",
      "function g1() public view virtual returns(uint256)",
      "function g2(uint256 _sid) public view returns(uint256 depo,uint256 sid,address owner,uint256 mycid, uint8 cr,string memory name,string memory web, string memory metainfo)",
      "function g3(uint256 _cid) public view returns(uint256 cid,address owner,string memory name,address cutallow)",
      "function getmyshoplength(uint _cid)",
      "function getmyshop(uint _cid,uint _num) public view virtual returns",
      "function getmypoint( )public view returns(uint256)",
      "function sindex( )public view returns(uint256)",  
      "function cindex( )public view returns(uint256)" 
    ],
  };

  let AtopDataSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, provider);
    let bal = await allianceContract.g1();
    let tocut = await allianceContract.cindex();
    let toalli = await allianceContract.sindex();
    document.getElementById("allibal").innerHTML = (bal/1e18).toFixed(6); 
    document.getElementById("sumcut").innerHTML = parseInt(tocut);
    document.getElementById("sumalli").innerHTML = parseInt(toalli);
  };
  
  let Getinfo = async () => {
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, provider);
    let get2 = await allianceContract.g2(document.getElementById('ainfo').value);
    
     document.getElementById("sname").innerHTML = (get2.name);
     document.getElementById("Sid").innerHTML = (get2.sid);
     document.getElementById("prate").innerHTML = (get2.cr);
    };

   let Buyshop = async () => {
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
      let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, signer);
      let amount = ethers.utils.parseUnits(document.getElementById('input').value, 18);  
      let Shopid = parseInt(document.getElementById('shopid').value);
      try {
        await allianceContract.buy(Shopid,amount);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };


    let AmemberLogin = async () => {
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
      let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, signer);
      let mypoint = await allianceContract.getmypoint();

      document.getElementById("Getmypoint").innerHTML = (mypoint/1e18).toFixed(6);
    };


    let Mypointex = async () => {  
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
      let signer = userProvider.getSigner();
    
      let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, signer);
    
      try {
        await allianceContract.mypointex();
      } catch(e) {  
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
    
    let Getshopinfo = async () => {
      let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
      let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, provider);
      let get2 = await allianceContract.g2(document.getElementById('sinfo').value);
      
       document.getElementById("Owner").innerHTML = (get2.owner);
       document.getElementById("Depo").innerHTML = (get2.depo/1e18);
       document.getElementById("shopid2").innerHTML = (get2.sid);
      };  
  
      let Shopex = async () => {  
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
        let signer = userProvider.getSigner();
        let allianceContract = new ethers.Contract(contractAddress.alliance, contractAbi.alliance, signer);
        let Sid = parseInt(document.getElementById('sid').value);
        try {
          await allianceContract.shopex(Sid);
        } catch(e) {  
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };    

  (async () => {
    AtopDataSync();
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
    