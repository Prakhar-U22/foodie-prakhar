import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
// import {
//   createBrowserRouter
// } from "react-router-dom";
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screen/Signup.js';



// ###-------------------------no of PAGES  (OR) SCREENS-------------------------### \\
function App() {
  const router = createBrowserRouter([
  {
    path : "/",
    element: <Home />
  },
  {
    path : "/login",
    element: <Login/>
  },
  {
    path : "/createuser",
    element: <Signup/>
  }
  ]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
