import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { addBeerValidation } from '../utils/validation'

function AddBeerModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='border border-bottom-0 pb-0'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a New Beer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ image_url: "./beer.png", name: "", tagline: "", description: "" }}
                    validationSchema={addBeerValidation}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            props.onSubmit(values)
                        }, 1000);
                    }}
                >
                    {({ isSubmitting, values, handleChange }) => (
                        <Form>
                            {/* IMAGE */}
                            <figure className='h-150px text-start w-fit-content'>
                                <img src={values.image_url} class="rounded float-start object-contain" alt="..." />
                            </figure>

                            {/* NAME INPUT */}
                            <div className="form-group mb-4">
                                <Field className="form-control" type="text" name="name" placeholder="Beer Name*" onChange={handleChange} value={values.name} />
                                <ErrorMessage className='text-danger' name="name" component="small" />
                            </div>

                            {/* GENRE INPUT */}
                            <div className="form-group mb-4">
                                <Field className="form-control" type="text" name="tagline" placeholder="Genre*" onChange={handleChange} value={values.tagline} />
                                <ErrorMessage className='text-danger' name="tagline" component="small" />
                            </div>

                            {/* DESCRIPTION INPUT */}
                            <div className="form-group mb-4">
                                <Field className="form-control" type="text" name="description" placeholder="Description*" onChange={handleChange} value={values.description} as="textarea" />
                                <ErrorMessage className='text-danger' name="description" component="small" />
                            </div>


                            {/* ACTION BUTTONS */}
                            <div className="d-flex align-items-center justify-content-end column-gap-2">
                                <button type="reset" className='btn btn-reset' onClick={props.close} >
                                    Cancel
                                </button>
                                <button type="submit" className='btn btn-primary' disabled={isSubmitting}>

                                    {!isSubmitting ? "Save" : <>Saving.. <Spinner size='sm' /></>}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default AddBeerModal