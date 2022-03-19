import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import styles from "./styles/pages/base_page.module.scss";

function App() {
  return (
    <div className={styles.page}>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
