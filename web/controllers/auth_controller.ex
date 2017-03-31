defmodule Icta.AuthController do
  use Icta.Web, :controller

  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  def callback(conn, %{"provider" => provider, "code" => code}) do
    client = get_token!(provider, code)
    user = get_user!(provider, client)

    conn
    |> put_session(:current_user, user)
    |> put_session(:access_token, client.token.access_token)
    |> redirect(to: "/")
  end

  defp authorize_url!("google") do
    Google.authorize_url!
  end

  defp authorize_url!(_) do
    raise "Provider not implemented"
  end

  defp get_token!("google", code) do
    Google.get_token!(code: code)
  end

  defp get_token!(_, _) do
    raise "Provider not implemented"
  end

  defp get_user!("google", token) do
    Google.get_user!(token)
  end
end
