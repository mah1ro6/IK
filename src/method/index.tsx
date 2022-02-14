import axios from "axios";
import toast from "react-hot-toast";

export const deletePost = async (deleteId: string) => {
  await axios.post(
    "/api",
    { id: deleteId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleDelete = async (deleteId: string): Promise<void> => {
  try {
    toast.promise(deletePost(deleteId), {
      loading: "削除中...",
      success: "削除に成功しました!",
      error: "削除に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};
