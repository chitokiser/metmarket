let contractAddress2 = {  
    kingAddr:"0x16163a32e9C6aB20Db6c0A7900C6bb1802e9C602",
  };
  let contractAbi2 = {
    king: [
      "function battleking( )public",
      "function battlequeen( )public",
      "function battleknight( )public",
      "function AIbattle( )public",
      "function kingtax( )public",
      "function queentax( )public",
      "function knighttax( )public",
      "function g1(address user) public view returns(uint256)",
      "function g2(address user) public view returns(uint256)",
      "function g3(address user) public view returns(uint256)",
      "function g4(address user) public view returns(uint256)",
      "function g5(address user) public view  returns(uint256)",
      "function g6() public view  returns(uint256)",
      "function g7(address user) public view returns(uint256)",
      "function g8( ) public view returns(uint256)",
      "function g9( ) public view returns(uint256)",
      "function g10( ) public view  returns(uint256)",
      "function getmy( ) public view  returns(uint,uint,string memory,uint)",
      "function myinfo(address) public view returns(uint,uint,string memory,uint,uint)",
      "function kingstory() public view returns(uint256)",
      "function king() public view returns(address)",
      "function queen() public view returns(address)",
      "function knight() public view returns(address)",
      "function totaldepo() public view returns(uint)",
      "function fee() public view returns(uint)",
      "function withdraw( )public",
      "function charge(uint pay)public",
      "function fighting(uint num)public",
      "function g13(uint num) public view returns (uint256)",
      "function fs(uint num) public view returns (uint256,uint265,uint256,address)",
      "function getid(uint num) public view virtual returns(uint256)",
      "function getfm(uint num) public view virtual returns(uint256)",
      "function getdp(uint num) public view virtual returns(uint256)",
      "function getowner(uint num) public view virtual returns(address)",
      "event result(uint point)"
   
    ]
  
  };

  let KSync = async () => {
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, provider);
    let ktvl = await kingContract.g6();
    let kkingstory = await kingContract.kingstory();
    let kking = await kingContract.king();
    let kqueen = await kingContract.queen();
    let kknight = await kingContract.knight();
    let kpower = await kingContract.g8();
    let qpower = await kingContract.g9();
    let total = await kingContract.totaldepo();
    let tiket = await kingContract.fee();


    document.getElementById("Ktvl").innerHTML = parseFloat(ktvl/1e18).toFixed(2);
    document.getElementById("Kingstory").innerHTML = parseInt(kkingstory);
    document.getElementById("Kingfee").innerHTML = parseInt(tiket*3/1e18);
    document.getElementById("Queenfee").innerHTML = parseInt(tiket*2/1e18);
    document.getElementById("Knightfee").innerHTML = parseInt(tiket/1e18);
    document.getElementById("Monsterfee").innerHTML = parseInt(tiket/1e18);
    document.getElementById("Fighterfee").innerHTML = parseInt(tiket*2/1e18);
    document.getElementById("Mpay").innerHTML =  parseFloat(total/10/1e18).toFixed(2);
    document.getElementById("King").innerHTML = (kking);
    document.getElementById("Queen").innerHTML = (kqueen);
    document.getElementById("Knight").innerHTML = (kknight);
    document.getElementById("Kpower").innerHTML = (kpower);
    document.getElementById("Qpower").innerHTML = (qpower);
    document.getElementById("Ktax").innerHTML = parseFloat(total/100/1e18).toFixed(2);
    document.getElementById("Qtax").innerHTML = parseFloat(total/250/1e18).toFixed(2);
    document.getElementById("Ntax").innerHTML = parseFloat(total/500/1e18).toFixed(2);


    const nftIds = [0, 1, 2, 3, 4, 5];

    const updateFarmCards = async (start, end) => {
        for (let i = start; i < end; i++) {
            const nftId = nftIds[i];
            const periodInfo = await kingContract.getfm(nftId);
            const valueInfo = await kingContract.getdp(nftId);
            const ownerInfo = await kingContract.getowner(nftId);
            const depen = await kingContract.g13(nftId);

            const card = document.createElement("div");
            card.className = "card";

            // Create card content (image, text, etc.) here
            const img = document.createElement("img");
            img.src = `../images/knight/nft-id-${nftId}.jpg`;
            img.className = "card-img-top";
            img.alt = "...";
            img.loading = "lazy";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const cardTitle = document.createElement("h2");
            cardTitle.className = "card-title";
            cardTitle.textContent = `파이터 ID ${nftId}`;

            const periodText = document.createElement("p");
            periodText.className = "card-text";
            periodText.textContent = `파이트머니 : ${parseFloat(periodInfo/1e18).toFixed(2)} CYA`;

            const valueText = document.createElement("p");
            valueText.className = "card-text";
            valueText.textContent = `방어성공횟수 : ${valueInfo-100}`;

            const depenText = document.createElement("p");
            depenText.className = "card-text";
            depenText.textContent = `기본방어력 : ${depen}`;

                         // 소유자 정보를 추가
  const ownerText = document.createElement("p");
  ownerText.className = "card-text";
  ownerText.textContent = `견습기사: ${ownerInfo}`;
              cardBody.appendChild(cardTitle);
              cardBody.appendChild(depenText);
              cardBody.appendChild(periodText);
              cardBody.appendChild(valueText);
              // 카드 하단에 소유자 정보를 추가
  cardBody.appendChild(ownerText);  
              card.appendChild(img);
              card.appendChild(cardBody);
              
              // 카드를 farmCards div에 추가
              const farmCards = document.getElementById("farmCards");
              farmCards.appendChild(card);
          };
  
  

};

    const numRows = Math.ceil(nftIds.length / 2);

    for (let i = 0; i < numRows; i++) {
        const start = i * 2;
        const end = Math.min(start + 2, nftIds.length);
        updateFarmCards(start, end);
    }
  

    kingContract.on('result', (point) => {
          
      console.log('공격데미지:', point);

      document.getElementById('eventData').innerText = `공격데미지: ${point}`;
  });
 
 };
  
  


  let Charge = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);
  const quantity = ethers.utils.parseUnits(document.getElementById('cyaInput').value, 18);
    try {
      await kingContract.charge(quantity);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Battleking = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.battleking();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Battlequeen = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.battlequeen();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


 
  let BattleAi = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.AIbattle();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Fighting = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.fighting(document.getElementById('fighternum').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  let Kwithdraw = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Kingtax = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.kingtax();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  
  let Queentax = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.queentax();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };

  let Knigthtax = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);

    try {
      await kingContract.knighttax();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  
  let Kmember = async () => {
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

  let kingContract = new ethers.Contract(contractAddress2.kingAddr, contractAbi2.king, signer);
    let kget = await kingContract.myinfo(await signer.getAddress());
    let kallowt = kget[0];
    let kbuff = kget[1];
    let kmessage = kget[2]; 
    let kdepo = kget[3]; 
    let klastdem = kget[4]; 
    let myatt = await kingContract.g7(await signer.getAddress());
   
    
    document.getElementById("Myatt").innerHTML = (myatt);
    document.getElementById("Kbuff").innerHTML = (kbuff);  //전투 경험치
    document.getElementById("Kmessage").innerHTML = (kmessage);
    document.getElementById("Kdepo").innerHTML = parseFloat(kdepo/1e18).toFixed(2)
    document.getElementById("Klastdem").innerHTML = (klastdem);
    
    
    let nowt = Math.floor(new Date().getTime() / 1000);
    let left = parseInt((kallowt+86400 ) - nowt); 
    let hour = parseInt(left/3600)%24;
    let min = parseInt((left/60)%60);
    let sec = left%60;
    document.getElementById("Kallowt").innerHTML = left > 0 ? `${hour}시간${min}분${sec}초` : '';
  
     };
     




     (async () => {
      KSync();
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
   
      })();

