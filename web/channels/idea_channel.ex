defmodule Icta.IdeaChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea
  alias Icta.Vote

  def join("ideas", _params, socket) do
    {:ok, %{ ideas: Idea.all_with_votes(socket.assigns[:current_user]) }, socket }
  end

  def handle_in("new:idea", params, socket) do
    result = socket.assigns[:current_user]
             |> build_assoc(:ideas)
             |> Idea.changeset(params)
             |> Repo.insert

    case result do {:ok, idea} -> broadcast! socket, "new:idea", %{
          id: idea.id,
          title: idea.title,
          body: idea.body,
          up: 0,
          down: 0
        }
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
    end

    {:noreply, socket}
  end

  def handle_in("new:vote", params, socket) do
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
        broadcast! socket, "new:vote", Idea.one_with_votes(vote.idea_id, socket.assigns[:current_user])
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
    end

    {:noreply, socket}
  end
end
