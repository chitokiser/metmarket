let address2= {
    soccerAddr: "0x806e85b8128AE8AaDF38E3FBd186f4d86ff8251f"
  };
  let abi2 = {
  
    soccer: [
        "function play(uint8 _winnum,uint pay) public",
        "function  g3() public view returns(uint)",
        "function  g4(address user) public view returns(uint)",
        "function  g10(address user) public view returns(uint)",
        "function  g50(address user) public view returns(uint)",
        "function  g100(address user) public view returns(uint)",
        "function  g500(address user) public view returns(uint)",
        "function  g1000(address user) public view returns(uint)",
        "event result(uint num1,uint num2)",
        "event reward(uint amount)"
      ]

  };
  
    let Stopdate = async () => {
 
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let soccerContract = new ethers.Contract(address2.soccerAddr,abi2.soccer, provider);
        let stvl = await soccerContract.g3();
        document.getElementById("Stvl").innerHTML = parseInt(stvl);


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
            let soccerContract = new ethers.Contract(address2.soccerAddr, abi2.soccer, signer);
            let selectedValue = document.getElementById("bettingAmount").value;
            await soccerContract.play(argument, selectedValue); // Call the play function with the provided argument
        } catch (error) {
            alert(error.message); // Display error message if execution fails
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
    
// 멘토데이타 입력
var dataArray = [
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f"
  ];
  
  // Function to select and display random data
  function displayRandomData() {
    // Select a random item from the array
    var randomIndex = Math.floor(Math.random() * dataArray.length);
    var randomData = dataArray[randomIndex];
  
    // Display the random data
    document.getElementById("randomData").textContent = randomData;
  }
  
  // Event listener for button click
  document.getElementById("randomButton").addEventListener("click", displayRandomData);


  function autoFillMentoAddress() {
    // Retrieve the printed mentoaddress
    var mentoaddress = document.getElementById('randomData').textContent;
  
    document.getElementById('mentoaddress').value = mentoaddress;
  }
  
  document.getElementById("randomButton").addEventListener("click", autoFillMentoAddress);

 Stopdate();