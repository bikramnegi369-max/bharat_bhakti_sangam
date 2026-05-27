import "server-only";

type RazorpayEnv = {
  keyId: string;
  keySecret: string;
};

export function getRazorpayEnv(): RazorpayEnv {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  return { keyId, keySecret };
}
