defmodule Icta.PageController do
  use Icta.Web, :controller

  def index(conn, _) do
    current_user = get_session(conn, :current_user)

    if (current_user) do
      conn
      |> assign(:current_user, current_user)
      |> render "index.html"
    else
      redirect conn, to: auth_path(conn, :index, "google")
    end
  end
end
