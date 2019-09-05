import React, { Component } from 'react';
import AuthRoute from '../../components/HOC/authRoute';
import AdminLayout from '../../components/layouts/adminLayout';

import { connect } from 'react-redux';
import { UpdateSite } from '../../store/actions/index';

class AdminSite extends Component {
    constructor(props){
        super(props);

        const { siteData } = props;

        this.state = {
            address: siteData.address,
            email: siteData.email,
            phone: siteData.phone,
            update: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(UpdateSite(this.state)).then(()=>{
            if(this.props.admin.site.update){
                this.setState({update:true})
                setTimeout(()=>{
                    this.setState({update: false})
                }, 2000)
            }
        })
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleAddress = (event) => {
        this.setState({address: event.target.value})
    }

    handlePhone = (event) => {
        this.setState({phone: event.target.value})
    }

    render() {
        const form = this.state;
        return (
            <AdminLayout
                sectionName="Site Data"
            >
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label>Address</label>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={ (e) => this.handleAddress(e)}
                            value={form.address}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={ (e) => this.handleEmail(e)}
                            value={form.email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={ (e) => this.handlePhone(e)}
                            value={form.phone}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"    
                    >
                        Submit
                    </button>
                    {
                        form.update ?
                            <div className="update"> 
                                The Form Updated
                            </div>
                        :

                        null
                    }
                
                </form>
                
            </AdminLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps)(AuthRoute(AdminSite));