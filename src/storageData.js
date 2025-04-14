export default {
  baseUrl: "https://restful-booker.herokuapp.com",
  tokenBody: {
    username: "admin",
    password: "password123",
  },
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  createBookingBody: {
    firstname: "Bohdan",
    lastname: "Koval",
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-01-04",
      checkout: "2025-04-04",
    },
    additionalneeds: "Cheesecake",
  },
  changeBookingBody: {
    firstname: "Bohdan",
    lastname: "Koval",
    totalprice: 388,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-01-04",
      checkout: "2025-07-04",
    },
    additionalneeds: "SmartTV and 5G internet",
  },
};
