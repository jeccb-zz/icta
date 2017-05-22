defmodule Icta.IdeaChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea
  alias Icta.Comment
  alias Icta.Vote

  def join("icta", _params, socket) do
    {:ok, %{ }, socket }
  end

  def handle_in("idea:get_all", _, socket) do
    {:reply, {:ok, %{ ideas: Idea.all_with_votes(socket.assigns[:current_user]) }}, socket }
  end

  def handle_in("idea:get", params, socket) do
    {:reply, {:ok, %{
      idea: Idea.one_with_votes(params["idea_id"], socket.assigns[:current_user]) ,
      comments: Comment.all_comments_for_idea(params["idea_id"])
    }}, socket }
  end

  def handle_in("idea:delete", params, socket) do
    idea = Repo.get_by!(Idea, %{
                   user_id: socket.assigns[:current_user].id,
                   id: params["idea_id"] })
    case Repo.delete(idea) do
      {:ok, _}        -> {:reply, {:ok, %{}}, socket }
      {:error, error} -> {:reply, {:error, error}, socket }
    end
  end

  def handle_in("idea:new", params, socket) do
    result = socket.assigns[:current_user]
             |> build_assoc(:ideas)
             |> Idea.changeset(params)
             |> Repo.insert

    case result do
      {:ok, idea} -> broadcast! socket, "idea:new", %{
          id: idea.id,
          title: idea.title,
          body: idea.body,
          author: %{
            id: socket.assigns[:current_user].id,
            name: socket.assigns[:current_user].name,
            image_url: socket.assigns[:current_user].image_url
          },
          up: 0,
          down: 0,
          comments_count: 0
        }
        {:reply, :ok, socket }
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
        {:reply, {:error, error }, socket }
    end
  end

  def handle_in("idea:comment:new", params, socket) do
    result = socket.assigns[:current_user]
             |> build_assoc(:comments)
             |> Comment.changeset(params)
             |> Repo.insert

    case result do
      {:ok, _} -> {:reply, :ok, socket }
      {:error, error} -> {:reply, {:error, error }, socket }
    end
  end

  def handle_in("vote:new", params, socket) do
    result =
      case Repo.one(from vote in Vote,
                    preload: [:user, :idea],
                    where: vote.user_id == ^socket.assigns[:current_user].id and
                           vote.idea_id == ^params["idea_id"]) do
        nil -> socket.assigns[:current_user]
               |> build_assoc(:votes)
        vote -> vote
      end
      |> Vote.changeset(params)
      |> Repo.insert_or_update

    case result do
      {:ok, vote} ->
        broadcast! socket, "vote:new", Idea.one_with_votes(vote.idea_id, socket.assigns[:current_user])
        {:reply, :ok, socket}
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
        {:reply, {:error, error }, socket }
    end

  end

  def handle_in("user:get", _, socket) do
    {:reply, {:ok, %{ user: %{
      name: socket.assigns[:current_user].name,
      id: socket.assigns[:current_user].id,
      image_url: socket.assigns[:current_user].image_url
    }}}, socket}
  end
end
