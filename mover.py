#shutil.move(r'book.pdf', r'D:\Books')
import shutil
import os
import os.path
crops = [
    "blackberry",
    "blueberry",
    "candleberry",
    "raspberry",
    "strawberry",
    "cactusfruit",
    "asparagus",
    "barley",
    "oats",
    "rye",
    "corn",
    "bambooshoot",
    "cantaloupe",
    "cucumber",
    "wintersquash",
    "zucchini",
    "beet",
    "onion",
    "parsnip",
    "peanut",
    "radish",
    "rutabaga",
    "sweetpotato",
    "turnip",
    "rhubarb",
    "celery",
    "garlic",
    "ginger",
    "spiceleaf",
    "tealeaf",
    "coffeebean",
    "mustardseeds",
    "broccoli",
    "cauliflower",
    "leek",
    "lettuce",
    "scallion",
    "artichoke",
    "brusselsprout",
    "cabbage",
    "spinach",
    "whitemushroom",
    "bean",
    "soybean",
    "bellpepper",
    "chilipepper",
    "eggplant",
    "okra",
    "peas",
    "tomato",
    "cotton",
    "pineapple",
    "grape",
    "kiwi",
    "cranberry",
    "rice",
    "seaweed",
    "curryleaf",
    "sesameseeds",
    "waterchestnut",
    "gigapickle",
    "kale",
    "agave",
    "amaranth",
    "arrowroot",
    "cassava",
    "chickpea",
    "elderberry",
    "flax",
    "greengrape",
    "huckleberry",
    "jicama",
    "jute",
    "kenaf",
    "kohlrabi",
    "lentil",
    "millet",
    "mulberry",
    "quinoa",
    "sisal",
    "taro",
    "tomatillo",
    "juniperberry"
]

print("Before moving file:")

for name in crops:
    #shutil.move()
    source = 'C:/Users/Николай/Desktop/EGE/items/' + name +'seeditem.png'
    destination = 'C:/Users/Николай/Desktop/seeds/' + name +'seed_0.png'
    if os.path.exists(source) :
        print("from "+source)
        dest = shutil.move(source, destination)
        print("to " + destination)
    else :
        print("file " + source + " does not exist")

input("fin")