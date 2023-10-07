// SPDX-License-Identifier: MIT  
//ver1.2
pragma solidity >=0.7.0 <0.9.0;


  interface Icat{
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  }


    contract Cyamember {
   
    Icat cat;
    
    uint256 public sum; 
    address public admin;
     mapping(address => uint8)public staff;
     mapping(address => my)public myinfo;
     mapping(address => uint256)public lev;
     mapping(address => uint256)public mentolev;
          
    constructor(address _cat) public {
      cat=Icat(_cat);
      lev[msg.sender] =10; 
      mentolev[msg.sender] = 5;
      myinfo[msg.sender].mento = _cat;
      admin=msg.sender;
      staff[msg.sender] = 5;
    }
  struct my{
    uint256 exp;
    uint256 bonus;
    address mento;
   
    }
 

   function staffup(address _staff,uint8 num)public {  
        require(staff[msg.sender] >= 5,"no staff"); 
        staff[_staff] = num;
        }   
   
    function mentoadd(address user )public{
      
     require(mentolev[user] == 0,"already mento");
     require(admin == msg.sender);
     mentolev[user] = 1;
    }
        
   function mentolevelup( )public{
   
     require(mentolev[msg.sender] >= 1,"no mento");
     require(lev[msg.sender] > (mentolev[msg.sender]*2),"level little");
     lev[msg.sender] -= mentolev[msg.sender]*2;
     mentolev[msg.sender] += 1;
   
    }
    
function adminex(address newadmin)public{
    require(admin == msg.sender);
    admin = newadmin;
}

function memberjoin(address _mento) public {  
   uint256 mel = mentolev[_mento];
   uint256 myl= lev[msg.sender];
    require(myl == 0,"already member"); 
    require(mel >= 1,"no mento");

     lev[msg.sender]= 1;
      myinfo[msg.sender].mento= _mento;
      sum += 1;
   }


function bonuswithdraw( )public {
   
      uint256 myb=myinfo[msg.sender].bonus* mentolev[msg.sender];
      require(myb >= 1,"no bonus");
      cat.transfer(msg.sender,myb);
      myinfo[msg.sender].bonus = 0;

  }
   
function expup(uint256 _num) public {

    require(g1(msg.sender) >= _num, "no cat");
    require( _num >= 100, "no cat");
    
    cat.approve(msg.sender, _num);
    uint256 allowance = cat.allowance(msg.sender, address(this));
    require(allowance >= _num, "Check the token allowance");
    
    cat.transferFrom(msg.sender, address(this), _num); 
    myinfo[msg.sender].exp += _num*100;
}


function mylevellup() public {
    uint256 mylev = lev[msg.sender];
    uint256 myexp = myinfo[msg.sender].exp;
    require(mylev >= 1  && myexp >= mylev*20000, "Insufficient requirements");
    myinfo[msg.sender].exp -= mylev**2*10000;
    myinfo[myinfo[msg.sender].mento].bonus +=  mylev*20;
    lev[msg.sender] += 1;
}

   function g1(address user) public view virtual returns(uint256){  
  return cat.balanceOf(user);
  }
   function catbal() public view virtual returns(uint256){  
  return cat.balanceOf(address(this));
  }


   function getmymento(address user)public view returns(address) {
      return myinfo[user].mento;
 }
 function  levelcheck(address user)public view returns(uint256) {
      return lev[user];
  }
   function  mentolevelcheck(address user)public view returns(uint256) {
      return mentolev[user];
  }
  function getmyinfo() public view returns(uint256,uint256,address){  
  return ( myinfo[msg.sender].exp,
          myinfo[msg.sender].bonus,
          myinfo[msg.sender].mento);
  }  
    }




