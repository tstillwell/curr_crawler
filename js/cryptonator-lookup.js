function fetchCryptonatorList(){ // retrieve currencies list
    // check local storage before API query
    if (localStorage.cryptonator_list) {
        let list = JSON.parse(localStorage.getItem("cryptonator_list"));
        return buildCryptonatorAutocompleteData(list);
    }
    // consume currency list from cryptonator API
    let url = "https://www.cryptonator.com/api/currencies";
    $.ajax({
        url: url,
        method: "GET",
        }).done(function(result){
            localStorage.setItem("cryptonator_list", JSON.stringify(result));
            buildCryptonatorAutocompleteData(result);
        }).fail(function(err) {
            let error = "Unable to retrieve currency list via Cryptonator API";
            $(".cryptonator-api-error").html(error);
            throw err;
        });
}

function fetchCryptonatorTicker(target, base) {
    // retrieve currency ticker data from cryptonator API
    // base is the currency to compare the target to
    // both must be currency codes listed on crypotonator api currency list
    let url = "https://www.cryptonator.com/api/ticker/"
    url += base + "-" + target;  // ex: btc-usd
    $.ajax({
        url: url,
        method: "GET",
        }).done(function(result){
            let attribution_link = "<a href=\"https://www.cryptonator.com/\">Cryptonator API</a>";
            $(".attribution").html("Data from " + attribution_link);
            if (typeof result.ticker !== "undefined"){  // verify valid result
                $(".cryptonator-api-error").html("");  // remove old API errors
                $(".cryptonator-currency-price").html(result.ticker.price);
                $(".cryptonator-currency-1hr-change").html("1hr change: " + result.ticker.change);
                let updated_date = new Date(result.timestamp * 1000);
                $(".cryptonator-timestamp").html(updated_date.toUTCString());
            }
            else {  // show error if result response is missing ticker data
                $(".cryptonator-currency-price").html("Info Unavailable");
            }
        }).fail(function(err) {
            let error = "Failed to obtain valid data from Cryptonator API";
            $(".cryptonator-api-error").html(error);
            throw err;
        });
};

function buildCryptonatorAutocompleteData(cryptonator_list){
    // transform list data into appropriate autocomplete format
    // implementation uses jquery autocomplete
    // https://github.com/devbridge/jQuery-Autocomplete
    let currencies = [];
    cryptonator_list.rows.forEach(function(currency){
        currencies.push({value: currency.code , data: currency.name});
    });
    // connect currencies to autocomplete field
    $("#cryptonator-autocomplete").autocomplete({
        lookup: currencies,
        minChars: 0,
		search: "",  // 'empty' search - all results show on click
        onSelect: function (suggestion) {
            selectFromCryptonatorList(suggestion);
        }
    });
}

function selectFromCryptonatorList(currency){
    $(".cryptonator-currency-price").html(""); //blank price div
    $(".cryptonator-currency-1hr-change").html(""); //blank change div
    $(".cryptonator-currency-code").html(currency.value);
    $(".cryptonator-currency-name").html(currency.data);
    fetchCryptonatorTicker("USD", currency.value);
    $(".cryptonator-currency-info").addClass("populated-currency-info");
}

$(document).ready( function () {
  fetchCryptonatorList();
});
