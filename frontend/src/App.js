import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import AddProperty from './components/AddProperty';
import Logout from './components/Logout';
import Service from './components/Service';
import AddService from './components/AddService';
import Property from './components/Property';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/viewservice" element={<Service />} />
        <Route path="/viewproperty" element={<Property />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/addservice" element={<AddService />} />
      </Routes>
  </Router>
  );
}

export default App;
