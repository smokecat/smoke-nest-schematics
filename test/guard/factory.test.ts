import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { GuardOptions } from '../../src/guard/schema';
import { ApplicationOptions } from '../../src/application/schema';

describe('Guard Factory', () => {
  let tree: UnitTestTree;
  let runner: SchematicTestRunner;
  before(() => {
    runner = new SchematicTestRunner(
      '.',
      path.join(process.cwd(), 'src/collection.json')
    );
    const options: ApplicationOptions = {
      name: '',
    };
    tree = runner.runSchematic('application', options, new VirtualTree());
  });
  it('should manage name only', () => {
    const options: GuardOptions = {
      name: 'foo'
    };
    tree = runner.runSchematic('guard', options, tree);
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name as a path', () => {
    const options: GuardOptions = {
      name: 'bar/foo'
    };
    tree = runner.runSchematic('guard', options, tree);
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/bar/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name and path', () => {
    const options: GuardOptions = {
      name: 'foo',
      path: 'baz'
    };
    tree = runner.runSchematic('guard', options, tree);
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/baz/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
});
