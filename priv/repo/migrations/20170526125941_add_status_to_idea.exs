defmodule Icta.Repo.Migrations.AddStatusToIdea do
  use Ecto.Migration

  def change do
    alter table(:ideas) do
      add :status, :string, default: "new", null: false
    end
  end
end
