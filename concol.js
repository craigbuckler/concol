/** Color console logging class */
import { styleText } from 'node:util';

export class ConCol {

  static #appNameLen = 0;
  static #namePad = 34;
  static #valuePad = 10;
  static #numFormat = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });
  static #timeFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });

  #app = 'ConCol';
  #color = 'white';
  #levelShow = Infinity;

  /**
   * Create a new ConCol instance
   * @param {string} appName - the application name
   * @param {string} color - the base text color: black, red, green, yellow, blue, magenta, cyan, white, gray
   * @param {number} levelShow - the maximum log level to output (0 is silent/important only)
   */
  constructor(appName, color, levelShow) {

    // app name
    this.#app = (appName || '').trim();

    const aL = this.#app.length;
    if (aL > ConCol.#appNameLen) ConCol.#appNameLen = aL;

    // app base color
    this.#color = color || this.#color;

    // app show level
    this.#levelShow = levelShow || this.#levelShow;

  }


  /**
   * Outputs log message
   * @param {string|Array} msg - 'string', 'str\nstr\n...', ['str','str',...], ['name',value,'unit'], [ str, ['name',value,'unit'],... ]
   * @param {Number} level - message log level
   */
  log(msg, level) {
    this.#output('log', msg, level);
  }


  /**
   * Outputs info message
   * @param {string|Array} msg - 'string', 'str\nstr\n...', ['str','str',...], ['name',value,'unit'], [ str, ['name',value,'unit'],... ]
   * @param {Number} level - message log level
   */
  info(msg, level) {
    this.#output('info', msg, level);
  }


  /**
   * Outputs warning message
   * @param {string|Array} msg - 'string', 'str\nstr\n...', ['str','str',...], ['name',value,'unit'], [ str, ['name',value,'unit'],... ]
   * @param {Number} level - message log level
   */
  warn(msg, level) {
    this.#output('warn', msg, level, ' WARN: ', 'yellowBright');
  }


  /**
   * Outputs error message
   * @param {string|Array} msg - 'string', 'str\nstr\n...', ['str','str',...], ['name',value,'unit'], [ str, ['name',value,'unit'],... ]
   * @param {Number} level - message log level
   */
  error(msg, level) {
    this.#output('error', msg, level, 'ERROR: ', 'redBright');
  }


  /**
   * Outputs message to the console
   * @private
   * @param {string} method - console method (log, info, warn, error)
   * @param {string|Array} msg - message
   * @param {Number} level - log level
   * @param {string} typeMsg - type of message (prefixed to message)
   * @param {string} typeColor - color of message type
   */
  #output(method = 'log', msg = '', level = 0, typeMsg, typeColor) {

    if (level > this.#levelShow) return;

    msg = this.#parseLog(msg, this.#color, typeMsg, typeColor);
    const pre = this.#appPrefix();

    msg.forEach(m => {
      console[method]( pre + m );
    });

  }


  /**
   * Returns log prefix of time and app name
   * @private
   * @returns {string}
   */
  #appPrefix() {

    return (
      styleText( 'grey', ConCol.#timeFormat.format(new Date()) ) +
      styleText( ['dim', this.#color], ` [${ this.#app.padEnd( ConCol.#appNameLen, ' ') }] `)
    );
  }


  /**
   * Returns array of formatted strings to output
   * @private
   * @param {string|Array} msg - string with carriage returns or array of strings or [name, value, unit] arrays
   * @param {string} color - app color
   * @param {string} typeMsg - type of message (prefixed to message)
   * @param {string} typeColor - color of message type
   * @returns {Array} [{string}]
   */
  #parseLog(msg, color, typeMsg = '', typeColor = 'white') {

    // split string into array
    if (typeof msg === 'string') {
      msg = msg.split('\n');
    }

    // single name/value/unit?
    if ((msg.length === 2 || msg.length === 3) && !isNaN(msg[1])) {
      msg = [msg];
    }

    // parse array
    msg = msg.map(m => {

      let ret = '';

      if (Array.isArray(m)) {

        // name/value/unit array
        const name = m[0] || '', unit = m[2] || '';
        let val = m[1];

        if (isNaN(val)) {
          val = val || '';
        }
        else {
          val = ConCol.#numFormat.format( parseFloat(val) );
        }

        ret = [
          styleText(color, name.padStart(ConCol.#namePad - typeMsg.length, ' ') + ':') +
          styleText('white', val.padStart(ConCol.#valuePad, ' ') + unit)
        ];
      }
      else {

        // basic string
        ret = String( m ).split('\n').map(s => styleText(color, s));

      }
      return ret.map(r => (typeMsg ? styleText(typeColor, typeMsg) : '' ) + r);

    });

    return msg.flat();

  }

};
