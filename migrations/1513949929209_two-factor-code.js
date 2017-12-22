exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  pgm.createTable('one_time_passwords', {
    id: {type: 'uuid', default: pgm.func('uuid_generate_v4()'), primaryKey: true, notNull: true},
    username: { type: 'text', notNull: true },
    code: { type: 'text', notNull: true },
    valid_until: { type: 'timestamp', notNull: true }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('one_time_passwords')
}