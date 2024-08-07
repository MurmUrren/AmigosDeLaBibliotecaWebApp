import csv

# Definimos los géneros y sus IDs
genre_to_id = {
    "Antropología": 8,
    "Arqueología": 9,
    "Arte y manualidades": 10,
    "Artes": 11,
    "Astronomía": 12,
    "Bilingüe": 13,
    "Biografía": 14,
    "Botánica": 15,
    "Chispas lectoras": 16,
    "Chistes y trabalenguas": 17,
    "Ciencia": 18,
    "Ciencia ficción": 19,
    "Ciencias sociales": 20,
    "Clásicos": 21,
    "Clásicos para niños": 22,
    "Consulta": 23,
    "Cosas y lugares": 24,
    "Crónica": 25,
    "Cuentos": 26,
    "Cuerpo humano": 27,
    "Cuidado de los hijos": 28,
    "Culturas": 29,
    "Cómo hacer": 30,
    "Danza": 31,
    "De libro a película": 32,
    "Deportes": 33,
    "Diario": 34,
    "Dibujo": 35,
    "Diccionarios y enciclopedias": 36,
    "Dinosaurios": 37,
    "Diversidad": 38,
    "Disney": 39,
    "Drama": 40,
    "Ecología": 41,
    "Economía": 42,
    "Educación": 43,
    "Educación de los hijos": 44,
    "Enciclopedias": 45,
    "Ensayo": 46,
    "Escritura": 47,
    "Espiritualidad": 48,
    "Experimentos": 49,
    "Filosofía": 50,
    "Futbol": 51,
    "Fábulas": 52,
    "Grandes lectores": 53,
    "Hadas": 54,
    "Historia": 55,
    "Informativos": 56,
    "Jardinería": 57,
    "Juegos tradicionales": 58,
    "Juegos y adivinanzas": 59,
    "Jóvenes lectores": 60,
    "Lectores juveniles": 61,
    "Lectores medianas": 62,
    "Lectores medianos": 63,
    "Libros ilustrados": 64,
    "Literatura": 65,
    "Literatura clásica": 66,
    "Mascotas": 67,
    "Matemáticas": 68,
    "Medicina": 69,
    "Misterio": 70,
    "Mitología": 71,
    "Mitos y leyendas": 72,
    "Mujeres": 73,
    "Musica": 74,
    "Naturaleza": 75,
    "Novela": 76,
    "Novela gráfica": 77,
    "Pequeños lectores": 78,
    "Planetas": 79,
    "Adicciones": 1,
    "Adivinanzas": 2,
    "Adopción": 3,
    "Ajedrez": 4,
    "Algarabía": 5,
    "Algarabía niños": 6,
    "Animales": 7,
    "Plantas": 80,
    "Poesía": 81,
    "Poesía infantil": 82,
    "Prehispánico": 83,
    "Recetas": 84,
    "Relaciones": 85,
    "Religión": 86,
    "Revista": 87,
    "Revista niños": 88,
    "Salud": 89,
    "SuperHeroes": 90,
    "Teatro": 91,
    "Terror": 92,
    "Thriller": 92
}

# Leer el archivo CSV de entrada
with open('src/data/csv/library_crudo.csv', 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    book_genres = []
    books_without_genre = []

    id = 0
    # Procesar cada fila del archivo de entrada
    for row in reader:
        id += 1
        book_id = id
        tags = row['tags'].split(',')
        genres_found = False
        
        # Crear una fila en el nuevo archivo para cada etiqueta
        for tag in tags:
            tag = tag.strip()  # Eliminar espacios en blanco
            tag = tag.capitalize()
            if tag in genre_to_id:
                genre_id = genre_to_id[tag]
                book_genres.append({'Book_Id': book_id, 'Genre_Id': genre_id})
                genres_found = True
        
        if not genres_found:
            books_without_genre.append({'Book_Id': book_id, 'Tags': ', '.join(tags)})

# Escribir el nuevo archivo CSV de salida con géneros
with open('book_genres.csv', 'w', newline='', encoding='utf-8') as outfile:
    fieldnames = ['Book_Id', 'Genre_Id']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerows(book_genres)

print("Archivo CSV 'book_genres.csv' generado con éxito.")

# Escribir el archivo CSV de salida con libros sin género
with open('books_without_genre.csv', 'w', newline='', encoding='utf-8') as outfile:
    fieldnames = ['Book_Id', 'Tags']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerows(books_without_genre)

print("Archivo CSV 'books_without_genre.csv' generado con éxito.")