# salon
An anonymous collaborative writing web app

## ok quick n dirty:

this shit runs on docker-compose so strap in bucko.
* do yourself a good ol' `docker-compose build`
* then get that `docker-compose up` goin'
* we need to generate hashes to populate the database with some lorem ipsum:
  * run `docker ps`, then copy the server hash and run `docker exec -i -t <HASH_GOES_HERE> sh` to get a container shell.
  * run `node hash` in the shell to generate ten hashes for the database.
  * type `exit` to leave, forever.
  
* now copy one of the hashes from the list that prints to the console and go to `http://localhost:3000/<HASH_GOES_HERE>`

you should only have to do this once, unless you run `docker-compose down`, amateur
