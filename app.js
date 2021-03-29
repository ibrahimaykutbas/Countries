const countryForm = document.querySelector("#country-form");
const countryName = document.querySelector("#country-name");
const lastCountry = document.querySelector("#last-countries");
const clearLastCountry = document.querySelector("#clear-last-countries");
const lastSearchDiv = document.querySelector("#lastSearch");

const countries = new Countries();
const ui = new UI();

eventListener();

function eventListener(){
    countryForm.addEventListener("submit",getCountry);
    document.addEventListener("DOMContentLoaded",getLastSearched);
    clearLastCountry.addEventListener("click",clearCountry);
    lastSearchDiv.addEventListener("click",deleteCountry);
}

function getCountry(e){
    // İstekte bulunduktan sonra gelen verileri okuma ve yazma
        const country = countryName.value.trim().toLowerCase();

        countries.getCountriesData(country)
        .then(response => {
            if(response.country.message === "Not Found"){
                ui.showAlert("danger","Ülke bulunamadı!");
            }
            else{
                ui.showList(response.country);

                ui.addSearchedCountryToUI(country);
                Storage.addSearchedCountryToStorage(country);
            }
        })
        .catch(err => ui.showAlert("danger","Bir hata oluştu!"));
    

    ui.clearInput();
    e.preventDefault();
}

function getLastSearched(){
    // Son aranan ülkeleri storage'dan alma
    let countries = Storage.getSearchedCountryFromstorage();

    countries.forEach(country => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = country;

            const link = document.createElement("a");
            link.href = "#";
            link.className = "delete-item";
            link.innerHTML = `<i class = 'fa fa-remove'></i>`;

            li.appendChild(link);
            lastCountry.appendChild(li);
    });
}

function deleteCountry(e){
    // Seçilen son aranan ülkeyi UI'dan ve storage'dan silme
    if(e.target.className === "fa fa-remove"){
        ui.deleteCountryFromUI(e.target);
        Storage.deleCountryFromStorage(e.target.parentElement.parentElement.textContent);
        ui.showAlert("info","Ülke silindi!");
    }
    else{  
        const country = e.target.textContent;
    
        countries.getCountriesData(country)
        .then(response => {
            if(response.country.message === "Not Found"){
                ui.showAlert("Ülke bulunamadı!");
            }
            else{
                ui.showList(response.country);
    
                ui.addSearchedCountryToUI(country);
                Storage.addSearchedCountryToStorage(country);
            }
        })
        .catch(err => ui.showAlert("Bir hata oluştu!"));
    }
}

function clearCountry(){
    // Son aranan ülkelerin tamamını UI'dan ve storage'dan silme
    if(confirm("Emin misin?")){
        ui.clearSearchedCountryFromUI();
        Storage.clearSearchedCountryFromStorage();
        ui.showAlert("info","Son aramalar temizlendi!");
    }
}