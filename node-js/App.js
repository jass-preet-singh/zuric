import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css';
import './assets/styles/style.css';
import './assets/styles/bootstrap.min.css';
import Home from './components/pages/Home';
import Matrics from './components/pages/Matrics';
import Sidebar from './shared/components/Sidebar';
import Logo from "./assets/images/zurich-logo.png";
import Bands from './components/pages/Bands';
import Quiz from './components/pages/Quiz';
import AddQuiz from './components/pages/AddQuiz';
import MyPerformance from './components/pages/MyPerformance';
import CustomerView from './components/pages/CustomerView';
import AgentMetric from './components/pages/AgentMetric';
import Register from './components/pages/Register';
import AuthService from './shared/Services/auth.service'
import EditQuiz from './components/pages/EditQuiz';
import Login from './components/pages/Login';

function App() {
  const router = useLocation();
  const navigate = useNavigate();
  const isAdmin = 'admin';
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showHome, setShowHome] = useState(false);

  const pathname = router.pathname;

  useEffect(() => {
    if (pathname == "/" || pathname == "/home") {
      setShowHome(true)
    }
  }, [])

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
    window.location.reload()
  };
  const logIn = () => {
    AuthService.login();
    navigate("/login")
    window.location.reload()
  }

  return (
    <div>
      {/* <div className="container">
        <div className='col-md-12 col-sm-12'>
          <Routes>
          </Routes>
        </div>
      </div> */}
      {isAdmin &&
        <>
          <header>
            <div className="navbar bg-light p-3">
              <Link className="text-light text-decoration-none navbar-item" to="/">
                <img src={Logo} alt="" />
              </Link>
              {currentUser &&
                <button className='header-btn' onClick={logOut}>Logout</button>
              }
              {!currentUser &&
                <Link className='header-btn linknone' onClick={logIn} >Login</Link>}
            </div>
          </header>
          <section id="main" className="main">
            <div className="container-fluid p-0">
              {!currentUser &&
                <div>
                  <Routes>
                    <Route path='/' exact element={<Home />} />
                  </Routes>
                  {!showHome &&
                    <div className="container">
                      <div className="row ">
                        <div className="d-flex justify-content-center mt-3 mt-5 p-0">
                          <Routes>
                            <Route path='/login' exact element={<Login />} />
                            <Route path='/register' exact element={<Register />} />
                          </Routes>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
              {currentUser &&
                <div className="custom-grid">
                  <Sidebar />
                  <div className="content container-fluid">
                    <Routes>
                      <Route path='/' exact element={<Home />} />
                      <Route path='/matrics' exact element={<Matrics />} />
                      <Route path='/bands' exact element={<Bands />} />
                      <Route path='/quiz' exact element={<Quiz />} />
                      <Route path='/quiz-add' exact element={<AddQuiz />} />
                      <Route path='/quiz-edit/:id' exact element={<EditQuiz />} />
                      <Route path='/my-performance' exact element={<MyPerformance />} />
                      <Route path='/customer-view' exact element={<CustomerView />} />
                      <Route path='/agent-metric' exact element={<AgentMetric />} />
                      {/* <Route path='*' exact element={<Home />} /> */}
                    </Routes>
                  </div>
                </div>
              }
            </div>
          </section>
        </>
      }
    </div>
  );
}

export default App;
