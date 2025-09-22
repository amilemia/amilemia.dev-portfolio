import { describe, expect, it } from 'vitest';
import type { Project as ProjectType } from 'contentlayer/generated';
import { sortProjects } from '../content';

const createProject = (overrides: Partial<ProjectType>): ProjectType =>
  ({
    title: 'Sample project',
    slug: 'sample-project',
    body: { code: '', raw: '', html: '' },
    _id: 'sample',
    _raw: {
      sourceFilePath: 'sample.mdx',
      sourceFileName: 'sample.mdx',
      sourceFileDir: '.',
      contentType: 'mdx',
      flattenedPath: 'sample',
    },
    url: '/projects/sample',
    dates: undefined,
    summary: '',
    techStack: [],
    links: [],
    ...overrides,
  }) as ProjectType;

describe('sortProjects', () => {
  it('orders projects by end date when available, otherwise by start date', () => {
    const current = createProject({ slug: 'current', dates: { start: '2024-01-01', end: '2024-09-01' } });
    const inProgress = createProject({ slug: 'in-progress', dates: { start: '2024-05-01' } });
    const archived = createProject({ slug: 'archived', dates: { start: '2023-01-01', end: '2023-12-01' } });

    const sorted = sortProjects([archived, inProgress, current]);

    expect(sorted.map((project) => project.slug)).toEqual(['current', 'in-progress', 'archived']);
  });

  it('returns a new array instance', () => {
    const project = createProject({ slug: 'static', dates: { start: '2024-01-01' } });
    const original = [project];

    const sorted = sortProjects(original);

    expect(sorted).not.toBe(original);
    expect(sorted).toEqual(original);
  });
});
