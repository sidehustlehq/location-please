const all_api = require('./api.js')

exports.apiHandler = async function(options) {

	/*

	@PARAMS:
	ip: <string> REQUIRED, as this function is to get details from IP.

	api_keys: {
		IP_LOCATE: <string>,
		IP_API: <string>,
		IP_STACK: <string> Required if you want to use IP_STACK
	}

	priorities: [
		"IP_LOCATE",
		"IP_API",
		"IP_STACK"
	]

	only_priority: execute only apis in the priority list or execute priority first, if they fail execute others.

	data_needed: {
		city: 1,
		country: 1,
		lat: 1,
		long: 1,
		country_code: 1,
	}

	detailed_logs: true, default = false.	
	distinct_id: If required for debugging purposes.


	*/

	const API_CALL = {
		"IP_LOCATE": all_api.using_ip_locate,
		"IP_API": all_api.using_ip_api,
		"IP_STACK": all_api.using_ip_stack
	}

	const API_KEYS = Object.keys(API_CALL)

	if (options.detailed_logs) console.log(`#Location-Detection-Handler called with options: ${JSON.stringify(options)}`)

		let keys = options.priorities || API_KEYS

		let response_json = {}

		if (!options.only_priority && options.priorities) keys = union(options.priorities, API_KEYS)

		for (const api_name of keys) {

			try {

				response_json["data"] = await API_CALL[api_name](options);
				response_json.api_used = api_name

				console.log(`#Location-Detection-Handler: Successfully received data: ${JSON.stringify(response_json)}`)

				return response_json

			} catch (error) {

				if (options.detailed_logs) console.error(`#Location-Detection-Handler: Got error while getting details from ${api_name}. Error: ${JSON.stringify(error)}`)

				if (!response_json["failure_reports"]) {
					response_json["failure_reports"] = {}
				} 

				response_json["failure_reports"][api_name] = error

			}

		}

		if (response_json["failure_reports"]) {

			response_json["error"] = {
				message: "All the IP-APIS have. Please check failure_reports for details."
			}

			console.error(`#Location-Detection-Handler: ${response_json}`);
			return response_json
		}
		
}

// Joining priority list & available API.

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}


// exports.apiHandler({
// 	detailed_logs: true, 
// 	ip: "219.91.230.38",
// 	data_needed: {
// 		city: 1,
// 		country: 1,
// 		latitude: 1,
// 		longitude: 1,
// 		country_code: 1,
// 	},
// 	priorities: ["IP_STACK"]
// })