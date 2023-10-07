// SPDX-License-Identifier: MIT  
// ver1.0
pragma solidity >=0.7.0 <0.9.0;

interface Icat {     
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  }


    interface Icyamarket{
    function getownerOf(uint256 _nftid) external view returns (address);
    }

    contract cyafarm {

      Icat cat;
      Icyamarket cyamarket;
      address admin;
      uint[13] public tax;  // nft와 연동한배열
      uint8[13] public nft;  // nft와 tax12개와 매칭
      uint8 public remain; //나머지 설정 1~remain
      mapping(uint => tree) public port;   //fixnum  
      uint256 [] public pl; // fix 저장 배열 turn생성
      mapping(address => uint)public mycat; //충전금
      mapping(address => uint)public mywin; //누적 상금액
      mapping(address => uint)public mydepo; //미수금 
      mapping(address => uint)public mygain; //나의 이익금 
      event farmnum(uint winnum); 
    constructor(address _cat,address _cyamarket) public { 
      cat =Icat(_cat);
      cyamarket = Icyamarket(_cyamarket);
      admin = msg.sender;
      remain = 12;
    }

    struct tree {
    uint256 depo;  
    uint256 depon; //portid
    uint256 portn;    //ramain값 받음
    address owner;
    uint256 start;
    }


    function charge(uint pay) public{
        require(100<= pay,"100 or more");
         require(cat.balanceOf(msg.sender) >= pay,"little cat");  
        cat.approve(msg.sender, pay);
        uint256 allowance = cat.allowance(msg.sender,address(this));  
        require(allowance >= pay, "Check the token allowance");
        cat.transferFrom(msg.sender,address(this), pay);
        mycat[msg.sender] += pay;
    }

 function seeding(uint256 pay) public { 
  uint winnum = ranmod(); 
  uint portid = pl.length;
  tree storage newport = port[winnum];
    require(g1() *10/100 >= pay,"over seeding");  
    require(100 <= pay,"under seeding" );  
    require(mycat[msg.sender] >= pay,"not enough");  
    mycat[msg.sender] -= pay;
    tax[winnum] += pay*5/100;
        pl.push(winnum);
        mydepo[msg.sender] += pay;
        
        newport.start = block.timestamp;
        emit farmnum(winnum);
        if(newport.depo>0){
         uint bonus = portid - newport.depon; 
         uint jack = newport.depo * (bonus+100)/100;
         mycat[newport.owner] += jack;  //보상완료
         mygain[newport.owner] += jack - newport.depo;
        newport.depo = pay;
        newport.depon = portid;
        newport.portn = winnum;
        newport.owner = msg.sender;  
      
      
        }else{
        newport.depo = pay;
        newport.depon = portid;  //웨이팅 수익을 주기 위해 필요
        newport.portn = winnum;
        newport.owner = msg.sender;
       
        }
  }


  function ranmod( ) internal returns(uint){
   return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender))) % remain+1; //전역변수 적용
 }

  function withdraw( )public {   
   uint pay = mycat[msg.sender]*95/100;
   require(pay > 0,"no cat");
   mycat[msg.sender] = 0;
   mywin[msg.sender] += pay; 
   cat.transfer(msg.sender,pay); 

  }

  function nftup(uint num,uint8 _nft)public  {   
   require( admin ==  msg.sender,"no admin");
   nft[num] =_nft;
  }

  function withdrawtax(uint num)public returns(bool) {   // nftid로 화분id 출력
   require( owner(num) ==  msg.sender,"no nft owner");
   uint mc = nft[num];  //화분id 출력
   require( gettax(mc) >=  100,"no tax");
  cat.transfer(owner(num),gettax(mc * 95/100));
  tax[mc] =0;
   return true;
  }
 function remainup(uint8 _remain)public  {   //myport에서 가져온 portid
   require(admin ==  msg.sender,"tax little");
   remain = _remain;
  }
  
 function g1() public view virtual returns(uint256){  
  return cat.balanceOf(address(this));
  }
   
   function pllength() public view returns(uint) {
  return pl.length;
  }
   function getpl(uint num) public view returns(uint) {
  return pl[num]; //portid입렵 화분 넘버 출력
  }
  function allportinfo(uint num) public view returns(uint depo,uint depon,uint portn,address owner,uint start) {  //현재 상태의 포트정보 pl에서 가져온 윈넘입력
  return (port[num].depo,
          port[num].depon,  //포트생성순서
          port[num].portn,  //포트고정값
          port[num].owner,
          port[num].start);
  }  

 function getperiod(uint num) public view returns(uint) { //누적 상금액   
  require(port[num].start >1,"empty") ;
  return  block.timestamp - port[num].start;
  }  
 
  function getvalue(uint num) public view returns(uint) { //현재 가치   
  return port[num].depo* (pllength() - port[num].depon + 100)/100 ;
  }  
 function getmywin() public view returns(uint) { //수금  
  return mywin[msg.sender];
  }  

  function getmydepo() public view returns(uint) { 
  return mydepo[msg.sender];
  } 

   function getmyseedmoney() public view returns(uint) { //원금 미수금
    require(mydepo[msg.sender]>mywin[msg.sender],"all returned");
   return mydepo[msg.sender] - mywin[msg.sender];
  } 
   function getmyfarm(uint num) public view returns(uint) { //내가 가지고 있는 농장개수
  require(port[num].owner == msg.sender);
  return port[num].portn;   //내 농장 번호를  DOM에 저장
  } 
   function getmygain() public view returns(uint) { //나의 이익금
  return mygain[msg.sender];   //나의 이익금
  } 
  function getmycat( ) public view returns(uint) { //수확물    
  return mycat[msg.sender];
  }  
  function gettax(uint num) public view returns(uint) { //수확물    
  return tax[num];
  }  
  
    function owner(uint num) public view returns(address) { //nft주인
  return cyamarket.getownerOf(num);
  }  
     function getnft(uint8 num) public view returns(uint) { //nft와 화분과 매칭 1번화분은 7번nft 와 매칭
  return nft[num];
  }  
}
  

