import { Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ErrorHandler } from "../utils/ErrorHandler";
import { IRequest } from "../types";
import { db } from "../utils/db";
import { getAll, getOne } from "./handelFactory";

// const filterObj = (obj, ...allowedFields: string[]): object => {
//   const newObj = {};
//   Object.keys(obj).forEach(
//     (el) => allowedFields.includes(el) && (newObj[el] = obj[el]),
//   );
//   return newObj;
// };

// export const updateMyUser = catchAsync(
//   async (req: IRequest, res: Response, next: NextFunction) => {
//     if (req.body.password || req.body.passwordConfirm) {
//       return next(
//         new ErrorHandler(
//           "This route is not for password updates. Please use /updateMyPassword.",
//           400,
//         ),
//       );
//     }
//     const filterReq = filterObj(req.body, "name", "email");

//     const currentUser = await User.findByIdAndUpdate(req.user._id, filterReq, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         user: currentUser,
//       },
//     });
//   },
// );

// export const DelMyUser = catchAsync(
//   async (req: IRequest, res: Response, next: NextFunction) => {
//     await User.findByIdAndUpdate(req.user._id, { active: false });
//     res.status(204).json({
//       status: "success",
//       data: {
//         user: null,
//       },
//     });
//   },
// );
export const getMe = (req: IRequest, res: Response, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};
export const getUsers = getAll(db.users);
export const getUser = getOne(db.users);
// export const updateUser = updateOne(User);
// export const deleteUser = delOne(User);
