import React from 'react';
import AdminHeader from '../includes/adminHeader';

const adminLayout = (props) => (
        <div className="admin_layout">
            <AdminHeader
                {...props}
            />
            <div>
                {props.children}
            </div>           
        </div>
    )

export default adminLayout;
