/* globals Chart:false, feather:false */

(async () => {
    'use strict'
  
    await feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    const contractAddress = {
      sstallowAddr: "0xa4A8fAd0A19CD620323E64718f9CA5CC5a31dF4e"
    };
    const contractAbi = {
      sstallow: [
        "function g5(uint256 _num) public view returns(uint256)",
      ]
    };
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let sstallowContract = new ethers.Contract(contractAddress.sstallowAddr, contractAbi.sstallow, provider);
  
    let i = 0;
    let j = 4;
    let k = 0;
    let chartData = [];
    while (true) {
      try {
        const close = parseFloat(ethers.utils.formatUnits(await sstallowContract.g5(i), 18)).toFixed(7);
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
        document.getElementById("Sstid").innerHTML = i;
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
  
    var chart = new ApexCharts(document.getElementById("Sstchart"), options);
    chart.render();
  
  })()
  