
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './component/Nav';
import Landing from './component/Landing';
import Register from './feature/auth/Register';
import Login from './feature/auth/Login';
import Alert from "./feature/alert/Alert";
import Dasboard from './component/Dasboard';
import Posts from './component/Posts';
import Post from './component/Post';
import CreateProfile from './feature/profile/CreateProfile';
import EditEx from './feature/profile/EditEx';
import EditEdu from './feature/profile/EditEdu';
import PrivateRoter from './component/PrivateRoter';
import AllProfile from './component/AllProfile';
import ProfileById from './component/ProfileById';
const App=() =>{
  return (
     <Router>
       <Nav/>
       <Alert/>
       <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<PrivateRoter component={Dasboard}/>} />
          <Route path="/posts" element={<PrivateRoter component={Posts}/>}/>
          <Route path="/posts/:postId" element={<Post/>}/>
          <Route path="/createProfile" element={<PrivateRoter component={CreateProfile}/>}/>
          <Route path="/allprofiles" element={<AllProfile/>}>
          </Route>
          <Route path="/allprofiles/:profileById" element={<ProfileById/>}/>
          <Route path="/editEx" element={<EditEx/>}/>
          <Route path="/editEdu" element={<EditEdu/>}/>
       </Routes>
     </Router>
  );
}

export default App;
