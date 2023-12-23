import { useQuery } from 'react-query' // https://tanstack.com/query/v4/docs/react/guides/query-functions
import { getPlaceDetail, getPlaceSearch, getCoordSearch } from '@netWork/maps'
import { useState } from 'react';
import { decode } from "@mapbox/polyline";

const usePlaceDetail = (_placeId) => {
	const [placeId, setPlaceId] = useState(_placeId);

	const result = useQuery({ queryKey: ['placeDetail', placeId], queryFn: () => getPlaceDetail(placeId) });
	return {
		placeData: {
			value: result.data,
			isLoading: result.isLoading,
			error: result.error,
			isSuccess: result.isSuccess,
			status: result.status,
		},
		setPlaceId: setPlaceId
	}
}

const usePlaceSearch = (searchValue) => {
	const [search, setSearch] = useState(searchValue);
	const result = useQuery({
		queryKey: ['placeSearch', search],
		queryFn: async () => {
			const data = await getPlaceSearch(search);
			const value = await data.json();
			return value;
		}
	});

	// {
	//	"error": null, "isLoading": false, "isSuccess": true, "status": "success", 
	// 	"value": {"predictions": [[Object], [Object], [Object], [Object], [Object]], 
	// 	"status": "OK"}
	// }
	return {
		placeDatas: {
			value: result.data,
			isLoading: result.isLoading,
			error: result.error,
			isSuccess: result.isSuccess,
			status: result.status,
		},
		setSearchText: setSearch
	}
};

const useGetCoords = () => {
	let coords = [];
	const [from, setFrom] = useState();
	const [to, setTo] = useState();

	const result = useQuery({
		queryKey: ['searchCoords', from, to],
		queryFn: ({ queryKey }) => getCoordSearch(queryKey[1], queryKey[2]),
	})

	if (result?.data?.routes[0]?.overview_polyline?.points) {
		let points = decode(result?.data?.routes[0].overview_polyline.points);
		// trả về 1 mảng các tọa độ điểm nối tiếp từ vị trí 1 -> vị trí 2.
		coords = points.map((point, index) => {
			return {
				latitude: point[0],
				longitude: point[1]
			};
		});
	}

	return {
		coords: {
			value: coords,
			isLoading: result.isLoading,
			error: result.error,
			isSuccess: result.isSuccess,
			status: result.status,
		},
		from: from,
		to: to,
		setFrom: setFrom,
		setTo: setTo,
	}
}

export { usePlaceDetail, usePlaceSearch, useGetCoords }