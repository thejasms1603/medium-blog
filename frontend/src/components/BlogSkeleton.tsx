import { Circle } from "./BlogCard";

const BlogSkeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex gap-2'>
          <div className='h-4 w-4 bg-gray-200 rounded-full mb-4'></div>
          <div className='h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5'></div>
          <div>
            <Circle />
          </div>
          <div className='flex justify-center flex-col font-thin text-slate-500 text-sm'>
            <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
          </div>
        </div>
        <div className='font-semibold text-xl pt-2'>
          <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
        </div>
        <div className='font-thin text-md'>
          <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
        </div>
        <div className='text-slate-500 text-sm font-thin pt-2'><div className='h-2 bg-gray-200 rounded-full mb-2.5'></div></div>
      </div>

      <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full max-w-[360px]'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export default BlogSkeleton