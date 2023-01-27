import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import LoginComponent from './features/user/LoginComponent';
import RegisterComponent from './features/user/RegisterComponent';
import UserProfile from './features/user/UserProfile';
import { useSelector } from 'react-redux';
import Unauthorized from './features/user/Unauthorized/Unauthorized';
import DetailedMovie from './features/detailedMovie/DetailedMovie';
import Actives from './features/resources/Actives';
import Filter from './features/Movies/Filter';
import Users from './features/user/Users';
import MoviesAdmin from './features/Movies/MoviesAdmin';
import Blocked from './features/Movies/Blocked';
import Report from './components/Report';

const App = () => {

  const {isLoggedIn} = useSelector(state => state.user);
  const {role} = useSelector(state => state.user);
  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Unauthorized/>}/>
        <Route path="/profile/movie/:id" element={isLoggedIn ? <DetailedMovie/> : <Unauthorized/>}/>
        <Route path="/profile/actives" element={isLoggedIn ? <Actives/> : <Unauthorized/>}/>
        <Route path="/profile/blocked" element={isLoggedIn ? <Blocked/> : <Unauthorized/>}/>
        <Route path="/filter" element={<Filter/>}/>
        <Route path="/admin/users" element={role ? <Users/> : <Unauthorized/>}/>
        <Route path="/admin/movies" element={role ? <MoviesAdmin/> : <Unauthorized/>}/>
        <Route path="/admin/report" element={role ? <Report/> : <Unauthorized/>}/>
   </Routes>
  );
}

export default App;
