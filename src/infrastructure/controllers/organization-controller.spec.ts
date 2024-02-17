import request from "supertest";

import app from "@/app";

describe("Feature organization e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a organization", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@email.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    };

    const response = await request(app.server)
      .post("/organizations")
      .send(organizationData);

    expect(response.status).toBe(201);

    await request(app.server)
      .delete(`/organizations/${response.body.id}`)
      .send();
  });

  it("should authenticate an organization", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "test@bestfriends.com",
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

    expect(authResponse.status).toBe(200);
    expect(authResponse.body.token).toEqual(expect.any(String));

    await request(app.server)
      .delete(`/organizations/${organizationResponse.body.id}`)
      .send();
  });

  it("should be able to fetch nearby organizations", async () => {
    const organizationData = {
      name: "bestfriends",
      authorName: "Best Friends",
      email: "info@bestfriends.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 39.914212,
      longitude: -81.076757,
    };

    const organizationResponse = await request(app.server)
      .post("/organizations")
      .send(organizationData)
      .expect(201);

    const response = await request(app.server)
      .get("/organizations/nearby")
      .query({
        latitude: organizationData.latitude,
        longitude: organizationData.longitude,
      })
      .expect(200);

    expect(response.body.organizations).toHaveLength(1);
    expect(response.body.organizations[0].name).toEqual(organizationData.name);

    await request(app.server)
      .delete(`/organizations/${organizationResponse.body.id}`)
      .send();
  });
});
