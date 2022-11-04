import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from "../../shared/Services/auth.service";
import Toast from "../../shared/components/Toast";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditQuiz = () => {
	const [content, setContent] = useState([]);
	const { id } = useParams();
	let navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		// question: Yup.string().required('Question field is required'),
		// score: Yup.string().required('Score field is required'),
	});

	const formik = useFormik({
		initialValues: {
			question: '',
			startdate: '',
			enddate: '',
			score: 0,
			option1: '',
			option2: '',
			option3: '',
			option4: '',
			correctAns: '',
			id: 0
			// acceptTerms: false,
		},
		validationSchema,
	});
	const answerHandler = (e) => {
		const correctAnswer = e.target.value;
		formik.values.correctAns = correctAnswer
	}

	/////// Get Quizs ///////
	useEffect(() => {
		var quizId = { "id": id }
		AuthService.getQuizById(quizId).then(
			(response) => {
				setContent(response.data.data);
				console.log(response.data.data)
			},
			(error) => {
				const _content =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
				setContent(_content);
			}
		);
		formik.values.id = id
	}, []);
	console.log(content)

	///////// Update Quiz ////////
	const onUpdate = async () => {
		const data = formik.values;
		console.log(data)
		AuthService.updateQuiz(data).then(
			(response) => {
				setContent(response.data.data);
				Toast.success(response.data.message)
				navigate('/quiz');
			},
			(error) => {
				const _content =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
				setContent(_content);
			}
		);
	}

	return (
		<div className='row --grey-bg'>
			<ToastContainer />
			<div className="content container-fluid">
				<div className="text-center text-lg-start pt-4 pb-3 ">

					<div className="text-center mb-4">
						<span className="h1 --primary-text border-bottom border-3 pb-2 border-primary-color ">Quiz Configuration</span>
					</div>

				</div>
				<div className="row custom-table d-flex justify-content-center">
					<div className="col-12 col-xl-6">
						<div className="p-3  mb-3 bg-light">
							<div className="title">
								<h5>Questions:</h5>
							</div>
							<form onSubmit={formik.handleSubmit}>
								{content &&
									content.map((item, i) => (
										<div key={i}>
											<div className="mb-2">
												<label>Question</label>
												{/* <input type="text" className="form-control" value="Health Insurance is Related to?" /> */}
												<input name="question" type="text"
													className={
														'form-control' +
														(formik.errors.question && formik.touched.question
															? ' is-invalid'
															: '')
													}
													defaultValue={item.question}
													onChange={formik.handleChange}
												/>
											</div>
											<div className="mb-2 d-flex align-items-center justify-content-between">
												<div className="pr-2 w-50 me-3">
													<label>Start Time</label>
													{/* <input type="text" className="form-control" placeholder="20 Sep 2022" /> */}
													<input type="date" name="startdate"
														className={
															'form-control' +
															(formik.errors.startdate && formik.touched.startdate
																? ' is-invalid'
																: '')
														}
														onChange={formik.handleChange}
														defaultValue={moment(item.startdate).format("YYYY-MM-DD")}
													/>
												</div>
												<div className="w-50">
													<label>End Time</label>
													{/* <input type="date" className="form-control" placeholder="24 Sep 2022" /> */}
													<input type="date" name="enddate"
														className={
															'form-control' +
															(formik.errors.enddate && formik.touched.enddate
																? ' is-invalid'
																: '')
														}
														onChange={formik.handleChange}
														defaultValue={moment(item.enddate).format("YYYY-MM-DD")}
													/>
												</div>
											</div>
											<div className=" my-3">
												<div className="title">
													<h5>Answers:</h5><p>{'(Fill all options and tick the correct answer)'}</p>
												</div>
												<div className="mb-2 d-flex align-items-center justify-content-between">
													<div className="pr-2 d-flex align-items-center w-50">
														<div className="pe-3">
															<input type="radio" name="correctAns" value={"option1"} defaultChecked={(item.answer.correctAns == 'option1' ? true : false)} onChange={answerHandler} />
														</div>
														<p className="mb-0 me-2 white-space-nowrap">Option 1</p>
														<input type="text" name="option1" className="form-control" onChange={formik.handleChange}
															defaultValue={item.answer.option1} />
													</div>
													<div className="pr-2 d-flex align-items-center w-50">
														<div className="px-3">
															<input type="radio" name="correctAns" value={"option2"} onChange={answerHandler} defaultChecked={(item.answer.correctAns == 'option2' ? true : false)} />
														</div>
														<p className="mb-0 me-2 white-space-nowrap">Option 2</p>
														<input type="text" name="option2" className="form-control" onChange={formik.handleChange}
															defaultValue={item.answer.option2} />
													</div>
												</div>

												<div className="mb-2 d-flex align-items-center justify-content-between">
													<div className="pr-2 d-flex align-items-center w-50">
														<div className="pe-3">
															<input type="radio" name="correctAns" value={"option3"} onChange={answerHandler} defaultChecked={(item.answer.correctAns == 'option3' ? true : false)} />
														</div>
														<p className="mb-0 me-2 white-space-nowrap">Option 3</p>
														<input type="text" name="option3" className="form-control" onChange={formik.handleChange}
															defaultValue={item.answer.option3} />
													</div>
													<div className="pr-2 d-flex align-items-center w-50 ">
														<div className="px-3">
															<input type="radio" name="correctAns" value={"option4"} onChange={answerHandler}
																defaultChecked={(item.answer.correctAns == 'option4' ? true : false)} />
														</div>
														<p className="mb-0 me-2 white-space-nowrap">Option 4</p>
														<input type="text" name="option4" className="form-control" onChange={formik.handleChange}
															defaultValue={item.answer.option4} />
													</div>
												</div>
											</div>

											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center w-25">
													<label className="pe-2 white-space-nowrap">Score :</label>
													{/* <input type="text" className="form-control" value="50" /> */}
													<input type="text" name="score"
														className={
															'form-control' +
															(formik.errors.score && formik.touched.score
																? ' is-invalid'
																: '')
														}
														onChange={formik.handleChange}
														defaultValue={item.score}
													/>
												</div>
											</div>
										</div>
									))}
								<div className=" d-flex align-items-center justify-content-center py-3">
									<div><button type="button" className="btn btn-primary me-3 py-1 px-3">Cancel</button></div>
									<div><button type="submit" className="btn btn-primary py-1 px-4" onClick={onUpdate}>Save</button></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditQuiz;