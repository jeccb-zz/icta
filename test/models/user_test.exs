defmodule Icta.UserTest do
  use Icta.ModelCase

  alias Icta.User

  @valid_attrs %{name: "some content", uid: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test '#changeset_from_google should gen the changeset attributes' do
    changeset = User.changeset_from_google(%User{}, %{
      "id" => "12312312312",
      "name" => %{
        "givenName" => "Jota",
        "familyName" => "Polenta Frita"
      }
    })

    assert changeset.changes.uid == "12312312312"
    assert changeset.changes.name == "Jota Polenta Frita"
  end
end
