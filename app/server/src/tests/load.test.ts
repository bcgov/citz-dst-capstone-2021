import CreateProjectDTO from '@dtos/projects.dto';
import ProjectService from '@services/projects.service';
import { connect } from 'mongoose';
import DBConfig from '@/databases';
import testData from './testData.json';

beforeAll(async () => {
  await connect(DBConfig.url, DBConfig.options);
});

describe.skip('loading test data', () => {
  it('loading sample projects', () => {
    return Promise.all(
      testData.projects.map((prj: CreateProjectDTO) => {
        return ProjectService.findProjectByCPS(prj.cpsIdentifier).then(data => {
          return data || ProjectService.createProject(prj);
        });
      }),
    ).then(projects => {
      expect(projects.length).toBeGreaterThan(0);
    });
  });
});
