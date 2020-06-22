# Get Location from IP using multiple API

Currently using 3 API to get location of the IP.

[IP_LOCATE](https://www.iplocate.io/)

This api provides 1000 free requests everyday.

[IP_API](https://ipapi.co/)

This api provides 1000 free requests everyday.

[IP_STACK](https://ipstack.com/) 

This api provides 10,000 free requests per month. *Requires API KEY.

Using the API's in the above order itself, we will first try to get Location from IP_LOCATE then IP_API and then IP_STACK. By default, until we get the details all 3 api will be requested. We may restrict to one of the API or change the order as required. This will work in fall back mechanism.

## Sending a simple request

Function will automatically try the API & get you the all the possible data from the api.

```
const LocationPlease = require('./location_please.js.js')

LocationPlease.get_details({
    ip: "8.8.8.8"
}).then((result) => {
    console.log("Result: ", result.data)
}).catch((error) => {
    console.error("ERROR: ", error)
})
```

## Sending a simple request with changed priority.

Function will automatically try the API & get you the all the required data from the api.

```
const LocationPlease = require('./location_please.js.js')

LocationPlease.get_details({
    ip: "8.8.8.8",
 	priorities: ["IP_API", "IP_LOCATE"]

}).then((result) => {
    console.log("Result: ", result.data)
}).catch((error) => {
    console.error("ERROR: ", error)
})
```

So in the above code, first "IP_API" will be requested, if it fails "IP_LOCATE" will be reuqested & if it fails "IP_STACK" will be requested.


## Sending a simple request with only required data

Function will automatically try the API & get you the all the required data from the api.

```
const LocationPlease = require('./location_please.js.js')

LocationPlease.get_details({
    ip: "8.8.8.8",
 	data_needed: {
 		city: 1,
 		country: 1,
 		latitude: 1,
 		longitude: 1,
 		country_code: 1,
 	},
 	priorities: ["IP_API"]

}).then((result) => {
    console.log("Result: ", result.data)
}).catch((error) => {
    console.error("ERROR: ", error)
})
```


## Sending a simple request using only 1 API && No fallback mechanisms.

Function will automatically try the API & get you the all the required data from the api.

```
const LocationPlease = require('./location_please.js.js')

LocationPlease.get_details({
    ip: "8.8.8.8",
 	data_needed: {
 		city: 1,
 		country: 1,
 		latitude: 1,
 		longitude: 1,
 		country_code: 1,
 	},
 	priorities: ["IP_API"],
    only_priority: true

}).then((result) => {
    console.log("Result: ", result.data)
}).catch((error) => {
    console.error("ERROR: ", error)
})
```

In this case, if "IP_API" fails, no fallback api will be used.


## Sending a simple request using API key.

Function will automatically try the API & get you the all the required data from the api.

```
const LocationPlease = require('./location_please.js.js')

LocationPlease.get_details({
    ip: "8.8.8.8",
 	data_needed: {
 		city: 1,
 		country: 1,
 		latitude: 1,
 		longitude: 1,
 		country_code: 1,
 	},
	api_keys: {
		IP_LOCATE: <string>,  // Not required for free tier.
		IP_API: <string>,     // Not required for free tier.
		IP_STACK: <string>    // REQUIRED for free tier.
	}

}).then((result) => {
    console.log("Result: ", result.data)
}).catch((error) => {
    console.error("ERROR: ", error)
})
```

In this case, if "IP_API" fails, no fallback api will be used.