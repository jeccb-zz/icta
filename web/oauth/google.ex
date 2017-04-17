defmodule Google do
  use OAuth2.Strategy

  def client do
    OAuth2.Client.new([
      strategy: __MODULE__,
      client_id: Application.get_env(:icta, :google)[:client_id],
      client_secret: Application.get_env(:icta, :google)[:client_secret],
      redirect_uri: Application.get_env(:icta, :google)[:redirect_uri],
      site: "https://accounts.google.com",
      authorize_url: "https://accounts.google.com/o/oauth2/auth",
      token_url: "https://accounts.google.com/o/oauth2/token"
    ])
  end

  def authorize_url! do
    OAuth2.Client.authorize_url!(client(), scope: "profile", hd: Application.get_env(:icta, :google)[:allowed_domain])
  end

  def get_token!(params \\ [], headers \\ [], opts \\ []) do
    OAuth2.Client.get_token!(client(), params, headers, opts)
  end

  def get_user!(client) do
    user_url = "https://www.googleapis.com/plus/v1/people/me?key=#{Application.get_env(:icta, :google)[:api_key]}"
    OAuth2.Client.get!(client, user_url).body
  end

  # strategy callbacks

  def authorize_url(client, params) do
    OAuth2.Strategy.AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    client
    |> put_param(:client_secret, client.client_secret)
    |> put_header("Accept", "application/json")
    |> OAuth2.Strategy.AuthCode.get_token(params, headers)
  end
end


