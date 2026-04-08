import { api } from "@/lib/apiClient";

export type FriendUser = {
  _id: string;
  username: string;
  streak: number;
  problemsSolved: number;
  online: boolean;
};

export async function fetchFriends() {
  const res = await api.get("/friends");
  return res.data.friends as FriendUser[];
}

