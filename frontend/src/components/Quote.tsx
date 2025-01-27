const Quote = () => {
  return (
    <div className='bg-slate-200 h-screen flex justify-center flex-col'>
      <div className='flex justify-center'>
        <div className='max-w-lg'>
          <div className='font-bold text-3xl'>
            "The Customer service I receieved was exceptional. The support team
            went above and beyond to address my concerns"
          </div>
          <div className=' max-w-md text-left mt-4 font-semibold text-xl'>
            Julies Winfield
          </div>
          <div className='text-slate-400 max-w-md text-left font-light text-sm'>
            CEO | Acme corp
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote