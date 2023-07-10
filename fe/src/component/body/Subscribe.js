import React from 'react';
import '../../css/subscribe.css';

export default function Subscribe(){
  return(
    <div className='newsletter'>
      <div className='container'>
        <div className='section-block section-block--padding text-center'>
          <h4 className='h1--mini section-block__title'>
            Subscribe and get 20% off your
            <br/>
            first purchase.
          </h4>
        </div>
        <div className="input-group subscribe-1 mb-3 d-flex justify-content-center align-items-center">
            <input type="text" className="subscribe-2" placeholder="Enter your email address"/>
            <div className="input-group-append">
                <button className="subscribe-3" type="submit">Subscribe</button>
            </div>
        </div>
      </div>
    </div>
  )
}