
let address= {
  tresureAddr: "0x2ca4fB35eA908Bb41434Fe5B496B43FaE5c5e4fd"};//주소만 바꾸었음
let abi = {

  tresure: [
      "function openbox1( ) public returns(bool)",
      "function openbox5( ) public returns(bool)",
      "function openbox50( ) public returns(bool)",
      "function openbox500( ) public returns(bool)",
      "function openbox5000( ) public returns(bool)",
      "function openboxsp( ) public returns(bool)",
      "function  total( ) public view returns(uint)",
      "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
      "function getpower(address user) public view returns(uint)",
      "event reward(uint amount);"
    ],

};


document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  let Ttopdate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
      let treasureContract = new ethers.Contract(address.tresureAddr, abi.tresure, provider);
      let tvl = await treasureContract.total();
      document.getElementById("Total").innerHTML = parseFloat(tvl / 1e18).toFixed(4);
      
      // Register event listener after contract initialization
      treasureContract.on('reward', (amount) => {
        console.log('Reward Amount:', amount);
        let eventS1Element = document.getElementById('eventT1');
        if (eventS1Element) {
          eventS1Element.innerText = `Get point: ${amount / 1e18}p`;
        } else {
          console.error('Error: Element with ID "eventT1" not found.');
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  Ttopdate();  
});



  let Open1= async () => {
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

    let tresureContract = new ethers.Contract(address.tresureAddr, abi.tresure, signer);

    try {
      await tresureContract.openbox1( );
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Open5= async () => {
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

    let tresureContract = new ethers.Contract(address.tresureAddr, abi.tresure, signer);

    try {
      await tresureContract.openbox5( );
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };





  