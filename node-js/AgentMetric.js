import React, { useState } from "react";
import { useEffect } from "react";
import AuthService from "../../shared/Services/auth.service";

const AgentMetric = () => {

	const [content, setContent] = useState([]);

	/////// Get Agent Metrics ///////
	useEffect(() => {
		AuthService.getAgentMetrics().then(
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

  return (
    <div className='row --grey-bg'>
      <div className="content container-fluid">
        <div className="text-center text-lg-start pt-4 pb-3 ">

          <div className="text-center mb-4">
            <span className="h1 --primary-text border-bottom border-3 pb-2 border-primary-color ">Agent Matric</span>
          </div>
        </div>
        <div className="row custom-table justify-content-center">
          <div className="col-12 col-xl-11">
            <div className="px-3 py-4 bg-light mb-4">
              <div className="my-3 border p-3 mt-1">

                <div className="mb-2 row">
                  <div className="col-12 col-sm-6 col-md-4 col-xl-3 my-2">
                    <div className=" d-flex align-items-center w-25 pe-3">
                      <p className="mb-0 me-2 white-space-nowrap">SC Number</p>
                    </div>
                    <div>
                      <input type="text" className="form-control" value="12345" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-xl-3 my-2">
                    <div className=" d-flex align-items-center w-25 pe-3">
                      <p className="mb-0 me-2 white-space-nowrap">Year</p>
                    </div>
                    <div>
                      <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle w-100 text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Year
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">2020</a></li>
                          <li><a className="dropdown-item" href="#">2021</a></li>
                          <li><a className="dropdown-item" href="#">2022</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-xl-3 my-2">
                    <div className=" d-flex align-items-center w-25 pe-3">
                      <p className="mb-0 me-2 white-space-nowrap">Period</p>
                      <input type="radio" />
                    </div>
                    <div>
                      <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle w-100 text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Period
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">Quarter 1</a></li>
                          <li><a className="dropdown-item" href="#">Quarter 2</a></li>
                          <li><a className="dropdown-item" href="#">Quarter 3</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-xl-3 my-2">
                    <div className="d-flex align-items-center w-25 ">
                      <p className="mb-0 me-2 white-space-nowrap">Months</p>
                      <input type="radio" />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="pe-1 w-50">
                        <div>
                          <div className="dropdown joint-shape">
                            <button className="btn btn-light dropdown-toggle w-100 text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              From
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li><a className="dropdown-item" href="#">Jan</a></li>
                              <li><a className="dropdown-item" href="#">Feb</a></li>
                              <li><a className="dropdown-item" href="#">March</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="ps-1 w-50">
                        <div>
                          <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle w-100 text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              To
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li><a className="dropdown-item" href="#">Jan</a></li>
                              <li><a className="dropdown-item" href="#">Feb</a></li>
                              <li><a className="dropdown-item" href="#">March</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row px-1">
                <div className="col-12 mt-2 mb-1">
                  <h6 className="mb-0">Matric Calculation Details</h6>
                </div>
              </div>

              <div className="border">
                <div className="p-3 d-block d-md-flex justify-content-between">
                  <div className="d-flex justify-content-start my-2">
                    <div>
                      <h6 className="mb-1">Agent Name:</h6>
                      <p className="mb-0">Arsh</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start my-2">
                    <div>
                      <h6 className="mb-1">Total Score</h6>
                      <p className="mb-0">13529</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start my-2">
                    <div>
                      <h6 className="mb-1">Band</h6>
                      <p className="mb-0">Gold</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="text-center pt-3">
                    <div className="bg-light">
                      <table className="table bg-light">
                        <thead>
                          <tr>
                            <th scope="col" className="border-end-1 border-1 border-start-0 border-top-0">#</th>
                            <th scope="col" className="border-end-1 border-1 border-top-0">Metric (Weightage %)</th>
                            <th scope="col" className="border-end-1 border-1 border-top-0">Data</th>
                            <th scope="col" className="border-top-0">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content &&
                            content.map((item, i) => (
                              <tr>
                                <th scope="row" className="border-end-1 border-start-0 border-1 ">{i + 1}</th>
                                <td className="border-end-1 border-1 ">{item.metric} ({item.weightage}%)</td>
                                <td className="border-end-1 border-1 ">{item.data}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end pe-5">
                        <div className="pe-5">
                          <h5 className="mb-0">Score</h5>
                        </div>
                        <div className="">
                          <h5 className="mb-0">13529</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col-12 col-xl-5">

          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentMetric;