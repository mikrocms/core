const { Op } = require('sequelize');

/**
 * Generate where queries supported with sequelize operator.
 *
 * @param   object
 * @return  object
 */
function where(queries) {
  const w = {};

  for (var op in queries) {
    if (Op[op]) {
      if (Array.isArray(queries[op]) || queries[op] instanceof Object) {
        w[Op[op]] = where(queries[op]);
      } else {
        w[Op[op]] = queries[op];
      }
    } else {
      w[op] = where(queries[op]);
    }
  }

  return w;
}

module.exports = {
  where
};
