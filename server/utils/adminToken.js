import crypto from "crypto";

const getAdminSecret = () =>
  process.env.ADMIN_TOKEN_SECRET || process.env.EMAIL_PASS || "portfolio-dev-secret";

export const createAdminToken = () => {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 8 })
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
};

export const verifyAdminToken = (token) => {
  try {
    if (!token?.includes(".")) return false;

    const [payload, signature] = token.split(".");
    const expectedSignature = crypto
      .createHmac("sha256", getAdminSecret())
      .update(payload)
      .digest("base64url");
    const signatureBuffer = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    if (
      signatureBuffer.length !== expectedSignatureBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
    ) {
      return false;
    }

    const parsedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    return parsedPayload.exp > Date.now();
  } catch {
    return false;
  }
};
