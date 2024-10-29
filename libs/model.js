const { Op } = require('sequelize');

/**
 * Generate where queries supported with sequelize operator.
 *
 * @param   object
 * @param   object
 * @return  object
 */
function where(queries, result = {}) {
  for (var op in queries) {
    if (Op[op]) {
      if (Array.isArray(queries[op])) {
        result[Op[op]] = where(queries[op], []);
      } else if (queries[op] instanceof Object) {
        result[Op[op]] = where(queries[op], {});
      } else {
        result[Op[op]] = queries[op];
      }
    } else {
      result[op] = where(queries[op]);
    }
  }

  return result;
}

module.exports = {
  where
};
