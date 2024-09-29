import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // test case 1
  it('/auth/register (POST) - register new user', () => {
    const userData = {
      password: 'qwe123',
      username: 'putuarya2',
      gender: 'male',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(userData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            password: expect.any(String),
            username: 'putuarya2',
            gender: 'male',
            id: expect.any(Number),
          }),
        );
      });
  });

  // test case 2
  it('/auth/register (POST) - register with same username', () => {
    const userData = {
      password: 'qwe123',
      username: 'putuarya2',
      gender: 'male',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(userData)
      .expect(500);
  });

  // test case 3
  it('/auth/login (POST) - login with correct credentials', () => {
    const loginData = {
      username: 'putuarya2',
      password: 'qwe123',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            ACCESS_TOKEN: expect.any(String),
          }),
        );
      });
  });

  // test case 4
  it('/auth/login (POST) - login with wrong username', () => {
    const loginData = {
      username: 'wrong_username',
      password: 'qwe123',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 401,
          message: 'Password or Username are not valid',
        });
      });
  });

  // test case 5
  it('/auth/login (POST) - login with wrong password', () => {
    const loginData = {
      username: 'putuarya2',
      password: 'wrong_password',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 401,
          message: 'Password or Username are not valid',
        });
      });
  });

  // test case 6
  it('/book (POST) - empty bearer token while creating book', () => {
    return request(app.getHttpServer())
      .post('/book')
      .set('Authorization', '')
      .send({
        title: 'Harry Potter Kedua',
        description: 'Description harry potter',
      })
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      });
  });

  // test case 7
  it('/book (POST) - with valid bearer token (must login first)', async () => {
    const loginData = {
      username: 'putuarya2',
      password: 'qwe123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const accessToken = loginResponse.body.ACCESS_TOKEN;

    return request(app.getHttpServer())
      .post('/book')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Harry Potter Kedua',
        description: 'Description harry potter',
      })
      .expect(201);
  });

  // test case 8
  it('/book (GET) - retrieve books', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            title: 'Harry Potter Kedua',
            description: 'Description harry potter',
          },
        ]);
      });
  });

  // test case 9
  it('/book/:id (PUT) - update book not found', async () => {
    const loginData = {
      username: 'putuarya2',
      password: 'qwe123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const accessToken = loginResponse.body.ACCESS_TOKEN;

    return request(app.getHttpServer())
      .put('/book/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Harry Potter Edited',
        description: 'Description harry potter Edited',
      })
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Data not found, no rows are affected',
          error: 'Not Found',
          statusCode: 404,
        });
      });
  });

  // test case 10
  it('/book/:id (PUT) - update book', async () => {
    const loginData = {
      username: 'putuarya2',
      password: 'qwe123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const accessToken = loginResponse.body.ACCESS_TOKEN;

    return request(app.getHttpServer())
      .put('/book/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Harry Potter Edited',
        description: 'Description harry potter Edited',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Data is updated',
          error: null,
          statusCode: 200,
        });
      });
  });

  // test case 11
  it('/book/:id (DELETE) - unauthorized delete book', () => {
    return request(app.getHttpServer())
      .delete('/book/1')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      });
  });

  // test case 12
  it('/book/:id (DELETE) - delete book with authorized user', async () => {
    const loginData = {
      username: 'putuarya2',
      password: 'qwe123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const accessToken = loginResponse.body.ACCESS_TOKEN;

    return request(app.getHttpServer())
      .delete('/book/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Data is deleted',
          error: null,
          statusCode: 200,
        });
      });
  });

  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });
});
