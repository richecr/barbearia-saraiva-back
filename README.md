# Barbearia Saraiva

### Docker - Iniciar o Postgres:

```sh
$ docker run --name barbearia_saraiva -e POSTGRES_PASSWORD=barbearia_saraiva_dev -p 5432:5432 -d postgres
```

#### Acessa pelo [postbird](https://www.electronjs.org/apps/postbird):

-   username: postgres
-   password: barbearia_saraiva_dev

E por fim crie uma database para ser usada. Com o nome por exemplo de: `barbearia_saraiva`

### Criar migrations:

```sh
$ yarn sequelize migration:create --name=create-users
```

### Comandos para migrate:

```sh
$ yarn migrate
```

Esse comando irá rodar todas as migrates.

### Comando para desfazer migrate:

```sh
$ yarn migrate:undo
```

O comando acima desfaz a última migrate feita. Para desfazer todas as migrates:

```sh
$ yarn migrate:undo:all
```

### Criando uma seed:

```sh
$ yarn sequelize seed:generate --name add-user-admin
```