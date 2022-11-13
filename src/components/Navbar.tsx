import { logout, setShowImgModal } from '../redux/loginSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRef, useState } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [img, setImg] = useState({});
  const [showImg, setShowImg] = useState(false);
  const logoutHandler = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    localStorage.removeItem('token');
    //@ts-ignore
    dispatch(logout());
  };

  const searchHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/search`,
      {
        // @ts-ignore
        name: searchRef.current?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setImg(data);
    setShowImg(true);
    console.log(data);
  };

  return (
    <>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <nav className='flex lg:w-2/5 flex-wrap gap-8 items-center text-base md:ml-auto'>
            <button
              className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 hover:text-white rounded text-base mt-4 md:mt-0'
              //@ts-ignore
              onClick={() => dispatch(setShowImgModal())}
            >
              Add Image
            </button>
            <div className='pt-2 relative mx-auto text-gray-600'>
              <form onSubmit={searchHandler}>
                <input
                  className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                  type='search'
                  name='search'
                  ref={searchRef}
                  placeholder='Search'
                />
                <button
                  type='submit'
                  className='absolute right-0 top-0 mt-5 mr-4'
                >
                  <svg
                    className='text-gray-600 h-4 w-4 fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 56.966 56.966'
                    xmlSpace='preserve'
                    width='512px'
                    height='512px'
                  >
                    <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
                  </svg>
                </button>
              </form>
            </div>
          </nav>
          <span className='flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl'>Dobby Ads</span>
          </span>
          <div className='lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0'>
            <button
              className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 hover:text-white rounded text-base mt-4 md:mt-0'
              onClick={logoutHandler}
            >
              Logout
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-4 h-4 ml-1'
                viewBox='0 0 24 24'
              >
                <path d='M5 12h14M12 5l7 7-7 7'></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div>
        {/* @ts-ignore */}
        {showImg && img.url && (
          <div className='flex items-center justify-center text-center'>
            <div>
              {/* @ts-ignore */}
              <img src={img.url} alt='img' width={300} height={300} />
              {/* @ts-ignore */}
              <h1 className='mt-4'>Name: {img.name}</h1>
            </div>
          </div>
        )}
        {/* @ts-ignore */}
        {showImg && !img.url && (
          <p className='text-center text-red-500'>No Images found !</p>
        )}
      </div>
    </>
  );
}
