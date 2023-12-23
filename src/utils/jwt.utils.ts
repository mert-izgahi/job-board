import jwt from "jsonwebtoken";
import config from "config";

const jwtSecretKey = config.get<string>("jwtSecretKey");

function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, jwtSecretKey, {
    ...(options && options),
  });
}
function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

export { signJwt, verifyJwt };
