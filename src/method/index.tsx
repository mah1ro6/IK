import axios from "axios";
import toast from "react-hot-toast";

export const deletePost = async (deleteId: string) => {
  await axios.post(
    "/api/delete",
    { id: deleteId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleDelete = async (deleteId: string): Promise<void> => {
  try {
    await toast.promise(deletePost(deleteId), {
      loading: "削除中...",
      success: "削除に成功しました!",
      error: "削除に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};

export const cellarPost = async (id: string) => {
  await axios.post(
    "/api/cellarPatch",
    { id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const cellarToFront = async (id: string): Promise<void> => {
  try {
    await toast.promise(cellarPost(id), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};
