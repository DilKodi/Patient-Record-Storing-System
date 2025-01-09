import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar component
import axios from 'axios';
import GetNotification from './components/GetNotification';


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {

  return (
    <>
      <GetNotification />
      <Navbar />
      <div style={{ paddingTop: '4rem' }}>
        {/* Outlet renders the content of the current route */}
        <Outlet />
      </div>
    </>
  );
}

export default App;
