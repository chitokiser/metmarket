let addr = {  
    vote2addr: "0x8f40A92F7Be6921CAC5BDA2e386a3e8120cc1d6e"
  };
  let abi = {
    vote2: [
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

  let VtopDataSync2 = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let vote2Contract = new ethers.Contract(addr.vote2addr, abi.vote2, provider);
    
   
    
   
    let vgetpro2 =  await vote2Contract.getpro(2); 
    let t2 = vgetpro2[0];  //제목
    let l2 = vgetpro2[1];  //토론링크
    let g2 = vgetpro2[2];  //좋아요
    let h2 = vgetpro2[3];  //싫어요
    let s2 = vgetpro2[4];  //제안상태
 
    document.getElementById("T1").innerHTML = (t2);
    document.getElementById("L1").href = (l2);
    document.getElementById("G1").innerHTML = (g2);
    document.getElementById("H1").innerHTML = (h2);
    document.getElementById("S1").innerHTML = (s2);

    let vgetpro3 =  await vote2Contract.getpro(3); 
    let t3 = vgetpro3[0];  //제목
    let l3 = vgetpro3[1];  //토론링크
    let g3 = vgetpro3[2];  //좋아요
    let h3 = vgetpro3[3];  //싫어요
    let s3 = vgetpro3[4];  //제안상태
 
    document.getElementById("T3").innerHTML = (t3);
    document.getElementById("L3").href = (l3);
    document.getElementById("G3").innerHTML = (g3);
    document.getElementById("H3").innerHTML = (h3);
    document.getElementById("S3").innerHTML = (s3);




    // 아젠다 데이타
    let getvote1 =  await vote2Contract.getvote(1); 
    let a1 = getvote1[0];  //아젠다
    let vl1 =getvote1[1];  //토론링크
    let y1 = getvote1[2];  //yse
    let n1 = getvote1[3];  //no
    let s21 = getvote1[4];  //제안상태
 
    document.getElementById("A1").innerHTML = (a1);
    document.getElementById("Vl1").href = (vl1);
    document.getElementById("Y1").innerHTML = (y1);
    document.getElementById("N1").innerHTML = (n1);
    document.getElementById("S21").innerHTML = (s21);
    
  };



 



  (async () => {
    VtopDataSync2();
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

