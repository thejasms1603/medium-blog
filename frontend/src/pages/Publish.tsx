import Appbar from "../components/Appbar";
import { ChangeEvent, useState } from "react";
import PublishButton from "../components/PublishButton";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='max-w-screen-lg w-full pt-8'>
          <input
            type='text'
            id='title'
            aria-describedby='helper-text-explanation'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 placeholder:text-gray-500'
            placeholder='Enter the blog title...'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <PublishButton title={title} content={content}/>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className='mt-2'>
      <div className='w-full pb-4'>
        <div className='flex items-center justify-between'>
          <div className='bg-white rounded-lg w-full'>
            <label htmlFor='editor' className='sr-only'>
              Publish Post
            </label>
            <textarea
              id='editor'
              rows={8}
              onChange={onChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none min-h-[200px] shadow-sm focus:outline-none'
              placeholder='Enter the blog content...'
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
