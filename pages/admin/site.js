import React, { Component } from 'react';
import AuthRoute from '../../components/HOC/authRoute';
import AdminLayout from '../../components/layouts/adminLayout';

class AdminSite extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <>
                Admin Site
            </>
        )
    }
}

export default AdminSite;