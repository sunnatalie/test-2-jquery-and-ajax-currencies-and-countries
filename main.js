$(document).ready(function(){
 
    $('#allButton').on('click',() => {

        $.ajax({
            url:'https://restcountries.com/v3.1/all',
            success:(countries) => {
                displayNumberOfCountries(countries);
                displaySumOfPopulations(countries);
                getAverageOfPopulations(countries);
                displayCountries(countries);
                displayRegions(countries);
                displayCurrencies(countries);
            },
            error:function(error){
                console.log(error)
            }
        });
        
    });

    $('#searchButton').on('click',() => {

        $.ajax({
            url:`https://restcountries.com/v3.1/name/${$('#textBox').val()}`,
            success:(countries) => {
                displayNumberOfCountries(countries);
                displaySumOfPopulations(countries);
                getAverageOfPopulations(countries);
                displayCountries(countries);
                displayRegions(countries);
                displayCurrencies(countries);
            },
            error:function(error){
                console.log(error)
            }
        });
        
    });

    function displayNumberOfCountries(countries){
        let content = "";
        content += `Number of countries: ${countries.length}`;
        $('#numberOfCountries').html(content);
    }

    function displaySumOfPopulations(countries){
        let content = "";
        let sum = 0;
        for(let i = 0; i < countries.length; i++){
            sum = sum + countries[i].population;
        }
        content += `Sum of populations: ${sum}`;
        $('#sumOfPopulations').html(content);
    }

    function getAverageOfPopulations(countries){
        let content = "";
        let sum = 0;
        for(let i = 0; i < countries.length; i++){
            sum = sum + countries[i].population;
        }
        avg = sum / countries.length;
        content += `Average of populations: ${avg}`;
        $('#averagePopulation').html(content);
    }

    function displayCountries(countries){

        tableBody.innerHTML = '';
    
        for(let i = 0; i < countries.length; i++){
            const row = `
            <tr>
                <td>${i + 1}</td>
                <td>${JSON.stringify(countries[i].name.official)}</td>
                <td>${countries[i].population}</td>
            </tr>
            `;

            tableBody.innerHTML += row;
        }
    }

    function displayRegions(countries){

        tableBodyRegions.innerHTML = '';
    
        const regions = new Set();

        for(let i = 0; i < countries.length; i++){
            regions.add(countries[i].region);
        }

        regionsArray = Array.from(regions);

        for(let j = 0; j < regionsArray.length; j++){

            const row = `
            <tr>
                <td>${regionsArray[j]}</td>
                <td>${countries.filter(({region}) => region === regionsArray[j]).length}</td>
            </tr>
            `;
    
            tableBodyRegions.innerHTML += row;

        }

    }

    function displayCurrencies(countries){

        tableBodyCurrencies.innerHTML = '';

        const currenciesMap = new Map();
        
        
        for(country of countries){

            for(currency in country.currencies){
                const {name} = country.currencies[currency];

                if(!currenciesMap.has(name)){
                    currenciesMap.set(name,1);
                 }else{
                     let amount = currenciesMap.get(name);
                     currenciesMap.set(name,amount = amount + 1);
     
                 }
     
            }
          
        }

        for(const [key,value] of currenciesMap.entries()){

            const row = `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
            `;
    
            tableBodyCurrencies.innerHTML += row;
        }

    }

});