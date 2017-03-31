defmodule Icta.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :uid, :string
      add :name, :string

      timestamps()
    end

  end
end
