import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { SendMessage, ClearMessage } from '../store/actions/index';

class Contact extends Component {
    state = {
        msgdone: false
    }

    handleSubmit = (values,actions) => {
        this.props.dispatch(SendMessage(values)).then(()=>{
            this.setState({
<<<<<<< HEAD
                msgdone: true
=======
                msdone: true
>>>>>>> b10d35b40857961dcedf1a5d06cfa29b547b519f
            });
            actions.setSubmitting(false);
            actions.resetForm();
        });
    }

    handleRules = (values) => {
        let errors = {}

        for(let prop in values){
            if(!values[prop]){ errors[prop] = "Required" }
        }

        const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!reg.test(values.email)) {
            errors.email = "Not a valid email"
        }
        return errors;
    }

    componentWillUnMount(){
        this.props.dispatch(ClearMessage())
    }

    render() {
        return (
            <>
                <div className="title_page">
                    <h1>Contact Us</h1>
                </div>
                <div className="content_wrapper">
                    <div className="inner">
                        <h1>Feel Free to contact Us</h1>

                        { !this.state.msgdone ?
                        
                            
<<<<<<< HEAD
                    <Formik
=======
                        <Formik
>>>>>>> b10d35b40857961dcedf1a5d06cfa29b547b519f
                        initialValues={{name:'', email:'', message:''}}
                        validate={ (values)=> this.handleRules(values) }
                        onSubmit={ (values, actions)=> this.handleSubmit(values,actions) }
                    >
                        {({
                            errors,
                            values,
                            handleSubmit,
                            handleChange,
                            isSubmitting,
                            handleBlur,
                            touched
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter your name here"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    { errors.name && touched.name ? 
                                        
                                        <div className="error_label">
                                            {errors.name}
                                        </div>
                                    :null}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter your email here"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    { errors.email && touched.email ? 
                                        
                                        <div className="error_label">
                                            {errors.email}
                                        </div>
                                    :null}
                                </div>

                                <div className="form-group">
                                    <label>Write a message right here</label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        placeholder="your message"
                                        value={values.message}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    ></textarea>
                                    { errors.message && touched.message ? 
                                        
                                        <div className="error_label">
                                            {errors.message}
                                        </div>
                                    :null}
                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>

                            </form>
                        )}
                    </Formik>
                        : 
                        <div>
<<<<<<< HEAD
                            We will contact you shortly.
=======
                            We will contact you shortly
>>>>>>> b10d35b40857961dcedf1a5d06cfa29b547b519f
                        </div>
                        
                        }


                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {msg: state.msg}
}

export default connect(mapStateToProps)(Contact);