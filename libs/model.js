const { literal, Op } = require('sequelize');

/**
 * Generate attributes selected supported with sequelize literal.
 *
 * @param   object
 * @return  object
 */
function attributes(selected) {
  let result;

  if (selected.include || selected.exclude) {
    result = {};

    for (var s in selected) {
      result[s] = attributes(selected[s]);
    }
  } else {
    result = [];

    for (var s in selected) {
      if (selected[s] === null) {
        result.push(s);
      } else {
        result.push([literal(selected[s]), s]);
      }
    }
  }

  return result;
}

/**
 * Generate where queries supported with sequelize literal and operator.
 *
 * @param   object
 * @param   object
 * @return  object
 */
function where(queries, result = {}) {
  if (queries.literal) {
    result = literal(queries.literal);
  } else {
    for (var q in queries) {
      if (Op[q]) {
        if (Array.isArray(queries[q])) {
          result[Op[q]] = where(queries[q], []);
        } else if (queries[q] instanceof Object) {
          result[Op[q]] = where(queries[q], {});
        } else {
          result[Op[q]] = queries[q];
        }
      } else if (queries[q] instanceof Object && queries[q] !== null) {
        result[q] = where(queries[q]);
      } else {
        result[q] = queries[q];
      }
    }
  }

  return result;
}

module.exports = {
  attributes,
  where
};
