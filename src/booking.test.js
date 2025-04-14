import axios from "axios";
import { expect } from "chai";
import storageData from "./storageData.js";

describe("Booking API tests", function () {
  let token;
  let bookingId;

  it("POST -> Create token", async () => {
    try {
      const response = await axios.post(
        `${storageData.baseUrl}/auth`,
        storageData.tokenBody
      );
      token = response.data.token;
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.status).to.be.equal(200);
      expect(response.data).to.have.property("token");
    } catch (error) {
      throw new Error(`Token wasn't generated: ${error}`);
    }
  });

  it("POST -> Create booking", async () => {
    try {
      const response = await axios.post(
        `${storageData.baseUrl}/booking`,
        storageData.createBookingBody,
        {
          headers: storageData.headers,
        }
      );
      bookingId = response.data.bookingid;
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.status).to.be.equal(200);
      expect(response.data).to.have.property("bookingid");
      expect(response.data).to.have.property("booking");
      expect(response.data.booking).to.have.property("firstname");
      expect(response.data.booking).to.have.property("lastname");
      expect(response.data.booking).to.have.property("totalprice");
      expect(response.data.booking).to.have.property("depositpaid");
      expect(response.data.booking.bookingdates).to.have.property("checkin");
      expect(response.data.booking.bookingdates).to.have.property("checkout");
    } catch (error) {
      throw new Error(`Create booking wasn't succesful: ${error}`);
    }
  });

  it("GET -> Open Created Booking", async () => {
    try {
      const response = await axios.get(
        `${storageData.baseUrl}/booking/${bookingId}`,
        {
          headers: storageData.headers,
        }
      );
      expect(response.status).to.be.equal(200);
      expect(response.data).to.have.property("firstname");
      expect(response.data).to.have.property("lastname");
      expect(response.data).to.have.property("totalprice");
      expect(response.data).to.have.property("depositpaid");
      expect(response.data.bookingdates).to.have.property("checkin");
      expect(response.data.bookingdates).to.have.property("checkout");
    } catch (error) {
      throw new Error(`Can't open booking: ${error}`);
    }
  });

  it("PUT -> Update booking", async () => {
    try {
      const response = await axios.put(
        `${storageData.baseUrl}/booking/${bookingId}`,
        storageData.changeBookingBody,
        {
          headers: {
            "content-type": storageData.headers["content-type"],
            Accept: storageData.headers.Accept,
            Cookie: `token=${token}`,
          },
        }
      );
      expect(response.status).to.be.equal(200);
      expect(response.data.firstname).to.be.equal(
        storageData.changeBookingBody.firstname
      );
      expect(response.data.lastname).to.be.equal(
        storageData.changeBookingBody.lastname
      );
      expect(response.data.totalprice).to.be.equal(
        storageData.changeBookingBody.totalprice
      );
      expect(response.data.depositpaid).to.be.equal(
        storageData.changeBookingBody.depositpaid
      );
      expect(response.data.bookingdates.checkin).to.be.equal(
        storageData.changeBookingBody.bookingdates.checkin
      );
      expect(response.data.bookingdates.checkout).to.be.equal(
        storageData.changeBookingBody.bookingdates.checkout
      );
    } catch (error) {
      throw new Error(`Booking wasn't updated successfully: ${error} `);
    }
  });

  it("DELETE -> Deleted created booking", async () => {
    try {
      const response = await axios.delete(
        `${storageData.baseUrl}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": storageData.headers["content-type"],
          },
        }
      );
      expect(response.headers["content-type"]).to.include("text/plain");
      expect(response.status).to.be.equal(201);
      expect(response.data).to.have.string("Created");
    } catch (error) {
      throw new Error(`Booking wasn't deleted successfully: ${error}`);
    }
  });
});
