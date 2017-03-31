defmodule Icta.IdeaChannel do
  use Icta.Web, :channel

  alias Icta.Repo

  def join("ideas", _params, socket) do
    ideas = Repo.all(from i in Icta.Idea)

    {:ok, %{ ideas: ideas }, socket }
  end

  def handle_in("new:idea", params, socket) do
    {:noreply, socket}
  end
end
