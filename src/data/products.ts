export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  isFeatured: boolean;
  isAvailable: boolean;
  price: null;
  enquiryOnly?: boolean;
}

export const CATEGORIES = [
  "All",
  "Signature Drinks",
  "Freshly Baked Pastries",
  "Artisan Treats",
  "Small Chops & Platters",
  "Weekend Kitchen Specials",
  "Catering & Celebrations"
];

export const PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "Zobo Drink",
    slug: "zobo-drink",
    category: "Signature Drinks",
    shortDescription: "A refreshing, vibrant hibiscus infusion with a hint of natural spices.",
    fullDescription: "Our signature Zobo drink is crafted from premium hibiscus leaves, steeped to perfection and subtly spiced to create a deeply refreshing, ruby-red beverage that is both healthy and exquisitely flavourful.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_002",
    name: "Tigernut Drink",
    slug: "tigernut-drink",
    category: "Signature Drinks",
    shortDescription: "A creamy, dairy-free delight made from the finest tigernuts and dates.",
    fullDescription: "Rich, velvety, and naturally sweet. Our Tigernut drink is a luxurious blend of carefully sourced tigernuts, dates, and a whisper of coconut, serving as a perfect dairy alternative.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_003",
    name: "Meat Pie",
    slug: "meat-pie",
    category: "Freshly Baked Pastries",
    shortDescription: "Golden, flaky pastry encasing a rich and savory minced meat filling.",
    fullDescription: "A true classic elevated. Our meat pies feature a buttery, shortcrust pastry that shatters beautifully upon first bite, revealing a generous, perfectly seasoned filling of premium minced meat and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_004",
    name: "Egg Roll",
    slug: "egg-roll",
    category: "Freshly Baked Pastries",
    shortDescription: "A perfectly boiled egg wrapped in slightly sweet, golden dough.",
    fullDescription: "A nostalgic favorite reimagined with premium ingredients. Our egg roll balances a subtle sweetness in the golden fried dough with the satisfying center of a perfectly boiled egg.",
    image: "https://images.unsplash.com/photo-1550505095-714856f643f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_005",
    name: "Chin-Chin",
    slug: "chin-chin",
    category: "Artisan Treats",
    shortDescription: "Crunchy, perfectly sweetened, bite-sized delights with a hint of nutmeg.",
    fullDescription: "The ultimate artisan snack. Our chin-chin is meticulously cut and fried to achieve an unparalleled crunch. Subtly spiced with nutmeg, making it incredibly hard to stop at just one handful.",
    image: "https://images.unsplash.com/photo-1481391319762-47dff7295406?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_006",
    name: "Chips",
    slug: "chips",
    category: "Artisan Treats",
    shortDescription: "Crisp, thinly sliced artisan chips seasoned to perfection.",
    fullDescription: "Enjoy the satisfying snap of our artisan chips. Crafted from the finest produce, thinly sliced, and kettle-fried in small batches for a premium snacking experience.",
    image: "https://images.unsplash.com/photo-1566478989037-e924e30592f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_007",
    name: "Small Chops Selection",
    slug: "small-chops-selection",
    category: "Small Chops & Platters",
    shortDescription: "A vibrant assortment of bite-sized party classics.",
    fullDescription: "Elevate your gathering with our beautifully arranged small chops. Featuring spring rolls, samosas, puff-puff, and seasoned grilled meats, providing a symphony of textures and flavors.",
    image: "https://images.unsplash.com/photo-1555244406-9b50ae33f7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_008",
    name: "Celebration Food Tray",
    slug: "celebration-food-tray",
    category: "Small Chops & Platters",
    shortDescription: "An opulent presentation of our finest delicacies for special moments.",
    fullDescription: "Designed to impress the most discerning guests. The celebration food tray is a lavish display of our premium chops, roasted meats, and artisan treats, beautifully presented for any grand occasion.",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null,
    enquiryOnly: true
  },
  {
    id: "prod_009",
    name: "Asun Rice",
    slug: "asun-rice",
    category: "Weekend Kitchen Specials",
    shortDescription: "Smoky, spicy grilled goat meat tossed with rich, flavorful rice.",
    fullDescription: "A bold culinary masterpiece available during our weekend specials. We combine the fiery, smoky allure of traditional Asun (spiced goat meat) with perfectly cooked, intensely flavorful rice.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_010",
    name: "Jollof Rice & Chicken",
    slug: "jollof-rice-and-chicken",
    category: "Weekend Kitchen Specials",
    shortDescription: "The iconic, smoky red rice paired with succulent grilled chicken.",
    fullDescription: "Experience the undeniable comfort of our premium Jollof Rice. Slow-cooked to achieve that sought-after smoky party flavor, served alongside tender, richly marinated grilled chicken.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_011",
    name: "Jollof/Fried Rice & Beef",
    slug: "jollof-fried-rice-and-beef",
    category: "Weekend Kitchen Specials",
    shortDescription: "A delightful duo of our signature rice dishes with tender, seasoned beef.",
    fullDescription: "The best of both worlds. A generous pairing of our smoky Jollof and vibrant Fried Rice, accompanied by succulent, slow-cooked beef that falls apart effortlessly.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null
  },
  {
    id: "prod_012",
    name: "Custom Event Catering",
    slug: "custom-event-catering",
    category: "Catering & Celebrations",
    shortDescription: "Bespoke culinary experiences tailored exclusively to your event.",
    fullDescription: "From intimate gatherings to grand corporate events, our custom event catering service designs tailored menus that perfectly complement your vision, ensuring your guests are treated to an unforgettable culinary journey.",
    image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null,
    enquiryOnly: true
  },
  {
    id: "prod_013",
    name: "Gathering Trays",
    slug: "gathering-trays",
    category: "Catering & Celebrations",
    shortDescription: "Generous, beautifully presented trays of our signature offerings for groups.",
    fullDescription: "Simplify your hosting with our premium Gathering Trays. Whether for a corporate lunch or a family get-together, these large-format presentations ensure everyone experiences the luxury of HoneyMarve.",
    image: "https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isAvailable: true,
    price: null,
    enquiryOnly: true
  }
];
