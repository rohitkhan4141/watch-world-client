const ContactUs = () => {
  return (
    <div className='hero bg-base-100 mt-16 mb-20'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <img src='https://images.pexels.com/photos/3651834/pexels-photo-3651834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />

        <div className='text-center'>
          <h1 className='text-5xl font-bold'>What’s Your Style</h1>
          <p className='py-6'>
            A watch is a portable timepiece intended to be carried or worn by a
            person. It is designed to keep a consistent movement despite the
            motions caused by the person's activities.
          </p>
          <button className='btn btn-accent'>GO SHOPPING</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
