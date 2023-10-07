let contractAddress = {  
    meta5Addr: "0x20517593aF1704fdc3Ae0c8A791aC0D25bc04ad9"
  };
  let contractAbi = {
  
    meta5: [
       "function newmeta(uint _nftid,uint _metanum,string memory _pass,uint256 _init,string memory _mainpass) public",
       "function remetabuy(uint _nftid) public",
       "function remetaadd(uint _nftid,uint _metanum,string memory _pass,uint256 _init,string memory _mainpass) public",
       "function exactadd(uint _nftid) public",
       "function deletemeta(uint _nftid) public",
       "function exact(uint _nftid,uint _cat) public",
       "function allowcation(uint tokenid )public returns(bool)",
       "function newrequest()public  view virtua returns(bool)",
       "function g6() public view virtual returns(uint256)",
       "function g7() public view virtual returns(uint256)",
       "function g8(address user) public view virtual returns(uint256)",
       "function getcat(address user) public view virtual returns(uint256)",
       "function getownerOf(uint256 _nftid)public view virtual returns (address)",
       "function getmainpass(uint tokenid) external view returns (string memory)",
       "function getpass(uint256 tokenid) external view returns (string memory)",
       "function requestlength()external view returns (uint)",
       "function getrequest(uint num)external view returns (uint)",
       "function getsales(uint _meta5)external view returns (uint)",
       "function getmeta5(uint tokenid)external view returns (uint256[] memory)",
       "function getmetainfo(uint tokenid) public view returns(uint256 nftid,uint256 metanum,string memory metapass, uint256 init,bool play,uint256 depot)",
       "function metainfo(uint tokenid) public view returns(uint256 nftid,uint256 metanum,string memory metapass, uint256 init,bool play,uint256 depot)"
      ],
      
 

  };

  let topDataSync = async () => {

    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, provider);
  
    
    let newreq = await meta5Contract.newrequest();
    let metacut = await meta5Contract.g6();
    let metacat = await meta5Contract.g7();
    let request = await meta5Contract.requestlength();
  
    
    
    document.getElementById("Newreq").innerHTML= (newreq);

    document.getElementById("Metacut").innerHTML= (metacut);
    document.getElementById("Metacat").innerHTML = (metacat);
    document.getElementById("Request").innerHTML = (request);

    const nftIds = [2, 3, 4]; // NFT ID 목록

    for (let i = 0; i < nftIds.length; i++) {
      const nftId = nftIds[i];
  
      const nftInfo = await meta5Contract.getmetainfo(nftId);
      const owner = await meta5Contract.getownerOf(nftId);
      const priceElementId = `Metanum${nftId}`;  //어카운트
      const wpassElementId = `Wpass${nftId}`;  //관람자비번
      const ownerElementId = `Owner${nftId}`;
      const saleStatusElementId = `Play${nftId}`;
      const leftTimeElementId = `LeftTime${nftId}`;
  
      const priceElement = document.getElementById(priceElementId);
      const wpassElement = document.getElementById(wpassElementId);
      const ownerElement = document.getElementById(ownerElementId);
      const saleStatusElement = document.getElementById(saleStatusElementId);
      const leftTimeElement = document.getElementById(leftTimeElementId);
   

  
      // 요소가 존재하는지 확인하고 값을 설정
      if (priceElement) {
        priceElement.innerHTML = nftInfo.metanum;
      }
      if (wpassElement) {
        wpassElement.innerHTML = nftInfo.metapass;
      }
      if (ownerElement) {
        ownerElement.innerHTML = owner;
      }
      
     
     
      
      if (saleStatusElement) {
        if (nftInfo.play === false) {
          saleStatusElement.textContent = "현재 뭔가 요청한 상태 입니다";
        } else {
          saleStatusElement.textContent = "현재 플레이 가능 상태 입니다";
        }
      }
      if (leftTimeElement) {
        let nowt = Math.floor(new Date().getTime() / 1000);
        let left1 = parseInt(await nftInfo.depot);
        let left = parseInt((left1+ 604800 ) - nowt);      
        let day = parseInt(left/60/60/24);
        let hour = parseInt(left/3600)%24;
        let min = parseInt((left/60)%60);
        let sec = left%60;
        leftTimeElement.innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
      }
    }
  };
 



  let Exactadd = async (Nftid) => {
    
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0xCC",
            rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
            chainName: "opBNB",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://opbnbscan.com"]
        }]
    });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();
      
      let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
      
      try {
        await meta5Contract.exactadd(Nftid);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Remetabuy = async (Nftid) => {
    
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    
    let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
    
    try {
      await meta5Contract.exactadd(Nftid);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
};



let Allow = async (Nftid) => {
    
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0xCC",
        rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
        chainName: "opBNB",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
        },
        blockExplorerUrls: ["https://opbnbscan.com"]
    }]
});
  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();
  
  let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
  
  try {
    await meta5Contract.allowcation(Nftid);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};





let Getpass = async (Nftid) => {
    
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0xCC",
        rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
        chainName: "opBNB",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
        },
        blockExplorerUrls: ["https://opbnbscan.com"]
    }]
});


  await userProvider.send("eth_requestAccounts", []);
  let signer = userProvider.getSigner();
  let meta5Contract = new ethers.Contract(contractAddress.meta5Addr, contractAbi.meta5, signer);
  let mp;
if (Nftid === 2) {
    mp = await meta5Contract.getmainpass(2);
    document.getElementById("Mp2").innerHTML = mp;
} else if (Nftid === 3) {
    mp = await meta5Contract.getmainpass(3);
    document.getElementById("Mp3").innerHTML = mp;

} else if (Nftid === 4) {
  mp = await meta5Contract.getmainpass(4);
  document.getElementById("Mp4").innerHTML = mp;
}

};


 // 호출 코드
 topDataSync();
  

