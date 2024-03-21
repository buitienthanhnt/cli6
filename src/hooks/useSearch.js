import { search } from '@queries/paper';
import { useQuery } from 'react-query'; // https://tanstack.com/query/latest/docs/framework/react/guides/queries

const useSearch = (query) => {
    const response = useQuery({
        queryKey: ['searchAll', query],
        queryFn: () => search(query)
    });
    return response;
}

export { useSearch };