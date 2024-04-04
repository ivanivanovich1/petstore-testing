const request = require("supertest");
const baseUrl = "https://petstore.swagger.io/v2";

describe("Petstore API testing", () => {
  describe("GET /pet/{petId}", () => {
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

  describe("GET /pet/{petId} with invalid ID", () => {
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

  describe("GET /pet/{petId} with boundary value for ID", () => {
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
