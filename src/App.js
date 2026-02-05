import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/dashboard";
import Newrecording from "./pages/newrecording";
import Newrecordingfilled from "./pages/newrecordingfilled";
import Completedrecording from "./pages/Completedrecording";
import Uploadqueue from "./pages/Uploadqueue";
import Storagemanagement from "./pages/Storagemanagement";
import Devicesettings from "./pages/Devicesettings";
import StreamViewer from "./pages/redirectPrivew";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newrecording" element={<Newrecording />} />
        <Route
          path="/newrecording/newrecordingfilled"
          element={<Newrecordingfilled />}
        />
        <Route
          path="/newrecording/newrecordingfilled/completedrecording"
          element={<Completedrecording />}
        />
        <Route
          path="/uploadqueue/completedrecording"
          element={<Completedrecording />}
        />
        <Route path="/uploadqueue" element={<Uploadqueue />} />
        <Route path="/storagemanagement" element={<Storagemanagement />} />
        <Route
          path="/storagemanagement/completedrecording"
          element={<Completedrecording />}
        />
        <Route path="/devicesettings" element={<Devicesettings />} />
        <Route path="/privewpage" element={<StreamViewer />} />
      </Route>
    </Routes>
  );
}

export default App;
