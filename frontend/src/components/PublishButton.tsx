import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface publish{
    title: string,
    content:string
}

function PublishButton({ title, content }: publish) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("Bearer token");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog published successfully!");
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      type='button'
      disabled={loading}
      className={`mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Publishing..." : "Publish"}
    </button>
  );
}

export default PublishButton;
