
import { useGetContactsQuery } from '../features/api/apiSlice'; 

export default function HomePage() {
    const { data, error, isLoading } = useGetContactsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if(data) console.log(data.resources);

    return (
        <div>
        <h1>Home Page</h1>
        </div>
    );
}