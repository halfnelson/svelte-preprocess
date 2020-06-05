import { PreprocessorGroup, Options } from '../types';
import { concat } from '../modules/concat';
import { parseFile } from '../modules/parseFile';

export default (options: Options.Babel): PreprocessorGroup => ({
  async script(svelteFile) {
    const { default: transformer } = await import('../transformers/babel');

    const { content, filename, dependencies } = await parseFile(
      svelteFile,
      'javascript',
    );

    const transformed = await transformer({ content, filename, options });

    return {
      ...transformed,
      dependencies: concat(dependencies, transformed.dependencies),
    };
  },
});
