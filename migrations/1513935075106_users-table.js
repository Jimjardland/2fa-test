exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  pgm.createTable('users', {
    id: {type: 'uuid', default: pgm.func('uuid_generate_v4()'), primaryKey: true, notNull: true},
    username: { type: 'text', notNull: true },
    password: { type: 'text', notNull: true },
    salt: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}