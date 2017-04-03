defmodule Icta.Vote do
  use Icta.Web, :model

  schema "votes" do
    field :vote, :boolean, default: false
    belongs_to :user, Icta.User
    belongs_to :idea, Icta.Idea

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:vote, :idea_id])
    |> validate_required([:vote, :idea_id])
  end
end
