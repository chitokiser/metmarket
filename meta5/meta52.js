let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    meta5Addr: "0x4213ae7dd30FE130DB04B28a7D9bB7fA9666880E"
  };
  let contractAbi = {
  
    meta5: [
       "function creat(uint _account,string memory _pass1,string memory _pass2,uint _balan )public",
       "function memberjoin(address _mento)public",
       "function buy(uint _account)public",
       "function sell(uint _account,uint _balan)public",
       "function withdraw( )public",
       "function confirm(uint _account)public",
       "function cencell(uint _account)public",
       "function t1set(uint _num,uint _account)public",
       "function balanset(uint _account,uint _balan)public",
       "function g1() public view virtual returns(uint256)",
       "function g3(address user) public view virtual returns(uint256)",
       "function getpass1(uint _account) public view returns(string memory)",
       "function getpass2(uint _account) public view returns(string memory)",
       "function getbalan(uint _account) public view returns(uint256)",
       "function getmymetalength() public view returns(uint256)",
       "function getmymeta(uint num) public view returns(uint256)",
       "function getmydepo() public view returns(uint256)",
       "function getl1(uint _id) public view returns(uint256)",
       "function getl2(uint _id) public view returns(uint256)",
       "function getl3(uint _id) public view returns(uint256)",
       "function gett4(uint _id) public view returns(uint256)",
       "function gett5(uint _id) public view returns(uint256)",
       "function t1lengeth() public view returns(uint256)",
       "function t2lengeth() public view returns(uint256)",
       "function t3lengeth() public view returns(uint256)",
       "function t4lengeth() public view returns(uint256)",
       "function t5lengeth() public view returns(uint256)",
       "function getstate(uint _account) public view  returns(uint256)",
       "function owner(uint _num) public view returns(address)",
       "function getlevel(address user) public view  returns(uint256)"
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
      ]

  };

 

  


  let HtopDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, provider);
    let removal = 1 ;
     
    let a0 = await meta5Contract.getl1(0 + removal);  //계좌번호
    let s0 = await meta5Contract.getstate(a0);  //계좌상태
    let b0 = await meta5Contract.getbalan(a0);  //계좌잔고
    let o0 = await meta5Contract.getpass1(a0);  //관전비번
    let oo0 = await meta5Contract.owner(a0);  //오너
 
    document.getElementById("A0-T0").innerHTML = (a0);
    document.getElementById("S0-T0").innerHTML = (s0);
    document.getElementById("B0-T0").innerHTML = (b0/1e13);
    document.getElementById("O0-T0").innerHTML = (o0);
    document.getElementById("P0-T0").innerHTML = (b0/1e18).toFixed(6);
    document.getElementById("Oo0-T0").innerHTML = (oo0);
   

    let a1 = await meta5Contract.getl1(1+ removal);  //계좌번호
    let s1 = await meta5Contract.getstate(a1);  //계좌상태
    let b1 = await meta5Contract.getbalan(a1);  //계좌잔고
    let o1 = await meta5Contract.getpass1(a1);  //관전비번
    let oo1 = await meta5Contract.owner(a1);  //오너
    
    document.getElementById("A1-T1").innerHTML = (a1);
    document.getElementById("S1-T1").innerHTML = (s1);
    document.getElementById("B1-T1").innerHTML = (b1/1e13);
    document.getElementById("O1-T1").innerHTML = (o1);
    document.getElementById("P1-T1").innerHTML = (b1/1e18).toFixed(6);
    document.getElementById("Oo1-T1").innerHTML = (oo1);

    let a2 = await meta5Contract.getl1(2+ removal);  //계좌번호
    let s2 = await meta5Contract.getstate(a2);  //계좌상태
    let b2 = await meta5Contract.getbalan(a2);  //계좌잔고
    let o2 = await meta5Contract.getpass1(a2);  //관전비번
    let oo2 = await meta5Contract.owner(a2);  //오너
    
    document.getElementById("A2-T2").innerHTML = (a2);
    document.getElementById("S2-T2").innerHTML = (s2);
    document.getElementById("B2-T2").innerHTML = (b2/1e13);
    document.getElementById("O2-T2").innerHTML = (o2);
    document.getElementById("P2-T2").innerHTML = (b2/1e18).toFixed(6);
    document.getElementById("Oo2-T2").innerHTML = (oo2);
    
    let a3 = await meta5Contract.getl1(3+ removal);  //계좌번호
    let s3 = await meta5Contract.getstate(a3);  //계좌상태
    let b3 = await meta5Contract.getbalan(a3);  //계좌잔고
    let o3 = await meta5Contract.getpass1(a3);  //관전비번
    let oo3 = await meta5Contract.owner(a3);  //오너
    
    document.getElementById("A3-T3").innerHTML = (a3);
    document.getElementById("S3-T3").innerHTML = (s3);
    document.getElementById("B3-T3").innerHTML = (b3/1e13);
    document.getElementById("O3-T3").innerHTML = (o3);
    document.getElementById("P3-T3").innerHTML = (b3/1e18).toFixed(6);
    document.getElementById("Oo3-T3").innerHTML = (oo3);

    let a4 = await meta5Contract.getl1(4+ removal);  //계좌번호
    let s4 = await meta5Contract.getstate(a4);  //계좌상태
    let b4 = await meta5Contract.getbalan(a4);  //계좌잔고
    let o4 = await meta5Contract.getpass1(a4);  //관전비번
    let oo4 = await meta5Contract.owner(a4);  //오너
    
    document.getElementById("A4-T4").innerHTML = (a4);
    document.getElementById("S4-T4").innerHTML = (s4);
    document.getElementById("B4-T4").innerHTML = (b4/1e13);
    document.getElementById("O4-T4").innerHTML = (o4);
    document.getElementById("P4-T4").innerHTML = (b4/1e18).toFixed(6);
    document.getElementById("Oo4-T4").innerHTML = (oo4);
   
    let a5 = await meta5Contract.getl1(5+ removal);  //계좌번호
    let s5 = await meta5Contract.getstate(a5);  //계좌상태
    let b5 = await meta5Contract.getbalan(a5);  //계좌잔고
    let o5 = await meta5Contract.getpass1(a5);  //관전비번
    let oo5 = await meta5Contract.owner(a5);  //오너
    
    document.getElementById("A5-T5").innerHTML = (a5);
    document.getElementById("S5-T5").innerHTML = (s5);
    document.getElementById("B5-T5").innerHTML = (b5/1e13);
    document.getElementById("O5-T5").innerHTML = (o5);
    document.getElementById("P5-T5").innerHTML = (b5/1e18).toFixed(6);
    document.getElementById("Oo5-T5").innerHTML = (oo5);
   
    let a6 = await meta5Contract.getl1(6+ removal);  //계좌번호
    let s6 = await meta5Contract.getstate(a6);  //계좌상태
    let b6 = await meta5Contract.getbalan(a6);  //계좌잔고
    let o6 = await meta5Contract.getpass1(a6);  //관전비번
    let oo6 = await meta5Contract.owner(a6);  //오너
    
    document.getElementById("A6-T6").innerHTML = (a6);
    document.getElementById("S6-T6").innerHTML = (s6);
    document.getElementById("B6-T6").innerHTML = (b6/1e13);
    document.getElementById("O6-T6").innerHTML = (o6);
    document.getElementById("P6-T6").innerHTML = (b6/1e18).toFixed(6);
    document.getElementById("Oo6-T6").innerHTML = (oo6);
   
    let a7 = await meta5Contract.getl1(7+ removal);  //계좌번호
    let s7 = await meta5Contract.getstate(a7);  //계좌상태
    let b7 = await meta5Contract.getbalan(a7);  //계좌잔고
    let o7 = await meta5Contract.getpass1(a7);  //관전비번
    let oo7 = await meta5Contract.owner(a7);  //오너
    
    document.getElementById("A7-T7").innerHTML = (a7);
    document.getElementById("S7-T7").innerHTML = (s7);
    document.getElementById("B7-T7").innerHTML = (b7/1e13);
    document.getElementById("O7-T7").innerHTML = (o7);
    document.getElementById("P7-T7").innerHTML = (b7/1e18).toFixed(6);
    document.getElementById("Oo7-T7").innerHTML = (oo7);
   
    let a8 = await meta5Contract.getl1(8+ removal);  //계좌번호
    let s8 = await meta5Contract.getstate(a8);  //계좌상태
    let b8 = await meta5Contract.getbalan(a8);  //계좌잔고
    let o8 = await meta5Contract.getpass1(a8);  //관전비번
    let oo8 = await meta5Contract.owner(a8);  //오너
    
    document.getElementById("A8-T8").innerHTML = (a8);
    document.getElementById("S8-T8").innerHTML = (s8);
    document.getElementById("B8-T8").innerHTML = (b8/1e13);
    document.getElementById("O8-T8").innerHTML = (o8);
    document.getElementById("P8-T8").innerHTML = (b8/1e18).toFixed(6);
    document.getElementById("Oo8-T8").innerHTML = (oo8);
   
    let a9 = await meta5Contract.getl1(9+ removal);  //계좌번호
    let s9 = await meta5Contract.getstate(a9);  //계좌상태
    let b9 = await meta5Contract.getbalan(a9);  //계좌잔고
    let o9 = await meta5Contract.getpass1(a9);  //관전비번
    let oo9 = await meta5Contract.owner(a9);  //오너
    
    document.getElementById("A9-T9").innerHTML = (a9);
    document.getElementById("S9-T9").innerHTML = (s9);
    document.getElementById("B9-T9").innerHTML = (b9/1e13);
    document.getElementById("O9-T9").innerHTML = (o9);
    document.getElementById("P9-T9").innerHTML = (b9/1e18).toFixed(6);
    document.getElementById("Oo9-T9").innerHTML = (oo9);
   
    let a10 = await meta5Contract.getl1(+ removal);  //계좌번호
    let s10 = await meta5Contract.getstate(a10);  //계좌상태
    let b10 = await meta5Contract.getbalan(a10);  //계좌잔고
    let o10 = await meta5Contract.getpass1(a10);  //관전비번
    let oo10 = await meta5Contract.owner(a10);  //오너
    
    document.getElementById("A10-T10").innerHTML = (a10);
    document.getElementById("S10-T10").innerHTML = (s10);
    document.getElementById("B10-T10").innerHTML = (b10/1e13);
    document.getElementById("O10-T10").innerHTML = (o10);
    document.getElementById("P10-T10").innerHTML = (b10/1e18).toFixed(6);
    document.getElementById("Oo10-T10").innerHTML = (oo10);
   
    let a11 = await meta5Contract.getl1(11+ removal);  //계좌번호
    let s11 = await meta5Contract.getstate(a11);  //계좌상태
    let b11 = await meta5Contract.getbalan(a11);  //계좌잔고
    let o11 = await meta5Contract.getpass1(a11);  //관전비번
    let oo11 = await meta5Contract.owner(a11);  //오너
    
    document.getElementById("A11-T11").innerHTML = (a11);
    document.getElementById("S11-T11").innerHTML = (s11);
    document.getElementById("B11-T11").innerHTML = (b11/1e13);
    document.getElementById("O11-T11").innerHTML = (o11);
    document.getElementById("P11-T11").innerHTML = (b11/1e18).toFixed(6);
    document.getElementById("Oo11-T11").innerHTML = (oo11);
   
    let a12 = await meta5Contract.getl1(12+ removal);  //계좌번호
    let s12 = await meta5Contract.getstate(a12);  //계좌상태
    let b12 = await meta5Contract.getbalan(a12);  //계좌잔고
    let o12 = await meta5Contract.getpass1(a12);  //관전비번
    let oo12 = await meta5Contract.owner(a12);  //오너

    document.getElementById("A12-T12").innerHTML = (a12);
    document.getElementById("S12-T12").innerHTML = (s12);
    document.getElementById("B12-T12").innerHTML = (b12/1e13);
    document.getElementById("O12-T12").innerHTML = (o12);
    document.getElementById("P12-T12").innerHTML = (b12/1e18).toFixed(6);
    document.getElementById("Oo12-T12").innerHTML = (oo12);
    
    
    let a13 = await meta5Contract.getl1(13+ removal);  //계좌번호
