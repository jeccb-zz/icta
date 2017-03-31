defmodule Icta.Repo.Migrations.CreateIdea do
  use Ecto.Migration

  def change do
    create table(:ideas) do
      add :title, :string
      add :body, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:ideas, [:user_id])

  end
end
