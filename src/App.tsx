import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import styles from "./styles/pages/base_page.module.scss";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (!location.search && !location.hash) window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/r" element={<Home />} /> */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
