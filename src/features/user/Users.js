import React from 'react';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers,deleteUser } from '../resources/adminSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import RegisterNewAdmin from '../resources/RegisterNewAdmin';
import NavProfile from './NavProfile';

const Users = () => {
    useLayoutEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.users);
    const adminId = useSelector(state => state.user.id);
    const loading = useSelector(state => state.admin.loading);
    return (loading ? <LoadingSpinner/> :   (
        <div className="p-4 flex flex-col items-center justify-center">
            <NavProfile />
            <h1 className="text-2xl font-medium text-center mt-12">Users</h1>
            <div className='grid grid-cols-5 mx-[20%]'>
                {
                    users.filter(user => user.id !== adminId).map(user => (
                        <div key={user.id} className="flex flex-col items-center border-b p-4">
                            <h3 className="text-lg font-medium">{user.name}</h3>
                            <p className="text-sm">{user.email}</p>
                            {user.role && <p className="text-sm text-red-500">{user.role}</p>}
                            <button
                            onClick={() => dispatch(deleteUser(user.id))}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">DELETE</button>
                        </div>
                    ))
                }
            </div>
            <div className='w-1/4'>
                <RegisterNewAdmin/>
            </div>
        </div>
    ));
};

export default Users;