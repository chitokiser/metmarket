// SPDX-License-Identifier: MIT  
//ver1.2
pragma solidity >=0.7.0 <0.9.0;

  
  interface Icya{
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool); 
  }
  


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
    
 
contract monkey  {   //1인 발행인
  
  Icya cya;
  Imutbank mutbank;
  address public admin; 
  address public taxbank;
  uint256 public mid; 
  uint256 public level; 
  uint256 public exp; 
  uint256 public masterfee;  
  uint256 public total;  
  uint256 public originfee;  //origint 수당
  address public origin;
  bool public sell;
  

  mapping(address => uint8)public staff;
  mapping(uint256 => meta)public metainfo;  
  
  mapping(uint256 => string)private mainpass;  
      
      
   constructor(address _cya, address _taxbank, address _mutbank,address _origin) {
    cya = Icya(_cya);
    mutbank = Imutbank(_mutbank);
    admin = msg.sender;
    staff[msg.sender] = 5;
    taxbank = _taxbank;
    masterfee = 5000*1e18;
    origin = _origin;
    level = 5;
}


    struct meta{
    uint256 mid;
    uint256 total; //총매출 없어도 됨
    uint256 metanum;
    string  investor;
    uint256 init;  //최초가격
    uint8 trade; //거래가능성
    address owner;  //최초값은 SC
    }

   

function staffup(address _staff,uint8 _level )public {   
    require(staff[msg.sender] >= 5,"no staff");
    staff[_staff] = _level;
} 

function taxbankup(address _taxbank )public {   
    require(staff[msg.sender] >= 5,"no staff");
    taxbank = _taxbank;
} 

  function originup(address _origin) public {  //발행인 업
      require(staff[msg.sender] >= 5,"no staff");
      origin = _origin;
    }
    
    
    function adminlevelup(uint _level) public {  //발행인 업
      require(staff[msg.sender] >= 5,"no staff");
      level = _level;
    }
    


function masterfeeup(uint256 _masterfee)public {   
    require(staff[msg.sender] >= 5,"no staff");
    masterfee = _masterfee*1e18;
} 


function sellup(uint256 _masterfee)public {   //origin 판매
    require(staff[msg.sender] >= 5,"no staff");
    sell = true;
} 


function moneylevelup()public {   //현질기능
    uint pay = 2**level*1e18;
    require(origin == msg.sender,"no origin");
    require(mutbank.g9(msg.sender) >= pay,"no point"); 
    require(level<31,"highest level");  
     mutbank.depodown(msg.sender,pay);
     level += 1;
} 

function explevelup()public {   // 경험치
    uint pay = 2**level*1e18;
    require(origin == msg.sender,"no origin");
    require(exp >= pay,"no exp"); 
    require(level<31,"highest level");  
     exp -= pay;
     level += 1;
} 



function originbuy()public {   
    require(sell == true,"Not for sale");
    require(mutbank.g9(msg.sender) >= masterfee,"no cya"); 
      
      mutbank.depodown(msg.sender,masterfee);
       mutbank.depoup(origin,masterfee);
        origin = msg.sender;
        sell = false;
} 



    function charge(uint _pay) public {  
        uint pay = _pay*1e18;
        require(g2(msg.sender) >= pay,"no cya");  
        cya.approve(msg.sender, pay); 
        uint256 allowance = cya.allowance(msg.sender, address(this));
        require(allowance >= pay, "Check the token allowance");
        cya.transferFrom(msg.sender, address(this), pay);  
        mutbank.depoup(msg.sender,pay);
    }



    
    function priceup(uint _mid,uint _init) public {  //가격 
      require(staff[msg.sender] >= 5,"no staff");
      metainfo[_mid].init = _init;
    }
    
  

  function newmeta(uint _metanum,string memory _investor,uint256 _init,string memory _mainpass) public{  
    require(staff[msg.sender] >= 5 || origin == msg.sender ,"no origin");

    metainfo[mid].mid = mid;  //계좌id 설정
    metainfo[mid].metanum = _metanum;  //계좌를 미리 매칭해둠
    metainfo[mid].investor = _investor;  //관람자 비번
    metainfo[mid].init = _init * 1e18;  //시작가
    metainfo[mid].trade = 3;  // 3이면 거래가능  2승인준비중 1플레이중 4보상완료
    mainpass[mid] = _mainpass;  //배열 따로  
    metainfo[mid].owner = taxbank; //최초 계좌원가 받을 계좌주인SC
    mid += 1;
}


   function buy(uint _mid) public {  
        uint pay = metainfo[_mid].init;
        require(metainfo[_mid].trade == 3,"not for sale");
        require(mutbank.getlevel(msg.sender) >= 1,"no member");
        require(mutbank.g9(msg.sender) >= pay,"no point");  
        mutbank.depodown(msg.sender,pay);
        mutbank.expup(msg.sender,pay/1e16);
        metainfo[_mid].trade = 1;
        mutbank.depoup(metainfo[_mid].owner,pay);
        
        originfee += pay*level/100;
        metainfo[_mid].owner = msg.sender;
        uint totalrate = 100-level;
        total += pay * totalrate/100 ;
        exp += pay;
    }




function selladd(uint _mid, uint256 _init) public {  
    require(metainfo[_mid].owner == msg.sender, "no owner");
    require(metainfo[_mid].init * 120 / 100 <= _init*1e18, "little profit realization");
    metainfo[_mid].init = _init*1e18;  // 시작가 업데이트
    metainfo[_mid].trade = 2;  // 거래 대기상태
    
}

function reward(uint _mid) public {  
    uint pay = metainfo[_mid].init;
    require(staff[msg.sender] >= 5,"no origin");
    require(metainfo[_mid].trade ==2,"not for sale"); 
    require(total >= pay ,"no point"); 
 
     mutbank.depoup(metainfo[_mid].owner,pay);
      metainfo[_mid].trade =4;
      uint fee = pay*level/100;
      originfee += fee;
      total -= pay+fee;
}

function approval(uint _mid) public {  //거래 가능 승인
    require(staff[msg.sender] >= 3,"no staff");
    require(metainfo[_mid].trade == 2, "lack of conditions");
    metainfo[_mid].trade = 3;  // 거래 가능상태
    taxtrans(); //cya이체
}

function originwithdraw() public {  
    require(origin == msg.sender ,"no origin");
    require(originfee >= 1e18,"no money to find"); 
    uint pay = originfee;
    originfee = 0;
    mutbank.depoup(origin,pay);
}


function repaire(uint _mid,uint _metanum,string memory _pass,uint256 _init,string memory _mainpass) public{  
    
    require(staff[msg.sender] >= 5,"no origin");
    metainfo[_mid].metanum = _metanum;  //신규계좌 등록
    metainfo[_mid].investor=_pass;  //관람자 비번
    metainfo[_mid].init = _init*1e18;  //시작가
    metainfo[_mid].trade = 3;
    metainfo[mid].owner = taxbank; //최초 계좌원가 받을 계좌주인SC
    mainpass[_mid] = _mainpass;  //배열 따로  
}





function taxtrans( )internal{   
    uint pay = g1();
    cya.transfer(taxbank,pay);  
} 

  
 function g1() public view virtual returns(uint256){  
  return cya.balanceOf(address(this));
  }

  function g2(address user) public view virtual returns(uint256){  
  return cya.balanceOf(user);
  }
  

  
  function getmainpass(uint _mid) external view returns (string memory){  //메인패스
     require(metainfo[_mid].owner == msg.sender,"no owner");
      return mainpass[_mid]; 
  }
  
  function getpass(uint256 _mid) external view returns (string memory){  //관람자 패스
      return metainfo[_mid].investor;  
  }
 
 

   function getmento(address user) external view returns (address){  //유저별멘토
      return mutbank.getmento(user) ;
  }

    function getlevel(address user) external view returns (uint){  //유저별 레벨
      return mutbank.getlevel(user);
  }
 




}




  
    