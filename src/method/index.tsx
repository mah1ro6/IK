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
  orderTrue: boolean,
  noInStockBottle: boolean
): Promise<void> => {
  try {
    if (orderTrue) {
      await toast.promise(onEmptyBottle(id), {
        loading: "削除中...",
        success: "削除に成功しました!",
        error: "削除に失敗しました...",
      });
    } else if (!noInStockBottle) {
      await toast.promise(frontToCellarPost(id, noInStockBottle), {
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

export const onEmptyBottle = async (id: string) => {
  await axios.post(
    "/api/proxy/emptyBottlePatch",
    { id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const frontToCellarPost = async (
  id: string,
  noInStockBottle: boolean
) => {
  await axios.post(
    "/api/proxy/frontToCellarPatch",
    { id, noInStockBottle },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const cellarToFrontPost = async (id: string, bottleCount: number) => {
  await axios.post(
    "/api/proxy/cellarToFrontPatch",
    { id, bottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const cellarToFront = async (
  id: string,
  bottleCount: number
): Promise<void> => {
  try {
    await toast.promise(cellarToFrontPost(id, bottleCount), {
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
    "/api/proxy/onOrderPatch",
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
  noInStockBottle: boolean,
  emptyFrontBottle: boolean
) => {
  await axios.post(
    "/api/proxy/offOrderPatch",
    { id, noInStockBottle, emptyFrontBottle },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleOffOrder = async (
  id: string,
  noInStockBottle: boolean,
  emptyFrontBottle: boolean
): Promise<void> => {
  try {
    await toast.promise(offOrderPost(id, noInStockBottle, emptyFrontBottle), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};

export const AddCellarStockPost = async (
  id: string,
  cellarBottleCount: number
) => {
  await axios.post(
    "/api/proxy/addCellarStockPost",
    { id, cellarBottleCount },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleAddCellarStock = async (
  id: string,
  cellarBottleCount: number
): Promise<void> => {
  try {
    await toast.promise(AddCellarStockPost(id, cellarBottleCount), {
      loading: "送信中...",
      success: "送信に成功しました!",
      error: "送信に失敗しました...",
    });
  } catch (e) {
    console.log(e);
  }
};
