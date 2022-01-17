# Clima Musical
## API que retorna playlists baseada no clima atual
Essa aplicação faz uma consulta a uma API de Tempo e baseado na temperatura de uma determinada cidade ou localização, retorna uma playlist sugerida pela API do Spotify. A verificação funciona da segunte forma:

- Se a temperatura (célsius) estiver acima de 30 graus, sugira faixas para festa
- Caso a temperatura esteja entre 15 e 30 graus, sugira faixas de música pop
- Se estiver um pouco frio (entre 10 e 14 graus), sugira faixas de rock
- Caso contrário, se estiver congelando lá fora, sugere faixas de música clássica

### Configuando a aplicação

É necessário ter instalado o NodeJS.

```bash
# Clone do repositório
$ git clone https://github.com/oraphaeldemelo/ClimaMusical.git

# Acesse a pasta do repositório
$ cd ClimaMusical

# Instale as dependẽncias
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# Após isso, o servidor iniciará na porta 6060 - acesse <http://localhost:6060>
```

### Endpoints disponíveis
Os endpoints disponíveis para a aplicação são um GET e um POST. O GET faz uma busca por algum nome de cidade, enquanto o POST faz consultas pelas coordenadas de latitude e longitude.

É **importante ressaltar**, que é preciso adicionar no header da consulta o *"Content-Type"*, que deve ser *"application/json"*.

#### Busca por Cidade

```bash
# Requisição
 GET http://localhost:6060/weather/<nome-da-cidade>

# Retorno

{
  "data": {
    "temp": "4",
    "type": "classical",
    "tracks": [
      "Piano Book (Deluxe Edition)",
      "Handel Sarabande",
      "Bach: Cello Suites Nos. 1, 5 & 6",
      "Beethoven: Bagatelle No. 25 in A Minor, WoO 59 \"Für Elise\"",
      "Gnossienne No. 1"
    ]
  }
}
```

#### Busca por Coordenadas

```bash
# Requisição
POST http://localhost:6060/weather


# Parâmetros
{
	"latitude": "",
	"longitude": ""
}

# Retorno 

{
  "data": {
    "temp": "10",
    "type": "rock",
    "tracks": [
      "Desabafo - CAØS REIMAGINADØ",
      "Big Bang",
      "Não Vou Me Adaptar (Ao Vivo)",
      "Los Hermanos 2019 (Ao Vivo)",
      "Simplesmente"
    ]
  }
}
```