class Countries{
    constructor(){
        this.url = "https://restcountries.eu/rest/v2/name/";
    }

    async getCountriesData(countryName){
        // İstek
        const responseCountries = await fetch(this.url + countryName);

        // Response'dan dönen json verisi
        const responseData = await responseCountries.json();

        // Dönen verileri app.js'de kullanmak için
        return{
            country:responseData
        }
    }
}