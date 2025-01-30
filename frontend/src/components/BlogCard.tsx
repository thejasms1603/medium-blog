import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id:number
}
const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
  return <Link to={`/blog/${id}`} >
  <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer'>
      <div className='flex gap-2'>
        <Avatar name={authorName}/>
        <div className='font-extralight text-sm flex justify-center flex-col'>
          {authorName}
        </div>
        <div>
          <Circle />
        </div>
        <div className='flex justify-center flex-col font-thin text-slate-500 text-sm'>
          {publishedDate}
        </div>
      </div>
      <div className='font-semibold text-xl pt-2'>{title}</div>
      <div className='font-thin text-md'>
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className='text-slate-500 text-sm font-thin pt-2'>{`${Math.ceil(
        content.length / 100
      )} minute(s) read`}</div>
    </div>
    </Link>
};


export function Circle(){
    return <div className='rounded-full h-1 w-1 text-slate-400'>&#x2022;</div>;
}

 export function Avatar({name, size = "small" }:{name:string, size?:"small" | "big"})
{
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
  <span className={`${size === "small" ? "text-xs": "text-md" }font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>;

}
export default BlogCard;
