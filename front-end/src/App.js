
import Login from './component/login.js'
import Signup from './component/signup.js'
import Myacc from './component/myacc.js'
import Home from './component/home.js'
import AddRoom from './component/addroom.js'
import Wishlist from './component/wishlist.js'
import PrivateComponenet from './component/privateComponent.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserProfile from './component/userProfile.js'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PrivateComponenet/>}>
          <Route path='/myacc' element={<Myacc/>}></Route>
          <Route path='/addroom' element={<AddRoom/>}></Route>
          <Route path='/wishlist' element={<Wishlist/>}></Route>
          <Route path='/profile/:userid' element={<UserProfile/>}></Route>

          </Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
