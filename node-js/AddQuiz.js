import React, { useRef, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from "@mui/material";
import AuthService from "../../shared/Services/auth.service";
import Toast from "../../shared/components/Toast";
import { ToastContainer } from "react-toastify";

const AddQuiz = () => {
	const [content, setContent] = useState([])
	const validationSchema = Yup.object().shape({
		question: Yup.string().required('Question field is required'),
		score: Yup.string().required('Score field is required'),
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
			correctAns: ''
			// acceptTerms: false,
		},
		validationSchema,
	});

	const answerHandler = (e) => {
		const correctAnswer = e.target.value;
		formik.values.correctAns = correctAnswer
	}


	const onSubmit = async () => {
		const data = formik.values;
		AuthService.addQuiz(data).then(
			(response) => {
				setContent(response.data.data);
				Toast.success(response.data.message)
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
								<div className="mb-2 ">
									<label htmlFor="question">Question</label>
									<input name="question" type="text"
										className={
											'form-control' +
											(formik.errors.question && formik.touched.question
												? ' is-invalid'
												: '')
										}
										onChange={formik.handleChange} value={formik.values.question}
									/>
									{/* <div className="invalid-feedback">
										{formik.errors.question && formik.touched.question
											? formik.errors.question
											: null}
									</div> */}
								</div>
								<div className="mb-2 d-flex align-items-center justify-content-between">
									<div className="pr-2 w-50 me-3">
										<label>Start Time</label>
										<input type="date" name="startdate"
											className={
												'form-control' +
												(formik.errors.startdate && formik.touched.startdate
													? ' is-invalid'
													: '')
											}
											onChange={formik.handleChange}
										// value={formik.values.startdate}
										/>
									</div>
									<div className="w-50">
										<label>End Time</label>
										<input type="date" name="enddate"
											className={
												'form-control' +
												(formik.errors.enddate && formik.touched.enddate
													? ' is-invalid'
													: '')
											}
											onChange={formik.handleChange}
										// value={formik.values.enddate}
										/>

									</div>
								</div>
								<div className=" my-3">
									<div className="title">
										<h5>Answers:</h5> <p>{'(Fill all options and tick the correct answer)'}</p>
									</div>
									<div className="mb-2 d-flex align-items-center justify-content-between">
										<div className="pr-2 d-flex align-items-center w-50">
											<div className="pe-3">
												<input type="radio" name="correctAns" value={"option1"} onChange={answerHandler} />
											</div>
											<p className="mb-0 me-2 white-space-nowrap">Option 1</p>
											<input type="text" name="option1" className="form-control" onChange={formik.handleChange}
												value={formik.values.option1} />
										</div>
										<div className="pr-2 d-flex align-items-center w-50">
											<div className="px-3">
												<input type="radio" name="correctAns" value={"option2"} onChange={answerHandler} />
											</div>
											<p className="mb-0 me-2 white-space-nowrap">Option 2</p>
											<input type="text" name="option2" className="form-control" onChange={formik.handleChange}
												value={formik.values.option2} />
										</div>
									</div>
									<div className="mb-2 d-flex align-items-center justify-content-between">
										<div className="pr-2 d-flex align-items-center w-50">
											<div className="pe-3">
												<input type="radio" name="correctAns" value={"option3"} onChange={answerHandler} />
											</div>
											<p className="mb-0 me-2 white-space-nowrap">Option 3</p>
											<input type="text" name="option3" className="form-control" onChange={formik.handleChange}
												value={formik.values.option3} />
										</div>
										<div className="pr-2 d-flex align-items-center w-50 ">
											<div className="px-3">
												<input type="radio" name="correctAns" value={"option4"} onChange={answerHandler} />
											</div>
											<p className="mb-0 me-2 white-space-nowrap">Option 4</p>
											<input type="text" name="option4" className="form-control" onChange={formik.handleChange}
												value={formik.values.option4} />
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center w-25">
										<label className="pe-2 white-space-nowrap">Score :</label>
										<input type="text" name="score"
											className={
												'form-control' +
												(formik.errors.score && formik.touched.score
													? ' is-invalid'
													: '')
											}
											onChange={formik.handleChange}
											value={formik.values.score}
										/>
									</div>
								</div>
								<div className=" d-flex align-items-center justify-content-center py-3">
									<div><button type="button" className="btn btn-primary me-3 py-1 px-3">Cancel</button></div>
									<div><button type="submit" className="btn btn-primary py-1 px-4" onClick={onSubmit}>Save</button></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddQuiz;


