class Storage{
    static addSearchedCountryToStorage(country){
        // Son aramayı storage'a ekleme
        let countries = this.getSearchedCountryFromstorage();
        if(countries.indexOf(country) === -1){
            countries.push(country);
            localStorage.setItem("searched",JSON.stringify(countries));
        }
    }
    
    static getSearchedCountryFromstorage(){
        // Storage ile bağlantı kurma
        let countries;
        if(localStorage.getItem("searched") === null){
            countries = [];
        }
        else{
            countries = JSON.parse(localStorage.getItem("searched"));
        }
        return countries;
    }

    static deleCountryFromStorage(countryName){
        // Seçilen son aramayı storage'dan silme
        let countries = this.getSearchedCountryFromstorage();
        countries.forEach((country,index) => {
            if(countryName === country){
                countries.splice(index,1);
            }
        })
        localStorage.setItem("searched",JSON.stringify(countries));
    }
    
    static clearSearchedCountryFromStorage(){
        // Storage'dan array'i silme
        localStorage.removeItem("searched");
    }
}