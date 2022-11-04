import React, { useEffect, useState } from "react";
import EditIcon from "../../assets/images/edit-icon.png";
import DeleteIcon from "../../assets/images/trash.png"
import BgShape from "../../assets/images/bg-shape.png";
import { Link } from "react-router-dom";
import AuthService from "../../shared/Services/auth.service";
import Toast from "../../shared/components/Toast";
import { Button, ToastContainer } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";

const Quiz = () => {
	const [content, setContent] = useState([]);

	/////// Get Quizs ///////
	useEffect(() => {
		AuthService.getQuiz().then(
			(response) => {
				setContent(response.data.data);
			},
			(error) => {
				const _content =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
				setContent(_content);
			}
		);
	}, []);

	//////// Delete Quiz ////////
	const handleDelete = (item) => {

		const itemId = { id: item };
		console.log(itemId)
		AuthService.deleteQuiz(itemId).then((response) => {
			console.log(response)
			Toast.success(response.data.message)
			window.location.reload();
		}, (error) => {
			const _content =
				(error.response && error.response.data) ||
				error.message ||
				error.toString();
			setContent(_content);
		})
	}


	return (
		<div className='row --grey-bg h-100'>
			<ToastContainer />
			<div className="content container-fluid ">
				<div className="text-center text-lg-start py-5">
					<div className="text-center mb-4">
						<span className="h1 --primary-text border-bottom border-3 pb-2 border-primary-color ">Quiz Configuration</span>
					</div>
				</div>
				<div className="row custom-table d-flex justify-content-center">
					<div className="col-12 col-xl-10">
						<div className="--grey-bg text-center mb-4">
							<div className="bg-light">
								<div className="d-flex align-items-center justify-content-between">
									<div><h5 className="text-start p-3 m-0">Quizs</h5></div>
									<div className="p-2">
										<Link className="text-light text-decoration-none" to='/quiz-add'>
											<button type="button" className="btn btn-primary --primary-bg px-4">Add New Quiz</button></Link>
									</div>
								</div>
								<table className="table bg-light">
									<thead>
										<tr>
											<th scope="col" className="border-end-1 border-1 border-start-0 border-top-0 px-3">#</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Questions</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Time Line</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Score</th>
											<th scope="col" className="border-top-0" colSpan={2}  >Action</th>
										</tr>
									</thead>
									<tbody>
										{
											content.map((item, i) => (
												<tr key={i}>
													<th scope="row" className="border-end-1 border-start-0 border-1 px-3">{i + 1}</th>
													<td className="border-end-1 border-1 ">{item.question}</td>
													<td className="border-end-1 border-1 ">{moment(item.startdate).format("DD-MMM-YYYY")} - {moment(item.enddate).format("DD-MMM-YYYY")}</td>
													<td className="border-end-1 border-1 ">{item.score}</td>
													<td>
														<Link className="text-light text-decoration-none" to={"/quiz-edit/" + item.id}><img src={EditIcon} width="17px" alt="edit-image" />
														</Link>
													</td>
													<td>
														<Button variant="" onClick={() => handleDelete(item.id)} >
															<img src={DeleteIcon} width="17px" alt="edit-image" />
														</Button>
													</td>
												</tr>
											))}
										{/* <tr>
											<th scope="row" className="border-end-1 border-start-0 border-1 ">2</th>
											<td className="border-end-1 border-1 ">Quiz - Health Insurance</td>
											<td className="border-end-1 border-1 ">01 Sep 2022 - 27 Sep 2022</td>
											<td className="border-end-1 border-1 ">30</td>
											<td>
												<Link className="text-light text-decoration-none" to='/quiz-edit'><img src={EditIcon} width="17px" alt="edit-image" />
												</Link>
											</td>
										</tr>
										<tr>
											<th scope="row" className="border-end-1 border-start-0 border-1 ">3</th>
											<td className="border-end-1 border-1 ">Quiz - Occupational Insurance</td>
											<td className="border-end-1 border-1 1">11 Sep 2022 - 06 Sep 2022</td>
											<td className="border-end-1 border-1 ">50</td>
											<td>
												<Link className="text-light text-decoration-none" to='/quiz-edit'><img src={EditIcon} width="17px" alt="edit-image" />
												</Link>
											</td>
										</tr> */}

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape position-absolute bottom-0 opacity-50">
				<div className="text-center pt-5">
					<img src={BgShape} alt="BG-SHAPE" width="200PX" />
				</div>
			</div>
		</div>
	)
}

export default Quiz