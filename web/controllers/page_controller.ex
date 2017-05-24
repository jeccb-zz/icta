defmodule Icta.PageController do
  use Icta.Web, :controller

  alias Icta.User

  def index(conn, _) do
    current_user = get_session(conn, :current_user)
    token = get_session(conn, :user_token)

    db_user = fetch_db_user(current_user)

    if (db_user && current_user.id == db_user.id) do
      conn
      |> assign(:current_user, current_user)
      |> assign(:user_token, token)
      |> render("index.html")
    else
      redirect conn, to: auth_path(conn, :index, "google")
    end
  end

  def fetch_db_user(current_user) do
    if (current_user && current_user.id) do
      case Repo.get_by(User, uid: current_user.uid) do
        nil -> nil
        user -> user
      end
    else
      nil
    end
  end
end
