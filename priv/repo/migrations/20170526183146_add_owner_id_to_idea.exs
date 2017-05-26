defmodule Icta.Repo.Migrations.AddOwnerIdToIdea do
  use Ecto.Migration

  def change do
    alter table(:ideas) do
      add :owner_id, references(:users, on_delete: :nothing)
    end
  end
end
