 // testnet
 let contractAddress = {
  cyafarmAddr: "0xb33428f8124415Ad0D3EA88e5456EcB64694C3cB"
};
 let contractAbi = {

  cyafarm: [
    "function seeding(uint256 pay) public",
    "function withdraw( )public",
    "function g1( ) public view virtual returns(uint256)",
    "function pllength( ) public view returns(uint)",
    "function getpl(uint num) public view returns(uint)",
    "function allportinfo(uint num) public view returns(uint depo,uint depon,uint portn,address owner,uint start)",
    "function getperiod(uint num) public view returns(uint)",
    "function getvalue(uint num) public view returns(uint)",
    "function getmywin( ) public view returns(uint) ",
    "function getmydepo( ) public view returns(uint)",
    "function getmyseedmoney( ) public view returns(uint)",
    "function getmyfarm(uint num) public view returns(uint) ",
    "function getmygain( ) public view returns(uint)",
    "function getmycat( ) public view returns(uint)", 
    "function charge(uint pay) public",
    "function remain( ) public view returns(uint256)"
  ]

};


const topDataSync = async () => {
  // ethers setup
  const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
  const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr,contractAbi.cyafarm,provider);
  //농장개수
  const fsum = await cyafarmContract.remain();
  //농장생성순서
  const creatnum = await cyafarmContract.pllength();
  //계약잔고
  const fcyabal = await cyafarmContract.g1();
 
  document.getElementById("farmtotal").innerHTML = (fsum);
  document.getElementById("farmnum").innerHTML = (creatnum);
  document.getElementById("fcyatvl").innerHTML = (fcyabal);
  document.getElementById("fcyatvl100").innerHTML = (fcyabal*10/100);

  
          // JavaScript 코드
          const nftIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
          const updateFarmCard = async (nftId) => {
              const depoInfo = await cyafarmContract.allportinfo(nftId);
              const periodInfo = await cyafarmContract.getperiod(nftId);
              const valueInfo = await cyafarmContract.getvalue(nftId);
              const ownerInfo = depoInfo.owner; // 소유자 정보 추가 
              const card = document.createElement("div");
              card.className = "card";
              
              const img = document.createElement("img");
              img.src = `../images/farm/nft-id-${nftId}.jpg`;
              img.className = "card-img-top";
              img.alt = "...";
              img.loading = "lazy";
              
              const cardBody = document.createElement("div");
              cardBody.className = "card-body";
              
              const cardTitle = document.createElement("h5");
              cardTitle.className = "card-title";
              cardTitle.textContent = `농장번호 ${nftId}`;
              
              const depoText = document.createElement("p");
              depoText.className = "card-text";
              depoText.textContent = `최초 농장가치 : ${depoInfo.depo} CAT`;
              
              const deponText = document.createElement("p");
              deponText.className = "card-text";
              deponText.textContent = `농장생성순서 : ${depoInfo.depon} 번째`;
              
              const periodText = document.createElement("p");
              periodText.className = "card-text";
              periodText.textContent = `농장운영기간 : ${periodInfo} 초`;
              
              const valueText = document.createElement("p");
              valueText.className = "card-text";
              valueText.textContent = `농장현재가치 : ${valueInfo} CAT`;
              
                // 소유자 정보를 추가
  const ownerText = document.createElement("p");
  ownerText.className = "card-text";
  ownerText.textContent = `농장소유자 : ${ownerInfo}`;
              cardBody.appendChild(cardTitle);
              cardBody.appendChild(depoText);
              cardBody.appendChild(deponText);
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
  
          // 위에서 정의한 함수를 사용하여 농장 카드 업데이트
          for (const nftId of nftIds) {
              updateFarmCard(nftId);
          }

};

 let fwithdraw = async () => {  //해결완료  에러메세지 작동함
  const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
  const signer = userProvider.getSigner();

  const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);

  try {
    await cyafarmContract.withdraw();
  } catch(e) {  
    alert(e.data.message.replace('execution reverted: ',''))
  }
};

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
  let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  let mydepo = await cyafarmContract.getmydepo();
  let mygain = await cyafarmContract.getmygain();
  
  let mywin = await cyafarmContract.getmywin();
  let myseed = await cyafarmContract.getmyseedmoney();
  let mycat = await cyafarmContract.getmycat(); 

  document.getElementById("farmdepo").innerHTML= parseInt(mydepo);  //예치금 총액
  document.getElementById("farmgain").innerHTML = parseInt(mygain); //순이익 총액
  document.getElementById("farmwin").innerHTML = parseInt(mywin); //인출 총액
  document.getElementById("farmseed").innerHTML = parseInt(myseed); //남아있는 예치금
  document.getElementById("farmjack").innerHTML = parseInt(mycat*95/100); //찾을 돈

  
};



let Buyfarm = async () => {
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
  let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  let amount = parseInt(document.getElementById('Seed').value, 10);

  try {
    await cyafarmContract.seeding(amount);
  } catch(e) {
    alert(e.message.replace('execution reverted: ',''));
  }
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
  let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  let amount2 = parseInt(document.getElementById('Seed2').value, 10);

  try {
    await cyafarmContract.charge(amount2);
  } catch(e) {
    alert(e.message.replace('execution reverted: ',''));
  }
};

topDataSync();



