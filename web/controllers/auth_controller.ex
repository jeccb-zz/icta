defmodule Icta.AuthController do
  use Icta.Web, :controller

  alias Icta.User
  alias Icta.Repo

  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  def callback(conn, %{"provider" => provider, "code" => code}) do
    client = get_token!(provider, code)
    user_body = get_user!(provider, client)

    IO.puts(inspect user_body)

    result =
      case Repo.get_by(User, uid: user_body["id"]) do
        nil -> %User{}
        user -> user
      end
      |> User.changeset_from_google(user_body)
      |> Repo.insert_or_update

    case result do
      {:ok, struct} ->
        conn
        |> put_session(:current_user, struct)
        |> put_session(:access_token, client.token.access_token)
        |> redirect(to: "/")
      {:error, changeset} ->
        conn
        |> redirect(to: "/error")
    end
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
