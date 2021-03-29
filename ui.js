class UI{
    constructor(){
        this.countriesList = document.querySelector("#countries");
        this.cardBody = document.querySelector(".card-body");
        this.countryName = document.querySelector("#country-name");
        this.LastCountry = document.querySelector("#last-countries");
    }

    showList(country){
        // Aranan ülkeyi UI'a ekleme
        country.forEach((countryValue) => {
            this.countriesList.innerHTML = `
            <thead>
            <tr>
              <th scope="col">Ülke Bayrağı</th>
              <th scope="col">Ülke Kodu</th>
              <th scope="col">Ülke Adı</th>
              <th scope="col">Başkenti</th>
              <th scope="col">Bölge</th>
            </tr>
          </thead>
            <tr>
                <td><img src="${countryValue.flag}" width="200px" class="img-fluid img-thumbnail"></td>
                <td>${countryValue.alpha2Code}</td>
                <td>${countryValue.name}</td>
                <td>${countryValue.capital}</td>
                <td>${countryValue.region}</td>
            </tr>    
        `;
        })
    }

    addSearchedCountryToUI(country){
        // Son aranan ülkeyi UI'a ekleme
        let countries = Storage.getSearchedCountryFromstorage();

        if(countries.indexOf(country) === -1){
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = country;

            const link = document.createElement("a");
            link.href = "#";
            link.className = "delete-item";
            link.innerHTML = `<i class = 'fa fa-remove'></i>`;

            li.appendChild(link);
            this.LastCountry.appendChild(li);
        }
    }

    deleteCountryFromUI(country){
        // Seçilen son aramadaki ülkeyi UI'dan silme
        country.parentElement.parentElement.remove();
    }

    clearSearchedCountryFromUI(){
        // Aranan ülkelerin tamamını UI'dan silme
        while(this.LastCountry.firstElementChild != null){
            this.LastCountry.firstElementChild.remove();
        }
    }

    showAlert(type,message){
        // Uyarı mesajı verme
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        this.cardBody.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        },2000)
    }

    clearInput(){
        // Arama yapıldıktan sonra Inputtaki değeri silme
        this.countryName.value = "";
    }
}