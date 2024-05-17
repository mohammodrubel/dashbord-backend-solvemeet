import jwt from 'jsonwebtoken'
export const createToken = (
  payload: { _id: string; email: string; isDeleted: boolean; role: string },
  secret: string,
  expiresIn: string,
) => {
    return jwt.sign(payload, secret, {
        expiresIn,
      });
}
