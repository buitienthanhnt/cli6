import React, { useCallback } from "react";
import { createNavigationContainerRef } from '@react-navigation/native';
import { navigationRef } from "./Navigate";

type Props = {
	name: string,
	params: any
}
const useNavigate = (params: Props) => {
	const open = useCallback(() => {
		if (navigationRef.isReady()) {
			// @ts-ignore
			navigationRef.navigate(params.name, params.params);
		}
	}, []);

	const close = useCallback(() => {
		navigationRef.goBack();
	}, [])

	return { open, close }
}

export default useNavigate;