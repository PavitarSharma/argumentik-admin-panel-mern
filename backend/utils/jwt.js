import jwt from "jsonwebtoken";
import createError from "http-errors";
export const generateToken = (userInfo) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "7d",
      issuer: "argumentik.com",
    };
    jwt.sign(user, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};
