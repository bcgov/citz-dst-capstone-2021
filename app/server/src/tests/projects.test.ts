import UserService from '@services/users.service';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
import request from 'supertest';
import App from '@/app';
import ProjectsRoute from '@routes/projects.route';
import testData from './testData.json';
import ProjectService from '../services/projects.service';

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
  describe('[POST] /projects', () => {
    it('validates new project input', () => {
      const project = { ...testData.projects[0] };
      project.cpsIdentifier = '';
      return request(app.getServer())
        .post(uri)
        .set('Cookie', [`token=${token}`])
        .send(project)
        .expect(400);
    });
    it('creates a new project', () => {
      const data = { ...testData.projects[0] };
      return ProjectService.findProjectByCPS(data.cpsIdentifier)
        .then(project => {
          if (project) {
            return ProjectService.deleteProject(project.id);
          }
          return null;
        })
        .then(() => {
          return request(app.getServer())
            .post(uri)
            .set('Cookie', [`token=${token}`])
            .send(data)
            .expect(201);
        });
    });
  });
  describe('[UPDATE] /projects/:id', () => {
    it('updates a project', done => {
      const progress = 79;
      const data = { ...testData.projects[0], progress };
      ProjectService.findProjectByCPS(data.cpsIdentifier).then(project => {
        // eslint-disable-next-line prefer-destructuring
        const id = project.id;
        expect(id).toBeDefined();
        request(app.getServer())
          .patch(`${uri}/${id}`)
          .set('Cookie', [`token=${token}`])
          .send(data)
          .end((e, res) => {
            expect(res.body.data.progress).toEqual(progress);
            done();
          });
      });
    });
  });
  describe('[DELETE] /projects/:id', () => {
    it('delete a project', () => {
      const data = testData.projects[0];
      return ProjectService.findProjectByCPS(data.cpsIdentifier).then(project => {
        // eslint-disable-next-line prefer-destructuring
        const id = project.id;
        expect(id).toBeDefined();
        return request(app.getServer())
          .delete(`${uri}/${id}`)
          .set('Cookie', [`token=${token}`])
          .expect(200);
      });
    });
  });
});
