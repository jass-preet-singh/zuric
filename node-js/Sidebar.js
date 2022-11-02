import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Dash from '../../assets/images/dash.png';
import Band from '../../assets/images/bands-icon.png';
import AdminView from '../../assets/images/admin-view.png';
import RightArrow from '../../assets/images/32213.png'


const Sidebar = () => {
	// const [isAdmin, setIsAdmin] = useState("Admin");
	// const [isAgent, setIsAgent] = useState("Agent");
	// const [isUser, setIsUser] = useState("User");
	
	const [active, setActive] = useState('');
	const router = useLocation();
	const pathname = router.pathname;
	
	useEffect(() => {
		if (pathname) {
			if (pathname == '/matrics') {
				setActive('matrics');
			} else if (pathname == '/bands') {
				setActive('bands');
			} else if (pathname == '/quiz') {
				setActive('quiz');
			} else if (pathname == '/quiz-add') {
				setActive('quiz-add');
			} else if (pathname == '/my-performance') {
				setActive('my-performance');
			} else if (pathname == '/customer-view') {
				setActive('customer-view');
			} else if (pathname == '/agent-metric') {
				setActive('agent-metric');
			} else {
				setActive('home');
			}
		}
	}, [pathname])

	const isAdmin = 'admin';
	const isAgent = 'agent';
	const isUser = 'user';

	return (
		<div className="main_sidebar  --primary-bg h-100">
			<div className="side-bar">
				<div className="sidebar-header pt-2">
					<div className="px-4">
						<p className="text-light border-light-opacity py-2 ">MENU</p>
					</div>
					<div className="sidebar-content">
						<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'matrics' ? `active` : ''}`}>
							<div className="d-grid align-items-center">
								<Link className="text-light text-decoration-none" to='/matrics'>
									<img src={Dash} alt="" className="w-100" />
								</Link>
								<div className="ellipsis w-100 ps-3 pe-1">
									<Link className="text-light text-decoration-none" to='/matrics'>METRIC CONFIRURATION</Link>
								</div>
								<div className="arrow-icon w-100 d-flex align-items-center justify-content-end">
									<img src={RightArrow} alt="" className='w-75' />
								</div>
							</div>
						</div>
					</div>
					{
						isAdmin && (
							<div>
								<div className="sidebar-content">
									<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'bands' ? `active` : ''}`}>
										<div className="d-grid align-items-center">
											<Link className="text-light text-decoration-none" to='/bands'>
												<img src={Band} alt="" className="w-100" />
											</Link>
											<div className="ellipsis w-100 ps-3 pe-1">
												<Link className="text-light text-decoration-none" to='/bands'>BANDS</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="sidebar-content">
									<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'quiz' ? `active` : ''}`}>
										<div className="d-grid align-items-center">
											<Link className="text-light text-decoration-none" to='/quiz'>
												<img src={AdminView} alt="" className="w-100" />
											</Link>
											<div className="ellipsis w-100 ps-3 pe-1">
												<Link className="text-light text-decoration-none" to='/quiz'>QUIZ</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
					{
						isAgent && (
							<div>
								<div className="sidebar-content">
									<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'agent-metric' ? `active` : ''}`}>
										<div className="d-grid align-items-center">
											<Link className="text-light text-decoration-none" to='/agent-metric'>
												<img src={Band} alt="" className="w-100" />
											</Link>
											<div className="ellipsis w-100 ps-3 pe-1">
												<Link className="text-light text-decoration-none" to='/agent-metric'>AGENT MATRICS</Link>
											</div>
										</div>
									</div>
								</div>
							</div>

						)
					}
					{
						isUser && (
							<div>
								<div className="sidebar-content">
									<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'my-performance' ? `active` : ''}`}>
										<div className="d-grid align-items-center">
											<Link className="text-light text-decoration-none" to='/my-performance'>
												<img src={Band} alt="" className="w-100" />
											</Link>
											<div className="ellipsis w-100 ps-3 pe-1">
												<Link className="text-light text-decoration-none" to='/my-performance'>MY PERFORMANCE</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="sidebar-content">
									<div className={`sidebar-sub-content d-flex justify-content-between px-4 py-2 ${active == 'customer-view' ? `active` : ''}`}>
										<div className="d-grid align-items-center">
											<Link className="text-light text-decoration-none" to='/customer-view'>
												<img src={Band} alt="" className="w-100" />
											</Link>
											<div className="ellipsis w-100 ps-3 pe-1">
												<Link className="text-light text-decoration-none" to='/customer-view'>CUSTOMER VIEW</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Sidebar