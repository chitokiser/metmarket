// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// "Cyanft" 스마트 계약
contract Cyanft is ERC721 {
    using Counters for Counters.Counter; 
    Counters.Counter private deedId;
    address public admin;
    mapping(address => uint8) public staff;
    mapping(uint => string) tokenURIs;
    address[] public sum; // staff sum

    constructor() ERC721("CYANFT", "CNFT") {
        admin = msg.sender;
        staff[msg.sender] = 5;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function staffup(address _staff, uint8 _num) public {
        require(admin == msg.sender, "no admin");
        staff[_staff] = _num;
        sum.push(_staff);
    }

    function mintNFT(address to, string memory uri) public returns (uint256) {
        require(staff[msg.sender] >= 5, "no staff");
        deedId.increment();
        uint256 newDeedId = deedId.current();
        _mint(to, newDeedId);
        tokenURIs[newDeedId] = uri;
        return newDeedId;
    }
}

// "cyanftmarket" 스마트 계약


contract cyanftmarket2 is Cyanft {
  

    uint256[] public nftadd; // nft 등록 배열
    mapping(uint256 => nft) public nftinfo; // nft 정보 보기
   
    address public act;   //바이함수 호출

    constructor( address _cyanft) Cyanft() {
     
    }

    struct nft {
        uint256 nftid;
        uint256 price;
        string url;
        string outline; // 간단설명
        bool sold;
        address seller;
        uint256 results; // 판매후 받은 금액;
    }

     
     function dataedit(uint _nftid, uint _price, string memory _url, string memory _outline) public returns (bool) {
        address owner = getownerOf(_nftid);
        require(owner == msg.sender, "Only the NFT owner can add it.");
        nftinfo[_nftid].nftid = _nftid;
        nftinfo[_nftid].price = _price;
        nftinfo[_nftid].url = _url;
        nftinfo[_nftid].outline = _outline;
        return true;
    }


     function add(uint _nftid, uint _price, string memory _url, string memory _outline) public returns (bool) {
        address owner = getownerOf(_nftid);
        require(owner == msg.sender, "Only the NFT owner can add it.");
        nftinfo[_nftid].nftid = _nftid;
        nftinfo[_nftid].price = _price;
        nftinfo[_nftid].url = _url;
        nftinfo[_nftid].outline = _outline;
        nftinfo[_nftid].sold = true;
        nftinfo[_nftid].seller = msg.sender;
        require(getownerOf(_nftid) == owner, "Token is not owned by the contract.");
        approve(act, _nftid);
        transferFrom(msg.sender,act, _nftid);  
        nftadd.push(_nftid);
        return true;
    }


 
    function riciver(address from, address to, uint tokenId) public {
        require(staff[msg.sender] >= 5, "no staff");
        require(getownerOf(tokenId) == from,"no nft owner");
        uint price =  nftinfo[tokenId].price;
        nftinfo[tokenId].results = price;
        nftinfo[tokenId].sold = false;
        approve(to, tokenId);
        transferFrom(from,to, tokenId);
    
    }
     function actup(address _act) public {
        require(staff[msg.sender] >= 5, "no stafff");
        act = _act;}

      function getsold(uint tokenId) public view virtual returns (bool) {
        return nftinfo[tokenId].sold;
    }

    function getownerOf(uint256 _nftid) public view virtual returns (address) {
        return ownerOf(_nftid);
    }

     function getprice(uint256 tokenId) public view virtual returns (uint) {
        return nftinfo[tokenId].price;
    }
      function getseller(uint256 tokenId) public view virtual returns (address) {
        return nftinfo[tokenId].seller;
    }
    function getnftinfo(uint tokenid) public view returns (uint256 nftid, uint256 price, string memory url, string memory outline, bool sold, address seller, uint results) {
        return (
            nftinfo[tokenid].nftid,
            nftinfo[tokenid].price,
            nftinfo[tokenid].url,
            nftinfo[tokenid].outline,
            nftinfo[tokenid].sold,
            nftinfo[tokenid].seller,
            nftinfo[tokenid].results
        );
    }
}
