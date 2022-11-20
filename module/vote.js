let contractAddress = {  
    voteAddr: "0x8f40A92F7Be6921CAC5BDA2e386a3e8120cc1d6e"
  };
  let contractAbi = {
    vote: [
        "function proposal(string memory  _pro1,string memory  _link1) public",
        "function goodb(uint _pid) public",
        "function badb(uint _pid) public",
        "function creatvote(string memory  _agenda,string memory  _link2) public ", 
        "function yesb(uint _vid) public ",
        "function nob(uint _vid) public",
        "function staffup(address _staff,uint _num)public",
        "function feeup(uint _num)public",
        "function g1() public view returns(uint256)",
        "function g3() public view returns(uint256)",
        "function g4(address user) public view returns(uint256)",
        "function getsold() public view  returns(uint256)",
        "function getpro(uint _pid) public view returns(string memory pro1,string memory link1,uint good,uint bad,string memory status1,bool end)",
        "function getvote(uint _vid) public view returns(string memory agenda,string memory link2,uint yes,uint no,string memory status2,bool stop)",
        "function pid() public view virtual returns(uint256)",
        "function vid() public view virtual returns(uint256)",
        "function fee() public view virtual returns(uint256)"    
   ]
  };

  let VtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, provider);
    
    let vpid = await voteContract.pid();
    let vvid = await voteContract.vid();
    let vtvl = await voteContract.g1();
    let vcat = await voteContract.getsold();
    document.getElementById("Vpid").innerHTML = (vpid-1);
    document.getElementById("Vvid").innerHTML = (vvid-1);
    document.getElementById("Vtvl").innerHTML = (vtvl/1e18).toFixed(6);
    document.getElementById("Vcat").innerHTML = (vcat);
    //데이타 가져오기
    let vgetpro1 =  await voteContract.getpro(1);    
    let t1 = vgetpro1[0];  //제목
    let l1 = vgetpro1[1];  //토론링크
    let g1 = vgetpro1[2];  //좋아요
    let h1 = vgetpro1[3];  //싫어요
    let s1 = vgetpro1[4];  //제안상태
 
    document.getElementById("P0-T0").innerHTML = (t1);
    document.getElementById("P0_L0").href = (l1);
    document.getElementById("P0-G0").innerHTML = (g1);
    document.getElementById("P0-H0").innerHTML = (h1);
    document.getElementById("PO-S0").innerHTML = (s1);
    console.log(s1)
   
  };



  let Proposal = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let pro1 = document.getElementById('Pro1').value;
    let pro2 = document.getElementById('Pro2').value;
    
    console.log(pro1);
    try {
      await voteContract.proposal(pro1,pro2);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Good = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let pid1 = document.getElementById('Pid1').value;
    
    try {
      await voteContract.goodb(pid1);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Bad = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let pid2 = document.getElementById('Pid2').value;
    
    try {
      await voteContract.badb(pid2);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Creatvote = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let agenda = document.getElementById('Agenda').value;
    let link2 = document.getElementById('Link2').value;
    
    try {
      await voteContract.creatvote(agenda,link2);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
 
  
  let Yesb = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let vid1 = document.getElementById('Vid1').value;
    
    try {
      await voteContract.yesb(vid1);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Nob = async () => {
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
    let voteContract = new ethers.Contract(contractAddress.voteAddr, contractAbi.vote, signer);
    let vid2 = document.getElementById('Vid2').value;
    
    try {
      await voteContract.nob(vid2);
      
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };



  (async () => {
    VtopDataSync();
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
  })();

