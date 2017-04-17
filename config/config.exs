# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :icta,
  ecto_repos: [Icta.Repo],
  google: %{
    client_id: System.get_env("ICTA_GOOGLE_CLIENT_ID"),
    client_secret: System.get_env("ICTA_GOOGLE_CLIENT_SECRET"),
    api_key: System.get_env("ICTA_GOOGLE_API_KEY"),
    redirect_uri: (System.get_env("ICTA_GOOGLE_REDIRECT_URI") || "http://localhost:4000/auth/google/callback"),
    allowed_domain: System.get_env("ICTA_GOOGLE_ALLOWED_DOMAIN")
  }

# Configures the endpoint
config :icta, Icta.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "EEy7LrppCcmLjo6hXSmyAvzD4dREiXRwRttDJvbuR3eiQ6thlWrMAqz99QgQAee/",
  render_errors: [view: Icta.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Icta.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
