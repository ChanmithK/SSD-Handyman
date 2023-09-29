import { CssBaseline } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTileName } from "./redux/AppbarTitleSlice";
import MakeOrder from "./pages/Client/Main-Pages/Make-Order";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import ErrorPage from "./components/Admin/ErrorPage";
import ViewGigMainPage from "./pages/Frontend/Customer/ViewGigMainPage";

// ********************** NILAKSHA IMPORTS ********************** //
import SignUp from "./pages/Frontend/Common/SignUp";
import SignIn from "./pages/Frontend/Common/SignIn";
import CreateGigMainPage from "./pages/Frontend/Handyman/CreateGigMainPage";
import BuyerRequestsMainPage from "./pages/Frontend/Handyman/BuyerRequestsMainPage";
import ProfileMainPage from "./pages/Frontend/Common/ProfileMainPage";
import EditProfileMainPage from "./pages/Frontend/Common/EditProfileMainPage";

//vishara
import HandymanGigsPage from "./pages/Frontend/Handyman/HandymanGigsPage";
import HandymanDirReqPage from "./pages/Frontend/Handyman/HandymanDirReqPage";
import CustomerBuyerRequests from "./pages/Frontend/Customer/CustomerBuyerRequests";
import HandymanResponsePage from "./pages/Frontend/Customer/HandymanResponsePage";
import HandymanProtectedRoute from "./components/HandymanProtectedRoute";
import CustomerProtectedRoutes from "./components/CustomerProtectedRoutes";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/view-gigs") {
      dispatch(setTileName("Gigs"));
    } else if (location.pathname === "/create-gig") {
      dispatch(setTileName("Create a New Gig"));
    } else if (location.pathname === "/view-buyer-requests") {
      dispatch(setTileName("Buyer Requests"));
    } else if (location.pathname === "/profile") {
      dispatch(setTileName("Profile"));
    } else if (location.pathname === "/handyman-gigs") {
      dispatch(setTileName("Handyman Gigs"));
    } else if (location.pathname === "/handyman-direct-requests") {
      dispatch(setTileName("Handyman Direct Requests"));
    } else if (location.pathname === "/customer-requests") {
      dispatch(setTileName("Order Requests and Response"));
    } else if (location.pathname === "/handyman-responses") {
      dispatch(setTileName("Handyman Responses"));
    }
  }, [location.pathname]);

  return (
    <div>
      <CssBaseline />
      <UserAuthContextProvider>
        <Routes>
          {/* **********************Handyman Application***************** */}

          {/* Common*/}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/profile" element={<ProfileMainPage />} />
          <Route path="/profile-edit" element={<EditProfileMainPage />} />

          {/* Handyman */}
          <Route
            element={<HandymanProtectedRoute allowedRoles={["Handyman"]} />}
          >
            <Route path="/create-gig" element={<CreateGigMainPage />} />
          </Route>

          <Route
            element={<HandymanProtectedRoute allowedRoles={["Handyman"]} />}
          >
            <Route
              path="/view-buyer-requests"
              element={<BuyerRequestsMainPage />}
            />
          </Route>

          <Route
            element={<HandymanProtectedRoute allowedRoles={["Handyman"]} />}
          >
            <Route path="/handyman-gigs" element={<HandymanGigsPage />} />
          </Route>

          <Route
            element={<HandymanProtectedRoute allowedRoles={["Handyman"]} />}
          >
            <Route
              path="/handyman-direct-requests"
              element={<HandymanDirReqPage />}
            />
          </Route>

          {/* Customer */}
          <Route
            element={<CustomerProtectedRoutes allowedRoles={["Customer"]} />}
          >
            <Route
              path="/handyman-responses"
              element={<HandymanResponsePage />}
            />
          </Route>

          <Route
            element={<CustomerProtectedRoutes allowedRoles={["Customer"]} />}
          >
            <Route
              path="/customer-requests"
              element={<CustomerBuyerRequests />}
            />
          </Route>

          <Route
            element={<CustomerProtectedRoutes allowedRoles={["Customer"]} />}
          >
            <Route path="/make-order" element={<MakeOrder />} />
          </Route>

          <Route
            element={<CustomerProtectedRoutes allowedRoles={["Customer"]} />}
          >
            <Route path="/view-gigs" element={<ViewGigMainPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
