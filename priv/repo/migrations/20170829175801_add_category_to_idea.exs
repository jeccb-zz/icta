defmodule Icta.Repo.Migrations.AddCategoryToIdea do
  use Ecto.Migration

  def change do
    alter table(:ideas) do
      add :category, :string, default: "business", null: false
    end
  end
end
