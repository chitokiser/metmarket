// SPDX-License-Identifier: MIT  
// ver1.0
pragma solidity >=0.7.0 <0.9.0;



    interface Imutbank{      //멋뱅크
     function depoup(address _user, uint _depo) external;
    function depodown(address _user, uint _depo) external;
    function getprice() external view returns (uint256);
    function getlevel(address user) external view returns (uint);
    function g9(address user) external view returns (uint);  // 각 depo현황
    function getagent(address user) external view returns (address);
    function getmento(address user) external view returns (address);
    function expup(address _user,uint _exp) external;
  
  }  

 //한달안에 받을돈이 10%이상 안되면 확정이자 110% 
 //참가비 10cya
 //추천인 등록시 10% 수당
 //수확한 과일 삭제기능
    contract metree {
  
      Imutbank mutbank;
      uint[12] taxnft; // for tax
      address admin;
      uint256 public sum;  
      uint256 public happy; 
      uint256 public fee;
      uint256 public mid;
      mapping (uint256 => my)public myinfo;
      mapping (address => uint[])public myfruit;
      
   
     constructor(address _mutbank) public { 
    
      happy = 100; //수당
      fee = 1500;  //
      mutbank = Imutbank(_mutbank);
      admin =msg.sender;
      myinfo[msg.sender].dep = 2;
      myinfo[msg.sender].mynum = 1;
    
      }

    struct my {
    uint256 mid;
    uint256 depot; 
    uint256 depo; 
    uint256 dep;
    uint256 mynum;
    address owner ;
    uint8 wc;  //withdraw limit

    }

function memberjoin( )public {   

    require (mutbank.g9(msg.sender)>=fee,"no point");
        mutbank.depodown(msg.sender,fee);
        
      myinfo[mid].dep = 2;
      myinfo[mid].mynum = sum;
      myinfo[mid].owner = msg.sender;
      sum += 1;
      mid += 1;
      

}


function check(uint _mid) public { 
    my storage tmy = myinfo[_mid]; 
    require(tmy.dep >=1 ,"no fruit");
    require(tmy.wc < 15,"over withdraw");  //15회 인출 가능
    
    if(sum - tmy.mynum >= tmy.dep){
     tmy.wc += 1;
    tmy.depo += happy*tmy.dep;
    tmy.mynum = (tmy.mynum+2)*2;
    tmy.dep = tmy.dep*2;
    }
}
   
  function withdraw(uint _mid )public {   
   uint256 pay = myinfo[_mid].depo;
   require(pay > 0,"no depo");
   myinfo[msg.sender].depo = 0; 
   cat.transfer(msg.sender,pay);
  }
  
   
  
 function deleteFruit(address _address, uint _index) public {
    require(_index < myfruit[_address].length, "Index out of bounds");
    myfruit[_address][_index] = 0; // 요소를 0으로 설정하여 무효화
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
  