let s13 = await meta5Contract.getstate(a13);  //계좌상태
let b13 = await meta5Contract.getbalan(a13);  //계좌잔고
let o13 = await meta5Contract.getpass1(a13);  //관전비번
let oo13 = await meta5Contract.owner(a13);  //오너

document.getElementById("A13-T13").innerHTML = (a13);
document.getElementById("S13-T13").innerHTML = (s13);
document.getElementById("B13-T13").innerHTML = (b13/1e13);
document.getElementById("O13-T13").innerHTML = (o13);
document.getElementById("P13-T13").innerHTML = (b13/1e18).toFixed(6);
document.getElementById("Oo13-T13").innerHTML = (oo13);


let a14 = await meta5Contract.getl1(14+ removal);  //계좌번호
let s14 = await meta5Contract.getstate(a14);  //계좌상태
let b14 = await meta5Contract.getbalan(a14);  //계좌잔고
let o14 = await meta5Contract.getpass1(a14);  //관전비번
let oo14 = await meta5Contract.owner(a14);  //오너

document.getElementById("A14-T14").innerHTML = (a14);
document.getElementById("S14-T14").innerHTML = (s14);
document.getElementById("B14-T14").innerHTML = (b14/1e13);
document.getElementById("O14-T14").innerHTML = (o14);
document.getElementById("P14-T14").innerHTML = (b14/1e18).toFixed(6);
document.getElementById("Oo14-T14").innerHTML = (oo14);

