let contractAddress = {
    cyadexAddr: "0x9536fe8544eDa3Bf488B1b87730D0E0b63E1D500",
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",
    erc20: "0x3C410361E6443B04Fa559c4640bA3071f8C4bEc9",
    catAddr: "0xE9f81b32E6cEca07819806B827AEA1C71C53d257",
    alliance : "0xF1Fc9f4828fa390C728C1dBc800a7e99db31CAd6"
  };
  let contractAbi = {
    cyadex: [
      "function getprice() public view returns(uint256)",
      "function balance() public view returns(uint256)",
      "function buy() payable public",
      "function sell(uint256 num) public"
    ],
    cyacoop: [
      "function getprice() public view returns(uint256)",
      "function allow() public view returns(uint256)",
      "function g1() public view returns(uint256)",
      "function g2() public view returns(uint256 allowt, uint256 exp, uint8 level, uint256 booster)",
      "function g6() public view returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function memberjoin(uint256 _num) public",
      "function automemberjoin() public",
      "function levelup() public returns(bool)",
      "function geteps(address user) external view returns (uint256)",
      "function withdraw() public returns(bool)",
      "function mentolength() public view returns(uint256)",
      "function addmento() public",
      "function buybooster() public",
      "function buycat(uint _num) public returns(bool)",
      "function sellcat(uint num) public returns(bool)"
    ],
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
    let shopid= document.getElementById('ainfo');
    let get2 = await allianceContract.g2(shopid);
  
  document.getElementById("Depo").innerHTML = (get2.depo);  
  document.getElementById("Sid").innerHTML = (get2.sid);
  document.getElementById("Owner").innerHTML = (get2.owner);
  document.getElementById("Cid").innerHTML = (get2.mycid);
  ocument.getElementById("Cr").innerHTML = (get2.cr);
  ocument.getElementById("sname").innerHTML = (get2.name);
  ocument.getElementById("home").innerHTML = (get2.web;
  };
  


  // let Abuy = async () => {
  //   let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  //   await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [{
  //           chainId: "0x38",
  //           rpcUrls: ["https://bsc-dataseed.binance.org/"],
  //           chainName: "Binance Smart Chain",
  //           nativeCurrency: {
  //               name: "BNB",
  //               symbol: "BNB",
  //               decimals: 18
  //           },
  //           blockExplorerUrls: ["https://bscscan.com/"]
  //       }]
  //   });
  //   await userProvider.send("eth_requestAccounts", []);
  //   let signer = userProvider.getSigner();

  //   let allianceContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);

  //   // Approve
  //   let erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
  //   if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < ethers.utils.parseUnits("0.05", 18)) {
  //     await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
  //   }

  //   await cyacoopContract.memberjoin(document.getElementById('mentorNumInput').value);
  // }


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
    