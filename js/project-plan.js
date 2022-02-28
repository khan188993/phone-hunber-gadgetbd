// https://openapi.programming-hero.com/api/phones = full api
// https://openapi.programming-hero.com/api/phones?search=apple
// search can be found from this : Samsung,apple,Huawei,Oppo
// search by details 
// https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089 
// slug search 

// steps: 
*)search btn e click krle input er value ta nibo var e store krbo and input clear,
*)input value ta diye ?search=inputVal diye api fetch korbo, and colsole korbo,
*)display result function e pass kore console.log krbo, 
*)json path finder diye path gulo niye segulo show kore dibo ,
*)search result na paile catch e ekta function call krbo seta diye no result found ta true kore dibo,
*)search er j result ta pabo tar array er loop 20 times korbo,

*)details btn e click korle, LoaddetailsProduct function e console.log e details dekhabo,
*)slug ta paile seta diye /api/phone/slug ta diye fetch kore dibo and result colsole krbo 
*)load details product theke show details product e data console log krbo and asle show kore dibo ui te,