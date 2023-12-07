import csv
import json
import random

with open('product_info.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = list(csv_reader)

    # Randomize the order of the products
    random.shuffle(data)

    # Convert to JSON
    json_data = json.dumps(data, indent=4)

    # Write JSON to File
    with open('client/public/product_info.json', mode='w') as json_file:
        json_file.write(json_data)

