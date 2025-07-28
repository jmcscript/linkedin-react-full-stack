import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function AppNavBar() {
  const isLoggedIn = false;
  const email = 'v4ri4bl3@gmail.com';

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/articles'}>Articles</Link>
          </li>
          {isLoggedIn && <li>Logged in as {email}</li>}
          <li>
            {isLoggedIn ? (
              <button onClick={() => signOut(getAuth())}>Log Out</button>
            ) : (
              <button onClick={() => navigate('/login')}>Log In</button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
