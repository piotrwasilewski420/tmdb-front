import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg opacity-50">
        <div className="text-center">
          <p className="text-2xl font-medium text-indigo-600">You can log in now</p>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
            onClick={handleClick}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
