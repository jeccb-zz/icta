defmodule Icta.IdeaChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea
  alias Icta.Vote

  def join("ideas", _params, socket) do
    query = from i in Idea,
      left_join: v_up in Vote, on: i.id == v_up.idea_id and v_up.vote == true,
      left_join: v_down in Vote, on: i.id == v_down.idea_id and v_down.vote == false,
      select: %{id: i.id, title: i.title, body: i.body,
                up: count(v_up.id, :distinct), down: count(v_down.id, :distinct)},
      group_by: [i.id, i.title, i.body]

    ideas = Repo.all(query)

    IO.puts inspect ideas

    {:ok, %{ ideas: ideas }, socket }
  end

  def handle_in("new:idea", params, socket) do
    result = %Idea{}
             |> Idea.changeset(params)
             |> Repo.insert

    case result do
      {:ok, idea} ->
        broadcast! socket, "new:idea", %{
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
    result = %Vote{}
             |> Vote.changeset(params)
             |> Repo.insert

    case result do
      {:ok, vote} ->
        query = from i in Idea, where: i.id == ^vote.idea_id,
          left_join: v_up in Vote, on: i.id == v_up.idea_id and v_up.vote == true,
          left_join: v_down in Vote, on: i.id == v_down.idea_id and v_down.vote == false,
          select: %{id: i.id, title: i.title, body: i.body,
                    up: count(v_up.id, :distinct), down: count(v_down.id, :distinct)},
          group_by: [i.id, i.title, i.body]

        [idea | _] = Repo.all(query)

        broadcast! socket, "new:vote", idea
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
    end

    {:noreply, socket}
  end
end
