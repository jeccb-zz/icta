defmodule Icta.UserChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea
  alias Icta.Comment
  alias Icta.Vote
  alias Icta.User

  intercept ["updated"]

  def join("user", _params, socket) do
    {:ok, %{ }, socket }
  end

  def handle_in("get", _, socket) do
    {:reply, {:ok, %{ user: %{
      name: socket.assigns[:current_user].name,
      id: socket.assigns[:current_user].id,
      image_url: socket.assigns[:current_user].image_url,
      kind: socket.assigns[:current_user].kind
    }}}, socket}
  end

  def handle_in("get_all", _, socket) do
    users = Repo.all(from usr in User,
                     select: %{id: usr.id, name: usr.name, image_url: usr.image_url, kind: usr.kind},
                     order_by: usr.name)
    {:reply, { :ok, %{ users: users } }, socket }
  end

  def handle_in("set_kind", params, socket) do
    authorize_admin!(socket)

    case User.update_kind(params["user_id"], params["kind"]) do
      {:ok, user} ->
        broadcast! socket, "updated", %{id: user.id, name: user.name, image_url: user.image_url, kind: user.kind}
        {:reply, :ok, socket}
      {:error, error} ->
        {:reply, {:error, error}, socket}
    end
  rescue
    e -> {:reply, {:error, %{error: e}}, socket}
  end

  def handle_out("updated", msg, socket) do
    # The kind must be fetched from the DB since the user may be the updated user
    user = Icta.Repo.get!(Icta.User, socket.assigns[:current_user].id)

    if (user.id == msg.id) do
      assign(socket, :current_user, user)
    end

    if user.kind == "admin" or user.id == msg.id do
      push socket, "updated", msg
    end

    {:noreply, socket}
  end

  defp authorize_admin!(socket) do
    # Reload the user to see if it has changed in the db
    user = Repo.get!(User, socket.assigns[:current_user].id)
    if user.kind != "admin", do: raise "unauthorized"
  end
end
