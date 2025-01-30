import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if(loading)
    {
        return <div>
            loading...
        </div>
    }
    return (
      <div>
        <Appbar />
        <div className='flex justify-center'>
          <div>
            {blogs.map((blog) => (
              <BlogCard key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"28th Jan 2025"}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Blogs;
