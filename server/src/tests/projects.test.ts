import UserService from '@services/users.service';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
import request from 'supertest';
import App from '@/app';
import ProjectsRoute from '@routes/projects.route';
import testData from './testData.json';

const { admin } = testData;

const projectsRoute = new ProjectsRoute();
const app = new App([projectsRoute]);
const uri = `${app.api_root}/${projectsRoute.resource}`;

let token = '';

beforeAll(async () => {
  let user = await UserService.findUserByEmail(admin.email);
  if (!user) {
    user = await UserService.createUser(admin as CreateUserDto);
  }
  const tokenData = await AuthService.createToken(user, 600);
  token = tokenData.token;
});

afterAll(async () => {
  await app.stop();
});

describe('Testing Projects', () => {
  describe('[GET] /projects', () => {
    it('reject without auth', () => {
      return request(app.getServer()).get(uri).send().expect(401);
    });
    it('get all projects', () => {
      return request(app.getServer())
        .get(uri)
        .set('Cookie', [`token=${token}`])
        .send()
        .expect(200);
    });
  });
});
