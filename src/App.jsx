import Navigationbar from "./Navigationbar/Navigationbar.jsx"
import "./App.css"
import Maincomponent from "./Maincomponent/Maincomponent.jsx"
import Home from "./Home/Home.jsx"
import Review from "./Review/Review.jsx"
import Footer from './Footer/Footer.jsx'

function App() {
  return (
    <>
      <Navigationbar />

      
      <div id="landing-section">
        <Home />
      </div>

      <div id="events-section">
        <Maincomponent />
      </div>

      <div id="reviews-section">
        <Review />
      </div>

      <div id="reachus-section">
        <Footer />
      </div>
    </>
  )
}

export default App
