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

export const handleDelete = async (
  deleteId: string,
  orderTrue: boolean
): Promise<void> => {
  try {
    if (orderTrue) {
      toast(
        "削除できません。\n削除するには発注リストから発注するをしてもう一度試してください。",
        {
          icon: "❌",
          duration: 8000,
        }
      );
      return;
    } else {
      await toast.promise(deletePost(deleteId), {
        loading: "削除中...",
        success: "削除に成功しました!",
        error: "削除に失敗しました...",
      });
    }
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

export const onOrderPost = async (id: string, count: number) => {
  await axios.post(
    "/api/onOrderPatch",
    { id, count },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleOnOrder = async (
  id: string,
  count: number
): Promise<void> => {
  try {
    if (count === 0) {
      toast("発注本数が0本です", {
        icon: "❌",
        duration: 3000,
      });
      return;
    } else {
      await toast.promise(onOrderPost(id, count), {
        loading: "送信中...",
        success: "送信に成功しました!",
        error: "送信に失敗しました...",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const offOrderPost = async (id: string) => {
  await axios.post(
    "/api/offOrderPatch",
    { id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleOffOrder = async (id: string): Promise<void> => {
  try {
    await toast.promise(offOrderPost(id), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};
