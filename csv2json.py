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
    # Write all products to JSON File
    with open('client/public/product_info.json', mode='w') as json_file:
        json_file.write(json_data)

    ## Write surf products to JSON File
    # Filter products with style 'surf'
    surf_data = [product for product in data if product['style'] == 'surf']
    # Convert surf_data to JSON
    json_data_surf = json.dumps(surf_data, indent=4)
    with open('client/public/product_info_surf.json', mode='w') as json_file_surf:
        json_file_surf.write(json_data_surf)
    
    ## Write city products to JSON File
    # Filter products with style 'city'
    city_data = [product for product in data if product['style'] == 'city']
    # Convert city_data to JSON
    json_data_city = json.dumps(city_data, indent=4)
    with open('client/public/product_info_city.json', mode='w') as json_file_city:
        json_file_city.write(json_data_city)

    ## Write tops products to JSON File
    # Filter products with category 'tops'
    tops_data = [product for product in data if product['category'] == 'tops']
    # Convert tops_data to JSON
    json_data_tops = json.dumps(tops_data, indent=4)
    with open('client/public/product_info_tops.json', mode='w') as json_file_tops:
        json_file_tops.write(json_data_tops)

    ## Write bottoms products to JSON File
    # Filter products with category 'bottoms'
    bottoms_data = [product for product in data if product['category'] == 'bottoms']
    # Convert bottoms_data to JSON
    json_data_bottoms = json.dumps(bottoms_data, indent=4)
    with open('client/public/product_info_bottoms.json', mode='w') as json_file_bottoms:
        json_file_bottoms.write(json_data_bottoms)

    ## Write shorts products to JSON File
    # Filter products with category 'shorts'
    shorts_data = [product for product in data if product['category'] == 'shorts']
    # Convert shorts_data to JSON
    json_data_shorts = json.dumps(shorts_data, indent=4)
    with open('client/public/product_info_shorts.json', mode='w') as json_file_shorts:
        json_file_shorts.write(json_data_shorts)

    ## Write shoes products to JSON File
    # Filter products with category 'shoes'
    shoes_data = [product for product in data if product['category'] == 'shoes']
    # Convert shoes_data to JSON
    json_data_shoes = json.dumps(shoes_data, indent=4)
    with open('client/public/product_info_shoes.json', mode='w') as json_file_shoes:
        json_file_shoes.write(json_data_shoes)

    ## Write accessories products to JSON File
    # Filter products with category 'accessories'
    accessories_data = [product for product in data if product['category'] == 'accessories']
    # Convert accessories_data to JSON
    json_data_accessories = json.dumps(accessories_data, indent=4)
    with open('client/public/product_info_accessories.json', mode='w') as json_file_accessories:
        json_file_accessories.write(json_data_accessories)

