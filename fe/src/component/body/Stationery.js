import React from 'react';
import '../../css/stationery.css';
import { FaArrowRight } from 'react-icons/fa';

export default function Stationery(){
    return(
        <section className="shopify-section">
            <div className="banner-singer">
                <div className="container-fluid">
                    {/* <h2 className="section-header"></h2> */}
                    <p className="section-text"></p>
                    <div className="row banner-content">
                        <div className="banner-item">
                            <div className="banner-singer-box">
                                <div className="banner-singer-content">
                                    <div className="sub-title">
                                        100% Stationery product
                                    </div>
                                    <div>
                                        <h4 className="title-block" style={{color: "#ffffff"}}>
                                            Open up to a new
                                            <br/>
                                            experience.
                                        </h4>
                                    </div>
                                    <p style={{color: "#ffffff;"}}></p>
                                    <div className='sub-title2'>
                                        <a className="link-base link-center" style={{color: "#fff", backgroundColor: "#e84f69",
                                                                                     border: "1px solid #e84f69", padding: "13px 25px"}}
                                                                                    href="#" title="allcollections">
                                            all colections
                                            <i style={{marginLeft: "10px"}}><FaArrowRight/></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};