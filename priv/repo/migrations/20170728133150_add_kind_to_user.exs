defmodule Icta.Repo.Migrations.AddKindToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :kind, :string, default: "user", null: false
    end
  end
end
