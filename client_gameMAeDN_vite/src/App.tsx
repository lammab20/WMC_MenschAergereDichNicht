import{ BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import {SpielDashboard} from "./views/SpielDashboard.tsx";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path ="/" element={<SpielDashboard />} />
            </Routes>
        </Router>

    </>
  )
}

export default App
