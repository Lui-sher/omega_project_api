 - Proyecto API REST Data base

   Alojado en la direccion web  https://proyectomega-production.up.railway.app

   	<h1>Omega Project Home Page Data Base API Rest</h1>
	<a href="/about">About Page</a>
	<h3>GET Requests</h3>

		<ul>
			<li>
				<p>
					Para hacer una peticion GET que nos permita obtener los datos de un pokemon especifico,
					lo haremos usando la siguente URL y el numero de pokedex o nombre del pokemon al final de esta.
				</p>
				<h4>Ejemplos:</h4>
				<a id='get_one_pokemon_number' href="javascript: window.open(url('get_one_pokemon/400'));"></a>
				<p><a id='get_one_pokemon_name' href="javascript: window.open(url('get_one_pokemon/pikachu'));"></a></p>
			</li>
		</ul>
		<ul>
			<li>
				<p>
					Si deseamos hacer una peticion GET que nos permita obtener los 20 primeros 
					Pokémon, lo haremos usando la siguiente URL.
				</p>
				<a id='get_several_pokemon' href="javascript: window.open(url('get_several_pokemon'));"></a>
			</li>
		</ul>
		<ul>
			<li>
				<p>
					Pero si lo que buscamos es hacer una peticion GET para obtener una cantidad y un rango
					especifico, lo haremos usando la siguente URL, sustituyendo los valores numericos
					de "amount" que representa la cantidad que deseamos y "start" que representa desde donde 
					iniciaremos.
				</p>
				<h4>Ejemplo:</h4>
				<a id='get_several_pokemon/' href="javascript: window.open(url('get_several_pokemon?amount=10&start=400'));"></a>
			</li>
		</ul>

		<ul>
			<li>
				<p>
					Si necesitamos obtener todos los Pokémon creados por el usuario, lo deberemos hacer usando
					la siguente URL:
				</p>
				<a id='get_all_custom_pokemon' href="javascript: window.open(url('get_all_custom_pokemon'));"></a>
			</li>
		</ul>


	<h3>POST Requests</h3>
	<ul>
		<li>
			<p>
				Para enviar una solitud POST con intencion de crear un nuevo Pokémon, se deberá enviar los datos
				en el 'body' en formato '.json' a la siguiente URL con la estructura acontinuacion, ejemplo:
			</p>
			<a id='post_custom_pokemon' href="javascript: post('post_custom_pokemon');"></a>
			<p>{</p>
			<ol>"name": "gatito",</ol>
			<ol>"image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/18.png",</ol>
			<ol>"hp": 84,</ol>
			<ol>"attack": 100,</ol>
			<ol>"defense": 100,</ol>
			<ol>"specialAttack": 100,</ol>
			<ol>"specialDefense": 100,</ol>
			<ol>"speed": 100,</ol>
			<ol>"height": 100,</ol>
			<ol>"weight": 100,</ol>
			<ol>"types": [ "normal", "water" ]</ol>
			<p>}</p>
		</li>
	</ul>



	<h3>DELETE Requests</h3>
	<ul>
		<li>
			<p>
				Para eliminar algun Pokémon que se halle en la base de datos, ya sea original o 
				creado por algun usuario, lo haremos enviando una solicitud DELETE a la URL a 
				continuacion, colocando al final el ID del Pokémon
			</p>
			<h4>Ejemplo:</h4>
			<a id='delete_by_id' href="javascript: drop('delete_id_db/6934cba4-5444-44e7-95de-2621276040ff');"></a>
	</li>
</ul>

