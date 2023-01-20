import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterComponent = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // perform registration logic here
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
                htmlFor="firstName"
              >
                First Name
              </label>
              <Field
                className={`w-full border border-gray-400 p-2 rounded-lg ${
                  errors.firstName && touched.firstName ? 'border-red-500' : ''
                }`}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 text-xs italic">{errors.firstName}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <Field
                className={`w-full border border-gray-400 p-2 rounded-lg ${
                  errors.lastName && touched.lastName ? 'border-red-500' : ''
                }`}
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              )}
            </div>
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
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Field
                className={`w-full border border-gray-400 p-2 rounded-lg ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'border-red-500'
                    : ''
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg"
              type="submit"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterComponent;

