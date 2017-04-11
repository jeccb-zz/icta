FROM elixir:1.4

COPY . /icta
WORKDIR /icta

RUN yes | MIX_ENV=prod mix deps.get && yes | MIX_ENV=prod mix compile
CMD mix run
