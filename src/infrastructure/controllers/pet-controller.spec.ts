import request from "supertest";

import app from "@/app";

describe("Feature pet e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a pet", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@bestfriends.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    };

    const organizationResponse = await request(app.server)
      .post("/organizations")
      .send(organizationData);

    const authResponse = await request(app.server)
      .post("/organizations/authenticate")
      .send({
        email: organizationData.email,
        password: organizationData.password,
      });

    const petData = {
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId: organizationResponse.body.id,
    };

    const petResponse = await request(app.server)
      .post("/organizations/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(petData);

    expect(petResponse.status).toBe(201);

    await request(app.server).delete(`/pets/${petResponse.body.id}`).send();

    await request(app.server)
      .delete(`/organizations/${organizationResponse.body.id}`)
      .send();
  });

  it("should get a pet", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@bestfriends.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    };

    const organizationResponse = await request(app.server)
      .post("/organizations")
      .send(organizationData);

    const authResponse = await request(app.server)
      .post("/organizations/authenticate")
      .send({
        email: organizationData.email,
        password: organizationData.password,
      });

    const petData = {
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId: organizationResponse.body.id,
    };

    const petResponse = await request(app.server)
      .post("/organizations/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(petData);

    const getPetResponse = await request(app.server)
      .get(`/pets/${petResponse.body.id}`)
      .set("Authorization", `Bearer ${authResponse.body.token}`);

    expect(getPetResponse.status).toBe(200);

    await request(app.server).delete(`/pets/${petResponse.body.id}`).send();

    await request(app.server)
      .delete(`/organizations/${organizationResponse.body.id}`)
      .send();
  });

  it("should be able to search pets by city", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@bestfriends.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    };

    const organizationResponse = await request(app.server)
      .post("/organizations")
      .send(organizationData);

    const authResponse = await request(app.server)
      .post("/organizations/authenticate")
      .send({
        email: organizationData.email,
        password: organizationData.password,
      });

    const petData = {
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId: organizationResponse.body.id,
    };

    const petResponse = await request(app.server)
      .post("/organizations/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(petData);

    const response = await request(app.server)
      .post("/pets")
      .send({ city: organizationData.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);

    await request(app.server).delete(`/pets/${petResponse.body.id}`).send();

    await request(app.server)
      .delete(`/organizations/${organizationResponse.body.id}`)
      .send();
  });
});
