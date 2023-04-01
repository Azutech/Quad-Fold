import { Router } from "express";
import { createCoupons } from "../controllers/coupons";

export const coupons = Router()

coupons.post('/createCoupons', createCoupons)