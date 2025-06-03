// ConCol tests
// import { describe, it } from 'node:test';
// import assert from 'node:assert';

import { ConCol } from '../concol.js';

const
  concol1 = new ConCol('App One', 'cyan'),
  concol2 = new ConCol('App Two', 'green'),
  concol3 = new ConCol('App Three', 'white', 3);

// strings
concol1.log('output a single string');
concol1.log();
concol1.info('output a string\nwith any number of\ncarriage returns');
concol1.log();
concol1.info(['array string\nwith carriage returns', 'and elements']);
concol1.info();

concol1.warn('output warning');
concol1.error('output error');

await wait(50);

// name/value/units
concol2.log(['modules required', 0]);
concol2.log(['code', 180, ' lines']);
concol2.log(['\noutput the fibonacci sequence', ['first', 1], ['second', 1], ['third', 2], ['forth', 3] ]);

concol2.warn([ ['errors in module', 0, ' found'] ]);
concol2.error('error 1\nerror 2');

await wait(50);

concol3.warn('should log to level 3...');
concol3.info('level0', 0);
concol3.info('level1', 1);
concol3.info('level2', 2);
concol3.info('level3', 3);
concol3.info('level4', 4);
concol3.info('level5', 5);

concol3.info('\nNode.js can show messages in an unexpected order.\nEnd of examples.');


// pause for a specific or random time up
function wait(time) {

  time = time || Math.random() * 1000;

  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });

}
