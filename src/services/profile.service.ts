import { getMyToken } from "@/lib/utility/manage-token";
import { User } from "@/lib/types/user";

export const userService = {
  getProfile: async () => {
    const token = await getMyToken();
    const res = await fetch(`${process.env.API}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Failed to fetch profile");
    return data as { payload: { user: User } };
  },
};