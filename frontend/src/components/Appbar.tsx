import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to={"/blogs"} className='flex flex-col justify-center'>
        Medium
      </Link>
      <div>
        <Avatar name='Thejas' size={"big"} />
      </div>
    </div>
  );
}

export default Appbar