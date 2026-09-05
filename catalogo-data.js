/**
 * catalogo-data.js
 * Datos de las fragancias del catálogo, agrupadas por marca original.
 * Cada perfume: [nombre_propio, perfume_original_inspirador, imagen_opcional]
 *
 * IMPORTANTE: las imágenes son solo de referencia visual para orientar
 * al cliente sobre el perfume en el que está inspirada cada fragancia.
 * Cuando no fue posible conseguir una foto del producto original por
 * motivos de derechos de marca/autor, se usa una foto genérica de frasco
 * (sin marca) a modo ilustrativo.
 */

const femenino = [
  { brand: "Cacharel", items: [
    ["AneAne", "Anaïs Anaïs", "https://www.fragranceoutlet.com/cdn/shop/products/Cacharel-Anais-Anais-Women-Eau-de-Toilette-Spray-1-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626824865&width=2048"]
  ]},
  { brand: "Calvin Klein", items: [
    ["Euphor CK", "Euphoria", "https://www.fragranceoutlet.com/cdn/shop/files/CK_Euphoria_W_17.jpg?v=1773853833&width=2048"]
  ]},
  { brand: "Carolina Herrera", items: [
    ["CH", "CH", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-Ch-Womens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773162815&width=2048"],
    ["GG Blush Elixir", "Good Girl Blush / Fantastic Pink Elixir", "https://www.fragranceoutlet.com/cdn/shop/files/CH_Good_Girl_Blush_Elixir_2.7.jpg?v=1773853494&width=2048"],
    ["Good G Ch", "Good Girl", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-Good-Girl-Women-Eau-De-Parfum-Spray-Best-Price-Fragrance-Parfume-Fragranceoutlet.Com-Main_314.jpg?v=1568999849&width=2048"],
    ["Good G Léger", "Good Girl Léger", "https://www.fragranceoutlet.com/cdn/shop/files/good_girl.jpg?v=1698349461&width=2000"],
    ["Good G Supremo", "Good Girl Supreme", "https://www.fragranceoutlet.com/cdn/shop/files/supreme1.0.jpg?v=1759756150&width=2000"],
    ["Good Girl Blush", "Good Girl Blush", "https://www.fragranceoutlet.com/cdn/shop/files/CH_Good_Girl_Blush_2.7.jpg?v=1773853540&width=2048"],
    ["Heroes", "212 Heroes for Her"],
    ["Manhattan 212", "212", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Womens-Eau-de-Toilette-Spray-2-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626994755&width=2048"],
    ["212 Sexy", "212 Sexy", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Sexy-Womens-Eau-de-Parfume-Spray-2-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpeg?v=1660754733&width=2048"],
    ["Very Glam Good Girl", "Very Good Girl", "https://www.fragranceoutlet.com/cdn/shop/files/carolina_herrera_verygoodgirl_1.7oz.jpg?v=1773853502&width=2048"],
    ["Very Good Girl", "Very Good Girl", "https://www.fragranceoutlet.com/cdn/shop/files/carolina_herrera_verygoodgirl_1.7oz.jpg?v=1773853502&width=2048"],
    ["212 VIP Rosé", "212 VIP Rosé", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Vip-Rose-Womens-Eau-de-Parfume-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Detail.jpeg?v=1773162285&width=2048"]
  ]},
  { brand: "Davidoff", items: [
    ["Echo", "Echo Woman"]
  ]},
  { brand: "Dior", items: [
    ["J'adore", "J'adore", "https://www.fragranceoutlet.com/cdn/shop/products/Christian-Dior-Jadore-Women-Eau-de-Parfum-Spray-1.0-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773155815&width=2048"],
    ["M Cher", "Miss Dior Chérie"]
  ]},
  { brand: "DKNY", items: [
    ["Delicius DK", "Be Delicious"]
  ]},
  { brand: "Dolce & Gabbana", items: [
    ["Light Blue", "Light Blue", "https://www.fragranceoutlet.com/cdn/shop/products/D_G-Light-Blue-Women-Eau-de-Toilette-Spray-3.4-UBX-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Main.jpg?v=1626831820&width=2048"]
  ]},
  { brand: "Elizabeth Arden", items: [
    ["Red Door", "Red Door", "https://www.fragranceoutlet.com/cdn/shop/products/Elizabeth-Arden-Red-Door-Women-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Main.jpg?v=1627006347&width=2048"]
  ]},
  { brand: "Giorgio Armani", items: [
    ["ADG", "Acqua di Gioia", "https://www.sephora.com/productimages/sku/s1284249-main-zoom.jpg?imwidth=315"],
    ["Amarig", "Emporio Armani"],
    ["My Way", "My Way", "https://www.fragranceoutlet.com/cdn/shop/products/I0115884larger.jpg?v=1625603951&width=650"],
    ["Sì", "Sì", "https://www.fragranceoutlet.com/cdn/shop/products/Giorgio-Armani-Armani-Si-Women-Eau-de-Parfume-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Detail.jpeg?v=1705695190&width=2048"],
    ["Sì Passione", "Sì Passione", "https://www.fragranceoutlet.com/cdn/shop/products/Giorgio-Armani-Si-Passione-Women-Eau-de-Parfum-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com.jpg?v=1571860445&width=1000"]
  ]},
  { brand: "Givenchy", items: [
    ["L'Interdit", "L'Interdit", "https://labelleperfumes.com/cdn/shop/products/linterdit-w_1024x.jpg?v=1762269323"]
  ]},
  { brand: "Issey Miyake", items: [
    ["Issey", "L'Eau d'Issey", "https://www.fragranceoutlet.com/cdn/shop/products/Issey-Miyake-Issey-Miyake-Womens-Eau-De-Toilette-EDT-Spray-0.84-oz.-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1627009350&width=2048"],
    ["Issey Florale", "L'Eau d'Issey Florale"]
  ]},
  { brand: "Jean Paul Gaultier", items: [
    ["Scandal", "Scandal", "https://www.fragranceoutlet.com/cdn/shop/products/Jean_Paul_Gaultier-Scandal-Women-Eau_de_Parfum_Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1569111767&width=2571"],
    ["Scandal Paris", "Scandal à Paris"],
    ["So Scandal", "So Scandal!"]
  ]},
  { brand: "Jesus del Pozo", items: [
    ["Halloween", "Halloween"]
  ]},
  { brand: "Kenzo", items: [
    ["KZO Flower", "Flower", "https://i.ebayimg.com/images/g/43UAAeSwHTRplejb/s-l1600.jpg"]
  ]},
  { brand: "Lancôme", items: [
    ["Hypnos", "Hypnôse"],
    ["Vida Bella", "La Vie Est Belle", "https://www.fragranceoutlet.com/cdn/shop/products/Lancome-La-Vie-Est-Belle-Womens-Eau-de-Parfume-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpeg?v=1773156890&width=2048"]
  ]},
  { brand: "Lattafa", items: [
    ["Yara Candy", "Yara Candy"],
    ["Yara Rosa", "Yara"]
  ]},
  { brand: "Moschino", items: [
    ["Cheap & Chic Love", "Cheap & Chic I Love Love"],
    ["Toy 2", "Toy 2"]
  ]},
  { brand: "Mugler", items: [
    ["Angel Nova", "Angel Nova"]
  ]},
  { brand: "Nina Ricci", items: [
    ["Nina", "Nina", "https://www.perfumeplusoutlet.com/cdn/shop/files/5_c978eef7-7cfc-43f0-b33f-e8ffa78f384c_1080x.jpg?v=1741112674"],
    ["Nina Bella", "Bella"],
    ["Nina Fleur", "Nina Fleur"],
    ["Nina Luna", "Luna"]
  ]},
  { brand: "Paco Rabanne", items: [
    ["Fame", "Fame", "https://www.fragranceoutlet.com/cdn/shop/files/PC_Fame.jpg?v=1726171847&width=2048"],
    ["Lady Fabulous", "Lady Million", "https://www.fragranceoutlet.com/cdn/shop/products/Paco-Rabanne-Lady-Million-Womens-Eau-de-Parfume-Spray-2.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Main.jpeg?v=1626951023&width=2048"],
    ["Lady Mill", "Lady Million", "https://www.fragranceoutlet.com/cdn/shop/products/Paco-Rabanne-Lady-Million-Womens-Eau-de-Parfume-Spray-2.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Main.jpeg?v=1626951023&width=2048"],
    ["Olimpia Clásico", "Olympéa", "https://www.fragranceoutlet.com/cdn/shop/products/Paco-Rabanne-Olympea-Womens-Eau-De-Parfum-EDP-Spray-2.7-oz.-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1626818313&width=2048"],
    ["Olympéa Flora", "Olympéa Flora"],
    ["Olympéa Parfum", "Olympéa Le Parfum"],
    ["Olympéa Solar", "Olympéa Solar", "https://i.ebayimg.com/images/g/T1wAAeSwgf9pSORX/s-l500.jpg"],
    ["XS Puro", "Pure XS For Her"]
  ]},
  { brand: "Tommy Hilfiger", items: [
    ["Tommy Girl", "Tommy Girl", "https://www.fragranceoutlet.com/cdn/shop/products/Tommy-Hilfiger-Tommy-Girl-Womens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Main.jpg?v=1626994189&width=2048"]
  ]},
  { brand: "Versace", items: [
    ["Crystal Noire", "Crystal Noir", "https://www.fragranceoutlet.com/cdn/shop/products/Versace-Crystal-Noir-Womens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626803182&width=2048"]
  ]}
];

const masculino = [
  { brand: "Abercrombie & Fitch", items: [
    ["Spice Breeze Fierce", "Fierce"]
  ]},
  { brand: "Armaf", items: [
    ["Club de Nuit Intense", "Club de Nuit Intense", "https://www.fragranceoutlet.com/cdn/shop/products/Exclusive-Selection-Club-De-Nuit-Intense-Man-Men-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1773155466&width=2048"]
  ]},
  { brand: "Burberry", items: [
    ["Weekend", "Weekend"]
  ]},
  { brand: "Calvin Klein", items: [
    ["CK One Shock", "CK One Shock for Him", "https://www.fragranceoutlet.com/cdn/shop/products/Calvin-Klein-Ck-One-Shock-Womens-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626991320&width=2048"]
  ]},
  { brand: "Carolina Herrera", items: [
    ["Bad Boy", "Bad Boy", "https://www.fragranceoutlet.com/cdn/shop/files/Carolina_Herrera_Bad_Boy.jpg?v=1773853480&width=2048"],
    ["CH Men", "CH Men"],
    ["Bad Boy Cobalt", "Bad Boy Cobalt", "https://www.fragranceoutlet.com/cdn/shop/files/Carolina_Herrera_Bad_Boy_Cobalt_2.jpg?v=1773853391&width=2048"],
    ["212 Heroes", "212 Heroes for Him", "https://www.fragranceoutlet.com/cdn/shop/files/212heroes.jpg?v=1710857317&width=1600"],
    ["212 Original Men", "212 Men", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Men-Mens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626811549&width=2048"],
    ["212 Sexy Men", "212 Sexy Men", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Sexy-Men-Mens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1660754755&width=2048"],
    ["212 VIP Men", "212 VIP Men", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-Vip-Men-Mens-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626833454&width=2048"],
    ["212 VIP Black Men", "212 VIP Black Men", "https://www.fragranceoutlet.com/cdn/shop/products/Carolina-Herrera-212-VIP-Black-Men-Eau-de-Parfum-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1569100744&width=2000"]
  ]},
  { brand: "Davidoff", items: [
    ["Cool Water", "Cool Water", "https://www.fragranceoutlet.com/cdn/shop/products/Davidoff-Cool-Water-Mens-Eau-de-Toilette-Spray-1.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773152699&width=2048"],
    ["Echo Homme", "Echo"],
    ["Cool Water Deep", "Cool Water Deep"]
  ]},
  { brand: "Dior", items: [
    ["Sauvage D Masc", "Sauvage", "https://www.fragranceoutlet.com/cdn/shop/products/Dior-Sauvage-Mens-Eau-De-Toilette-Spray-EDT-S-2.0-oz.-Best-Price-Fragrance-Perfume-FragranceOutlet.com-Details.jpg?v=1773158101&width=2048"]
  ]},
  { brand: "Dolce & Gabbana", items: [
    ["D&G King", "King"],
    ["Light Blue Forever", "Light Blue Forever Pour Homme", "https://www.fragranceoutlet.com/cdn/shop/products/D_G-Light-Blue-Mens-Eau-de-Toilette-Spray-1.3-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DetailS.jpg?v=1773154546&width=2048"]
  ]},
  { brand: "Giorgio Armani", items: [
    ["Aquatic Breeze ADG", "Acqua di Giò Homme", "https://www.fragranceoutlet.com/cdn/shop/files/GA_ADGio_1_0_bc2bb660-88ae-41c4-8d20-0864d234f887.jpg?v=1773434263&width=2048"],
    ["Arm Code", "Armani Code Homme", "https://www.fragranceoutlet.com/cdn/shop/files/Armani_Code_M_Parfum_25_b.png?v=1779382931&width=1254"]
  ]},
  { brand: "Givenchy", items: [
    ["Gentleman Only", "Gentleman Only", "https://www.fragranceoutlet.com/cdn/shop/products/Givenchy-Gentlemen-Only-Mens-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1766439162&width=2048"]
  ]},
  { brand: "Hugo Boss", items: [
    ["Boss Bottled", "Boss Bottled"]
  ]},
  { brand: "Issey Miyake", items: [
    ["Issey Homme", "L'Eau d'Issey Pour Homme", "https://www.fragranceoutlet.com/cdn/shop/products/Issey-Miyake-L-Eau-Dissey-Mens-Eau-de-Toilette-Spray-2.5-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773157916&width=2048"]
  ]},
  { brand: "Jean Paul Gaultier", items: [
    ["Le Beau Le Parfum", "Le Beau Le Parfum"],
    ["Scandal Homme Le Parfum", "Scandal Pour Homme Le Parfum", "https://www.fragranceoutlet.com/cdn/shop/files/1024-x-1024-productos-91-compressed1-1b4c240b8de5e0a97416902115227643-1024-1024.jpg?v=1726172547&width=1024"],
    ["Scandal Homme", "Scandal Pour Homme"]
  ]},
  { brand: "Kenzo", items: [
    ["Kenzo Homme", "Kenzo Homme"]
  ]},
  { brand: "Lancôme", items: [
    ["Hypnos Homme", "Hypnôse Homme"]
  ]},
  { brand: "Lattafa", items: [
    ["Assad", "Asad", "https://www.fragranceoutlet.com/cdn/shop/files/Lataffa_Asad_m_34_b.png?v=1779390342&width=1254"]
  ]},
  { brand: "Mugler", items: [
    ["Angel Men", "A*Men / Angel Men"]
  ]},
  { brand: "Paco Rabanne", items: [
    ["Black XS", "Black XS"],
    ["Invictus", "Invictus"],
    ["Invictus Platinum", "Invictus Platinum", "https://www.fragranceoutlet.com/cdn/shop/files/21430630_fpx.webp?v=1726172054&width=1200"],
    ["Invictus Victory Elixir", "Invictus Victory Elixir", "https://www.fragranceoutlet.com/cdn/shop/files/s2679082-main-zoom.webp?v=1726172056&width=2000"],
    ["One Million", "One Million", "https://www.fragranceoutlet.com/cdn/shop/products/Paco-Rabanne-1-Million-Mens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773152414&width=2048"],
    ["Phantom", "Phantom", "https://www.fragranceoutlet.com/cdn/shop/files/Phantom1.jpg?v=1758034950&width=2048"],
    ["Invictus Victory", "Invictus Victory", "https://www.fragranceoutlet.com/cdn/shop/files/Paco_Rabbanne_invictus_victory_edp1.jpg?v=1768410175&width=2048"]
  ]},
  { brand: "Ralph Lauren", items: [
    ["Polo Black", "Polo Black"],
    ["Big Pony", "Big Pony"],
    ["Polo Verde Clásico", "Polo Green / Classic"],
    ["Polo Blue", "Polo Blue", "https://www.fragranceoutlet.com/cdn/shop/products/Ralph-Lauren-Polo-Blue-Mens-Eau-de-Toilette-Spray-4.2-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1700496502&width=2048"],
    ["Ralph Blue", "Polo Blue", "https://www.fragranceoutlet.com/cdn/shop/products/Ralph-Lauren-Polo-Blue-Mens-Eau-de-Toilette-Spray-4.2-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1700496502&width=2048"],
    ["Ralph Style", "línea Ralph Lauren"],
    ["Ralph Cool", "línea Polo / Cool"]
  ]},
  { brand: "Tommy Hilfiger", items: [
    ["Tommy", "Tommy"]
  ]},
  { brand: "Viktor & Rolf", items: [
    ["Spicebomb", "Spicebomb", "https://www.fragranceoutlet.com/cdn/shop/products/Viktor-_-Rolf-Spicebomb-Mens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com_Details.jpg?v=1626832539&width=2048"]
  ]},
  { brand: "Yves Saint Laurent", items: [
    ["Jazz", "Jazz"],
    ["Y", "Y", "https://www.fragranceoutlet.com/cdn/shop/files/YSL_Y_EDP.jpg?v=1742249063&width=2048"]
  ]}
];

const unisex = [
  { brand: "Calvin Klein", items: [
    ["CK Be", "CK Be", "https://www.fragranceoutlet.com/cdn/shop/products/Calvin-Klein-Be-Mens-Eau-de-Toilette-Spray-3.4-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1626992311&width=2048"],
    ["CK One", "Calvin Klein One", "https://www.fragranceoutlet.com/cdn/shop/products/Calvin-Klein-Ck-One-Womens-Eau-de-Toilette-Spray-1.7-Best-Price-Fragrance-Parfume-FragranceOutlet.com-Details.jpg?v=1773158146&width=2048"]
  ]},
  { brand: "Donna Karan New York", items: [
    ["DKN", "DKNY"]
  ]},
  { brand: "Lattafa", items: [
    ["Khamrah", "Khamrah", "https://www.fragranceoutlet.com/cdn/shop/files/Lataffa_Khamarah_m_34_b.png?v=1779397332&width=1254"]
  ]},
  { brand: "Maison Francis Kurkdjian", items: [
    ["Baccarat", "Baccarat Rouge 540", "https://www.fragranceoutlet.com/cdn/shop/products/Maison-Francis-Kurkdjian-Baccarat-Rouge-540-Women-Eau-de-Parfum-6.8-Best-Price-Fragrance-Parfume-FragranceOutlet.com-DETAILS.jpg?v=1551283414&width=2500"]
  ]},
  { brand: "Xerjoff", items: [
    ["Erba Pura", "Erba Pura"]
  ]}
];
