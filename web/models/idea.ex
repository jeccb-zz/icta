defmodule Icta.Idea do
  use Icta.Web, :model

  schema "ideas" do
    field :title, :string
    field :body, :string
    belongs_to :user, Icta.User
    has_many :comments, Icta.Comment

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

  def all_with_votes(user) do
    Icta.Repo.all vote_count_query(user)
  end

  def one_with_votes(idea_id, user) do
    [idea | _] = Icta.Repo.all from i in vote_count_query(user),
                          where: i.id == ^idea_id
    idea
  end

  defp vote_count_query(user) do
    from i in Icta.Idea,
      left_join: v_up in Icta.Vote, on: i.id == v_up.idea_id and v_up.vote == true,
      left_join: v_down in Icta.Vote, on: i.id == v_down.idea_id and v_down.vote == false,
      left_join: my_vote in Icta.Vote, on: i.id == my_vote.idea_id and my_vote.user_id == ^user.id,
      left_join: comments in Icta.Comment, on: i.id == comments.idea_id,
      inner_join: user in Icta.User, on: i.user_id == user.id,
      select: %{id: i.id, title: i.title, body: i.body, author: %{ name: user.name, id: user.id,
        image_url: user.image_url }, up: count(v_up.id, :distinct), down: count(v_down.id, :distinct),
        my_vote: my_vote.vote, comments_count: count(comments.id, :distinct)},
      group_by: [i.id, i.title, i.body, user.name, user.id, my_vote.vote]
  end

end
