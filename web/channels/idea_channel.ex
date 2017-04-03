defmodule Icta.IdeaChannel do
  use Icta.Web, :channel

  alias Icta.Repo
  alias Icta.Idea

  def join("ideas", _params, socket) do
    ideas = Repo.all(from i in Idea)
            |> Enum.map(&(Map.take(&1, [:id, :title])))

    {:ok, %{ ideas: ideas }, socket }
  end

  def handle_in("new:idea", params, socket) do
    result = %Idea{}
    |> Icta.Idea.changeset(params)
    |> Repo.insert

    case result do
      {:ok, idea} ->
        broadcast! socket, "new:idea", %{
          id: idea.id,
          title: idea.title
        }
      {:error, error} ->
        IO.puts("ERROR! #{inspect error}")
    end

    {:noreply, socket}
  end
end
