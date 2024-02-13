// Define contract address and ABI
let address3 = {
    roulAddr: "0x9898C50e9D63Ff596B83de78E9a55220FFB44208"  // Address of the roul contract
  };
  
  let abi3 = {
    roul: [
      "function single(uint8 _win, uint bet) public",
      "function jack( ) public view returns (uint256)",
<<<<<<< HEAD
      "function  jackprice() public view returns(uint)",
      "event result(uint num1)"
=======
      "function  jackprice() public view returns(uint)"
>>>>>>> origin/master
    ],
  };
  
 
  let updateRoulette = async () => {

    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    
    // Create a contract instance for the soccer contract
    let roulContract = new ethers.Contract(address3.roulAddr, abi3.roul, provider);
    
    let jack1 = await roulContract.jackprice();
    
    document.getElementById("Jackpot").innerHTML = parseFloat(jack1/1e18).toFixed(2);

<<<<<<< HEAD
  
=======

   
  }
    

  var rouletter = {
    random: function () {
      var min = Math.ceil(0);
      var max = Math.floor(36);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    start: function () {
      var btn = document.querySelector(".rouletter-btn");
      var panel = document.querySelector(".rouletter-wacu");
  
      panel.classList.add("on");
      btn.innerText = "stop";
    },
    stop: function () {
      var btn = document.querySelector(".rouletter-btn");
      var panel = document.querySelector(".rouletter-wacu");
      var deg = [60, 120, 180, 240, 300, 360];
  
      panel.style.transform = "rotate(" + deg[rouletter.random()] + "deg)";
      panel.classList.remove("on");
      btn.innerText = "start";
    }
  };
  
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (target.tagName === "BUTTON") {
      target.innerText === "start" ? rouletter.start() : rouletter.stop();
    }
  });
  
  document.getElementById("app123").innerHTML = `
  <div class="rouletter">
      <div class="rouletter-bg">
          <div class="rouletter-wacu"></div>
      </div>
      <div class="rouletter-arrow"></div>
      <button class="rouletter-btn">start</button>
  </div>
  `;

>>>>>>> origin/master
  
  updateRoulette();
  