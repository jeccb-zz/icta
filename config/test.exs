use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :icta, Icta.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :icta, Icta.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "icta_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
