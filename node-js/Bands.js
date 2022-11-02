
import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/images/edit-icon.png"
import BgShape from "../../assets/images/bg-shape.png";
import { Form, Modal, ToastContainer } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AuthService from "../../shared/Services/auth.service";
import Toast from "../../shared/components/Toast";
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


const Bands = () => {
	const [content, setContent] = useState([]);
	const [addShow, setAddShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [editdisabled, setEditDisabled] = useState(true);


	const [message, setMessage] = useState("");

	const [editItem, setEditItem] = useState({
		id: 0,
		name: "",
		minRange: 0,
		maxRange: 0,
	});
	const [addItem, setAddItem] = useState({
		name: "",
		minRange: 0,
		maxRange: 0,
		status: "",
	});



	const handleAddClose = () => setAddShow(false);
	const handleAddShow = () => setAddShow(true);
	const handleEditClose = () => setEditShow(false);
	const handleEditShow = (item) => {
		setEditItem({ name: item.name, id: item.id, minRange: item.minRange, maxRange: item.maxRange })

		setEditShow(true)
	};

	//////// On Edit Bands /////
	const onEditMin = (e) => {
		const minRange = e.target.value;
		setEditItem({ ...editItem, minRange: minRange });
	}

	const onEditMax = (e) => {
		const maxRange = e.target.value;
		setEditItem({ ...editItem, maxRange: maxRange });
	}

	const onEditName = (e) => {
		const name = e.target.value;
		setEditItem({ ...editItem, name: name });
	}

	//////// On Add Bands /////
	const onAddMin = (e) => {
		const minRange = e.target.value;
		setAddItem({ ...addItem, minRange: minRange });
	}

	const onAddMax = (e) => {
		const maxRange = e.target.value;
		setAddItem({ ...addItem, maxRange: maxRange });
	}

	const onAddName = (e) => {
		const name = e.target.value;
		setAddItem({ ...addItem, name: name });
	}
	const onAddStatus = (e) => {
		const status = e.target.value;
		setAddItem({ ...addItem, status: status });
	};



	/////// Get Bands ///////
	useEffect(() => {
		AuthService.getBands().then(
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

	useEffect(() => {
		if (addItem.name != '' && addItem.minRange != 0 && addItem.maxRange != 0 && addItem.status != '') {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		if (editItem.name != '' && editItem.name != undefined && editItem.minRange != 0 && editItem.maxRange != 0) {
			setEditDisabled(false);
		} else {
			setEditDisabled(true);
		}
	}, [addItem, editItem])

	/////// On Submit ///////
	const onSubmit = (item) => {
		setMessage("");
		setLoading(true);
		const id = { id: item };

		if (addItem) {
			AuthService.addBands(addItem).then((response) => {
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

	}

	/////// On Update //////
	const onUpdate = (item) => {
		setMessage("");
		setLoading(true);
		const id = { id: item };

		if (editItem) {
			AuthService.updateBands(editItem).then((response) => {
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
	}

	//////// Update Status ///////
	const updateStatus = (item) => {
		setIsChecked(!isChecked);
		console.log("-----", item.id, item.status)
	}

	//////// On Delete /////////
	const handleDelete = (item) => {

		const itemId = { id: item };
		console.log(itemId)
		AuthService.deleteBands(itemId).then((response) => {
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
		<div className='row --grey-bg'>
			<ToastContainer />
			<div className="content container-fluid">
				<div className="text-center text-lg-start py-5">
					<div className="text-center mb-4">
						<span className="h1 --primary-text border-bottom border-3 pb-2 border-primary-color ">Bands Configuration</span>
					</div>
				</div>
				<div className="row custom-table justify-content-center">

					<div className="col-12 col-xl-10 ">
						<div className="--grey-bg text-center mb-4">
							<div className="bg-light">
								<div className="d-flex align-items-center justify-content-between">

									<div className="">
										<h5 className="text-start p-3 m-0">Bands</h5>
									</div>
									<div className="pe-2">
										<button type="button" className="btn btn-primary --primary-bg px-4" onClick={handleAddShow}>Add New Band</button>
									</div>
								</div>
								<table className="table bg-light">
									<thead>
										<tr>
											<th scope="col" className="border-end-1 border-1 border-start-0 border-top-0">SN</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Name</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Range</th>
											<th scope="col" className="border-end-1 border-1 border-top-0">Status</th>
											<th scope="col" className="border-top-0" colSpan={2}>Action</th>
										</tr>
									</thead>
									<tbody>
										{
											content.map((item, i) => (
												<tr key={i}>
													<th scope="row" className="border-end-1 border-start-0 border-1 ">{item.id}</th>
													<td className="border-end-1 border-1 ">{item.name}</td>
													<td className="border-end-1 border-1 ">{item.minRange + '-' + item.maxRange}</td>
													<td className="border-end-1 border-1 ">
														<div className="form-check form-switch d-flex justify-content-center">
															<input className="form-check-input" type="checkbox" defaultChecked={item.status == "active" ? !isChecked : isChecked} onChange={() => { updateStatus(item) }} />
														</div>
													</td>
													<td>
														<img src={EditIcon} width="17px" alt="edit-image" onClick={() => { handleEditShow(item) }} />
													</td>
													<td className="border-end-1 border-1 text-center">
														<Button variant="" onClick={() => handleDelete(item.id)} >
															<img src={TrashIcon} alt="" width="16px" />
														</Button>
													</td>
												</tr>
											))
										}
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
			<Modal show={editShow} onHide={handleEditClose}>
				<Modal.Header closeButton>
					<Modal.Title>EDIT METRIC CONFIGURATION</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onUpdate} ref={Form}>
					<Modal.Body>
						<div className="w-100 pt-3">
							<div className="mb-2 w-100">
								<label className="m-0">Band Name</label>
								<div>
									<input type="text" className="form-control" value={editItem.name} validations={[required]} onChange={onEditName} />
								</div>

							</div>
							<div className="mb-4 w-100">
								<div className="">
									<label className="m-0">Band Range</label>
								</div>
								<div className="d-flex align-items-center justify-content-start">
									<div className="pe-3 w-50">
										<input type="text" className="form-control" placeholder="Min" value={editItem.minRange} onChange={onEditMin} validations={[required]} />
									</div>
									<div className="w-50">
										<input type="text" className="form-control" placeholder="Max" value={editItem.maxRange} onChange={onEditMax} validations={[required]} />
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Form>
				<Modal.Footer>
					<Button className='btn-primary --primary-bg py-1 px-4' disabled={editdisabled} onClick={onUpdate}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={addShow} onHide={handleAddClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Band</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex align-items-center justify-content-start mb-3">
						<div className="">
							<label className="mb-0 pe-3 w-75px text-end">Add</label>
						</div>
						<div className="w-100">
							<input type="text" className="form-control" name="add" value={addItem.name} onChange={onAddName} validations={[required]} />
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-start mb-3">
						<div className="">
							<label className="mb-0 pe-3 w-75px text-end">Range</label>
						</div>
						<div className="pe-3 w-50">
							<input type="text" className="form-control" placeholder="Min" value={addItem.minRange} onChange={onAddMin} validations={[required]} />
						</div>
						<div className="w-50">
							<input type="text" className="form-control" placeholder="Max" value={addItem.maxRange} onChange={onAddMax} required />
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-start mb-2">
						<div className="">
							<label className="mb-0 pe-3 w-75px text-end">Status</label>
						</div>
						<div className="px-3">
							<div className="form-check">
								<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"active"} onChange={onAddStatus} />
								<span className="form-check-label" for="flexRadioDefault1">
									Active
								</span>
							</div>
						</div>
						<div className="pe-3">
							<div className="form-check">
								<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"inactive"} onChange={onAddStatus} />
								<span className="form-check-label" for="flexRadioDefault1">
									Inactive
								</span>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn btn-primary --primary-bg py-1 px-4' disabled={disabled} onClick={onSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)

}

export default Bands