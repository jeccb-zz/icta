# Icta

Icta is an idea repository. The idea behind it is quite simple: To have a central place where everybody can add ideas and vote on them.

## Development

### Dependencies

 * Elixir 1.4.2
 * Node 7.3.0
 * npm 3.10.10
 * Postgres 9.6.1

### Running the app

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate` (make sure you have psql installed and configured, check `config/dev.exs`)
  * Run `npm install`
  * Install webpack with `npm install -g webpack` (Make sure you can run webpack on the console)
  * Configurate your google api credentials (check further down on the readme)
  * Run webpack using `webpack --watch --color`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### Configuring Google

1. Go to https://console.developers.google.com/
2. Create a new project
3. Go to the "Credentials" section and configure bot the OAuth client ID and yout API Key
4. Enable the "Google API" on the "Dashboard" section
5. Set the following environment vars with your keys:

```
    ICTA_GOOGLE_CLIENT_ID
    ICTA_GOOGLE_CLIENT_SECRET
    ICTA_GOOGLE_API_KEY
```

### Tests

run `mix tests` :)

### Contributing

Check [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
 
Icta is available under the [MIT](LICENSE.md) license.
