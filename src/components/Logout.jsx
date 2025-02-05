import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');  // Redirect to login page after logout
    }).catch((err) => console.error(err));
  };

  return <button onClick={handleLogout} className='p-2 pl-3 pr-3 bg-red-500 rounded hover:pr-7 hover:text-white transition-all'>Logout</button>;
};

export default Logout;
