# ConCol

A simple but flexible Node.js formatted color logger with no dependencies.

Time is shown in 24-hour HH:MM:SS.MMM format. Numbers are formatted to 0-dp US/UK format.


## Installation

```sh
npm install ConCol
```

## Usage

```javascript
import { ConCol } from 'ConCol';

// create logger instances
const log1 = new ConCol('App One', 'cyan');
const log2 = new ConCol('App Two', 'green');
const log3 = new ConCol('App Three', 'white', 3);

// basic logging
log1.log('output single string');
log1.info('output string\nwith carriage returns');
log1.warn('show warning');
log1.error('show error');

/* output
13:58:10.171 [App One  ] output single string
13:58:10.172 [App One  ] output string
13:58:10.172 [App One  ] with carriage returns
13:58:10.172 [App One  ]  WARN: show warning
13:58:10.172 [App One  ] ERROR: show error
*/

// name/value/unit
log2.log(['ConCol requires', 0, ' modules']);
log2.log([ 'fibonacci sequence', ['first', 1], ['second', 1], ['third', 2] ]);

/* output
13:58:10.223 [App Two  ]                      this requires:         0 modules
13:58:10.223 [App Two  ] fibonacci sequence
13:58:10.223 [App Two  ]                              first:         1
13:58:10.223 [App Two  ]                             second:         1
13:58:10.223 [App Two  ]                              third:         2
*/

// log level filtering
log3.info('level0', 0);
log3.info('level3', 3);
log3.info('level4', 4); // not shown - log level set to 3

/* output
13:58:10.275 [App Three] level0
13:58:10.275 [App Three] level3
*/
```


## API

### `new ConCol(appName, color, levelShow)`

Creates a new logger instance.

* `appName` (string): the application/namespace name (optional)
* `color` (string): base text color: black, red, green, yellow, blue, magenta, cyan, white, gray (default: white)
* `levelShow` (number): the maximum log level to output, so 0 is silent/important only (default: Infinity - shows everything)

The following methods are available.


### `log(msg, level)`

Outputs `console.log()` messages.

* `msg` (undefined|string|Array): the message (optional)
* `level` (string|Array): message logging level (default 0)

The `msg` can be any of:

* a string
* a string with carriage returns (outputs to separate lines)
* a `[name, value, unit]` array, e.g. `['errors', 0, ' found']`
* an array containing strings or `[name, value, unit]` arrays


### `info(msg, level)`

Outputs `console.info()` messages. Parameters are identical to [`log()`](#logmsg-level).


### `warn(msg, level)`

Outputs `console.warn()` messages prefixed with "WARN:". Parameters are identical to [`log()`](#logmsg-level).


### `error(msg, level)`

Outputs `console.error()` messages prefixed with "ERROR:". Parameters are identical to [`log()`](#logmsg-level).
