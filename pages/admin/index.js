import React, { Component } from 'react';
import AuthRoute from '../../components/HOC/authRoute';
import AdminLayout from '../../components/layouts/adminLayout';

class Admin extends Component {
    render() {
        return (
            <AdminLayout
                sectionName="Dashboard"
            >
                <h4>Welcome to your Dashboard</h4>
            </AdminLayout>
        )
    }
}

export default AuthRoute(Admin);
