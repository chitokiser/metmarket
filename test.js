let contractAddress = {
    cyanftAddr: "0x7794C70c4EE180EE099d37CDF28e03Fdb8a20050",
    actAddr: "0xf226FEEc77C191342180cb12809f88234E75661E",
    cut: "0xE3Db99b8fBd7154201eA7F6326390787d1c53614"
  };
   let contractAbi = {
  
    cyanft: [
      "function getnftinfo(uint tokenid) public view returns (uint256 nftid, uint256 price, string memory url, string memory outline, bool sold, address seller, uint results)",
      "function getownerOf(uint256 _nftid) public view virtual returns (address)",
      "function add(uint _nftid, uint _price, string memory _url, string memory _outline) public returns (bool)"
    ], 
  
    act: [
       "function buy(uint256 tokenId) public returns (bool)",
       "function withdraw() public",
       "function sellerpay(address user) public returns (uint256)"
    ],
    cut: [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)",
      "function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)",
      "function balanceOf(address tokenOwner) public override view returns (uint256)"
    ],
  };
  
  

  const topDataSync = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    const cyanftContract = new ethers.Contract(contractAddress.cyanftAddr, contractAbi.cyanft, provider);
    
    const nftIds = [2, 3, 4, 5, 6, 7]; // NFT ID 목록
  
    for (let i = 0; i < nftIds.length; i++) {
      const nftId = nftIds[i];
  
      const nftInfo = await cyanftContract.getnftinfo(nftId);
      const owner = await cyanftContract.getownerOf(nftId);
  
      const priceElementId = `Price${nftId}`;
      const ownerElementId = `Owner${nftId}`;
      const saleStatusElementId = `saleStatus${nftId}`;
  
      const priceElement = document.getElementById(priceElementId);
      const ownerElement = document.getElementById(ownerElementId);
      const saleStatusElement = document.getElementById(saleStatusElementId);
  
      // 요소가 존재하는지 확인하고 값을 설정
      if (priceElement) {
        priceElement.innerHTML = nftInfo.price;
      }
  
      if (ownerElement) {
        ownerElement.innerHTML = owner;
      }
  
      if (saleStatusElement) {
        if (nftInfo.sold === false) {
          saleStatusElement.textContent = "판매완료";
        } else {
          saleStatusElement.textContent = "판매중";
        }
      }
    }
  };
  
  // 호출 코드
  topDataSync();
  