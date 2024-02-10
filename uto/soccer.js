let address2= {
    soccerAddr: "0x0ba248b36c02780E153632D034b3eF9B4E9DC843"
  };
  let abi2 = {
  
    soccer: [
        "function play(uint8 _winnum) public",
        "function  g3() public view returns(uint)",
        "function myfee(address user ) public view returns(uint)",
        "event result(uint num1,uint num2)",
        "event reward(uint amount)"
      ]

  };
  
    let Stopdate = async () => {
 
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let soccerContract = new ethers.Contract(address2.soccerAddr,abi2.soccer, provider);
        let stvl = await soccerContract.g3();
        document.getElementById("Stvl").innerHTML = parseInt(stvl);
        // document.getElementById("Winre").innerHTML =  parseFloat(300/rate).toFixed(2);
        // document.getElementById("Drawre").innerHTML =  parseFloat(550/rate).toFixed(2);
        // document.getElementById("Losere").innerHTML =  parseFloat(320/rate).toFixed(2);

        soccerContract.on('reward', (amount) => {
            console.log('레버리지된금액:', amount);
            document.getElementById('eventS1').innerText = `${amount} LOT`;
        });

        soccerContract.on('result', (n1, n2) => {
            console.log('경기결과:', n1, n2);
    
            document.getElementById('eventS2').innerHTML = `
            <span class="threed larger red">${n1}</span> - <span class="threed larger red">${n2}</span>
            `;
        });
    
        




    };
  
  
  
    async function executePlayFunction(argument) {
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
            
            let soccerContract = new ethers.Contract(address2.soccerAddr, abi2.soccer, signer);
            
            await soccerContract.play(argument); // Call the play function with the provided argument
        } catch (error) {
            alert(error.message); // Display error message if execution fails
        }
    }
    
    document.getElementById("winButton").addEventListener("click", function() {
        executePlayFunction(1); // Call executePlayFunction with argument 1 (win)
    });
    
    document.getElementById("drawButton").addEventListener("click", function() {
        executePlayFunction(2); // Call executePlayFunction with argument 2 (draw)
    });
    
    document.getElementById("loseButton").addEventListener("click", function() {
        executePlayFunction(3); // Call executePlayFunction with argument 3 (lose)
    });
    
 



 Stopdate();