import { api } from "@/lib/apiClient";

export type FriendUser = {
  _id: string;
  username: string;
  email?: string;
  profileImage?: string;
  streak: number;
  problemsSolved: number;
  platformStats?: Record<string, number>;
  online?: boolean;
  isMe?: boolean;
};

export async function fetchFriends() {
  const res = await api.get("/friends");
  return res.data.friends as FriendUser[];
}

export async function searchUsers(query: string) {
  const res = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
  return res.data as FriendUser[];
}

export async function addFriend(friendId: string) {
  const res = await api.post("/friends/add", { friendId });
  return res.data;
}

