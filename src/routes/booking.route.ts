import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";


const router = Router();
const bookingController = new BookingController();

/**
 * Prefix: /api/bookings
 * All routes here are for the regular customer/user
 */

// 1. Create a new booking (Book a viewing/property)
router.post(
    "/", 
    authorizationMiddleware, 
    bookingController.createBooking
);

// 2. Get "My Bookings" (List of bookings made by the logged-in user)
router.get(
    "/my-bookings", 
    authorizationMiddleware, 
    bookingController.getMyBookings
);

// 3. Cancel a booking
// We use PATCH because we are only changing the status to "CANCELLED"
router.patch(
    "/:id/cancel", 
    authorizationMiddleware, 
    bookingController.cancelBooking
);

export default router;