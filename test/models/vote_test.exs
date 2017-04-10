defmodule Icta.VoteTest do
  use Icta.ModelCase

  alias Icta.Vote

  @valid_attrs %{vote: true, user_id: 1, idea_id: 3}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Vote.changeset(%Vote{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Vote.changeset(%Vote{}, @invalid_attrs)
    refute changeset.valid?
  end
end
