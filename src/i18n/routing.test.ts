import { describe, it, expect } from 'vitest';
import { stripLocaleFromPathname, buildLocalizedPathname, replaceLocaleInPathname } from './routing';
import type { Locale } from './locales';

describe('stripLocaleFromPathname', () => {
  it('strips EN locale from pathname', () => {
    expect(stripLocaleFromPathname('/en/services', 'en')).toBe('/services');
    expect(stripLocaleFromPathname('/en/projects', 'en')).toBe('/projects');
    expect(stripLocaleFromPathname('/en', 'en')).toBe('/');
  });

  it('strips FR locale from pathname', () => {
    expect(stripLocaleFromPathname('/fr/services', 'fr')).toBe('/services');
    expect(stripLocaleFromPathname('/fr/projects', 'fr')).toBe('/projects');
    expect(stripLocaleFromPathname('/fr', 'fr')).toBe('/');
  });

  it('handles root path', () => {
    expect(stripLocaleFromPathname('/', 'en')).toBe('/');
    expect(stripLocaleFromPathname('/', 'fr')).toBe('/');
  });

  it('handles paths with query parameters', () => {
    expect(stripLocaleFromPathname('/en/services?tab=web', 'en')).toBe('/services?tab=web');
    expect(stripLocaleFromPathname('/fr/projects?id=1', 'fr')).toBe('/projects?id=1');
  });

  it('handles paths with hash fragments', () => {
    expect(stripLocaleFromPathname('/en/about#team', 'en')).toBe('/about#team');
    expect(stripLocaleFromPathname('/fr/contact#form', 'fr')).toBe('/contact#form');
  });

  it('handles nested paths', () => {
    expect(stripLocaleFromPathname('/en/projects/my-project', 'en')).toBe('/projects/my-project');
    expect(stripLocaleFromPathname('/fr/projects/mon-projet', 'fr')).toBe('/projects/mon-projet');
  });
});

describe('buildLocalizedPathname', () => {
  it('builds EN pathname with explicit locale prefix', () => {
    expect(buildLocalizedPathname('/services', 'en')).toBe('/en/services');
    expect(buildLocalizedPathname('/projects', 'en')).toBe('/en/projects');
    expect(buildLocalizedPathname('/about', 'en')).toBe('/en/about');
  });

  it('builds FR pathname with locale prefix', () => {
    expect(buildLocalizedPathname('/services', 'fr')).toBe('/fr/services');
    expect(buildLocalizedPathname('/projects', 'fr')).toBe('/fr/projects');
    expect(buildLocalizedPathname('/about', 'fr')).toBe('/fr/about');
  });

  it('handles root path for both locales', () => {
    expect(buildLocalizedPathname('/', 'en')).toBe('/en');
    expect(buildLocalizedPathname('/', 'fr')).toBe('/fr');
  });

  it('handles nested paths', () => {
    expect(buildLocalizedPathname('/projects/my-project', 'en')).toBe('/en/projects/my-project');
    expect(buildLocalizedPathname('/projects/mon-projet', 'fr')).toBe('/fr/projects/mon-projet');
  });

  it('normalizes paths without leading slash', () => {
    expect(buildLocalizedPathname('services', 'en')).toBe('/en/services');
    expect(buildLocalizedPathname('projects', 'fr')).toBe('/fr/projects');
  });
});

describe('replaceLocaleInPathname', () => {
  it('switches from EN to FR', () => {
    expect(replaceLocaleInPathname('/en/services', 'fr', 'en')).toBe('/fr/services');
    expect(replaceLocaleInPathname('/en/projects', 'fr', 'en')).toBe('/fr/projects');
    expect(replaceLocaleInPathname('/en', 'fr', 'en')).toBe('/fr');
  });

  it('switches from FR to EN', () => {
    expect(replaceLocaleInPathname('/fr/services', 'en', 'fr')).toBe('/en/services');
    expect(replaceLocaleInPathname('/fr/projects', 'en', 'fr')).toBe('/en/projects');
    expect(replaceLocaleInPathname('/fr', 'en', 'fr')).toBe('/en');
  });

  it('handles nested paths when switching locales', () => {
    expect(replaceLocaleInPathname('/en/projects/my-project', 'fr', 'en')).toBe('/fr/projects/my-project');
    expect(replaceLocaleInPathname('/fr/projects/mon-projet', 'en', 'fr')).toBe('/en/projects/mon-projet');
  });

  it('preserves query parameters in pathname', () => {
    expect(replaceLocaleInPathname('/en/services?tab=web', 'fr', 'en')).toBe('/fr/services?tab=web');
    expect(replaceLocaleInPathname('/fr/projects?id=1', 'en', 'fr')).toBe('/en/projects?id=1');
  });

  it('preserves hash fragments in pathname', () => {
    expect(replaceLocaleInPathname('/en/about#team', 'fr', 'en')).toBe('/fr/about#team');
    expect(replaceLocaleInPathname('/fr/contact#form', 'en', 'fr')).toBe('/en/contact#form');
  });

  it('handles root path switching', () => {
    expect(replaceLocaleInPathname('/en', 'fr', 'en')).toBe('/fr');
    expect(replaceLocaleInPathname('/fr', 'en', 'fr')).toBe('/en');
  });
});
