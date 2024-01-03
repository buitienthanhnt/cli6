import { googleMapUrl } from "@utils/maps";
import Config from "@config/Config";
// https://developers.google.com/maps/documentation/places/web-service/details

const getPlaceDetail = async (placeId) => {
	const paramUrl = Config.buy_params({
		place_id: placeId,
		key: Config.googleService.geoMapApiKey
	});

	// hoặc có thể dùng: api/geocode(https://developers.google.com/maps/documentation/geocoding/requests-geocoding)
	// để lấy detail.
	const url = googleMapUrl + Config.googleService.placeDetail + Config.googleService.reponseJson + paramUrl;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

const getPlaceSearch = (searchText)=>{
	const paramUrl = Config.buy_params({
		input: searchText,
		radius: 500,
		key: Config.googleService.geoMapApiKey
	});
	const url = googleMapUrl + Config.googleService.placeSearch + Config.googleService.reponseJson;
	return fetch(url+paramUrl);
}

const getCoordSearch = async (from, to)=>{
	if (!from || !to) {
		return null;
	}
	const paramUrl = Config.buy_params({
		origin: `${from.lat},${from.lng}`,
		destination: `${to.lat},${to.lng}`,
		key: Config.googleService.geoMapApiKey,
	});
	const url = googleMapUrl + Config.googleService.placeDirections + Config.googleService.reponseJson + paramUrl;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export { getPlaceDetail, getPlaceSearch, getCoordSearch }

// place detail: =============================
// {
// 	"html_attributions":[   ],
// 	"result":{
// 	   "address_components":[],
// 	   "adr_address":"<span class=\"street-address\">Km 9 Nguyễn Trãi</span>, <span class=\"extended-address\">P. Văn Quán</span>, <span class=\"locality\">Thanh Xuân</span>, <span class=\"region\">Hà Nội</span>, <span class=\"country-name\">Vietnam</span>",
// 	   "formatted_address":"Km 9 Nguyễn Trãi, P. Văn Quán, Thanh Xuân, Hà Nội, Vietnam",
// 	   "geometry":{
// 		  "location":[
// 			 "Object"
// 		  ],
// 		  "viewport":[
// 			 "Object"
// 		  ]
// 	   },
// 	   "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
// 	   "icon_background_color":"#7B9EB0",
// 	   "icon_mask_base_uri":"https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
// 	   "name":"Km 9 Nguyễn Trãi",
// 	   "place_id":"ChIJSzCx8cesNTER5nQ3fDSKkVE",
// 	   "reference":"ChIJSzCx8cesNTER5nQ3fDSKkVE",
// 	   "types":[
// 		  "premise"
// 	   ],
// 	   "url":"https://maps.google.com/?q=Km+9+Nguy%E1%BB%85n+Tr%C3%A3i,+P.+V%C4%83n+Qu%C3%A1n,+Thanh+Xu%C3%A2n,+H%C3%A0+N%E1%BB%99i,+Vietnam&ftid=0x3135acc7f1b1304b:0x51918a347c3774e6",
// 	   "utc_offset":420
// 	}
// place detail: =============================

// place search result =======================

// {
// 	"predictions":[
// 	   {
// 		  "description":"Nam Dinh, Vietnam",
// 		  "matched_substrings":[
// 			 "Array"
// 		  ],
// 		  "place_id":"ChIJzfHVuK3gNTERYnTmALq69LU",
// 		  "reference":"ChIJzfHVuK3gNTERYnTmALq69LU",
// 		  "structured_formatting":[
// 			 "Object"
// 		  ],
// 		  "terms":[
// 			 "Array"
// 		  ],
// 		  "types":[
// 			 "Array"
// 		  ]
// 	   },
// 	   {
// 		  "description":"Nam Định Tower, Cửa Bắc, Nam Định, Nam Dinh, Vietnam",
// 		  "matched_substrings":[
// 			 "Array"
// 		  ],
// 		  "place_id":"ChIJ87GfjcvnNTERgvfn99Xn2pc",
// 		  "reference":"ChIJ87GfjcvnNTERgvfn99Xn2pc",
// 		  "structured_formatting":[
// 			 "Object"
// 		  ],
// 		  "terms":[
// 			 "Array"
// 		  ],
// 		  "types":[
// 			 "Array"
// 		  ]
// 	   },
// 	   {
// 		  "description":"Nam Định Plaza, Trần Hưng Đạo, TP. Nam Định, Nam Dinh, Vietnam",
// 		  "matched_substrings":[
// 			 "Array"
// 		  ],
// 		  "place_id":"ChIJExq2-0vnNTERkOohSVHYuEI",
// 		  "reference":"ChIJExq2-0vnNTERkOohSVHYuEI",
// 		  "structured_formatting":[
// 			 "Object"
// 		  ],
// 		  "terms":[
// 			 "Array"
// 		  ],
// 		  "types":[
// 			 "Array"
// 		  ]
// 	   },
// 	   {
// 		  "description":"Nam Định, Đường Số 4, Xuan Thoi Dong, Hóc Môn, Ho Chi Minh City, Vietnam",
// 		  "matched_substrings":[
// 			 "Array"
// 		  ],
// 		  "place_id":"ChIJXVK-lkEqdTERZbq79yZ2bjs",
// 		  "reference":"ChIJXVK-lkEqdTERZbq79yZ2bjs",
// 		  "structured_formatting":[
// 			 "Object"
// 		  ],
// 		  "terms":[
// 			 "Array"
// 		  ],
// 		  "types":[
// 			 "Array"
// 		  ]
// 	   },
// 	   {
// 		  "description":"NAM DINH VU PORT, Đông Hải, Hải An, Hai Phong, Vietnam",
// 		  "matched_substrings":[
// 			 "Array"
// 		  ],
// 		  "place_id":"ChIJ_8-M_P9lSjERH9KckTAAEwE",
// 		  "reference":"ChIJ_8-M_P9lSjERH9KckTAAEwE",
// 		  "structured_formatting":[
// 			 "Object"
// 		  ],
// 		  "terms":[
// 			 "Array"
// 		  ],
// 		  "types":[
// 			 "Array"
// 		  ]
// 	   }
// 	],
// 	"status":"OK"
//  }
// place search result =======================