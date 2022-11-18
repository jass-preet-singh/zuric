import React, { useEffect, useState } from 'react';
import LightLogo from "../../assets/images/zurichlogo-light.png";
import Picture from "../../assets/images/Picture1.png";
import BgShape from "../../assets/images/bg-shape.png";
import AuthService from '../../shared/Services/auth.service';

const Home = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <>
            {currentUser &&
                <div className="row edit-matrics">
                    <div className="main-content --grey-bg pt-5">
                        <div className="main-content-head position-relative pt-5">
                            <div className="text-center">
                                <span className="h1 --primary-text border-bottom border-5 border-primary-color">Welcome Admin</span>
                            </div>
                        </div>
                        <div className="mt-5 ps-5">
                            <ul>
                                <li>
                                    Here agent current band and score will be shown. Some other analytics we can give the bottom. When we  click on the review details.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            {!currentUser &&
                <div>
                    <section id="" className="home-banner --primary-bg ">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="h-100 d-flex align-items-center justify-content-lg-start justify-content-center">
                                        <div className="">
                                            <div>
                                                <h1 className="text-light fw-normal text-lg-start text-center">IFA Recognition Module</h1>
                                            </div>
                                            <div>
                                                <p className="h2 pt-1 text-light fw-normal text-lg-start text-center">-Design Phase</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="text-center pt-5">
                                        <img src={Picture} alt="Picture1" width="90%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <div className="bg-shape position-absolute bottom-0 opacity-50">
                        <div className="text-center pt-5">
                            <img src={BgShape} alt="BG-SHAPE" width="200PX" />
                        </div>
                    </div> */}
                </div>
            }
        </>

    )
}

export default Home