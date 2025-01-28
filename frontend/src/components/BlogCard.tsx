interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <div className='flex gap-2'>
        <div className='flex justify-center flex-col'>
          <Avatar name={authorName} />
        </div>
        <div className='font-extralight'>{authorName}</div>
        <div><Circle /></div>
        <div className='font-thin text-slate-500'>{publishedDate}</div>
      </div>
      <div className="font-semibold text-xl">{title}</div>
      <div className="font-thin text-md">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div>{`${Math.ceil(content.length / 100)} minutes`}</div>
      <div className='bg-slate-200 h-1 w-full text-slate-400'></div>
    </div>
  );
};


function Circle(){
    return <div className='rounded-full h-1 w-1 text-slate-400'>&#x2022;</div>;
}

function Avatar({name}:{name:string})
{
    return <div className='relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
  <span className=' text-xs font-medium text-gray-600 dark:text-gray-300'>{name[0]}</span>
</div>;

}
export default BlogCard;
