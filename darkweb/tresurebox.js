
let address= {
  tresureAddr: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",
  vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
   }
let abi = {

  tresure: [
      "function openbox(uint _id) public",
      "function  total( ) public view returns(uint)",
      "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
      "function getpower(address user) public view returns(uint)",
      "event reward(uint amount);"
    ],

    vetbank: [
     
      "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
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



async function Openbox() {
  // Connect to the user's Web3 provider
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  
  // Request adding Binance Smart Chain to wallet
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
  
  // Request access to user's accounts
  await userProvider.send("eth_requestAccounts", []);
  
  // Get the signer (account) from the provider
  let signer = userProvider.getSigner();

  // Instantiate the treasure contract with the signer
  let tresureContract = new ethers.Contract(address.tresureAddr, abi.tresure, signer);
  
  // Retrieve the treasure ID from HTML input
  let treasureId = document.getElementById("tid").value;
  
  // Log the retrieved value (for debugging)
  console.log("Treasure ID:", treasureId);
  
  try {
      // Call the contract's 'openbox' function with the retrieved treasure ID
      await tresureContract.openbox(treasureId);
  } catch(e) {
      // Handle any errors that occur during the transaction
      alert(e.data.message.replace('execution reverted: ',''));
  }
};

  document.getElementById("treasureButton").addEventListener("click", Openbox);

  let MemberLogin = async () => {
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
    let vetContract = new ethers.Contract(address.vetbankAddr, abi.vetbank, signer);
    let my = await vetContract.myinfo(await signer.getAddress());
    let tpoint =  parseInt(await my[0]);
    let point =  parseInt(await my[1]);
   

    document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
    document.getElementById("Point").innerHTML= (point/1E18).toFixed(4);   //찾을 돈 돈

  
  };




