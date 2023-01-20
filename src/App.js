import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import LoginComponent from './features/user/LoginComponent';
import RegisterComponent from './features/user/RegisterComponent';

const App = () => {
  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
   </Routes>
  );
}

export default App;
