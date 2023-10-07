// SPDX-License-Identifier: MIT  
//ver1.2
pragma solidity >=0.7.0 <0.9.0;

interface Icut{
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  function getdepot(address user)external view returns(uint256);
  function g1()external view returns(uint256);
  }
  
  interface Icat{
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool); 
  }
  
  interface Icyanft {     
  function  tokenURI(uint256 tokenID)external view returns(string memory) ;
  function  ownerOf(uint256 tokenID)external view returns(address) ;
  }

contract Meta5  {   //meta5 계좌 인증,cat보상 
  
  Icat cat;
  Icut cut;
  Icyanft cyanft;


  address public admin; 
  uint256[] public request;  //계좌 정산 요청  sales기록으로 검색
  bool public newrequest;  //신규 요청 신호
  mapping(uint256 => uint256[])public meta5;  //nft마다 재구매한 계좌기록
  mapping(uint256 => uint256)public sales;  //판매 계좌마다 처리된 금액
  mapping(address => uint8)public staff;
  mapping(uint256 => meta)public metainfo;  //nftid별 계좌현황
  mapping(uint256 => string)private mainpass;  //nftid별 매칭되어 있는 계좌의 실제 비번
      
      
      constructor(address _cat,address _cut,address _cyamarket2) public {
      cat=Icat(_cat);
      cut=Icut(_cut);
      cyanft=Icyanft(_cyamarket2);
      admin = msg.sender;
      staff[msg.sender] = 5 ;
      newrequest = false;
      }

    struct meta{
    uint256 nftid;
    uint256 metanum;
    string  pass;
    uint256 init;  //최초가격
    bool play;
    bool rebuy; // 재구매 요청
    uint256 depot;
    
    }
    
function newmeta(uint _nftid,uint _metanum,string memory _pass,uint256 _init,string memory _mainpass) public{  
   
    require(staff[msg.sender] >= 5,"no staff");
    require( getownerOf(_nftid) != address(0),"no nft owner"); //소유자 존재여부
    metainfo[_nftid].nftid = _nftid;
    metainfo[_nftid].metanum = _metanum;  //계좌를 미리 매칭해둠
    metainfo[_nftid].pass=_pass;  //관람자 비번
    metainfo[_nftid].init = _init;  //시작가
    metainfo[_nftid].play = true;
    metainfo[_nftid].depot = block.timestamp;
    mainpass[_nftid] = _mainpass;  //배열 따로
    meta5[_nftid].push(_metanum);   //여러개의 계좌 정보를 가지고 있음
   
}

function remetabuy(uint _nftid) public{    //메타5 재구매 요청
    require( metainfo[_nftid].play == false ,"Now playing"); //
   require( getownerOf(_nftid) == msg.sender,"no nft owner"); //소유자 확인
   uint pay = metainfo[_nftid].init /100;
    cut.approve(msg.sender,pay);
    uint256 allowance = cut.allowance(msg.sender, address(this));
    require(allowance >= pay, "Check the  allowance");
    cut.transferFrom(msg.sender, address(this),pay); 
    newrequest = true;
    metainfo[_nftid].rebuy = true;
}

function remetaadd(uint _nftid,uint _metanum,string memory _pass,uint256 _init,string memory _mainpass) public{  //메타 구매요청에 들어온 요청 처리하기
    require(staff[msg.sender] >= 5,"no staff");
    require( getownerOf(_nftid) != address(0),"no nft"); //소유자 존재여부
    metainfo[_nftid].metanum = _metanum;  //계좌를 미리 매칭해둠
    metainfo[_nftid].pass=_pass;  //관람자 비번
    metainfo[_nftid].init = _init;  //시작가
    metainfo[_nftid].play = true;
    metainfo[_nftid].depot = block.timestamp;
    mainpass[_nftid] = _mainpass;
    meta5[_nftid].push(_metanum); //재구매 요청 응답 기록
    newrequest = false;
    metainfo[_nftid].rebuy = false;
}


function exactadd(uint _nftid) public{    //nft 소유자가 자신의 메타계좌 정산요청
    require( metainfo[_nftid].play == true ,"no auccunt"); //
    require( getownerOf(_nftid) == msg.sender,"no nft owner"); //소유자 존재여부
    request.push(_nftid);
    metainfo[_nftid].play = false;
    newrequest = true;  
}


function deletemeta(uint _nftid) public{    //nft 소유자가 자신의 메타계좌 정산요청
    require( getownerOf(_nftid) == msg.sender,"no nft owner"); //소유자 존재여부
    metainfo[_nftid].play = false;
     
}


function exact(uint _nftid,uint _cat) public{    //요청에 의해 정산 처리  최초가/100 만큼보상
    require(staff[msg.sender] >= 5,"no staff");
    require(g7() >= _cat,"no cat");
    address receiver = getownerOf(_nftid);
    sales[metainfo[_nftid].metanum] = _cat; //해당 meta5 계좌에 보상한 금액 기록
    cat.transfer(receiver,_cat);  
    newrequest = false;  
}



function allowcation(uint tokenid )public returns(bool){   //매주 CUT배당
    uint256 pay = metainfo[tokenid].init/1000;  
    require( getownerOf(tokenid) == msg.sender,"no nft owner"); //소유자 존재여부
    require(g6()>=pay,"no cut"); 
    require(metainfo[tokenid].depot + 7 days   <  block.timestamp,"not time"); //주1회
    
     metainfo[tokenid].depot = block.timestamp;
     cut.transfer(getownerOf(tokenid),pay);
     return true;
}

  
 function g6() public view virtual returns(uint256){  
  return cut.balanceOf(address(this));
  }
 function g7() public view virtual returns(uint256){  
  return cat.balanceOf(address(this));
  }
  function g8(address user) public view virtual returns(uint256){  
  return cut.balanceOf(user);
  }

   function getcat(address user) public view virtual returns(uint256){  
  return cat.balanceOf(user);
  }

  function getownerOf(uint256 _nftid)public view virtual returns (address){
    return cyanft.ownerOf(_nftid);
  }
  
  function getmainpass(uint tokenid) external view returns (string memory){  //메인패스
     require(getownerOf(tokenid) == msg.sender);
      return mainpass[tokenid]; 
  }
  
  function getpass(uint256 tokenid) external view returns (string memory){  //관람자 패스
      return metainfo[tokenid].pass;  
  }
 
 function requestlength()external view returns (uint){
  return request.length; 
 }
  function getrequest(uint num)external view returns (uint){
  return request[num];  //토큰 id 출력
 }
  function getsales(uint _meta5)external view returns (uint){
  return sales[_meta5]; 
 }

  function getmeta5(uint tokenid)external view returns (uint256[] memory){ //nft마다 구매한 계좌
  return meta5[tokenid]; 
 }
  function getmetainfo(uint tokenid) public view returns(uint256 nftid,uint256 metanum,string memory metapass, uint256 init,bool play,uint256 depot){  
  return ( metainfo[tokenid].nftid,
           metainfo[tokenid].metanum,
            metainfo[tokenid].pass,
             metainfo[tokenid].init,
            metainfo[tokenid].play,
            metainfo[tokenid].depot);
  } 
   }

  
    