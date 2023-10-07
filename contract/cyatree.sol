// SPDX-License-Identifier: MIT  
// ver1.0
pragma solidity >=0.7.0 <0.9.0;


interface Icat {     
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 happy) external returns (bool);
  function approve(address spender, uint256 happy) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 happy) external returns (bool);
  }


    contract cyatree {
  
      Icat cat;
      uint[12] taxnft; // for tax
      address admin;
      uint256 public sum;  
      uint256 public happy; 
      uint256 public fee;
      mapping (address => my)public myinfo;
      
   
     constructor(address _cat) public { 
    
      happy = 1000; //수당
      fee = 15000;  //
      cat = Icat(_cat);
      admin =msg.sender;
      myinfo[msg.sender].dep = 2;
      myinfo[msg.sender].mynum = 1;
    
      }

    struct my {
    uint256 depo; 
    uint256 dep;
    uint256 mynum;
    uint8 wc;  //withdraw limit

    }

function memberjoin( )public {   
    require(myinfo[msg.sender].dep == 0,"already member"); 
    require (cat.balanceOf(msg.sender)>=fee,"no cat");
        cat.approve(msg.sender,fee);
        uint256 allowance = cat.allowance(msg.sender, address(this));
    require(allowance >= fee, "Check the token allowance");
        cat.transferFrom(msg.sender, address(this), fee);
    uint num = random();
    taxnft[num] += fee*5/100;
      myinfo[msg.sender].dep = 2;
      myinfo[msg.sender].mynum = sum;
      sum += 1;

}


function check() public { 
    my storage tmy = myinfo[msg.sender]; 
    require(tmy.dep >=1 ,"no member");
    require(sum - tmy.mynum >= tmy.dep,"little member");
    require(tmy.wc < 15,"over withdraw");  //15회 인출 가능
     tmy.wc += 1;
    tmy.depo += happy*tmy.dep;
    tmy.mynum = (tmy.mynum+2)*2;
    tmy.dep = tmy.dep*2;
   
}
   
  function withdraw( )public {   
   uint256 pay = myinfo[msg.sender].depo * 90/100;
   require(pay > 0,"no depo");
   require(g1() >= pay,"no cat");
   myinfo[msg.sender].depo = 0; 
   cat.transfer(msg.sender,pay);
  }
  

     
  function happyup(uint _happy) public {
   require(admin == msg.sender,"no admin");
      happy = _happy;  
   } 


    function nftup(uint num,uint8 _nft)public  {   
   require( admin ==  msg.sender,"no admin");
   taxnft[num] =_nft;
  }
    
  function feeup(uint _fee) public {
   require(admin == msg.sender,"no admin");
      fee = _fee;  
   }  

 function g1() public view virtual returns(uint256){  
  return cat.balanceOf(address(this));
  }
  
 function g2() public view returns( uint256 depo,uint256 dep,uint256 mynum,uint8 wc){  
   my storage tmy=myinfo[msg.sender];
  return ( tmy.depo,
           tmy.dep,
           tmy.mynum,
           tmy.wc);
  }    
  function random() public view returns(uint){  //ver 1.1
  return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender))) % 12+1; 
 }    


 function getsum( ) public view returns(uint) {
  return sum;
    }

    function thistimepoint( ) public view returns(uint) { 
      my memory tmy = myinfo[msg.sender]; 
  return happy*tmy.dep;
    }
  function deposit()external payable{
  }
      function getnft(uint8 num) public view returns(uint) { //nft와 세금바가지 매칭 1번화분은 7번nft 와 매칭
  return taxnft[num];
  }  

}
  
