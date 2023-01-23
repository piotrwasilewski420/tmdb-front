import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { login } from './userSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) { 
       navigate('/profile');
    } else {
      console.log('error');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className={`w-full border border-gray-400 p-2 rounded-lg ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className={`w-full border border-gray-400 p-2 rounded-lg ${
                  errors.password && touched.password ? 'border-red-500' : ''
                }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password}
                </p>
              )}
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default LoginForm;
