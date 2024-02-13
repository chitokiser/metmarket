// Define contract address and ABI
let address3 = {
    roulAddr: "0x9898C50e9D63Ff596B83de78E9a55220FFB44208"  // Address of the roul contract
  };
  
  let abi3 = {
    roul: [
      "function single(uint8 _win, uint bet) public",
      "function jack( ) public view returns (uint256)",
      "function  jackprice() public view returns(uint)",
      "function single(uint8 _win, uint bet) public",
      "function jackbet() public",
      "event result(uint num1)"
    ],
  };
  
 
  let updateRoulette = async () => {

    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    

    let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul, provider);
    
    let jack1 = await roulContract.jackprice();
    
    document.getElementById("Jackpot").innerHTML = parseFloat(jack1/1e18).toFixed(2);




    roulContract.on('result', (num1) => {
      console.log('Result value:', num1);
      document.getElementById('eventR1').innerText = `${num1}`;
      rouletter.stop(num1); // 블록체인 결과값에 따라 룰렛을 멈추도록 호출합니다.
  });
  
  var rouletter = {
  
      // Start button
      start: function () {
          var btn = document.querySelector('.rouletter-btn');
          var panel = document.querySelector('.rouletter-wacu');
  
          panel.classList.add('on');
          btn.innerText = 'stop';
      },
  
      // Stop button
      stop: function (num1) {
          var btn = document.querySelector('.rouletter-btn');
          var panel = document.querySelector('.rouletter-wacu');
          // The rotating plate shape was divided into 37 parts and the required angles were created as an array.
          // Later, if you change to array processing by returning the length in the for statement, you can process it more dynamically.
          var deg = [320, 150, 70, 130, 280, 190, 30, 250, 360, 270, 230, 50, 210, 340, 110, 300, 170, 10, 120, 330, 140, 0, 260, 290, 160, 80, 200, 40, 20, 240, 350, 100, 310, 180, 60, 36];
          //여기서 부터
          var duration = 5000; // Set the duration in milliseconds (5 seconds in this example)
          var startTime = Date.now();
      
          function spinForDuration() {
              var elapsedTime = Date.now() - startTime;
              if (elapsedTime < duration) {
                  // Continue spinning if the duration hasn't elapsed yet
                  var randomAngle = Math.floor(Math.random() * deg.length); // Generate a random angle
                  panel.style.transform = 'rotate(' + deg[randomAngle] + 'deg)';
                  requestAnimationFrame(spinForDuration);
              } else {
                  // Stop the wheel at the specified result number after the set duration
                  var stopAngle = deg[num1];
                  panel.style.transform = 'rotate(' + stopAngle + 'deg)';
                  panel.classList.remove('on');
                  btn.innerText = 'start'; // Processed as a bet
              }
          }
          document.getElementById('jaack').addEventListener('click', Jack);ㅎ
          spinForDuration();
      }
          //여기까지
          // Stop the wheel at the specified result number
          // var stopAngle = deg[num1];
          // panel.style.transform = 'rotate(' + stopAngle + 'deg)';
          // panel.classList.remove('on');
         
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




// let Single = async () => {
//   let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
//   await window.ethereum.request({
//     method: "wallet_addEthereumChain",
//     params: [{
//         chainId: "0xCC",
//         rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
//         chainName: "opBNB",
//         nativeCurrency: {
//             name: "BNB",
//             symbol: "BNB",
//             decimals: 18
//         },
//         blockExplorerUrls: ["https://opbnbscan.com"]
//     }]
// });
//   await userProvider.send("eth_requestAccounts", []);
//   let signer = userProvider.getSigner();
//   let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul,signer);
    
//   const selectedValue = ethers.utils.parseUnits(document.getElementById('bettingAmount').value, 18);
//   const winnum = parseInt('2')
//   try {
//     await roulContract.single(winnum,selectedValue);
//   } catch(e) {
//     alert(e.data.message.replace('execution reverted: ',''))
//   }
// };

  


    
  updateRoulette();
  