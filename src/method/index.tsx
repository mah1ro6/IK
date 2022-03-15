import axios from "axios";
import toast from "react-hot-toast";

export const deletePost = async (id: string) => {
  await axios.post(
    "/api/proxy/delete",
    { id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleDelete = async (
  id: string,
  frontBottleCount: number
): Promise<void> => {
  console.log(frontBottleCount);

  try {
    if (frontBottleCount > 0) {
      await toast.promise(reduceFrontBottle(id, frontBottleCount), {
        loading: "削除中...",
        success: "削除に成功しました!",
        error: "削除に失敗しました...",
      });
    } else {
      await toast.promise(deletePost(id), {
        loading: "削除中...",
        success: "削除に成功しました!",
        error: "削除に失敗しました...",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const reduceFrontBottle = async (
  id: string,
  frontBottleCount: number
) => {
  await axios.post(
    "/api/proxy/frontBottlePost",
    { id, frontBottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const addToFrontPost = async (
  id: string,
  cellarBottleCount: number,
  frontBottleCount: number
) => {
  await axios.post(
    "/api/proxy/addToFrontPost",
    { id, cellarBottleCount, frontBottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const addToFront = async (
  id: string,
  cellarBottleCount: number,
  frontBottleCount: number
): Promise<void> => {
  try {
    await toast.promise(
      addToFrontPost(id, cellarBottleCount, frontBottleCount),
      {
        loading: "送信中...",
        success: "送信に成功しました!",
        error: "送信に失敗しました...",
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const onOrderPost = async (id: string, count: number) => {
  await axios.post(
    "/api/proxy/onOrderPost",
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

export const offOrderPost = async (
  id: string,
  cellarBottleCount: number,
  frontBottleCount: number
) => {
  await axios.post(
    "/api/proxy/offOrderPost",
    { id, cellarBottleCount, frontBottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleOffOrder = async (
  id: string,
  cellarBottleCount: number,
  frontBottleCount: number
): Promise<void> => {
  try {
    await toast.promise(offOrderPost(id, cellarBottleCount, frontBottleCount), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};

export const addToCellarPost = async (
  id: string,
  cellarBottleCount: number
) => {
  await axios.post(
    "/api/proxy/addToCellarPost",
    { id, cellarBottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleAddToCellar = async (
  id: string,
  cellarBottleCount: number
): Promise<void> => {
  try {
    await toast.promise(addToCellarPost(id, cellarBottleCount), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};

export const setItemTextPost = async (data: string, id: string) => {
  await axios.post(
    "/api/proxy/setItemTextPost",
    { data, id },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const handleSetItemText = async (data: string, id: string) => {
  try {
    await toast.promise(setItemTextPost(data, id), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};
