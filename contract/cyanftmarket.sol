// SPDX-License-Identifier: MIT  
//ver1.2




pragma solidity >=0.7.0 <0.9.0;


interface Icya {     
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  }


  interface Icyanft {     
  function  tokenURI(uint256 tokenID)external view returns(string memory) ;
  function  ownerOf(uint256 tokenID)external view returns(address) ;
   function approve(address spender, uint256 tokenid)  external returns (bool) ;
   function transferFrom(address from, address to, uint256 tokenId)  external returns (bool);
   function safeTransferFrom(address from, address to, uint256 tokenId)  external returns (bool);
   function setApprovalForAll(address to, bool sig) external  returns (bool) ;
  }

contract cyanftmarket {   //meta5 계좌 인증,cat보상 
  
  Icya cya;
  Icyanft cyanft;

  address public admin; 
  uint256[] public nftadd; //nft 등록 배열
  mapping(uint256 => nft)public nftinfo;  //nft 정보 보기
  mapping(address => uint8)public staff;
  
      
      
      constructor(address _cya,address _cyanft) public {
      cya=Icya(_cya);
      cyanft=Icyanft(_cyanft);
      admin = msg.sender;
      staff[msg.sender] = 5 ;
     
      }

    struct nft{
    uint256 nftid;
    uint256 price;
    string url;
    string outline; //간단설명
    bool sold;
    address seller;
    uint results; //판매후받은 금액;
    }
    
function add(uint _nftid,uint _price,string memory _url,string memory _outline) public returns (bool){  
    address owner = getownerOf(_nftid);
    require(owner == msg.sender, "Only the NFT owner can add it.");
    nftinfo[_nftid].nftid = _nftid;
    nftinfo[_nftid].nftid = _price;
    nftinfo[_nftid].url = _url;
    nftinfo[_nftid].outline = _outline;
    nftinfo[_nftid].sold = true;
    nftinfo[_nftid].seller = msg.sender;
    approveAndTransfer(msg.sender,address(this), _nftid);
    return true;
}

    function approveAndTransfer(address from, address to, uint256 tokenId) internal{
        // 이전하려는 NFT의 소유자가 스마트 계약의 소유자 (onlyOwner) 여야 합니다.
        require(getownerOf(tokenId) == from, "Only the current owner can initiate the transfer");
        
        // `from` 주소에게 `to` 주소로 NFT를 이전하기 위한 승인을 부여합니다.
        cyanft.approve(to, tokenId);
        
        // `from` 주소에서 `to` 주소로 NFT를 이전합니다.
       cyanft.transferFrom(from, to, tokenId);
    }


function modify(uint _nftid,uint _price,string memory _url,string memory _outline) public{  
   
    require(nftinfo[_nftid].seller == msg.sender|| staff[msg.sender] >=5 ,"no nft owner"); //판매자 이거나 스텝이면 수정 가능
    nftinfo[_nftid].nftid = _nftid;
    nftinfo[_nftid].price = _price;
    nftinfo[_nftid].url = _url;
    nftinfo[_nftid].outline = _outline;

}

function buy(uint _tokenid) public{    //nft 구매 하기
require(  nftinfo[_tokenid].sold == true,"no sales");
  uint pay = nftinfo[_tokenid].price;
  address sall = nftinfo[_tokenid].seller;
  require( g1(msg.sender) >= pay*1e18 ,"no cya"); 
   cya.approve(msg.sender,pay);
    uint256 allowance = cya.allowance(msg.sender, sall);
    require(allowance >= pay, "Check the  allowance");
    cya.transferFrom(msg.sender,sall,pay);
   nftinfo[_tokenid].results = pay;
   nftinfo[_tokenid].sold = false;
  
 approveAndTransfer(address(this),msg.sender, _tokenid);
}

 
function g1(address user) public view virtual returns(uint256){  
  return cya.balanceOf(user);
  }

  function getownerOf(uint256 _nftid)public view virtual returns (address){
    return cyanft.ownerOf(_nftid);
  }

  function getnftinfo(uint tokenid) public view returns(uint256 nftid,uint256 price,string memory url,string memory outline,bool sold,address seller,uint results){  
  return ( nftinfo[tokenid].nftid,  
  nftinfo[tokenid].price,      
        nftinfo[tokenid].url,
        nftinfo[tokenid].outline,
        nftinfo[tokenid].sold,
        nftinfo[tokenid].seller,
        nftinfo[tokenid].results
        );
  } 
   }
