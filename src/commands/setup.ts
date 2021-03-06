import ora from 'ora';
import { Command, flags } from '@oclif/command';
import { Input } from '@oclif/command/lib/flags';
import { setup } from '..';

export default class SetupCommand extends Command {
  static description = 'setup typescript definitions';

  static examples = ['$ link-type-definitions setup'];

  static flags: Input<any> = {
    'no-install': flags.boolean({ required: false }),
    dry: flags.boolean({ char: 'd', required: false }),
    help: flags.help({ char: 'h', required: false }),
    verbose: flags.boolean({ char: 'v', required: false })
  };

  async run() {
    const { flags } = this.parse(SetupCommand);
    const spinner = flags.dry ? undefined : ora();
    const success = await setup(
      {
        ...(flags.dry ? { dryRun: flags.dry } : {}),
        ...(flags.verbose ? { verbose: flags.verbose } : {}),
        ...(flags['no-install'] ? { install: false } : { install: true })
      },
      spinner
    );
    if (success) spinner?.succeed('project setup');
  }
}
