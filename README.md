# curr-value
Super simple realtime currency conversion lookup.

Finds currency values via the Cryptonator API.
Auto-refreshes current lookup periodically
to provide updated data.

To use the app locally, open `index.html` in a browser.

Built with HTML5, CSS3, javascript and jQuery.

### Lookups Explained

Currency lookups are performed via
`cryptonator-lookup.js`

First, the list of currencies
supported by the API is loaded.

This is handled using
`fetchCryptonatorList()` function

Second, the autocomplete fields are populated
with the currencies from this list.

The function
`buildCryptonatorAutocompleteData()`
performs this populating. This uses
the Ajax AutoComplete for jQuery API.


#### jQuery-Autocomplete

Uses Ajax Autocomplete for jQuery.

https://github.com/devbridge/jQuery-Autocomplete

#### html5 boilerplate

Uses html5 boilerplate.

https://github.com/h5bp/html5-boilerplate

#### Cryptonator API

Cryptonator API docs
https://www.cryptonator.com/api/

## LICENSE

MIT license
See LICENSE file for full license text