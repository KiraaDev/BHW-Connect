import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateJWT = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const isValidObjectId = (id: any) => {
  return Types.ObjectId.isValid(id) && (String)(new Types.ObjectId(id)) === id;
}


export const isDocumentExists = async (Model: any, id: string) => {
  return await Model.exists({ _id: id });
};
