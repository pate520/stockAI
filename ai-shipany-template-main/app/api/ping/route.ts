import { respData, respErr } from "@/lib/resp";

import { getUserUuid } from "@/services/user";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return respErr("invalid params");
    }

    const user_uuid = await getUserUuid();
    if (!user_uuid) {
      return respErr("no auth");
    }

    return respData({
      pong: `received message: ${message}`,
    });
  } catch (e) {
    console.log("test failed:", e);
    return respErr("test failed");
  }
}
