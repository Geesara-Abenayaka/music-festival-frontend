import React from 'react'
import './footer.css'
import skyveillogo from '../assets/skyveillogo.png'
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <div className='title'>

      <div className='wantthis'>
        {/* Skyveil
        <img src={skyveillogo} alt="skyveil_logo" className='skyveillogo' /> */}

        <div className='geesara'>Skyveil is not just a festival, it's a<br />celebration of music, light, and<br /> pure energy. As a leading EDM<br /> experience, we bring together<br /> world-class artists</div>
        </div> 
      <div className='wannastyle'>
        Shows<br />
        Payments<br />
        Delivery options<br />
        Buyer protection

      </div>
      <div className='wannastyle'>
        Customer care<br />
        Help center<br />
        Terms & Conditions<br />
        Privacy policy

      </div>
      <div className='wannastyle'>
        Pages<br />
        Home<br />
        Shows<br />
        Privacy policy

      </div>
      <div className='subscribe'>
        Subscribe Now<br />
        <form className='abe'>
          
            <input type="text" placeholder='Your Email' className='inputbox'/>
            <div className='jan'><button className='submitbutton'>Submit</button>
      
              </div>
        </form>
        <ImFacebook2 className='reacticon1'/>
        <GrInstagram className='reacticon1'/>
        <FaTwitter className='reacticon1'/>
      </div>

    </div>
  )
}

export default Footer