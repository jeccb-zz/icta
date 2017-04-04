defmodule Icta.PageController do
  use Icta.Web, :controller

  def index(conn, _) do
    current_user = get_session(conn, :current_user)
    token = get_session(conn, :user_token)

    if (current_user) do
      conn
      |> assign(:current_user, current_user)
      |> assign(:user_token, token)
      |> render "index.html"
    else
      redirect conn, to: auth_path(conn, :index, "google")
    end
  end
end
