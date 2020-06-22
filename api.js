const axios = require('axios').default;
const fs = require('fs');

exports.using_ip_locate = function (options) {

	return new Promise ((resolve, reject) => {

		const API_ENDPOINT = "https://www.iplocate.io/api/lookup/";

		let endpoint = API_ENDPOINT + options.ip;

        let headers = {}
        
        if (options.api_keys && options.api_keys.IP_LOCATE) {
            headers["X-API-Key"] = options.api_keys.IP_LOCATE
        }

        // console.log("url: ", endpoint)

        axios({
			url: endpoint,
            headers: headers
        }).then((response) => {

            if (response.status == 200) {

                let results = response.data
                let return_object = {};

                if (options.data_needed) {

                    if (options.data_needed.city) return_object.city = results.city
                    if (options.data_needed.country) return_object.country = results.country
                    if (options.data_needed.country_code) return_object.country_code = results.country_code
                    if (options.data_needed.longitude) return_object.longitude = results.longitude
                    if (options.data_needed.latitude) return_object.latitude = results.latitude
                    
                } else {

                    return_object = results;
                
                }

                return resolve(return_object);	

            } else {

                return reject(response)
            }

        }).catch((error) => {
            
            if (options.detailed_logs) console.error(`#Location-Detection-Handler: ERROR while getting location detail from IP-Locate: ${error}`)
            return reject(error)

        })

	})

}


exports.using_ip_api = function (options) {

	return new Promise ((resolve, reject) => {

		const endpoint = `https://ipapi.co/${options.ip}/json`;

        // let headers = {}
        
        // if (options.api_keys && options.api_keys.IP_LOCATE) {
        //     headers["X-API-Key"] = options.api_keys.IP_LOCATE
        // }

        axios({
			url: endpoint,
			responseType: true,
        }).then((response) => {

            if (response.status == 200) {

                let results = response.data
                let return_object = {};

                if (options.data_needed) {

                    if (options.data_needed.city) return_object.city = results.city
                    if (options.data_needed.country) return_object.country = results.country
                    if (options.data_needed.country_code) return_object.country_code = results.country_code
                    if (options.data_needed.longitude) return_object.longitude = results.longitude
                    if (options.data_needed.latitude) return_object.latitude = results.latitude
                    
                } else {

                    return_object = results;
                
                }

                return resolve(return_object);	

            } else {

                return reject(response)
            }

        }).catch((error) => {
            
            if (options.detailed_logs) console.error(`#Location-Detection-Handler: ERROR while getting location detail from IP-Locate: ${error}`)
            return reject(error)

        })

	})

}

exports.using_ip_stack = function (options) {

	return new Promise ((resolve, reject) => {

        let api_key;

        if (options.api_keys && options.api_keys.IP_STACK) {
       
            api_key = options.api_keys.IP_STACK
       
        } else {
       
            let error = {message: `Missing IP_STACK api key, required "api_keys.IP_STACK" for IP_STACK to work.`}
            return reject(error)
       
        }

		const endpoint = `http://api.ipstack.com/${options.ip}?access_key=${api_key}`;

        axios({
			url: endpoint,
        }).then((response) => {

            if (response.status == 200 && response.data.success) {

                let results = response.data
                let return_object = {};

                if (options.data_needed) {

                    if (options.data_needed.city) return_object.city = results.city
                    if (options.data_needed.country) return_object.country = results.country
                    if (options.data_needed.country_code) return_object.country_code = results.country_code
                    if (options.data_needed.longitude) return_object.longitude = results.longitude
                    if (options.data_needed.latitude) return_object.latitude = results.latitude
                    
                } else {

                    return_object = results;
                
                }

                return resolve(return_object);	

            } else {

                return reject(response.data)
            }

        }).catch((error) => {
            
            if (options.detailed_logs) console.error(`#Location-Detection-Handler: ERROR while getting location detail from IP-Locate: ${error}`)
            return reject(error)

        })

	})

}

// exports.using_ip_api({detailed_logs: true, ip: "219.91.230.38"}).then((res) => {
//     console.log("ip_api => ", res)
// }).catch((err) => {
//     console.error("err=>", err)
// })

// exports.using_ip_locate({detailed_logs: true, ip: "219.91.230.38"}).then((res) => {
//     console.log("ip_locate => ", res)
// }).catch((err) => {
//     console.error("err=>", err)
// })
