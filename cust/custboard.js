/* globals Chart:false, feather:false */

(async () => {
  'use strict'

  await feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  const contractAddress = {
    custallowAddr: "0xccD9EE2067A19B0064651E97d09efeA5582B3ac0"
  };
  const contractAbi = {
    custallow: [
      "function g5(uint256 _num) public view returns(uint256)",
    ]
  };
  let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
  let custallowContract = new ethers.Contract(contractAddress.custallowAddr, contractAbi.custallow, provider);

  let i = 0;
  let j = 4;
  let k = 0;
  let chartData = [];
  while (true) {
    try {
      const close = parseFloat(ethers.utils.formatUnits(await custallowContract.g5(i), 18)).toFixed(7);
      console.log(i + ":" + close)
      if (j === 4) {
        j=0;
        k++;

        chartData.push({
          x: k,
          y: [close, close, close, close]
        });//ohlc
      } else {
        if (close > chartData[k-1].y[1])        chartData[k-1].y[1] = close;
        else if (close < chartData[k-1].y[2])   chartData[k-1].y[2] = close;
        
        if (j === 3)  chartData[k-1].y[3] = close;
      }
      i++;
      j++;
    } catch (e) {
      // console.log(e)
      document.getElementById("calD").innerHTML = i;
      break;
    }
  }
  console.log(chartData)

  var options = {
    series: [{
    data: chartData
  }],
    chart: {
    type: 'candlestick',
    height: 380,
    width: 900
  },
  xaxis: {
    type: 'number'
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
  };

  var chart = new ApexCharts(document.getElementById("myChart"), options);
  chart.render();

})()
