let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='create';
let tmp;





//placer l'évènement onkeyup dans les éléments de div "classe=prices"
let prices=document.querySelectorAll(".prices input");
for(let i = 0; i < prices.length; i++){
    let price=prices[i];
    price.addEventListener("keyup", getTotal, false);
}
// get total
function getTotal(){
    if(price.value !=''){
        let result=(+price.value+ +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor= "#040";
    }
    else{
        total.style.backgroundColor= "#a00d02";  
    }
}

//create product

let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}
else{

     dataPro =[];
}
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        submit:submit.value
    }
    if(title.value != '' &&
       price.value != '' &&
       category.value != '' &&
       count.value <= 100){
        if(mood === 'create'){
            //count
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
        
                dataPro.push(newPro);
            }
        }
        else{
            dataPro[tmp]=newPro
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        clearData()
    }
    
    //save local storage
    localStorage.setItem('product',JSON.stringify(dataPro))
    ShowData()
}

//clear inputs
function clearData(){
    title.value = '' ;    
    price.value = '' ;
    taxes.value = '' ;    
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    total.style.backgroundColor = "#a00d02";
    count.value = '' ;
    category.value = '' ;

}

//read

function ShowData()
{
    let table='';
    for(let i = 0; i < dataPro.length;i++){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})"><i class="fa-solid fa-pen-to-square even"></i></button></td>
            <td><button onclick="DeleteData(${i})"><i class="fa-solid fa-trash odd"></i></button></td>
            </tr>
            `
            
        }
        
    document.getElementById('tbody').innerHTML=table;
    let deletAll=document.getElementById("deletAll");
    //button delete all
    if(dataPro.length > 0){
        deletAll.innerHTML=`<button onclick="DeleteAll()">DSelete All (<span>${dataPro.length})</span></button>`
        deletAll.style.marginTop="10px";
            
    }
    else{
        deletAll.innerHTML='';
    }
}
//pour afficher les donner de maniére permanante
ShowData()


//delete 
function DeleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    ShowData()
}
//function delete all
function DeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    ShowData()
}


//update
function UpdateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal()
    count.style.display="none";
    category.value=dataPro[i].category;
    submit.innerHTML="Update";
    mood ='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}




//search
let searchMood='title';
function GetSearchMood(id){
    let search=document.getElementById('search');
    if(id =='searchByTitle'){
        searchMood='title';
    }
    else{
        searchMood ='category';
    }
    search.placeholder='Search By' + searchMood;
    search.focus();
    search.value='';
    ShowData()
}
function searchData(value){
    let table='';
    for(let i = 0; i < dataPro.length;i++){
        if(searchMood =='title'){   
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="UpdateData(${i})"><i class="fa-solid fa-pen-to-square even"></i></button></td>
                            <td><button onclick="DeleteData(${i})"><i class="fa-solid fa-trash odd"></i></button></td>
                        </tr>
                         `
            

        }
        }
        else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                         <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="UpdateData(${i})"><i class="fa-solid fa-pen-to-square even"></i></button></td>
                            <td><button onclick="DeleteData(${i})"><i class="fa-solid fa-trash odd"></i></button></td>
                         </tr>
                           `
            
        }
        
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
//clean data
