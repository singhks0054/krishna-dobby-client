import { setShowImgModal } from '../redux/loginSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import uploadFileToAWS from '../util/fileupload';
import axios from 'axios';
export default function AddImage() {
  const imgNameRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: [] | any = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImagesUrls(newImageUrls);
  }, [images]);

  function onImageChange(e: { target: { files: any } }) {
    // @ts-ignore
    setImages([...e.target.files]);
  }

  const uploadHandler = async () => {
    const data = await uploadFileToAWS(images[0]);
    if (!data.success) return;
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/upload`,
      {
        url: data.url,
        //@ts-ignore
        name: imgNameRef.current?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    // @ts-ignore
    dispatch(setShowImgModal());
  };

  return (
    <section
      className='fixed z-10 top-0 right-0 bottom-0 left-0 py-12 bg-[rgba(0,0,0,0.5)] transition duration-150 ease-in-out flex justify-center items-center '
      // @ts-ignore
      onClick={() => dispatch(setShowImgModal())}
    >
      <div
        className='container mx-auto w-11/12 md:w-2/3 max-w-lg bg-white rounded'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
          <h5
            className='text-xl font-medium leading-normal text-gray-800'
            id='exampleModalLabel'
          >
            Add Image
          </h5>
        </div>

        <form>
          <div className='relative p-4'>
            <div className='flex gap-4 mb-4'>
              <input
                type='text'
                placeholder='Enter Name'
                ref={imgNameRef}
                className='outline-none border-2 rounded py-1 px-2 '
              />
              <input
                type='file'
                accept='image/*'
                className=''
                onChange={onImageChange}
              />
            </div>
            {imagesUrls.map((imgSrc, i) => (
              <img key={i} src={imgSrc} height={200} width={200} alt='images' />
            ))}
          </div>
          <div className='flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
            <button
              type='button'
              className='px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
              data-bs-dismiss='modal'
              // @ts-ignore
              onClick={() => dispatch(setShowImgModal())}
            >
              Close
            </button>
            <button
              type='button'
              className='px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1'
              onClick={uploadHandler}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
