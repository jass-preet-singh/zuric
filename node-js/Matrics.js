
import React, { useEffect, useRef, useState } from 'react';
import EditIcon from "../../assets/images/edit-icon.png"
import Form from "react-validation/build/form";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AuthService from "../../shared/Services/auth.service";
import Toast from '../../shared/components/Toast';
import { ToastContainer } from 'react-toastify';
import TrashIcon from '../../assets/images/trash.png';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const Matrics = () => {
  const [content, setContent] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [data, setData] = useState([])
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [metric, setMetric] = useState("");
  const [id, setId] = useState(0);
  const [weightage, setWeightage] = useState(null);
  const [customerview, setCustomerview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [editItem, setEditItem] = useState({
    metric: "",
    id: 0,
    weightage: 0,
    customerview: ""
  });
  const [addItem, setAddItem] = useState({
    metric: "",
    weightage: 0,
    customerview: ""
  });



  const form = useRef();
  const checkBtn = useRef();

  //////// On Add Metric ///////
  const onAddMetric = (e) => {
    const metric = e.target.value;
    setAddItem({ ...addItem, metric: metric });
  };

  const onAddWeightage = (e) => {
    const weightage = e.target.value;
    setAddItem({ ...addItem, weightage: weightage });
  };
  const onAddCustmerView = (e) => {
    const customerview = e.target.value;
    setAddItem({ ...addItem, customerview: customerview });
  };

  ////// On Edit Metric ////////
  const onChangeMetric = (e) => {
    const metric = e.target.value;
    setEditItem({ ...editItem, metric: metric });
  };

  const onChangeWeightage = (e) => {
    const weightage = e.target.value;
    setEditItem({ ...editItem, weightage: weightage });
  };
  const onChangeCustmerView = (e) => {
    setIsChecked(!isChecked);
    var customerview = (isChecked) ? "No" : "Yes";
    setEditItem({ ...editItem, customerview: customerview });
  };

  const onChangeId = (e) => {
    const id = e.target.value;
    setEditItem({ ...editItem, id: id })
  }

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (item) => {
    setEditItem({ metric: item.metric, id: item.id, weightage: item.weightage, customerview: item.customerview })
    setEditShow(true)
  };

  /////// Get Metrics ///////
  useEffect(() => {
    AuthService.getMetrics().then(
      (response) => {
        setContent(response.data.data);
        console.log(response.data)
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

  /////// On Update //////
  const onUpdate = (item) => {
    setMessage("");
    setLoading(true);
    const id = { id: item };
    AuthService.updateMetrics(editItem).then((response) => {
      Toast.success(response.data.message)
      window.location.reload();
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setContent(_content);
    })
    handleEditClose()

  }

  ////// On Submit ///////
  const onSubmit = () => {

    AuthService.addMetrics(addItem).then((response) => {
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
    handleAddClose()
  }

  //////// On Delete /////////
  const handleDelete = (item) => {

    const itemId = { id: item };
    console.log(itemId)
    AuthService.deleteMetrics(itemId).then((response) => {
      console.log(response)
      Toast.success(response.data.message)
      // if (response) {
      window.location.reload();
      // }
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setContent(_content);
    })

  }


  return (
    <div className='row --grey-bg'>
      <ToastContainer />
      <div className='justify-content-center'>
        <div className="col-12 col-xl-12 ">
          <div className="text-center text-lg-start pt-4 pb-3 ps-3">
            <div className="text-center">
              <span className="h1 --primary-text border-bottom border-2 border-primary-color ">Welcome Admin</span>
            </div>
          </div>
          <div className="col-12 col-xl-12">
            <div className="text-center py-4">
              <div className="bg-light">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5 className="text-start p-3 m-0">Matrics</h5>
                  </div>
                  <div className="pe-2">
                    <Button className="--primary-bg" variant="primary" onClick={handleAddShow}>
                      Add New Metric
                    </Button>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-end-1 border-1 border-start-0 border-top-0 text-center px-3">#</th>
                      <th className="border-end-1 border-1 border-start-0 border-top-0 text-center">Metric</th>
                      <th className="border-end-1 border-1 border-start-0 border-top-0 text-center">Weightage %</th>
                      <th className="border-end-1 border-1 border-start-0 border-top-0 text-center">Customer Can View</th>
                      <th scope="col" colSpan={2} className="border-end-1 border-1 border-start-0 border-top-0 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content != null &&
                      content.map((item, i) =>
                      (
                        <tr key={i}>
                          <th scope="row" className="border-end-1 border-start-0 border-1 text-center px-3">{i + 1}</th>
                          <td className="border-end-1 border-1 text-center">{item.metric}</td>
                          <td className="border-end-1 border-1 text-center">{item.weightage} %</td>
                          <td className="border-end-1 border-1 text-center">{item.customerview}</td>
                          <td className="border-end-1 border-1 text-center">
                            <Button variant="" onClick={() => handleEditShow(item)} >
                              <img src={EditIcon} width="17px" alt="edit-image" />
                            </Button></td>
                          <td className="border-end-1 border-1 text-center">
                            <Button variant="" onClick={() => handleDelete(item.id)} >
                              <img src={TrashIcon} alt="" width="16px" />
                            </Button>
                          </td>
                        </tr>

                      )
                      )
                    }
                  </tbody>
                </table>
                <Modal show={editShow} onHide={handleEditClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>EDIT METRIC CONFIGURATION</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={onUpdate} ref={form}>
                    <Modal.Body>
                      <div className="d-flex w-100 pt-2">
                        <div className="pe-2 w-50">
                          <p className="m-0">MATRIC NAME</p>
                          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="metric" value={editItem.metric} onChange={onChangeMetric}
                            validations={[required]} />
                        </div>
                        <div className="w-50 ">
                          <p className="m-0">WEIGHTAGE % </p>
                          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="weightage"
                            value={editItem.weightage}
                            onChange={onChangeWeightage}
                            validations={[required]} />
                        </div>
                      </div>
                      <div className="d-flex align-items-center pt-3 pb-3">
                        <div className="pe-3">
                          <p className="m-0">CUSTOMER CAN VIEW</p>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" checked={isChecked} id="flexCheckDefault" onChange={onChangeCustmerView} />
                        </div>
                        <div>
                          <input type={"hidden"} className=""
                            value={editItem.id} onChange={onChangeId} />
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className=' btn-primary --primary-bg py-1 px-4' onClick={() => onUpdate(editItem)}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
                <Modal show={addShow} onHide={handleAddClose} >
                  <Modal.Header closeButton>
                    <Modal.Title>ADD METRIC</Modal.Title>
                  </Modal.Header>

                  <Form onSubmit={onsubmit} ref={form}>
                    <Modal.Body>
                      <div className="d-flex w-100 pt-2">
                        <div className="pe-2 w-50">
                          <p className="m-0">MATRIC NAME</p>
                          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="metric" value={addItem.metric} onChange={onAddMetric}
                            validations={[required]} />
                        </div>
                        <div className="w-50">
                          <p className="m-0">WEIGHTAGE % </p>
                          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="weightage"
                            value={addItem.weightage}
                            onChange={onAddWeightage}
                            validations={[required]} />
                        </div>
                      </div>
                      <div className="d-flex align-items-center pt-3 pb-3">
                        <div className="pe-3">
                          <p className="m-0">CUSTOMER CAN VIEW</p>
                        </div>
                        <div className="" >
                          <input type="button" name="customerview"
                            className="btn btn-light me-3" onClick={onAddCustmerView}
                            value={"Yes"}
                          />
                          <input type="button" name="customerview" className="btn btn-light"
                            value={"No"} onClick={onAddCustmerView}
                          />
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className='btn-primary --primary-bg py-1 px-4' onClick={onSubmit}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="bg-white mb-4 p-3 shadow-sm bg-body rounded ml-3" style={{ display: 'none' }}>
            <div className="">
              <div className="">
                <h4>{'EDIT METRIC CONFIGURATION'}</h4>
              </div>
              <div className="d-flex w-100 pt-2">
                <div className="pe-2 w-50">
                  <p className="m-0">MATRIC NAME</p>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="w-50">
                  <p className="m-0">WEIGHTAGE % </p>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </div>
              <div className="d-flex align-items-center pt-3">
                <div className="pe-3">
                  <p className="m-0">CUSTOMER CAN VIEW</p>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />

                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mb-4 p-3 shadow-sm bg-body rounded ml-3" style={{ display: 'none' }}>
            <div className="">
              <div className="">
                <h4>ADD METRICS</h4>
              </div>
              <div className="d-flex w-100 pt-2">
                <div className="pe-2 w-50">
                  <p className="m-0">MATRIC NAME</p>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="w-50">
                  <p className="m-0">WEIGHTAGE % </p>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </div>
              <div className="d-flex align-items-center pt-3">
                <div className="pe-3">
                  <p className="m-0">CUSTOMER CAN VIEW</p>
                </div>
                <div className="">
                  <button type="button" className="btn btn-light me-3">YES</button>
                  <button type="button" className="btn btn-light">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Matrics