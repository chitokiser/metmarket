// Define contract address and ABI
let address3 = {
    roulAddr: "0xC82367b370594Ff48525F046EC5872D8F3097041"  // Address of the roul contract
  };
  
  let abi3 = {
    roul: [
      "function single(uint8 _win, uint bet) public",
      "function jack( ) public view returns (uint256)",
      "function  jackprice() public view returns(uint)",
      "function single(uint8 _win, uint bet) public",
      "function jackbet() public",
      "function hilow(uint8 _win, uint bet) public",
      "function dozen(uint8 _win, uint bet) public",
      "function evenodd(uint8 _win, uint bet) public",
      "event reward2(uint amount);", 
      "event reward3(uint amount);",
      "event reward4(uint amount);",
      "event result(uint num1)"
      

    ],
  };
  
 
  let updateRoulette = async () => {

    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    

    let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul, provider);
    
    let jack1 = await roulContract.jackprice();
    
    document.getElementById("Jackpot").innerHTML = parseFloat(jack1/1e18).toFixed(2);
  
//     roulContract.on('reward1', (amount) => {
//       console.log('Result value:', amount);
//       document.getElementById('Reward1').innerText = `${amount}CYA`;
//   });
   
  roulContract.on('reward2', (amount) => {
    console.log('Reward value:', amount);
    document.getElementById('Reward2').innerText = `${amount/1e18}CYA`;
});

roulContract.on('reward3', (amount) => {
  console.log('Reward value:', amount);
  document.getElementById('Reward3').innerText = `${amount/1e18}CYA`;
});

roulContract.on('reward4', (amount) => {
  console.log('Reward value:', amount);
  document.getElementById('Reward4').innerText = `${amount}CYA`;
});

// roulContract.on('reward5', (amount) => {
//   console.log('Result value:', amount);
//   document.getElementById('Reward5').innerText = `${amount}CYA`;
// });

// roulContract.on('reward6', (amount) => {
//   console.log('Result value:', amount);
//   document.getElementById('Reward6').innerText = `${amount}CYA`;
// });

    roulContract.on('result', (num1) => {
      console.log('Result value:', num1);
      document.getElementById('eventR1').innerText = `${num1}`;
      rouletter.stop(num1); // Call to stop the roulette according to the blockchain result.
  });
  
  var rouletter = {
  
      // Start button
      start: function () {
          var btn = document.querySelector('.rouletter-btn');
          var panel = document.querySelector('.rouletter-wacu');
  
          panel.style.transition = 'transform 5s ease-out'; // Adjust the transition duration and easing
          panel.style.transform = 'rotate(3600deg)'; // Spin the wheel multiple times for a smoother stop
      },
  
      // Stop button
      stop: function (num1) {
          var btn = document.querySelector('.rouletter-btn');
          var panel = document.querySelector('.rouletter-wacu');
          // The rotating plate shape was divided into 37 parts and the required angles were created as an array.
          // Later, if you change to array processing by returning the length in the for statement, you can process it more dynamically.
          var deg = [320, 150, 70, 130, 280, 190, 30, 250, 360, 270, 230, 50, 210, 340, 110, 300, 170, 10, 120, 330, 140, 0, 260, 290, 160, 80, 200, 40, 20, 240, 350, 100, 310, 180, 60, 36];
          //From here
          
          // Stop the wheel at the specified result number
          var stopAngle = deg[num1];
          panel.style.transition = 'transform 2s ease-in-out'; // Adjust the transition duration and easing for smoother stop
          panel.style.transform = 'rotate(' + stopAngle + 'deg)';
      }
  }

}


  let Jack = async () => {
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
    let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul,signer);
   
    try {
      await roulContract.jackbet();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };




  async function  Single(Singlenum,argument2){
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
  let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul,signer);
    
  const selectedValue = ethers.utils.parseUnits(document.getElementById('betmoney').value, 18);
  let singlenum = document.getElementById("Singlenum").value;  
  try {
    await roulContract.single(singlenum,selectedValue);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};


document.getElementById("singleB").addEventListener("click", function() {
  Single("Singlenum","betmoney"); 
});



async function  Dozen(argument,argument2){
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
  let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul,signer);
    
  const selectedValue = ethers.utils.parseUnits(document.getElementById('betmoney').value, 18);
  try {
    await roulContract.single(argument,selectedValue);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};

document.getElementById("dozen1").addEventListener("click", function() {
  Dozen(1,"betmoney"); 
});
document.getElementById("dozen2").addEventListener("click", function() {
  Dozen(2,"betmoney"); 
});
document.getElementById("dozen3").addEventListener("click", function() {
  Dozen(3,"betmoney"); 
});



async function  Odd(argument,argument2){
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
  let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul,signer);
    
  const selectedValue = ethers.utils.parseUnits(document.getElementById('betmoney').value, 18); 
  try {
    await roulContract.single(argument,selectedValue);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};

document.getElementById("oddB").addEventListener("click", function() {
  Odd(1,"betmoney"); 
});
document.getElementById("evenB").addEventListener("click", function() {
  Odd(2,"betmoney"); 
});
    
  updateRoulette();
  