defmodule Icta.User do
  use Icta.Web, :model

  schema "users" do
    field :uid, :string
    field :name, :string
    has_many :votes, Icta.Vote
    has_many :ideas, Icta.Idea

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:uid, :name])
    |> validate_required([:uid, :name])
  end

  def changeset_from_google(struct, body) do
    changeset(struct, %{
      uid: body["id"],
      name: Enum.join([body["name"]["givenName"], body["name"]["familyName"]], " ")
    })
  end
end
