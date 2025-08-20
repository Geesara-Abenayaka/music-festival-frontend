import React from 'react'
import './Home.css'
import backgroundvideo from '../assets/backgroundvideo.webm';
function Home() {
  return (
    <div>
      <div className="background">
     <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="background-video5"
                  >
                    <source src={backgroundvideo} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
        <div className="home">
          <p className="hometext">Relive the 'Ibiza Top 100'<br /> on One World Radio</p>
          <p className="homesubtext">The Sound of Ibiza, a full week of sun, music, and Ibiza vibes.</p>
          <br />
          <br />
          <br />
          <div className="container"><button className="moreinfobtn">
            MORE INFO
          </button></div>
          <br />
          <br />





        </div>


      </div>
    </div>
  )
}

export default Home