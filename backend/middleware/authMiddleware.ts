import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authenticated, no token provided");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as MyJwtPayload;

      const user = await UserModel.findById(decoded._id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Invalid or expired token");
    }
  }
);
