const request = require("supertest");
const baseUrl = "https://petstore.swagger.io/v2";

describe("GET /pet/{petId}", () => {
  describe("Functional testing", () => {
    it("Has to return a pet by its ID", async () => {
      const petId = 1;
      await request(baseUrl)
        .get(`/pet/${petId}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("id", 1);
        });
    });
  });

  describe("Negative testing", () => {
    it("Should return an error for non-existing pet ID", async () => {
      const invalidPetId = 999999999;
      await request(baseUrl)
        .get(`/pet/${invalidPetId}`)
        .expect(404)
        .then((response) => {
          expect(response.body).toHaveProperty("message", "Pet not found");
        });
    });
  });

  describe("Edge Case testing", () => {
    it("Should handle boundary value for pet ID", async () => {
      const boundaryPetId = 1;
      await request(baseUrl)
        .get(`/pet/${boundaryPetId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toEqual(boundaryPetId);
        });
    });
  });
});

describe("PUT /pet endpoint tests", () => {
  describe("Functional testing", () => {
    it("Should update an existing pet", async () => {
      const pet = {
        id: 1,
        category: {
          id: 1,
          name: "Dogs",
        },
        name: "Rex",
        photoUrls: ["url1", "url2"],
        tags: [
          {
            id: 1,
            name: "tag1",
          },
        ],
        status: "available",
      };

      await request(baseUrl)
        .put("/pet")
        .send(pet)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("name", "Rex");
          expect(response.body).toHaveProperty("status", "available");
        });
    });
  });

  describe("Negative testing", () => {
    it("Should return an error when trying to get a pet with invalid data", async () => {
      const invalidPet = {
        id: "a",
        name: "",
      };

      await request(baseUrl)
        .put("/pet")
        .send(invalidPet)
        .expect(500)
        .then((response) => {
          expect(response.body).toHaveProperty(
            "message",
            "something bad happened"
          );
        });
    });
  });

  describe("Edge case testing", () => {
    it("Should handle edge cases for pet data", async () => {
      const edgeCasePet = {
        id: 1,
        name: "R",
        photoUrls: [],
        status: "unknown",
      };

      await request(baseUrl)
        .put("/pet")
        .send(edgeCasePet)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("name", "R");
          expect(response.body).toHaveProperty("status", "unknown");
        });
    });
  });
});

describe("GET /pet/findByStatus endpoint tests", () => {
  describe("Functional testing for valid statuses", () => {
    const statuses = ["available", "pending", "sold"];

    statuses.forEach((status) => {
      it(`Should return pets with status ${status}`, async () => {
        await request(baseUrl)
          .get(`/pet/findByStatus?status=${status}`)
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            if (response.body.length > 0) {
              response.body.forEach((pet) => {
                expect(pet.status).toEqual(status);
              });
            }
          });
      });
    });
  });

  describe("Edge case testing for no pets found", () => {
    it("Should handle the case when no pets are found", async () => {
      const rareStatus = "available,not-a-real-status";
      await request(baseUrl)
        .get(`/pet/findByStatus?status=${rareStatus}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });
  });
});

describe("DELETE /pet/{petId} endpoint tests", () => {
  describe("Testing for non-existing pet", () => {
    it("Should return an error for a non-existing pet ID", async () => {
      const nonExistingPetId = 99999999;

      await request(baseUrl).delete(`/pet/${nonExistingPetId}`).expect(404);
    });
  });
});

describe("POST /store/order endpoint tests", () => {
  describe("Functional testing for successful order creation", () => {
    it("Should successfully create an order", async () => {
      const order = {
        petId: 1,
        quantity: 1,
        shipDate: "2023-04-08T12:34:56.789Z",
        status: "placed",
        complete: true,
      };

      await request(baseUrl)
        .post("/store/order")
        .send(order)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("petId", order.petId);
          expect(response.body).toHaveProperty("quantity", order.quantity);
          expect(response.body).toHaveProperty("status", order.status);
        });
    });
  });

  describe("Negative testing for invalid order data", () => {
    it("Should return an error for an invalid order data", async () => {
      const invalidOrder = {
        petId: "abc",
        quantity: -1,
        status: "unknown",
      };

      await request(baseUrl)
        .post("/store/order")
        .send(invalidOrder)
        .expect(500)
        .then((response) => {
          expect(response.body).toHaveProperty(
            "message",
            "something bad happened"
          );
        });
    });
  });
});
