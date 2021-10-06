import React, { Component } from 'react';
import './css/sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <>
            
            <div class="col-md-4">
                <h3 class="text-lg-center lh-base font-normal text-lg text-decoration-none text-reset">
                    Hướng dẫn
           </h3>
                <div class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">

                    <div class="col-md-6 box">

                        <div class="percent">
                            <svg>
                                <circle cx="70" cy="70" r="55"></circle>
                                <circle cx="70" cy="70" r="55"></circle>
                            </svg>
                            <div class="number">
                                <h2>87<span>%</span></h2>
                            </div>
                        </div>
                        <h4 class="text">Tiến độ học</h4>

                    </div>
                    
                    <div class="col-md-6 box">
                        <div class="percent">
                            <svg>
                                <circle cx="70" cy="70" r="55"></circle>
                                <circle cx="70" cy="70" r="55"></circle>
                            </svg>
                            <div class="number">
                                <h2>87<span>%</span></h2>
                            </div>
                        </div>
                        <h4 class="text">Tiến độ học</h4>
                    </div>

                </div>
                <div class="row ${2| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">
                    <div class="boxBig">
                           <h3> Hướng dẫn trước khi học </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="boxBig">
                           <h3> Hướng dẫn trước khi học </h3>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Sidebar;