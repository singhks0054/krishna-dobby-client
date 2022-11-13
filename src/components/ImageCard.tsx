type cardProp = {
  name: String;
  url: String | any;
};

export default function ImageCard({ name, url }: cardProp) {
  return (
    <div className='lg:w-1/3 sm:w-1/2 p-4'>
      <div className='flex relative'>
        <img
          alt='gallery'
          className='absolute inset-0 w-full h-full object-cover object-center'
          src={url}
        />
        <div className='px-8 py-10 relative w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100'>
          <h2 className='tracking-widest text-sm title-font font-medium text-indigo-500 mb-1'>
            {name}
          </h2>
          <p className='leading-relaxed'>Happy Uploading</p>
        </div>
      </div>
    </div>
  );
}
