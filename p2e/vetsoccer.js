let address2= {
    soccerAddr: "0x955190cbA3f04e1CD2fA869e6E309652b00d6Cc1" };
 

    let abi2 = {
  
    soccer: [
        "function play(uint8 _winnum,uint pay) public",
        " function  getbal() public view returns(uint)",
        "function  getdepo(address user) public view returns(uint)",
        "event result(uint num1,uint num2)",
        "event reward(uint amount)"
      ]

  };
  
    let Stopdate = async () => {
 
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let soccerContract = new ethers.Contract(address2.soccerAddr,abi2.soccer, provider);
     
    


        soccerContract.on('reward', (amount) => {
            console.log('레버리지된금액:', amount);
            document.getElementById('eventS1').innerText = `GetMoney ${amount/1e18} CYA`;
        });

    
        soccerContract.on('result', (n1, n2) => {
            console.log('Match result:', n1, n2);
        
            let eventS2 = document.getElementById('eventS2');
            eventS2.innerHTML = ''; // Clear previous content
        
            // Show numbers 1 to 6 sequentially
            for (let i = 1; i <= 6; i++) {
                setTimeout(() => {
                    eventS2.textContent = i;
                }, 500 * i); // Adjust the delay as needed
            }
        
            // After showing numbers, display the actual result
            setTimeout(() => {
                eventS2.innerHTML = `
                    <span class="threed larger green">Home:${n1}</span> - <span class="threed larger red">Away:${n2}</span>
                `;
            }, 3500); // Adjust the delay as needed
        });
          
    };
          
    
  
  




    
  
    async function executePlayFunction(argument,argument2) {   //플레이 버튼
        try {
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
            let soccerContract = new ethers.Contract(address2.soccerAddr,abi2.soccer, signer);
           //let selectedValue = document.getElementById("bettingAmount").value; 
            const selectedValue = ethers.utils.parseUnits(document.getElementById('bettingAmount').value, 18);
            await soccerContract.play(argument, selectedValue); // Call the play function with the provided argument
        } catch(e) {
            alert(e.data.message.replace('execution reverted: ',''))
          }
    }
    
    document.getElementById("winButton").addEventListener("click", function() {
        executePlayFunction(1,"bettingAmount"); // Call executePlayFunction with argument 1 (win)
    });
    
    document.getElementById("drawButton").addEventListener("click", function() {
        executePlayFunction(2,"bettingAmount"); // Call executePlayFunction with argument 2 (draw)
    });
    
    document.getElementById("loseButton").addEventListener("click", function() {
        executePlayFunction(3,"bettingAmount"); // Call executePlayFunction with argument 3 (lose)
    });
 

 Stopdate();