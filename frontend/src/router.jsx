import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Users from './views/Users';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/NotFound';
import Welcome from './components/Welcome';

import PatientList from "./components/PatientList";
import AddPatient from "./components/AddPatient";
import ViewPatient from "./components/ViewPatient";
import UpdatePatient from "./components/UpdatePatient";

import GetNotification from "./components/GetNotification";

import wallpaper from "./assets/image.jpeg";

const backgroundStyle = {
  backgroundImage: `url(${wallpaper})`,
  backgroundSize: "cover", // Ensures the image covers the entire container
  backgroundRepeat: "no-repeat", // Prevents the image from repeating
  backgroundPosition: "center", // Centers the image in the container
  height: "100vh", // Makes the container's height equal to the viewport height
  width: "100vw", // Makes the container's width equal to the viewport width
  margin: 0, // Removes any default margins from the container
  padding: 0, // Removes any default padding from the container
  overflow: "hidden",
};

const overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const textContainerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  padding: "1rem 2rem", // Padding inside the bar
  borderRadius: "8px", // Rounded corners (optional)
  position: "relative",
  zIndex: 2, // Ensures it is above the overlay
  display: "inline-block", // Fits the width of the text only
  margin: "auto", // Centers the bar horizontally
};

const textStyle = {
  color: "black", // Black text for better contrast
  fontSize: "3rem",
  fontWeight: "bold",
  fontFamily: "Arial, sans-serif",
  margin: 0,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <div style={{ ...backgroundStyle, position: 'relative' }}>
            <div style={overlayStyle}></div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <GetNotification />
              <div style={textContainerStyle}>
                <h1 style={textStyle}>Health is the greatest wealth.</h1>
                <br />
                <h1 style={textStyle}>Let's get started!</h1>
              </div>
            </div>
          </div>
        ),
      },
      { path: 'users', element: <Users /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'welcome', element: <Welcome /> },

      { path: 'patientlist', element: <PatientList /> },
      { path: 'add', element: <AddPatient /> },
      { path: 'view/:id', element: <ViewPatient /> },
      { path: 'update/:id', element: <UpdatePatient /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
