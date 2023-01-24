import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import LoginComponent from './features/user/LoginComponent';
import RegisterComponent from './features/user/RegisterComponent';
import UserProfile from './features/user/UserProfile';
import { useSelector } from 'react-redux';
import Unauthorized from './features/user/Unauthorized/Unauthorized';
import DetailedMovie from './features/detailedMovie/DetailedMovie';

const App = () => {

  const {isLoggedIn} = useSelector(state => state.user);
  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Unauthorized/>} />
      <Route path="/movies/:id" element={<DetailedMovie/>}/>
   </Routes>
  );
}

export default App;
