let inputTitle = document.querySelector(".tit");
let inputPrice = document.querySelector(".price");
let inputTaxes = document.querySelector(".taxes");
let inputAds = document.querySelector(".ads");
let inputDisc = document.querySelector(".disc");
let inputCount = document.querySelector(".count");
let inputCat = document.querySelector(".cgory");
let inputSub = document.querySelector(".creat");
let inputUpd = document.querySelector(".upd");
let spanTotal = document.querySelector(".total");
let divPuts = document.querySelector(".puts");
let tbody = document.querySelector(".tbody");
let delAll = document.querySelector(".dele button");
let seByTi = document.querySelector(".sbt");
let seByCa = document.querySelector(".sbc");
let inputSrh = document.querySelector(".search");

inputAds.oninput = function(){
    if(inputPrice.value.length >= 1 && inputTaxes.value.length >=1){
        spanTotal.innerHTML = `Total : ${+inputPrice.value+(+inputTaxes.value)+(+inputAds.value)}`;
        spanTotal.style.backgroundColor = "green";
    }
}
inputDisc.oninput = function(){
    spanTotal.innerHTML = `Total : ${+inputPrice.value+(+inputTaxes.value)+(+inputAds.value)-(+inputDisc.value)}`;
    spanTotal.style.backgroundColor = "green";
}
let n=0;
let array = [];
inputSub.onclick = function(e){
    e.preventDefault();
    if(inputCount.value ===""){
        inputCount.value=1;
    }
    for(let i=0;i<inputCount.value;i++){
        let task={
            id : n,
            title : inputTitle.value,
            price : inputPrice.value,
            taxes : inputTaxes.value,
            ads : inputAds.value,
            disc : inputDisc.value,
            total : +inputPrice.value+(+inputTaxes.value)+(+inputAds.value)-(+inputDisc.value),
            cate : inputCat.value,
        }
        array.push(task);
        n++;
    }
    window.localStorage.tables = JSON.stringify(array);
    window.localStorage.num = n;
    creat();
    inputTitle.value = "";
    inputPrice.value = "";
    inputTaxes.value = "";
    inputAds.value = "";
    inputDisc.value = "";
    inputCount.value = "";
    inputCat.value = "";
    spanTotal.innerHTML = "Total :";
    spanTotal.style.backgroundColor = "red";
}
function creat(){
    tbody.innerHTML = "";
    delAll.innerHTML = `Delete All (${array.length})`;
    for(let i=0;i<array.length;i++){
        let tr = document.createElement("tr");
        tr.id = array[i].id;
        let tdId = document.createElement("td");
        let tdIdText = document.createTextNode(i+1);
        tdId.appendChild(tdIdText);
        tr.appendChild(tdId);
        let tdTit = document.createElement("td");
        let tdTitText = document.createTextNode(array[i].title);
        tdTit.appendChild(tdTitText);
        tr.appendChild(tdTit);
        let tdPri = document.createElement("td");
        let tdPriText = document.createTextNode(array[i].price);
        tdPri.appendChild(tdPriText);
        tr.appendChild(tdPri);
        let tdTax = document.createElement("td");
        let tdTaxText = document.createTextNode(array[i].taxes);
        tdTax.appendChild(tdTaxText);
        tr.appendChild(tdTax);
        let tdAds = document.createElement("td");
        let tdAdsText = document.createTextNode(array[i].ads);
        tdAds.appendChild(tdAdsText);
        tr.appendChild(tdAds);
        let tdDis = document.createElement("td");
        let tdDisText = document.createTextNode(array[i].disc);
        tdDis.appendChild(tdDisText);
        tr.appendChild(tdDis);
        let tdTot = document.createElement("td");
        let tdTotText = document.createTextNode(array[i].total);
        tdTot.appendChild(tdTotText);
        tr.appendChild(tdTot);
        let tdCat = document.createElement("td");
        let tdCatText = document.createTextNode(array[i].cate);
        tdCat.appendChild(tdCatText);
        tr.appendChild(tdCat);
        let tdLinkUp = document.createElement("td");
        let linkUp = document.createElement("a");
        let linkUpText = document.createTextNode("update");
        linkUp.className = "update";
        linkUp.appendChild(linkUpText);
        linkUp.style.cssText = "text-decoration: none; padding:5px 10px; border-radius:30px; color:white; background-color: blue; cursor: pointer;";
        tdLinkUp.appendChild(linkUp);
        tr.appendChild(tdLinkUp);
        let tdLinkDe = document.createElement("td");
        let linkDe = document.createElement("a");
        let linkDeText = document.createTextNode("delete");
        linkDe.className = "del";
        linkDe.appendChild(linkDeText);
        linkDe.style.cssText = "text-decoration: none; padding:5px 10px; border-radius:30px; color:white; background-color: blue; cursor: pointer;";
        tdLinkDe.appendChild(linkDe);
        tr.appendChild(tdLinkDe);
        tbody.appendChild(tr);
    }
}
document.addEventListener("click",function(e){
    if(e.target.className === "del"){
        e.target.parentElement.parentElement.remove();
        for(let i=0;i<tbody.children.length;i++){
            tbody.children[i].children[0].innerHTML =i+1;
        }
        array = array.filter((ele)=>{
            return ele.id != e.target.parentElement.parentElement.id;
        });
        window.localStorage.tables = JSON.stringify(array);
        delAll.innerHTML = `Delete All (${tbody.children.length})`;
    }
})
document.addEventListener("click",function(e){
    if(e.target.className === "update"){
        inputSub.style.display = "none";
        inputCount.style.display = "none";
        inputUpd.style.display = "inline-block";
        let chids = e.target.parentElement.parentElement.children;
        inputTitle.value = chids[1].innerHTML;
        inputPrice.value = chids[2].innerHTML;
        inputTaxes.value = chids[3].innerHTML;
        inputAds.value = chids[4].innerHTML;
        inputDisc.value = chids[5].innerHTML;
        inputCat.value = chids[7].innerHTML;
        spanTotal.innerHTML = `Total : ${chids[6].innerHTML}`;
        spanTotal.style.backgroundColor = "green";
        inputUpd.onclick = function(ele){
            ele.preventDefault();
            chids[1].innerHTML = inputTitle.value;
            chids[2].innerHTML = inputPrice.value;
            chids[3].innerHTML = inputTaxes.value;
            chids[4].innerHTML = inputAds.value;
            chids[5].innerHTML = inputDisc.value;
            chids[7].innerHTML = inputCat.value;
            chids[6].innerHTML = +inputPrice.value+(+inputTaxes.value)+(+inputAds.value)-(+inputDisc.value);
            for(let i=0;i<array.length;i++){
                if(array[i].id === +e.target.parentElement.parentElement.id){
                    array[i].title = chids[1].innerHTML;
                    array[i].price = chids[2].innerHTML;
                    array[i].taxes = chids[3].innerHTML;
                    array[i].ads = chids[4].innerHTML;
                    array[i].disc = chids[5].innerHTML;
                    array[i].total = chids[6].innerHTML;
                    array[i].cate = chids[7].innerHTML;
                }
            }
            console.log(array);
            window.localStorage.tables = JSON.stringify(array);
            inputTitle.value = "";
            inputPrice.value = "";
            inputTaxes.value = "";
            inputAds.value = "";
            inputDisc.value = "";
            inputCount.value = "";
            inputCat.value = "";
            spanTotal.innerHTML = "Total :";
            spanTotal.style.backgroundColor = "red";
            inputSub.style.display = "inline-block";
            inputCount.style.display = "inline-block";
            inputUpd.style.display = "none";
        }
    }
})
delAll.onclick = function(){
    tbody.innerHTML = "";
    array = [];
    window.localStorage.tables = JSON.stringify(array);
    delAll.innerHTML = `Delete All (0)`;
}
seByTi.onclick = function(){
    inputSrh.setAttribute("placeholder","search by title");
}
seByCa.onclick = function(){
    inputSrh.setAttribute("placeholder","search by category");
}
inputSrh.oninput = function(){
    if(inputSrh.getAttribute("placeholder")==="search by title"){
        for(let i=0;i<tbody.children.length;i++){
            if(tbody.children[i].children[1].innerHTML.includes(inputSrh.value)){
                tbody.children[i].style.display = "table-row";
            }
            else{
                tbody.children[i].style.display = "none";
            }
        }
    }
    else if(inputSrh.getAttribute("placeholder")==="search by category"){
        for(let i=0;i<tbody.children.length;i++){
            if(tbody.children[i].children[7].innerHTML.includes(inputSrh.value)){
                tbody.children[i].style.display = "table-row";
            }
            else{
                tbody.children[i].style.display = "none";
            }
        }
    }
}
if(window.localStorage.getItem("tables") || window.localStorage.getItem("nums")){
    array = JSON.parse(window.localStorage.getItem("tables"));
    n = window.localStorage.getItem("nums");
    creat();
}