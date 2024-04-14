import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./home";
import Profile from "./profile";
import Dashboard from "./dashboard";
import Students from "./students";
import Settings from "./settings";
import { Sidebar } from "../widgets/sidebar/ui/sidebar";
import StudentProfile from "./student-profile";
import { CreateEntry } from "./create-entry";
import Login from "./login";
import Register from "./register";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-full">
      {location.pathname !== "/" && (
        <div className="w-[15rem]">
          <Sidebar />
        </div>
      )}
      <div
        className={`grow overflow-auto ${
          location.pathname === "/" ? "w-full" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/students/student" element={<StudentProfile />} />
                <Route path="/date/:date" element={<p>Date Page</p>} />
                <Route
                  path="/students/student/create-entry"
                  element={<CreateEntry />}
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
