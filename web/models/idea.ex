defmodule Icta.Idea do
  use Icta.Web, :model

  schema "ideas" do
    field :title, :string
    field :body, :string
    belongs_to :user, Icta.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :body, :user_id])
    |> validate_required([:title, :user_id])
  end

  def all_with_votes do
    Icta.Repo.all vote_count_query()
  end

  def one_with_votes(idea_id) do
    [idea | _] = Icta.Repo.all from i in vote_count_query(),
                          where: i.id == ^idea_id
    idea
  end

  defp vote_count_query do
    from i in Icta.Idea,
      left_join: v_up in Icta.Vote, on: i.id == v_up.idea_id and v_up.vote == true,
      left_join: v_down in Icta.Vote, on: i.id == v_down.idea_id and v_down.vote == false,
      select: %{id: i.id, title: i.title, body: i.body,
        up: count(v_up.id, :distinct), down: count(v_down.id, :distinct)},
      group_by: [i.id, i.title, i.body]
  end

end
