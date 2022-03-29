import { ReactNode, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import CurrentSchedules from "./pages/CurrentSchedules";
// import RideShare from "./pages/RideShare";
import Home from "./pages/Home";
import MapTest from "./pages/MapTest";
import NewRide from "./pages/NewRide";
import styles from "./styles/pages/base_page.module.scss";

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
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapTest />} />
          <Route path="/newride" element={ProtectedRoute(<NewRide />)} />
          <Route path="/booked" element={ProtectedRoute(<CurrentSchedules />)} />
          {/* <Route path="/rideshare" element={ProtectedRoute(<RideShare />)} /> */}
          {/* <Route path="/r" element={<Home />} /> */}
          {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
