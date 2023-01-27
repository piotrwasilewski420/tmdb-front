import React from 'react';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers,deleteUser } from '../resources/adminSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import RegisterNewAdmin from '../resources/RegisterNewAdmin';

const Users = () => {
    useLayoutEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.users);
    const adminId = useSelector(state => state.user.id);
    const loading = useSelector(state => state.admin.loading);
    return (loading ? <LoadingSpinner/> :   (
        <div className="bg-gray-200 p-4">
            <h1 className="text-2xl font-medium">Users</h1>
            {
                users.filter(user => user.id !== adminId).map(user => (
                    <div key={user.id} className="border-b p-4">
                        <h3 className="text-lg font-medium">{user.name}</h3>
                        <p className="text-sm">{user.email}</p>
                        {user.role && <p className="text-sm text-red-500">{user.role}</p>}
                        <button
                        onClick={() => dispatch(deleteUser(user.id))}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">DELETE</button>
                    </div>
                ))
            }
            <RegisterNewAdmin/>
        </div>
    ));
};

export default Users;