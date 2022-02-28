// Selecting all element by dom 
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const detailsBtn = document.getElementById('details');
// const loadMoreBtn = document.getElementById('load-more');
const displayResultSelector = document.getElementById('display-result-selector');
const productDetailsSelector = document.getElementById('product-details-selector');
const searchResultText = document.querySelector('.search-result-text');
const spinner = document.getElementById('spinner');

//Loading Spinner Show/hide  On loading data 
const loading = (value) =>{
    spinner.style.display = value;
}

//function for searchProduct
const searchProduct = () =>{
    
    //collecting search input value
    let searchInputData = searchInput.value.toLowerCase();
    console.log(searchInputData);
    searchInput.value = "";
    displayResultSelector.innerHTML = "";
    productDetailsSelector.innerHTML = "";
    
    //input empty check
    if(searchInputData ===""){
        searchResult('Please Fill the input properly!')
    }else{

        //Fetching Search Result 
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputData}`)
        .then(res =>res.json())
        .then(result => displaySearchResult(result,searchInputData))
        
        //If Search Data not found then error messages,
        .catch(err=>searchResult("something may be wrong! please try later!"))
    }
}

//Search Result Text Info showing under search box
const searchResult = (text,searchInputData="")=>{
        searchResultText.innerHTML = `
        <span id="search-result-text"> ${text} <span class="search-text">${searchInputData}</span></span>
        `
}

//load product details by uniq slug;
const loadProductDetails = (slug) =>{
    productDetailsSelector.innerHTML = "";
    // console.log('load product details',slug);
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(result =>displayProductDetails(result))

    .catch(err => searchResult("something may be wrong! please try later!"))
}

//display product details by clicking details button
const displayProductDetails = (result) =>{

    //show loading
    loading('block');
    console.log(result.data.brand); 
    const phone = result.data;
    productDetailsSelector.innerHTML = `
    <div class="col-lg-4">
                    <div class="product-details-image">
                        <img src="${phone.image}" alt="">
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="product-details-content">
                        <h1>Product Details : </h1>
                        <div class="details-box">
                            <ul>
                                <li><span>Name</span> : ${phone.name}</li>
                                <li><span>releaseDate</span> : ${phone.releaseDate ? phone.releaseDate : "no releaseDate found" }</li>
                                <li><span>brand</span> : ${phone.brand}</li>
                                <h3 class="details-title">Main Feature:</h3>
                                <li><span>storage</span> : ${phone.mainFeatures.storage}</li>
                                <li><span>displaySize</span> : ${phone.mainFeatures.displaySize}</li>
                                <li><span>memory</span> : ${phone.mainFeatures.chipSet}</li>
                                <li><span>chipSet</span> : ${phone.mainFeatures.memory}</li>
                                <li><span>sensors</span> : ${phone.mainFeatures.sensors.join(" | ")}</li>
                                <h3 class="details-title">Other:</h3>
                                <li><span>WLAN</span> : ${phone.others.WLAN}</li>
                                <li><span>Bluetooth</span> : ${phone.others.Bluetooth}</li>
                                <li><span>GPS</span> : ${phone.others.GPS}</li>
                                <li><span>NFC</span> : ${phone.others.NFC}</li>
                                <li><span>Radio</span> : ${phone.others.Radio}</li>
                                <li><span>USB</span> :  ${phone.others.USB}</li>
                            </ul>
                        </div>
                    </div>
                </div>
    `
    //hide loading
    loading('none');

}

//display search result by clicking search button
const displaySearchResult = (result,searchInputData) =>{
    let phonesResults = result.data;

    //If data found then execute 
    if(phonesResults.length>0){

        
        //search field value show 
        searchResult("Your Search For : ",searchInputData);
        //phones result show maximum 20 if result get 20+ number
        if(phonesResults.length>20){

            //Loading Spinner Show
            loading('block');
            let allPhones = "";
            //looping 20 items for getting greater than 20 items
            for(let i=0; i<20; i++){
                allPhones = `${allPhones}
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="single-product">
                        <div class="product-img">
                            <span>${phonesResults[i].brand}</span>
                            <img src="${phonesResults[i].image}" alt="">
                        </div>
                        <h2>${phonesResults[i].phone_name}</h2>
                        <button onclick="loadProductDetails('${phonesResults[i].slug}')" id="details" class="btn btn-danger">Details</button>
                    </div>
                </div>
                `;
            }
            displayResultSelector.innerHTML = allPhones;
            // Loading Spinner none 
            loading('none');
        }else{

            //Loading Spinner Show
            loading('block');
            let allPhones = "";
            //looping less than 20 items 
            for(let i=0; i<phonesResults.length; i++){
                // console.log('no',i,'name',phonesResults[i].phone_name,'brand',phonesResults[i].brand);
                allPhones = `${allPhones}
                <div class="col-lg-4 col-md-2 col-1">
                    <div class="single-product">
                        <div class="product-img">
                            <span>${phonesResults[i].brand}</span>
                            <img src="${phonesResults[i].image}" alt="">
                        </div>
                        <h2>${phonesResults[i].phone_name}</h2>
                        <button onclick="loadProductDetails('${phonesResults[i].slug}')" id="details" class="btn btn-danger">Details ${phonesResults[i].slug}</button>
                    </div>
                </div>
                `;
            }
            displayResultSelector.innerHTML = allPhones;
            // Loading Spinner none 
            loading('none');
        }
        

    }else{
        //if no data found text show with input search field value
        searchResult('No Phone Found For Your Search : ',searchInputData);
    }
    
}


searchBtn.addEventListener('click',searchProduct);
