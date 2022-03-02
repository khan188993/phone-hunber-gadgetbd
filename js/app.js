// Selecting all element by dom 
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const detailsBtn = document.getElementById('details');
const loadMoreBtn = document.getElementById('load-more');
const displayResultSelector = document.getElementById('display-result-selector');
const productDetailsSelector = document.getElementById('product-details-selector');
const searchResultText = document.querySelector('.search-result-text');
const spinner = document.getElementById('spinner');

//Load More Product Initial Array 
let loadMoreProducts = [];

//Load more button Initial value 
loadMoreBtnDisplay('none');
//Load more snipper Initial value 
loading('none');


//Load more button displaying function
function loadMoreBtnDisplay (style){
    loadMoreBtn.style.display = style;
}

//Loading Spinner Show/hide  On loading data 
function loading (value) {
    spinner.style.display = value;
}

//function for searchProduct
const searchProduct = () =>{
    
    //Loading Spinner Show On loading data 
    loading('block');
    //collecting search input value
    let searchInputData = searchInput.value.toLowerCase();
    searchInput.value = "";
    displayResultSelector.innerHTML = "";
    productDetailsSelector.innerHTML = "";
    
    //input empty check
    if(searchInputData ===""){
        searchResult('Please Fill The Search Field Properly!')

        //load more om empty search 
        loadMoreBtnDisplay('none')
        //Loading spinner  hide on search empty
        loading('none');

    }else{

        //Fetching Search Result 
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputData}`)
        .then(res =>res.json())
        .then(result => displaySearchResult(result,searchInputData))
        
        //If Search Data not found then error messages,
        .catch(err=>{
            //load more button none on  getting errors on search
            loadMoreBtnDisplay('none')
            //If found any error then spinner hide
            loading('none');

            searchResult("something may be wrong! please try later!")
        })
    }
}

//Search Result Text Info showing under search box
const searchResult = (text="",searchInputData="")=>{
        searchResultText.innerHTML = `
        <span id="search-result-text"> ${text} <span class="search-text">${searchInputData}</span></span>
        `
}

//load product details by uniq slug;
const loadProductDetails = (slug) =>{
    searchResult("",);
    
    productDetailsSelector.innerHTML = "";
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(result =>displayProductDetails(result))

    .catch(err => {
        loading('none');
        searchResult("something may be wrong! please try later!")
    })
}

//display product details by clicking details button
const displayProductDetails = (result) =>{

    //show loading
    loading('block');

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
                                <li><span>Name</span> : ${phone?.name || ""}</li>
                                <li><span>releaseDate</span> : ${phone?.releaseDate || "no releaseDate found" }</li>
                                <li><span>brand</span> : ${phone?.brand || ""}</li>
                                <h3 class="details-title">Main Feature:</h3>
                                <li><span>storage</span> : ${phone?.mainFeatures?.storage || "Not Available"}</li>
                                <li><span>displaySize</span> : ${phone?.mainFeatures?.displaySize} || "Not Available"</li>
                                <li><span>memory</span> : ${phone?.mainFeatures?.chipSet || "Not Available"}</li>
                                <li><span>chipSet</span> : ${phone?.mainFeatures?.memory || "Not Available"}</li>
                                <li><span>sensors</span> : ${phone?.mainFeatures?.sensors.join(" | ") || "Not Available"}</li>
                                <h3 class="details-title">Other:</h3>
                                <li><span>WLAN</span> : ${phone?.others?.WLAN || "Not Available"}</li>
                                <li><span>Bluetooth</span> : ${phone?.others?.Bluetooth || "Not Available"}</li>
                                <li><span>GPS</span> : ${phone?.others?.GPS || "Not Available"}</li>
                                <li><span>NFC</span> : ${phone?.others?.NFC || "Not Available"}</li>
                                <li><span>Radio</span> : ${phone?.others?.Radio || "Not Available"}</li>
                                <li><span>USB</span> :  ${phone?.others?.USB || "Not Available"}</li>
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
        searchResult("You Search For : ",searchInputData);
        //phones result show maximum 20 if result get 20+ number

        if(phonesResults.length>20){

            // load more products collecting 
            loadMoreProducts = [...phonesResults.splice(20)];

            //load more button show if product length greater than 20
            loadMoreBtnDisplay('inline-block')
            
            

            let allPhones = "";
            //looping 20 items for getting greater than 20 items
            for(let i=0; i<phonesResults.length; i++){
                allPhones = `${allPhones}
                <div class="col-lg-3 col-md-6 col-12">
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

            // Loading Spinner none after showing all fetch data 
            loading('none');
        }else{

            //load more product making empty as product length less than 20
            loadMoreProducts = [];

            //load more button none if product length less than 20
            loadMoreBtnDisplay('none')

            let allPhones = "";
            //looping less than 20 items 
            for(let i=0; i<phonesResults.length; i++){
                
                allPhones = `${allPhones}
                <div class="col-lg-3 col-md-6 col-12">
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
        }
        

    }else{
        //if no data found text show with input search field value
        searchResult('No Product Found For Your Search : ',searchInputData);
        //hide load more button if no product found 
        loadMoreBtnDisplay('none')
        //If search result not found then spinner hide
        loading('none');
        
        
    }
    
}

const loadMoreProductsShow = ()=>{

    //Load more product slice 20 for showing next 20 loading product only,
    loadMoreProductSplice = loadMoreProducts.splice(0,20);

    if(loadMoreProductSplice.length>0){

        let allLoadMoreProducts = "";
        //looping load more product items
        for(let i=0; i<loadMoreProductSplice.length; i++){
            allLoadMoreProducts = `${allLoadMoreProducts}
            <div class="col-lg-3 col-md-6 col-12">
                <div class="single-product">
                    <div class="product-img">
                        <span>${loadMoreProductSplice[i].brand}</span>
                        <img src="${loadMoreProductSplice[i].image}" alt="">
                    </div>
                    <h2>${loadMoreProductSplice[i].phone_name}</h2>
                    <button onclick="loadProductDetails('${loadMoreProductSplice[i].slug}')" id="details" class="btn btn-danger">Details</button>
                </div>
            </div>
            `;
        }
    
         //load more products adding with last 20 products
        displayResultSelector.innerHTML = `${displayResultSelector.innerHTML} ${allLoadMoreProducts}`;

        //load more button hide if all product load fully
        if(loadMoreProducts.length===0){
            loadMoreBtnDisplay('none');
        }    
    }

}


searchBtn.addEventListener('click',searchProduct);
loadMoreBtn.addEventListener('click',loadMoreProductsShow)