let a15 = await meta5Contract.getl1(15+ removal);  //계좌번호
let s15 = await meta5Contract.getstate(a15);  //계좌상태
let b15 = await meta5Contract.getbalan(a15);  //계좌잔고
let o15 = await meta5Contract.getpass1(a15);  //관전비번
let oo15 = await meta5Contract.owner(a15);  //오너

document.getElementById("A15-T15").innerHTML = (a15);
document.getElementById("S15-T15").innerHTML = (s15);
document.getElementById("B15-T15").innerHTML = (b15/1e13);
document.getElementById("O15-T15").innerHTML = (o15);
document.getElementById("P15-T15").innerHTML = (b15/1e18).toFixed(6);
document.getElementById("Oo15-T15").innerHTML = (oo15);

let a16 = await meta5Contract.getl1(16+ removal);  //계좌번호
let s16 = await meta5Contract.getstate(a16);  //계좌상태
let b16 = await meta5Contract.getbalan(a16);  //계좌잔고
let o16 = await meta5Contract.getpass1(a16);  //관전비번
let oo16 = await meta5Contract.owner(a16);  //오너

document.getElementById("A16-T16").innerHTML = (a16);
document.getElementById("S16-T16").innerHTML = (s16);
document.getElementById("B16-T16").innerHTML = (b16/1e13);
document.getElementById("O16-T16").innerHTML = (o16);
document.getElementById("P16-T16").innerHTML = (b16/1e18).toFixed(6);
document.getElementById("Oo16-T16").innerHTML = (oo16);

