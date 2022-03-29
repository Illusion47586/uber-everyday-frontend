import { ReactNode, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import CurrentSchedules from "./pages/CurrentSchedules";
// import RideShare from "./pages/RideShare";
import Home from "./pages/Home";
import MapTest from "./pages/MapTest";
import NewRide from "./pages/NewRide";
import styles from "./styles/pages/base_page.module.scss";

import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (!location.search && !location.hash) window.scrollTo(0, 0);
  }, [location]);
  const context = useContext(AuthContext);

  const ProtectedRoute = (child: ReactNode) =>
    !context?.isAuthorized ? <Navigate to="/" /> : child;

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <Routes>
          <Route
            path="/"
            element={
              !context?.isAuthorized ? <Home /> : <Navigate to="/booked" />
            }
          />
          <Route path="/map" element={<MapTest />} />
          <Route path="/newride" element={ProtectedRoute(<NewRide />)} />
          <Route
            path="/booked"
            element={ProtectedRoute(<CurrentSchedules />)}
          />
          {/* <Route path="/rideshare" element={ProtectedRoute(<RideShare />)} /> */}
          {/* <Route path="/r" element={<Home />} /> */}
          {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
