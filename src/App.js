import { CssBaseline } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Blogs from "./pages/Client/Main-Pages/Blogs";
import Orders from "./pages/Client/Main-Pages/Orders";
import Schedules from "./pages/Client/Main-Pages/Schedules";
import TrainersList from "./pages/Client/Main-Pages/Trainers-List";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTileName } from "./redux/AppbarTitleSlice";
import TrainerDetails from "./pages/Client/Main-Pages/Trainer-Details";
import MakeOrder from "./pages/Client/Main-Pages/Make-Order";
import ViewOrder from "./pages/Client/Main-Pages/View-Order";
import UpdateOrder from "./pages/Client/Main-Pages/Update-Order";
import ClientProfile from "./pages/Client/Main-Pages/ClientProfile";
import ClientProfileUpdate from "./pages/Client/Main-Pages/ClientProfileUpdate";
import BlogView from "./pages/Client/Main-Pages/BlogView";

import SignIn from "./pages/User/Main-Pages/SignIn";
import SignUp from "./pages/User/Main-Pages/SignUp";
import PasswordReset from "./pages/User/Main-Pages/PasswordReset";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import BlogList from "./pages/Admin/MainPages/BlogList";
import AdminUserList from "./pages/Admin/MainPages/AdminUserList";
import BlogUpdate from "./pages/Admin/MainPages/BlogUpdate";
import BlogViewAdmin from "./pages/Admin/MainPages/BlogView";
import BlogCreate from "./pages/Admin/MainPages/BlogCreate";
import Report from "./pages/Admin/MainPages/Report";
import WorkoutScheduleReport from "./pages/Client/Main-Pages/Workout-Schedule-Report";

import TrainerClients from "./pages/Trainer/MainPages/Clients";
import TrainerOrders from "./pages/Trainer/MainPages/Orders";
import TrainerPackages from "./pages/Trainer/MainPages/Packages";
import TrainerOrderDetaills from "./pages/Trainer/MainPages/OrderDetaills";
import TrainerPlan from "./pages/Trainer/MainPages/Plan";
import TrainerViewPlan from "./pages/Trainer/MainPages/ViewPlan";
import TrainerAboutProfile from "./pages/Trainer/MainPages/AboutProfile";
import TrainerProfile from "./pages/Trainer/MainPages/Profile";
import TrainerProfileEdit from "./pages/Trainer/MainPages/ProfileEdit";
import TrainerCreatepackage from "./pages/Trainer/MainPages/Createpackage";
import TrainerUpdatePackage from "./pages/Trainer/MainPages/UpdatePackage";
import TrainerClientDetails from "./pages/Trainer/MainPages/ClientDetails";
import TrainerReport from "./pages/Trainer/MainPages/Report";
import MealPlanReport from "./pages/Client/Main-Pages/MealPlanReport";
import ErrorPage from "./components/Admin/ErrorPage";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/blogs") {
      dispatch(setTileName("Blogs"));
    } else if (location.pathname === "/trainers") {
      dispatch(setTileName("Trainers"));
    } else if (location.pathname === "/orders") {
      dispatch(setTileName("Order History"));
    } else if (location.pathname === "/schedules") {
      dispatch(setTileName("Schedules"));
    } else if (location.pathname === `/trainer-details`) {
      dispatch(setTileName("Trainer Details"));
    } else if (location.pathname === "/make-order") {
      dispatch(setTileName("Make Order"));
    } else if (location.pathname === "/view-order") {
      dispatch(setTileName("View Order"));
    } else if (location.pathname === "/update-order") {
      dispatch(setTileName("Update Order"));
    }
  }, [location.pathname]);

  return (
    <div>
      <CssBaseline />
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/error"
            element={
              <ProtectedRoute>
                <ErrorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainers"
            element={
              <ProtectedRoute>
                <TrainersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <ProtectedRoute>
                <Schedules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainer-details"
            element={
              <ProtectedRoute>
                <TrainerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/make-order"
            element={
              <ProtectedRoute>
                <MakeOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-order"
            element={
              <ProtectedRoute>
                <ViewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-order"
            element={
              <ProtectedRoute>
                <UpdateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog-view"
            element={
              <ProtectedRoute>
                <BlogView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client-profile"
            element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client-profile-update"
            element={
              <ProtectedRoute>
                <ClientProfileUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client-workout-schedule-report"
            element={<WorkoutScheduleReport />}
          />
          <Route path="/client-meal-plan-report" element={<MealPlanReport />} />

          {/* Chamod */}

          <Route path="/" exact element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Rasanga */}
          {/* <Route path="/trainer/clients" element={<TrainerClients />} /> */}
          <Route
            path="/trainer/clients"
            element={
              <ProtectedRoute>
                <TrainerClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainer/clients"
            element={
              <ProtectedRoute>
                <TrainerClients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/clients/:id"
            element={
              <ProtectedRoute>
                <TrainerClientDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/orders"
            element={
              <ProtectedRoute>
                <TrainerOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/packages"
            element={
              <ProtectedRoute>
                <TrainerPackages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/orders/:id"
            element={
              <ProtectedRoute>
                <TrainerOrderDetaills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/create-plan/:id"
            element={
              <ProtectedRoute>
                <TrainerPlan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/plan/:id"
            element={
              <ProtectedRoute>
                <TrainerViewPlan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/about"
            element={
              <ProtectedRoute>
                <TrainerAboutProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/profile"
            element={
              <ProtectedRoute>
                <TrainerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/profile-edit"
            element={
              <ProtectedRoute>
                <TrainerProfileEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/package-create"
            element={
              <ProtectedRoute>
                <TrainerCreatepackage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/package-edit"
            element={
              <ProtectedRoute>
                <TrainerUpdatePackage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trainer/report"
            element={
              <ProtectedRoute>
                <TrainerReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/blog/create" element={<BlogCreate />} />
          <Route path="/admin/blog/view" element={<BlogViewAdmin />} />
          <Route path="/admin/blog/update" element={<BlogUpdate />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/report" element={<Report />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
