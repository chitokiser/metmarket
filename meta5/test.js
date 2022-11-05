let a19 = await meta5Contract.getl1(19);  //계좌번호
let s19 = await meta5Contract.getstate(a19);  //계좌상태
let b19 = await meta5Contract.getbalan(a19);  //계좌잔고
let o19 = await meta5Contract.getpass1(a19);  //관전비번
let oo19 = await meta5Contract.owner(a19);  //오너

document.getElementById("A19-T19").innerHTML = (a19);
document.getElementById("S19-T19").innerHTML = (s19);
document.getElementById("B19-T19").innerHTML = (b19/1e13);
document.getElementById("O19-T19").innerHTML = (o19);
document.getElementById("P19-T19").innerHTML = (b19/1e18).toFixed(6);
document.getElementById("Oo19-T19").innerHTML = (oo19);

