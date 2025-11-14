
import './App.css';
import Login from "./FormPages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import { Toaster } from "react-hot-toast";
import Register from "./FormPages/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import Forum from "./FormPages/Forum/Forum";
import NutritionWellWisher from './Pages/NutritionWellWisher/NutritionWellWisher';
import DietPlans from './Pages/DietPlanner/DietPlans';
import PeriodTracker from './Pages/PeriodTracker/PeriodTracker';
import FitnessRoutine from './Pages/FitnessRoutine/FitnessRoutine';



function App() {
  return (
   <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/forum" element={<Forum title="Share your Thoughts" label="Your thoughts" />} />
          <Route path="/Nutrition" element={<NutritionWellWisher />} />
          <Route path="/Diet" element={<DietPlans />} />
            <Route path="/period" element={<PeriodTracker />} />
            <Route path="/fit" element={<FitnessRoutine/>} />
      
          
           
           
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
