export const getPriceTotal=(bookings)=>{

    return bookings.reduce((acc, booking)=>{return booking.totalPrice+acc},0)

}