let a17 = await meta5Contract.getl1(17+ removal);  //계좌번호
let s17 = await meta5Contract.getstate(a17);  //계좌상태
let b17 = await meta5Contract.getbalan(a17);  //계좌잔고
let o17 = await meta5Contract.getpass1(a17);  //관전비번
let oo17 = await meta5Contract.owner(a17);  //오너

document.getElementById("A17-T17").innerHTML = (a17);
document.getElementById("S17-T17").innerHTML = (s17);
document.getElementById("B17-T17").innerHTML = (b17/1e13);
document.getElementById("O17-T17").innerHTML = (o17);
document.getElementById("P17-T17").innerHTML = (b17/1e18).toFixed(6);
document.getElementById("Oo17-T17").innerHTML = (oo17);

let a18 = await meta5Contract.getl1(18+ removal);  //계좌번호
let s18 = await meta5Contract.getstate(a18);  //계좌상태
let b18 = await meta5Contract.getbalan(a18);  //계좌잔고
let o18 = await meta5Contract.getpass1(a18);  //관전비번
let oo18 = await meta5Contract.owner(a18);  //오너

document.getElementById("A18-T18").innerHTML = (a18);
document.getElementById("S18-T18").innerHTML = (s18);
document.getElementById("B18-T18").innerHTML = (b18/1e13);
document.getElementById("O18-T18").innerHTML = (o18);
document.getElementById("P18-T18").innerHTML = (b18/1e18).toFixed(6);
document.getElementById("Oo18-T18").innerHTML = (oo18);

let a19 = await meta5Contract.getl1(19+ removal);  //계좌번호
let s19 = await meta5Contract.getstate(a19);  //계좌상태
let b19 = await meta5Contract.getbalan(a19);  //계좌잔고
let o19 = await meta5Contract.getpass1(a19);  //관전비번
let oo19 = await meta5Contract.owner(a19);  //오너

document.getElementById("A19-T19").innerHTML = (a19);
document.getElementById("S19-T19").innerHTML = (s19);
document.getElementById("B19-T19").innerHTML = (b19/1e13);
document.getElementById("O19-T19").innerHTML = (o19);
document.getElementById("P19-T19").innerHTML = (b19/1e18).toFixed(6);
document.getElementById("Oo19-T19").innerHTML = (oo19);


   
};


  

  (async () => {
    HtopDataSync();
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