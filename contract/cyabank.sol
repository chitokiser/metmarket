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
  
  interface Icyamember {     
  function  levelcheck(address user)external view returns(uint8) ;
  }

contract Cyabank  {   //여기에 CUT CAT 입금
  Icya cya;
  Icut cut;
  Icat cat;
  Icyamember cyamember;
  uint256[]public chart; 
  uint256 public price; 
  uint256 public allow; 
  uint256 public sold; 
  mapping(address => uint256)public allowt;
  mapping(address => uint256)public power;

      constructor(address _cya,address _cut,address _cat,address _cyamember) public {
      price=2e14;
      allow=1e14;
      cya=Icya(_cya);
      cat=Icat(_cat);
      cut=Icut(_cut);
      cyamember=Icyamember(_cyamember);
      }

    
function buycut(uint _num) public returns(bool) {  
   uint pay = _num * price;
    require(g6() >= _num,"cut sold out");  
    require(g7() >= _num/10,"cat sold out");  
    require(100 <= _num,"100 or more");
    require(cya.balanceOf(msg.sender) >= pay,"no cya"); 
      cya.approve(msg.sender, pay);
        uint256 allowance = cya.allowance(msg.sender, address(this));
        require(allowance >= pay, "Check the token allowance");
        cya.transferFrom(msg.sender, address(this), pay);  
        cut.transfer(msg.sender,_num);
        cat.transfer(msg.sender,_num/10);
        
      allowt[msg.sender] = block.timestamp;
      priceup();
      return true;     
}

function sellcut(uint num)public returns(bool){      
       uint256  pay = num*price;  
    require(100 <= num,"100 or more");
    require(g8(msg.sender) >= num,"no cut");
    require(g9(msg.sender) >= num,"no power");
    require(g1() >= pay,"no cya");
    cut.approve(msg.sender,num);
    uint256 allowance = cut.allowance(msg.sender, address(this));
    require(allowance >= num, "Check the  allowance");
    cut.transferFrom(msg.sender, address(this),num); 
    power[msg.sender] -= num;
   cya.transfer(msg.sender,pay);
    priceup();
    return true;
}

function withdraw( )public returns(bool){   
    require(getlevel(msg.sender)>=1,"no member");  
    require(g8(msg.sender)>=1,"no cut"); 
    require(allowt[msg.sender] + 30   <  block.timestamp,"not time"); //주1회
    require(cut.getdepot(msg.sender) + 30  <  block.timestamp,"cut not time"); //주1회
    uint256 pay = g8(msg.sender)*allow*getlevel(msg.sender)/2000;  
     allowt[msg.sender] = block.timestamp;
     cya.transfer(msg.sender,pay);
     return true;
}


function priceup( )public {
    sold = g11();
    allow=g1()/sold; 
    price=allow*2;
    chart.push(price);   
}

function powerup(uint _cat )public {
      require(getcat(msg.sender)>=_cat,"no cat"); 
      cat.approve(msg.sender, _cat);
    uint256 allowance = cat.allowance(msg.sender, address(this));
    require(allowance >= _cat, "Check the  allowance");
    
    cat.transferFrom(msg.sender, address(this), _cat); 
 
   power[msg.sender] += _cat;
}


function g1() public view virtual returns(uint256){  
  return cya.balanceOf(address(this));
  }


  function g3() public view virtual returns(uint256){  
  return cya.balanceOf(msg.sender);
  }
  function g4() public view virtual returns(uint){  
  return chart.length;
  }
    
  function g5(uint _num) public view virtual returns(uint256){  
  return chart[_num];
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
  function g9(address user) public view virtual returns(uint256){  
  return power[msg.sender];
  }
  
    function g10() public view virtual returns(uint256){  
  return cut.g1();  
  }
   
    
    function g11() public view virtual returns(uint256){  
  return g10() - g6();  //cut 총발행량 - 계약이 가지고 있는 cut
  }
  function getlevel(address user) public view virtual returns(uint256){  
  return cyamember.levelcheck(user);
  }

 
  function getprice() external view returns (uint256){
      return price; 
  }
  function geteps(address user) external view returns (uint256){  //다음 배당금
      return allow *g8(user) * (cyamember.levelcheck(user)/2000); 
  }
  
   function gettime( ) external view returns (uint256){  
      return (allowt[msg.sender] + 604800 ) - block.timestamp;
  }
   }