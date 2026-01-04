
import { WordPair } from './types';

export const GAME_DURATION = 240; // 4 minutes in seconds

export const WORD_LIST: WordPair[] = [
  // Places (50)
  { en: "Airport", fa: "فرودگاه" }, { en: "Hospital", fa: "بیمارستان" }, { en: "Library", fa: "کتابخانه" }, { en: "Police Station", fa: "ایستگاه پلیس" }, { en: "School", fa: "مدرسه" },
  { en: "Museum", fa: "موزه" }, { en: "Bank", fa: "بانک" }, { en: "Restaurant", fa: "رستوران" }, { en: "Cinema", fa: "سینما" }, { en: "Stadium", fa: "استادیوم" },
  { en: "Park", fa: "پارک" }, { en: "Zoo", fa: "باغ وحش" }, { en: "Cemetery", fa: "قبرستان" }, { en: "Church", fa: "کلیسا" }, { en: "Mosque", fa: "مسجد" },
  { en: "Beach", fa: "ساحل" }, { en: "Mountain", fa: "کوه" }, { en: "Forest", fa: "جنگل" }, { en: "Desert", fa: "کویر" }, { en: "Island", fa: "جزیره" },
  { en: "Gym", fa: "باشگاه" }, { en: "Factory", fa: "کارخانه" }, { en: "Farm", fa: "مزرعه" }, { en: "Space Station", fa: "ایستگاه فضایی" }, { en: "Submarine", fa: "زیردریایی" },
  { en: "Castle", fa: "قلعه" }, { en: "Palace", fa: "کاخ" }, { en: "Embassy", fa: "سفارت" }, { en: "Pharmacy", fa: "داروخانه" }, { en: "Bakery", fa: "نانوایی" },
  { en: "Market", fa: "بازار" }, { en: "Theater", fa: "تئاتر" }, { en: "Laboratory", fa: "آزمایشگاه" }, { en: "Post Office", fa: "اداره پست" }, { en: "Hotel", fa: "هتل" },
  { en: "Cafe", fa: "کافه" }, { en: "Casino", fa: "کازینو" }, { en: "Circus", fa: "سیرک" }, { en: "Amusement Park", fa: "شهربازی" }, { en: "Prison", fa: "زندان" },
  { en: "University", fa: "دانشگاه" }, { en: "Office", fa: "دفتر" }, { en: "Shopping Mall", fa: "مرکز خرید" }, { en: "Gas Station", fa: "پمپ بنزین" }, { en: "Supermarket", fa: "سوپرمارکت" },
  { en: "Harbor", fa: "بندر" }, { en: "Volcano", fa: "آتشفشان" }, { en: "Waterfall", fa: "آبشار" }, { en: "Temple", fa: "معبد" }, { en: "Garden", fa: "باغ" },

  // Objects (100)
  { en: "Telephone", fa: "تلفن" }, { en: "Computer", fa: "کامپیوتر" }, { en: "Camera", fa: "دوربین" }, { en: "Watch", fa: "ساعت" }, { en: "Key", fa: "کلید" },
  { en: "Wallet", fa: "کیف پول" }, { en: "Backpack", fa: "کوله پشتی" }, { en: "Umbrella", fa: "چتر" }, { en: "Mirror", fa: "آینه" }, { en: "Lamp", fa: "لامپ" },
  { en: "Bottle", fa: "بطری" }, { en: "Glass", fa: "لیوان" }, { en: "Plate", fa: "بشقاب" }, { en: "Spoon", fa: "قاشق" }, { en: "Fork", fa: "چنگال" },
  { en: "Knife", fa: "چاقو" }, { en: "Hammer", fa: "چکش" }, { en: "Screwdriver", fa: "پیچ گوشتی" }, { en: "Scissors", fa: "قیچی" }, { en: "Ladder", fa: "نردبان" },
  { en: "Candle", fa: "شمع" }, { en: "Flashlight", fa: "چراغ قوه" }, { en: "Compass", fa: "قطب نما" }, { en: "Map", fa: "نقشه" }, { en: "Book", fa: "کتاب" },
  { en: "Notebook", fa: "دفترچه" }, { en: "Pen", fa: "خودکار" }, { en: "Pencil", fa: "مداد" }, { en: "Eraser", fa: "پاک کن" }, { en: "Brush", fa: "برس" },
  { en: "Soap", fa: "صابون" }, { en: "Towel", fa: "حوله" }, { en: "Toothbrush", fa: "مسواک" }, { en: "Comb", fa: "شانه" }, { en: "Perfume", fa: "عطر" },
  { en: "Ring", fa: "انگشتر" }, { en: "Necklace", fa: "گردنبند" }, { en: "Bracelet", fa: "دستبند" }, { en: "Earrings", fa: "گوشواره" }, { en: "Glasses", fa: "عینک" },
  { en: "Cushion", fa: "کوسن" }, { en: "Blanket", fa: "پتو" }, { en: "Pillow", fa: "بالش" }, { en: "Curtain", fa: "پرده" }, { en: "Rug", fa: "فرش" },
  { en: "Vase", fa: "گلدان" }, { en: "Clock", fa: "ساعت دیواری" }, { en: "Radio", fa: "رادیو" }, { en: "Television", fa: "تلویزیون" }, { en: "Guitar", fa: "گیتار" },
  { en: "Piano", fa: "پیانو" }, { en: "Violin", fa: "ویولن" }, { en: "Drums", fa: "طبل" }, { en: "Microphone", fa: "میکروفون" }, { en: "Speaker", fa: "بلندگو" },
  { en: "Battery", fa: "باتری" }, { en: "Charger", fa: "شارژر" }, { en: "Remote", fa: "کنترل" }, { en: "Drone", fa: "پهپاد" }, { en: "Robot", fa: "ربات" },
  { en: "Bicycle", fa: "دوچرخه" }, { en: "Skateboard", fa: "اسکیت بورد" }, { en: "Helmet", fa: "کلاه ایمنی" }, { en: "Ball", fa: "توپ" }, { en: "Racket", fa: "راکت" },
  { en: "Chessboard", fa: "صفحه شطرنج" }, { en: "Cards", fa: "پاسور" }, { en: "Dice", fa: "تاس" }, { en: "Trophy", fa: "جام" }, { en: "Medal", fa: "مدال" },
  { en: "Envelope", fa: "پاکت نامه" }, { en: "Stamp", fa: "تمبر" }, { en: "Coin", fa: "سکه" }, { en: "Bill", fa: "اسکناس" }, { en: "Credit Card", fa: "کارت اعتباری" },
  { en: "Newspaper", fa: "روزنامه" }, { en: "Magazine", fa: "مجله" }, { en: "Poster", fa: "پوستر" }, { en: "Painting", fa: "نقاشی" }, { en: "Sculpture", fa: "مجسمه" },
  { en: "Tent", fa: "چادر" }, { en: "Sleeping Bag", fa: "کیسه خواب" }, { en: "Binoculars", fa: "دوربین دوچشمی" }, { en: "Telescope", fa: "تلسکوپ" }, { en: "Microscope", fa: "میکروسکوپ" },
  { en: "Globe", fa: "کره زمین" }, { en: "Anchor", fa: "لنگر" }, { en: "Compass", fa: "قطب نما" }, { en: "Crate", fa: "صندوق" }, { en: "Barrel", fa: "بشکه" },
  { en: "Ladder", fa: "نردبان" }, { en: "Bucket", fa: "سطل" }, { en: "Rope", fa: "طناب" }, { en: "Hook", fa: "قلاب" }, { en: "Chain", fa: "زنجیر" },
  { en: "Magnet", fa: "آهنربا" }, { en: "Whistle", fa: "سوت" }, { en: "Bell", fa: "زنگ" }, { en: "Lock", fa: "قفل" }, { en: "Safe", fa: "گاوصندوق" },

  // Occupations (50)
  { en: "Doctor", fa: "دکتر" }, { en: "Nurse", fa: "پرستار" }, { en: "Teacher", fa: "معلم" }, { en: "Engineer", fa: "مهندس" }, { en: "Architect", fa: "معمار" },
  { en: "Scientist", fa: "دانشمند" }, { en: "Astronaut", fa: "فضانورد" }, { en: "Pilot", fa: "خلبان" }, { en: "Driver", fa: "راننده" }, { en: "Captain", fa: "کاپیتان" },
  { en: "Police", fa: "پلیس" }, { en: "Firefighter", fa: "آتشنشان" }, { en: "Soldier", fa: "سرباز" }, { en: "Judge", fa: "قاضی" }, { en: "Lawyer", fa: "وکیل" },
  { en: "Chef", fa: "آشپز" }, { en: "Baker", fa: "نانوا" }, { en: "Farmer", fa: "کشاورز" }, { en: "Fisherman", fa: "ماهیگیر" }, { en: "Carpenter", fa: "نجار" },
  { en: "Plumber", fa: "لوله کش" }, { en: "Electrician", fa: "برقکار" }, { en: "Mechanic", fa: "مکانیک" }, { en: "Painter", fa: "نقاش" }, { en: "Photographer", fa: "عکاس" },
  { en: "Journalist", fa: "خبرنگار" }, { en: "Writer", fa: "نویسنده" }, { en: "Poet", fa: "شاعر" }, { en: "Singer", fa: "خواننده" }, { en: "Actor", fa: "بازیگر" },
  { en: "Dancer", fa: "رقصنده" }, { en: "Director", fa: "کارگردان" }, { en: "Coach", fa: "مربی" }, { en: "Athlete", fa: "ورزشکار" }, { en: "Sailor", fa: "ملوان" },
  { en: "Priest", fa: "کشیش" }, { en: "Librarian", fa: "کتابدار" }, { en: "Barber", fa: "آرایشگر" }, { en: "Tailor", fa: "خیاط" }, { en: "Shoemaker", fa: "کفاش" },
  { en: "Dentist", fa: "دندانپزشک" }, { en: "Vet", fa: "دامپزشک" }, { en: "Gardener", fa: "باغبان" }, { en: "Cleaner", fa: "نظافتچی" }, { en: "Guard", fa: "نگهبان" },
  { en: "Messenger", fa: "نامه رسان" }, { en: "Programmer", fa: "برنامه نویس" }, { en: "Designer", fa: "طراح" }, { en: "Waitress", fa: "پیشخدمت" }, { en: "Boutique Owner", fa: "بوتیک دار" },

  // Animals (50)
  { en: "Lion", fa: "شیر" }, { en: "Tiger", fa: "ببر" }, { en: "Elephant", fa: "فیل" }, { en: "Giraffe", fa: "زرافه" }, { en: "Zebra", fa: "گورخر" },
  { en: "Bear", fa: "خرس" }, { en: "Wolf", fa: "گرگ" }, { en: "Fox", fa: "روباه" }, { en: "Monkey", fa: "میمون" }, { en: "Rabbit", fa: "خرگوش" },
  { en: "Deer", fa: "آهو" }, { en: "Horse", fa: "اسب" }, { en: "Cow", fa: "گاو" }, { en: "Sheep", fa: "گوسفند" }, { en: "Goat", fa: "بز" },
  { en: "Pig", fa: "خوک" }, { en: "Cat", fa: "گربه" }, { en: "Dog", fa: "سگ" }, { en: "Mouse", fa: "موش" }, { en: "Bat", fa: "خفاش" },
  { en: "Whale", fa: "نهنگ" }, { en: "Dolphin", fa: "دلفین" }, { en: "Shark", fa: "کوسه" }, { en: "Octopus", fa: "اختاپوس" }, { en: "Crab", fa: "خرچنگ" },
  { en: "Turtle", fa: "لاک پشت" }, { en: "Snake", fa: "مار" }, { en: "Frog", fa: "قورباغه" }, { en: "Crocodile", fa: "تمساح" }, { en: "Lizard", fa: "مارمولک" },
  { en: "Eagle", fa: "عقاب" }, { en: "Owl", fa: "جغد" }, { en: "Parrot", fa: "طوطی" }, { en: "Penguin", fa: "پنگوئن" }, { en: "Duck", fa: "اردک" },
  { en: "Chicken", fa: "مرغ" }, { en: "Spider", fa: "عنکبوت" }, { en: "Bee", fa: "زنبور" }, { en: "Butterfly", fa: "پروانه" }, { en: "Ant", fa: "مورچه" },
  { en: "Mosquito", fa: "پشه" }, { en: "Fly", fa: "مگس" }, { en: "Snail", fa: "حلزون" }, { en: "Worm", fa: "کرم" }, { en: "Camel", fa: "شتر" },
  { en: "Kangaro", fa: "کانگورو" }, { en: "Panda", fa: "پاندا" }, { en: "Koala", fa: "کوالا" }, { en: "Hippopotamus", fa: "اسب آبی" }, { en: "Rhinoceros", fa: "کرگدن" },

  // Food (50)
  { en: "Pizza", fa: "پیتزا" }, { en: "Burger", fa: "همبرگر" }, { en: "Sandwich", fa: "ساندویچ" }, { en: "Pasta", fa: "پاستا" }, { en: "Soup", fa: "سوپ" },
  { en: "Salad", fa: "سالاد" }, { en: "Steak", fa: "استیک" }, { en: "Kebab", fa: "کباب" }, { en: "Sushi", fa: "سوشی" }, { en: "Rice", fa: "برنج" },
  { en: "Bread", fa: "نان" }, { en: "Cheese", fa: "پنیر" }, { en: "Butter", fa: "کره" }, { en: "Milk", fa: "شیر" }, { en: "Yogurt", fa: "ماست" },
  { en: "Egg", fa: "تخم مرغ" }, { en: "Honey", fa: "عسل" }, { en: "Jam", fa: "مربا" }, { en: "Chocolate", fa: "شکلات" }, { en: "Cake", fa: "کیک" },
  { en: "Cookie", fa: "کلوچه" }, { en: "Ice Cream", fa: "بستنی" }, { en: "Apple", fa: "سیب" }, { en: "Banana", fa: "موز" }, { en: "Orange", fa: "پرتقال" },
  { en: "Grape", fa: "انگور" }, { en: "Watermelon", fa: "هندوانه" }, { en: "Strawberry", fa: "توت فرنگی" }, { en: "Cherry", fa: "گیلاس" }, { en: "Lemon", fa: "لیمو" },
  { en: "Tomato", fa: "گوجه فرنگی" }, { en: "Potato", fa: "سیب زمینی" }, { en: "Onion", fa: "پیاز" }, { en: "Garlic", fa: "سیر" }, { en: "Carrot", fa: "هویج" },
  { en: "Cucumber", fa: "خیار" }, { en: "Corn", fa: "ذرت" }, { en: "Mushrooms", fa: "قارچ" }, { en: "Nuts", fa: "آجیل" }, { en: "Tea", fa: "چای" },
  { en: "Coffee", fa: "قهوه" }, { en: "Juice", fa: "آبمیوه" }, { en: "Soda", fa: "نوشابه" }, { en: "Water", fa: "آب" }, { en: "Salt", fa: "نمک" },
  { en: "Sugar", fa: "شکر" }, { en: "Pepper", fa: "فلفل" }, { en: "Vinegar", fa: "سرکه" }, { en: "Oil", fa: "روغن" }, { en: "Flour", fa: "آرد" },

  // Hobbies & Sports (50)
  { en: "Football", fa: "فوتبال" }, { en: "Basketball", fa: "بسکتبال" }, { en: "Tennis", fa: "تنیس" }, { en: "Volleyball", fa: "والیبال" }, { en: "Swimming", fa: "شنا" },
  { en: "Running", fa: "دویدن" }, { en: "Cycling", fa: "دوچرخه سواری" }, { en: "Hiking", fa: "پیاده روی" }, { en: "Skiing", fa: "اسکی" }, { en: "Surfing", fa: "موج سواری" },
  { en: "Boxing", fa: "بوکس" }, { en: "Karate", fa: "کاراته" }, { en: "Yoga", fa: "یوگا" }, { en: "Golf", fa: "گلف" }, { en: "Cricket", fa: "کریکت" },
  { en: "Fishing", fa: "ماهیگیری" }, { en: "Hunting", fa: "شکار" }, { en: "Camping", fa: "کمپینگ" }, { en: "Dancing", fa: "رقص" }, { en: "Singing", fa: "آواز خواندن" },
  { en: "Painting", fa: "نقاشی" }, { en: "Drawing", fa: "طراحی" }, { en: "Writing", fa: "نویسندگی" }, { en: "Reading", fa: "مطالعه" }, { en: "Gardening", fa: "باغبانی" },
  { en: "Cooking", fa: "آشپزی" }, { en: "Photography", fa: "عکاسی" }, { en: "Traveling", fa: "سفر" }, { en: "Shopping", fa: "خرید" }, { en: "Gaming", fa: "بازی" },
  { en: "Coding", fa: "برنامه نویسی" }, { en: "Knitting", fa: "بافندگی" }, { en: "Chess", fa: "شطرنج" }, { en: "Puzzles", fa: "پازل" }, { en: "Bowling", fa: "بولینگ" },
  { en: "Billiards", fa: "بیلیارد" }, { en: "Darts", fa: "دارت" }, { en: "Skating", fa: "اسکیت" }, { en: "Rock Climbing", fa: "صخره نوردی" }, { en: "Yoga", fa: "یوگا" },
  { en: "Meditating", fa: "مدیتیشن" }, { en: "Sculpting", fa: "مجسمه سازی" }, { en: "Pottery", fa: "سفالگری" }, { en: "Collecting", fa: "جمع آوری" }, { en: "Sewing", fa: "خیاطی" },
  { en: "Archery", fa: "تیراندازی با کمان" }, { en: "Gymnastics", fa: "ژیمناستیک" }, { en: "Fencing", fa: "شمشیربازی" }, { en: "Horseback Riding", fa: "اسب سواری" }, { en: "Rowing", fa: "قایقرانی" },

  // Nature (50)
  { en: "Sun", fa: "خورشید" }, { en: "Moon", fa: "ماه" }, { en: "Stars", fa: "ستارگان" }, { en: "Sky", fa: "آسمان" }, { en: "Clouds", fa: "ابرها" },
  { en: "Rain", fa: "باران" }, { en: "Snow", fa: "برف" }, { en: "Wind", fa: "باد" }, { en: "Storm", fa: "طوفان" }, { en: "Thunder", fa: "رعد" },
  { en: "Ocean", fa: "اقیانوس" }, { en: "Sea", fa: "دریا" }, { en: "River", fa: "رودخانه" }, { en: "Lake", fa: "دریاچه" }, { en: "Stream", fa: "نهر" },
  { en: "Beach", fa: "ساحل" }, { en: "Desert", fa: "صحرا" }, { en: "Mountain", fa: "کوه" }, { en: "Valley", fa: "دره" }, { en: "Cave", fa: "غار" },
  { en: "Island", fa: "جزیره" }, { en: "Forest", fa: "جنگل" }, { en: "Jungle", fa: "جنگل انبوه" }, { en: "Woods", fa: "بیشه" }, { en: "Garden", fa: "باغ" },
  { en: "Field", fa: "دشت" }, { en: "Meadow", fa: "مرغزار" }, { en: "Hill", fa: "تپه" }, { en: "Volcano", fa: "آتشفشان" }, { en: "Glacier", fa: "یخچال طبیعی" },
  { en: "Tree", fa: "درخت" }, { en: "Flower", fa: "گل" }, { en: "Grass", fa: "چمن" }, { en: "Leaf", fa: "برگ" }, { en: "Rock", fa: "سنگ" },
  { en: "Sand", fa: "شن" }, { en: "Dirt", fa: "خاک" }, { en: "Fire", fa: "آتش" }, { en: "Ice", fa: "یخ" }, { en: "Rainbow", fa: "رنگین کمان" },
  { en: "Cactus", fa: "کاکتوس" }, { en: "Bamboo", fa: "خیزران" }, { en: "Mushroom", fa: "قارچ" }, { en: "Seashell", fa: "صدف" }, { en: "Coral", fa: "مرجان" },
  { en: "Pearl", fa: "مروارید" }, { en: "Diamond", fa: "الماس" }, { en: "Gold", fa: "طلا" }, { en: "Silver", fa: "نقره" }, { en: "Iron", fa: "آهن" },

  // Miscellaneous (50+)
  { en: "Love", fa: "عشق" }, { en: "Peace", fa: "صلح" }, { en: "Hope", fa: "امید" }, { en: "Dream", fa: "رویا" }, { en: "Magic", fa: "جادو" },
  { en: "Time", fa: "زمان" }, { en: "Space", fa: "فضا" }, { en: "History", fa: "تاریخ" }, { en: "Future", fa: "آینده" }, { en: "World", fa: "جهان" },
  { en: "Nation", fa: "ملت" }, { en: "City", fa: "شهر" }, { en: "Village", fa: "روستا" }, { en: "Home", fa: "خانه" }, { en: "Room", fa: "اتاق" },
  { en: "Window", fa: "پنجره" }, { en: "Door", fa: "درب" }, { en: "Wall", fa: "دیوار" }, { en: "Floor", fa: "کف" }, { en: "Ceiling", fa: "سقف" },
  { en: "Light", fa: "نور" }, { en: "Shadow", fa: "سایه" }, { en: "Color", fa: "رنگ" }, { en: "Music", fa: "موسیقی" }, { en: "Art", fa: "هنر" },
  { en: "Language", fa: "زبان" }, { en: "Science", fa: "علم" }, { en: "Math", fa: "ریاضی" }, { en: "Money", fa: "پول" }, { en: "Health", fa: "سلامت" },
  { en: "Victory", fa: "پیروزی" }, { en: "Defeat", fa: "شکست" }, { en: "Secret", fa: "راز" }, { en: "Truth", fa: "حقیقت" }, { en: "Lie", fa: "دروغ" },
  { en: "War", fa: "جنگ" }, { en: "Friendship", fa: "دوستی" }, { en: "Family", fa: "خانواده" }, { en: "Children", fa: "کودکان" }, { en: "Adult", fa: "بزرگسال" },
  { en: "Spirit", fa: "روح" }, { en: "Energy", fa: "انرژی" }, { en: "Success", fa: "موفقیت" }, { en: "Failure", fa: "شکست" }, { en: "Journey", fa: "سفر" },
  { en: "Mystery", fa: "معما" }, { en: "Wonder", fa: "تعجب" }, { en: "Power", fa: "قدرت" }, { en: "Freedom", fa: "آزادی" }, { en: "Justice", fa: "عدالت" },
  { en: "Wisdom", fa: "خرد" }, { en: "Knowledge", fa: "دانش" }, { en: "Creativity", fa: "خلاقیت" }, { en: "Innovation", fa: "نوآوری" }, { en: "Discovery", fa: "کشف" }
];
