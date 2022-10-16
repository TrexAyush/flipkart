import notFound from '../assets/images/404-not-found.svg';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header'
const NotFound = () => {
    return (
        <>
        <Header title="Page Not Found"/>
        <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <img draggable="false" className="h-full sm:w-1/3" src={notFound} alt="Page Not Found" />
            <Link to="/" className="px-4 py-2 text-white uppercase bg-blue-500 rounded-sm shadow hover:shadow-lg">Back To Home</Link>
        </div>
        </>
    );
};

export default NotFound;
