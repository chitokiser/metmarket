/* globals Chart:false, feather:false */

(async () => {
    'use strict'
  
    await feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    const contractAddress = {
      mttallowAddr: "0xaDd161Bd2b891ac74FEBc6116fb22CEaa015a691"
    };
    const contractAbi = {
      mttallow: [
        "function g5(uint256 _num) public view returns(uint256)",
      ]
    };
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let mttallowContract = new ethers.Contract(contractAddress.mttallowAddr, contractAbi.mttallow, provider);
  
    let i = 0;
    let j = 4;
    let k = 0;
    let chartData = [];
    while (true) {
      try {
        const close = parseFloat(ethers.utils.formatUnits(await mttallowContract.g5(i), 18)).toFixed(8);
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
        document.getElementById("Mid").innerHTML = i;
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
      width: '100%'
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
  
    var chart = new ApexCharts(document.getElementById("Mchart"), options);
    chart.render();
  
  })()
  