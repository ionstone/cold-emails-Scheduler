import { Link, useLocation } from 'react-router-dom';

const AuthNav = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="absolute top-6 right-6 z-10">
      <Link
        to={isLoginPage ? '/register' : '/login'}
        className="text-gray-400 hover:text-white font-medium transition-all duration-200 hover:scale-105 transform flex items-center gap-2"
      >
        {isLoginPage ? (
          <>
            Need an account? <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Register</span>
          </>
        ) : (
          <>
            Already have an account? <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Login</span>
          </>
        )}
      </Link>
    </div>
  );
};

export default AuthNav; 