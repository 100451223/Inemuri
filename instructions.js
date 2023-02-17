document.getElementById("closeInst").addEventListener("click", ()=>{
  document.querySelector(".instructions").style.visibility = "hidden";
})
document.getElementById("help").addEventListener("click", ()=>{
  document.querySelector(".instructions").style.visibility = "visible";
})