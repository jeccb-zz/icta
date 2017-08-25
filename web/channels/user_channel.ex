defmodule Icta.UserChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea
  alias Icta.Comment
  alias Icta.Vote
  alias Icta.User

  def join("user", _params, socket) do
    {:ok, %{ }, socket }
  end

  def handle_in("get", _, socket) do
    {:reply, {:ok, %{ user: %{
      name: socket.assigns[:current_user].name,
      id: socket.assigns[:current_user].id,
      image_url: socket.assigns[:current_user].image_url
    }}}, socket}
  end

  def handle_in("get_all", _, socket) do
    users = Repo.all(from usr in User,
                     select: %{id: usr.id, name: usr.name, image_url: usr.image_url},
                     order_by: usr.name)
    {:reply, { :ok, %{ users: users } }, socket }
  end
end
