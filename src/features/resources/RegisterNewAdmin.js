import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {registerNewUser} from './adminSlice';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const RegisterNewAdmin = () => {
    const dispatch = useDispatch();
  return (
    <div className="bg-white p-6 rounded-lg">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
            console.log(values);
            dispatch(registerNewUser(values));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className={`form-input w-full py-2 px-3 text-gray-700 leading-tight rounded-md border border-1 border-gray-500 ${
                  errors.email && touched.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className={`form-input w-full py-2 px-3 text-gray-700 leading-tight rounded-md border border-1 border-gray-500 ${
                  errors.password && touched.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-xs italic">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
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

export default RegisterNewAdmin;
