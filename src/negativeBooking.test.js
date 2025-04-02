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
    it("POST -> Enter another data types into additionalneeds field", async () => {
        try{
          const response = await axios.post(
            `${storageData.baseUrl}/booking`,
            {
                "firstname" : "Bohdan",
                "lastname" : "Koval",
                "totalprice" : 120,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2025-01-04",
                    "checkout" : "2025-03-04"
                },
                "additionalneeds": true
            },
            {
              headers: storageData.headers
            }
          );
          bookingId = response.data.bookingid;
          console.log(response.data)
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
          expect(response.data.booking.additionalneeds).to.be.a("string")// additionalneeds -> type:string | Result: fails
        }catch(error){
          console.log(error)
          expect(error.response.data.booking.additionalneeds).not.to.be.a("string")
        }
      });
    it("DELETE -> Trying to delete booking without token", async()=>{
        try {
            const response = await axios.delete(
                `${storageData.baseUrl}/booking/${bookingId}`,
                {
                    headers: {
                        "Content-Type": storageData.headers["content-type"],
                    },
                }
            );
            expect(response.status).to.be.equal(403);
            expect(response.data).to.have.string("Forbidden");
        } catch (error) {
            // Directly handle error without throwing a new error
            expect(error.response.status).to.be.equal(403);
            expect(error.response.data).to.have.string("Forbidden");
        }
    })
    it("POST -> Trying to create booking without booking dates", async()=>{
        try{
            const response = await axios.post(
                `${storageData.baseUrl}/booking`,
                {
                    "firstname" : "Bohdan",
                    "lastname" : "Koval",
                    "totalprice" : 120,
                    "depositpaid" : true,
                    "additionalneeds": true
                },
                {
                  headers: storageData.headers
                }
              );
            expect(response.status).to.be.equal(500)
            expect(response.data).to.have.string("Internal Server Error")
        }catch(error){
            expect(error.response.status).to.be.equal(500)
            expect(error.response.data).to.have.string("Internal Server Error")
        }
    })
})