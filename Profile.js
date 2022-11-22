import React from "react";
import Sidebar from "./Sidebar";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Profile = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required'),
    username: Yup.string()
      .required('Username is required'),
    designation: Yup.string()
      .required('Designation is required'),
    phone: Yup.string()
      .required('Phone is required'),
    dob: Yup.string()
      .required('Date of Birth is required')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    hobbies: Yup.string()
      .required('Hobbies is required'),
    address: Yup.string()
      .required('Password is required')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      designation: '',
      phone: '',
      dob: '',
      address: '',
      hobbies: '',
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (data) => {
      console.log(JSON.stringify(data, null, 2));
    },
  });

  const handleSubmit = () =>{
    console.log('---------',formik.values)
  }


  return (
    <div className="bg-grey-color h-100">
      <Sidebar />
      <div className="profile-page">
        <div className="profile-form p-3">
          <form onSubmit={formik.handleSubmit} >
            <div className="form-group-container">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group mt-3">
                    <label htmlFor="name">Name</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.name && formik.touched.name
                        ? ' is-invalid'
                        : '')} id={"name"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.email && formik.touched.email
                        ? ' is-invalid'
                        : '')} id={"email"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="username">Username</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.username && formik.touched.username
                        ? ' is-invalid'
                        : '')} id={"username"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="designation">Designation</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.designation && formik.touched.designation
                        ? ' is-invalid'
                        : '')} id={"designation"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="phone">Phone</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.phone && formik.touched.phone
                        ? ' is-invalid'
                        : '')} id={"phone"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.dob && formik.touched.dob
                        ? ' is-invalid'
                        : '')} id={"dob"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="address">Address</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.address && formik.touched.address
                        ? ' is-invalid'
                        : '')} id={"address"} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="hobbies">Hobbies</label>
                    <input type={"text"} className={'form-control' +
                      (formik.errors.hobbies && formik.touched.hobbies
                        ? ' is-invalid'
                        : '')} id={"hobbies"} />
                  </div>
                </div>
                <div className="col-md-4">
                  <input type={"image"} className="form-control" />
                </div>
              </div>
              <div className="form-group mt-3">
                <button className="btn -bg-dark text-white" onSubmit={handleSubmit}> Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile;