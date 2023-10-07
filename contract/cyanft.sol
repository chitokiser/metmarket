// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Cyanft is ERC721 {
    // https://ethereum.stackexchange.com/questions/97186/what-is-the-reason-behind-writing-using-counters-for-counters-counters-when-us
    using Counters for Counters.Counter; 
    Counters.Counter private deedId;
    address public admin;
    mapping(address => uint8)public staff;
    mapping(uint => string) tokenURIs;
    address []public sum;  //staff sum

    constructor() ERC721("CYANFT", "CNFT") {
      admin = msg.sender;
      staff[msg.sender] = 5 ;
    }
   
 
 
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      return tokenURIs[tokenId];
    }

    function staffup(address _staff,uint8 _num)public {
      require(admin == msg.sender,"no admin");
      staff[_staff] = _num;
      sum.push(_staff);
    }


    function mintNFT(address to, string memory uri) public returns (uint256)
    {
        require(staff[msg.sender] >= 5,"no staff");
      
        deedId.increment();
        uint256 newDeedId = deedId.current();
        _mint(to, newDeedId);
        tokenURIs[newDeedId] = uri;

        return newDeedId;
    }
}
