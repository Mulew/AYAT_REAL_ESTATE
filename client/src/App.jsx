import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import Signup from './pages/Signup'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/Listing/:Listing_ID' element={<Listing />} />
          <Route path='/search/:searchTerm' element={<Search />} />
          <Route element={<PrivateRoute />} >
            <Route path = '/profile' element={<Profile />} />
            <Route path='/createListing' element = {<CreateListing/>} />
            <Route path='/updatelisting/:ListingID' element = {<UpdateListing/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}