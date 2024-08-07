import csv

# Leer el archivo CSV de entrada
with open('src/data/csv/library_crudo.csv', 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    unique_tags = set()
    
    # Procesar cada fila del archivo de entrada
    for row in reader:
        tags = row['tags'].split(',')
        
        # Añadir cada etiqueta al conjunto de etiquetas únicas
        for tag in tags:
            tag = tag.strip()  # Eliminar espacios en blanco
            unique_tags.add(tag)

# Escribir el nuevo archivo CSV de salida con las etiquetas únicas
with open('unique_tags.csv', 'w', newline='', encoding='utf-8') as outfile:
    writer = csv.writer(outfile)
    
    # Escribir la cabecera
    writer.writerow(['Tag'])
    
    # Escribir cada etiqueta única en una nueva fila
    for tag in sorted(unique_tags):
        writer.writerow([tag])

print("Archivo CSV 'unique_tags.csv' generado con éxito.")