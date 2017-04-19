defmodule Icta.Comment do
  use Icta.Web, :model

  schema "comments" do
    field :body, :string
    belongs_to :user, Icta.User
    belongs_to :idea, Icta.Idea

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :idea_id])
    |> validate_required([:body, :idea_id])
  end

  def all_comments_for_idea(idea_id) do
    Icta.Repo.all from c in Icta.Comment,
      left_join: user in Icta.User, on: c.user_id == user.id,
      select: %{id: c.id, body: c.body, created_at: c.inserted_at, author: %{ name: user.name }},
      where: c.idea_id == ^idea_id
  end
end
