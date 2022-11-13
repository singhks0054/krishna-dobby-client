import { nameSelector, userImageSelector } from '../redux/loginSlice';
import { useSelector } from 'react-redux';
import ImageCard from '../components/ImageCard';

export default function DashBoard() {
  const userName = useSelector(nameSelector);
  const userImages = useSelector(userImageSelector);
  console.log(userImages);
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 capitalize text-gray-900'>
            Namaste 🙏 {userName}
          </h1>
          <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className='flex flex-wrap -m-4'>
          {userImages.length > 0 &&
            userImages.map(({ name, url }, i) => (
              <ImageCard name={name} url={url} key={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
