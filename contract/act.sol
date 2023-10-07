// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface Icut {     
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  }

interface Imarket {     
  function buy(uint256 tokenId) external returns (bool);
  function getownerOf(uint256 _nftid) external view virtual returns (address);
  function getsold(uint tokenId) external view virtual returns (bool);
  function getprice(uint256 tokenId) external view virtual returns (uint);
  function riciver(address from, address to, uint tokenId) external ; 
  function getseller(uint256 tokenId) external view virtual returns (address); 
  }
contract Act {
    Imarket market;
    Icut cut;
    mapping(uint256 => uint256 )public extrapay;
    mapping(address => uint256 )public sellerpay;   //판매자 수당

    constructor(address _market,address _cut) public {
        market = Imarket(_market);
        cut = Icut(_cut);
    }


    function buy(uint256 tokenId) public returns (bool) {
    require(market.getsold(tokenId) == true, "Token is not for sale.");
    uint price = getprice(tokenId);
    require(g3(msg.sender) >= price, "Not enough funds.");
    cut.approve(msg.sender, price);
    uint256 allowance = cut.allowance(msg.sender, address(this));
    require(allowance >= price, "Check allowance.");
    cut.transferFrom(msg.sender, address(this), price);
    market.riciver(address(this),msg.sender,tokenId);
    extrapay[tokenId] = price;
    address seller = getseller(tokenId);
    sellerpay[seller] += price;
    return true;
    }


    function withdraw() public  {
   
    require(sellerpay[msg.sender] >= 1, "no cut.");
    cut.transfer(msg.sender,sellerpay[msg.sender]);
    sellerpay[msg.sender] = 0;
  
    }
 
   function g1() public view virtual returns (uint256) {
   return cut.balanceOf(address(this));
    }

   
     function g3(address user) public view virtual returns (uint256) {
        return cut.balanceOf(user);
    }

   function getseller(uint256 tokenId) public view virtual returns (address) {
        return market.getseller(tokenId);
    }
       function getprice(uint tokenId) public view virtual returns (uint256) {
        return market.getprice(tokenId);
    }
     function getsold(uint tokenId) public view virtual returns (bool) {
        return market.getsold(tokenId);
    }
}
