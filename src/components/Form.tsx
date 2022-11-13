import { useSelector, useDispatch } from 'react-redux';
import { login, newUserSelector, signup } from '../redux/loginSlice';
import { useRef, useEffect } from 'react';
import axios from 'axios';
export default function Form() {
  const newUser = useSelector(newUserSelector);
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function userLogin() {
    try {
      // @ts-ignore
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/self`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(login([data.token, data.name, data.images]));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    userLogin();
  });

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newUser) {
      try {
        // @ts-ignore
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user`,
          {
            // @ts-ignore
            name: nameRef.current.value,
            // @ts-ignore
            email: emailRef.current.value,
            // @ts-ignore
            password: passwordRef.current.value,
          }
        );
        localStorage.setItem('token', data.token);
        dispatch(login([data.token, data.user.name, data.user.images]));
      } catch (error) {
        console.log(error);
      }
    } else {
      // @ts-ignore
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          // @ts-ignore
          name: nameRef.current.value,
          // @ts-ignore
          email: emailRef.current.value,
          // @ts-ignore
          password: passwordRef.current.value,
        }
      );
      localStorage.setItem('token', data.token);
      dispatch(login([data.token, data.user.name, data.user.images]));
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center '>
      <div className=' flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md '>
        <div className='font-medium self-center text-xl sm:text-3xl text-gray-800'>
          {newUser ? 'Join Now' : 'Welcome Back'}
        </div>
        <div className='mt-4 self-center text-xl sm:text-sm text-gray-800'>
          {newUser
            ? ' Enter your details to create new account'
            : ' Enter your credentials to get access account'}
        </div>

        <div className='mt-10'>
          <form onSubmit={submitHandler}>
            <div className='flex flex-col mb-5'>
              <label
                htmlFor='text'
                className='mb-1 text-xs tracking-wide text-gray-600'
              >
                Name:
              </label>
              <div className='relative'>
                <div className='  inline-flex  items-center  justify-center  absolute  left-0  top-0  h-full  w-10 text-gray-400 '>
                  <i className='fas fa-user text-blue-500'></i>
                </div>

                <input
                  id='text'
                  type='text'
                  name='text'
                  ref={nameRef}
                  className=' text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                  placeholder='Enter your name'
                />
              </div>
            </div>
            <div className='flex flex-col mb-5'>
              <label
                htmlFor='email'
                className='mb-1 text-xs tracking-wide text-gray-600'
              >
                E-Mail Address:
              </label>
              <div className='relative'>
                <div className=' inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '>
                  <i className='fas fa-at text-blue-500'></i>
                </div>

                <input
                  id='email'
                  type='email'
                  name='email'
                  ref={emailRef}
                  className=' text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 '
                  placeholder='Enter your email'
                  autoComplete='username'
                />
              </div>
            </div>
            <div className='flex flex-col mb-6'>
              <label
                htmlFor='password'
                className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
              >
                Password:
              </label>
              <div className='relative'>
                <div className=' inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400'>
                  <span>
                    <i className='fas fa-lock text-blue-500'></i>
                  </span>
                </div>

                <input
                  id='password'
                  type='password'
                  name='password'
                  ref={passwordRef}
                  className=' text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                  placeholder='Enter your password'
                  autoComplete='current-password'
                />
              </div>
            </div>

            <div className='flex w-full'>
              <button className='flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transitionduration-150 ease-in'>
                <span className='mr-2 uppercase'>
                  {' '}
                  {newUser ? 'Create Account' : 'Log In'}
                </span>
                <span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex justify-center items-center mt-6'>
        <p className=' inline-flex items-center text-gray-700 font-medium text-xs text-center  '>
          <span className='ml-2'>
            {newUser ? 'You have an account?' : 'Do not have an account?'}
            <span
              //@ts-ignore
              onClick={() => dispatch(signup())}
              className='text-xs ml-2 cursor-pointer text-blue-500 font-semibold'
            >
              {newUser ? 'Login Here' : 'SignUp Here'}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
