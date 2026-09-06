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
    ["AneAne", "Anaïs Anaïs", "assets/img/productos/aneane.jpg"]
  ]},
  { brand: "Calvin Klein", items: [
    ["Euphor CK", "Euphoria", "assets/img/productos/euphor-ck.jpg"]
  ]},
  { brand: "Carolina Herrera", items: [
    ["CH", "CH", "assets/img/productos/ch.jpg"],
    ["GG Blush Elixir", "Good Girl Blush / Fantastic Pink Elixir", "assets/img/productos/gg-blush-elixir.jpg"],
    ["Good G Ch", "Good Girl", "assets/img/productos/good-g-ch.jpg"],
    ["Good G Léger", "Good Girl Léger", "assets/img/productos/good-g-leger.jpg"],
    ["Good G Supremo", "Good Girl Supreme", "assets/img/productos/good-g-supremo.jpg"],
    ["Good Girl Blush", "Good Girl Blush", "assets/img/productos/good-girl-blush.jpg"],
    ["Heroes", "212 Heroes for Her"],
    ["Manhattan 212", "212", "assets/img/productos/manhattan-212.jpg"],
    ["212 Sexy", "212 Sexy", "assets/img/productos/212-sexy.jpg"],
    ["Very Glam Good Girl", "Very Good Girl", "assets/img/productos/very-glam-good-girl.jpg"],
    ["Very Good Girl", "Very Good Girl", "assets/img/productos/very-glam-good-girl.jpg"],
    ["212 VIP Rosé", "212 VIP Rosé", "assets/img/productos/212-vip-rose.jpg"]
  ]},
  { brand: "Davidoff", items: [
    ["Echo", "Echo Woman"]
  ]},
  { brand: "Dior", items: [
    ["J'adore", "J'adore", "assets/img/productos/j-adore.jpg"],
    ["M Cher", "Miss Dior Chérie"]
  ]},
  { brand: "DKNY", items: [
    ["Delicius DK", "Be Delicious"]
  ]},
  { brand: "Dolce & Gabbana", items: [
    ["Light Blue", "Light Blue", "assets/img/productos/light-blue.jpg"]
  ]},
  { brand: "Elizabeth Arden", items: [
    ["Red Door", "Red Door", "assets/img/productos/red-door.jpg"]
  ]},
  { brand: "Giorgio Armani", items: [
    ["ADG", "Acqua di Gioia", "assets/img/productos/adg.jpg"],
    ["Amarig", "Emporio Armani"],
    ["My Way", "My Way", "assets/img/productos/my-way.jpg"],
    ["Sì", "Sì", "assets/img/productos/si.jpg"],
    ["Sì Passione", "Sì Passione", "assets/img/productos/si-passione.jpg"]
  ]},
  { brand: "Givenchy", items: [
    ["L'Interdit", "L'Interdit", "assets/img/productos/l-interdit.jpg"]
  ]},
  { brand: "Issey Miyake", items: [
    ["Issey", "L'Eau d'Issey", "assets/img/productos/issey.jpg"],
    ["Issey Florale", "L'Eau d'Issey Florale"]
  ]},
  { brand: "Jean Paul Gaultier", items: [
    ["Scandal", "Scandal", "assets/img/productos/scandal.jpg"],
    ["Scandal Paris", "Scandal à Paris"],
    ["So Scandal", "So Scandal!"]
  ]},
  { brand: "Jesus del Pozo", items: [
    ["Halloween", "Halloween"]
  ]},
  { brand: "Kenzo", items: [
    ["KZO Flower", "Flower", "assets/img/productos/kzo-flower.jpg"]
  ]},
  { brand: "Lancôme", items: [
    ["Hypnos", "Hypnôse"],
    ["Vida Bella", "La Vie Est Belle", "assets/img/productos/vida-bella.jpg"]
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
    ["Nina", "Nina", "assets/img/productos/nina.jpg"],
    ["Nina Bella", "Bella"],
    ["Nina Fleur", "Nina Fleur"],
    ["Nina Luna", "Luna"]
  ]},
  { brand: "Paco Rabanne", items: [
    ["Fame", "Fame", "assets/img/productos/fame.jpg"],
    ["Lady Fabulous", "Lady Million", "assets/img/productos/lady-fabulous.jpg"],
    ["Lady Mill", "Lady Million", "assets/img/productos/lady-fabulous.jpg"],
    ["Olimpia Clásico", "Olympéa", "assets/img/productos/olimpia-clasico.jpg"],
    ["Olympéa Flora", "Olympéa Flora"],
    ["Olympéa Parfum", "Olympéa Le Parfum"],
    ["Olympéa Solar", "Olympéa Solar", "assets/img/productos/olympea-solar.jpg"],
    ["XS Puro", "Pure XS For Her"]
  ]},
  { brand: "Tommy Hilfiger", items: [
    ["Tommy Girl", "Tommy Girl", "assets/img/productos/tommy-girl.jpg"]
  ]},
  { brand: "Versace", items: [
    ["Crystal Noire", "Crystal Noir", "assets/img/productos/crystal-noire.jpg"]
  ]}
];

const masculino = [
  { brand: "Abercrombie & Fitch", items: [
    ["Spice Breeze Fierce", "Fierce"]
  ]},
  { brand: "Armaf", items: [
    ["Club de Nuit Intense", "Club de Nuit Intense", "assets/img/productos/club-de-nuit-intense.jpg"]
  ]},
  { brand: "Burberry", items: [
    ["Weekend", "Weekend"]
  ]},
  { brand: "Calvin Klein", items: [
    ["CK One Shock", "CK One Shock for Him", "assets/img/productos/ck-one-shock.jpg"]
  ]},
  { brand: "Carolina Herrera", items: [
    ["Bad Boy", "Bad Boy", "assets/img/productos/bad-boy.jpg"],
    ["CH Men", "CH Men"],
    ["Bad Boy Cobalt", "Bad Boy Cobalt", "assets/img/productos/bad-boy-cobalt.jpg"],
    ["212 Heroes", "212 Heroes for Him", "assets/img/productos/212-heroes.jpg"],
    ["212 Original Men", "212 Men", "assets/img/productos/212-original-men.jpg"],
    ["212 Sexy Men", "212 Sexy Men", "assets/img/productos/212-sexy-men.jpg"],
    ["212 VIP Men", "212 VIP Men", "assets/img/productos/212-vip-men.jpg"],
    ["212 VIP Black Men", "212 VIP Black Men", "assets/img/productos/212-vip-black-men.jpg"]
  ]},
  { brand: "Davidoff", items: [
    ["Cool Water", "Cool Water", "assets/img/productos/cool-water.jpg"],
    ["Echo Homme", "Echo"],
    ["Cool Water Deep", "Cool Water Deep"]
  ]},
  { brand: "Dior", items: [
    ["Sauvage D Masc", "Sauvage", "assets/img/productos/sauvage-d-masc.jpg"]
  ]},
  { brand: "Dolce & Gabbana", items: [
    ["D&G King", "King"],
    ["Light Blue Forever", "Light Blue Forever Pour Homme", "assets/img/productos/light-blue-forever.jpg"]
  ]},
  { brand: "Giorgio Armani", items: [
    ["Aquatic Breeze ADG", "Acqua di Giò Homme", "assets/img/productos/aquatic-breeze-adg.jpg"],
    ["Arm Code", "Armani Code Homme", "assets/img/productos/arm-code.jpg"]
  ]},
  { brand: "Givenchy", items: [
    ["Gentleman Only", "Gentleman Only", "assets/img/productos/gentleman-only.jpg"]
  ]},
  { brand: "Hugo Boss", items: [
    ["Boss Bottled", "Boss Bottled"]
  ]},
  { brand: "Issey Miyake", items: [
    ["Issey Homme", "L'Eau d'Issey Pour Homme", "assets/img/productos/issey-homme.jpg"]
  ]},
  { brand: "Jean Paul Gaultier", items: [
    ["Le Beau Le Parfum", "Le Beau Le Parfum"],
    ["Scandal Homme Le Parfum", "Scandal Pour Homme Le Parfum", "assets/img/productos/scandal-homme-le-parfum.jpg"],
    ["Scandal Homme", "Scandal Pour Homme"]
  ]},
  { brand: "Kenzo", items: [
    ["Kenzo Homme", "Kenzo Homme"]
  ]},
  { brand: "Lancôme", items: [
    ["Hypnos Homme", "Hypnôse Homme"]
  ]},
  { brand: "Lattafa", items: [
    ["Assad", "Asad", "assets/img/productos/assad.jpg"]
  ]},
  { brand: "Mugler", items: [
    ["Angel Men", "A*Men / Angel Men"]
  ]},
  { brand: "Paco Rabanne", items: [
    ["Black XS", "Black XS"],
    ["Invictus", "Invictus"],
    ["Invictus Platinum", "Invictus Platinum", "assets/img/productos/invictus-platinum.jpg"],
    ["Invictus Victory Elixir", "Invictus Victory Elixir", "assets/img/productos/invictus-victory-elixir.jpg"],
    ["One Million", "One Million", "assets/img/productos/one-million.jpg"],
    ["Phantom", "Phantom", "assets/img/productos/phantom.jpg"],
    ["Invictus Victory", "Invictus Victory", "assets/img/productos/invictus-victory.jpg"]
  ]},
  { brand: "Ralph Lauren", items: [
    ["Polo Black", "Polo Black"],
    ["Big Pony", "Big Pony"],
    ["Polo Verde Clásico", "Polo Green / Classic"],
    ["Polo Blue", "Polo Blue", "assets/img/productos/polo-blue.jpg"],
    ["Ralph Blue", "Polo Blue", "assets/img/productos/polo-blue.jpg"],
    ["Ralph Style", "línea Ralph Lauren"],
    ["Ralph Cool", "línea Polo / Cool"]
  ]},
  { brand: "Tommy Hilfiger", items: [
    ["Tommy", "Tommy"]
  ]},
  { brand: "Viktor & Rolf", items: [
    ["Spicebomb", "Spicebomb", "assets/img/productos/spicebomb.jpg"]
  ]},
  { brand: "Yves Saint Laurent", items: [
    ["Jazz", "Jazz"],
    ["Y", "Y", "assets/img/productos/y.jpg"]
  ]}
];

const unisex = [
  { brand: "Calvin Klein", items: [
    ["CK Be", "CK Be", "assets/img/productos/ck-be.jpg"],
    ["CK One", "Calvin Klein One", "assets/img/productos/ck-one.jpg"]
  ]},
  { brand: "Donna Karan New York", items: [
    ["DKN", "DKNY"]
  ]},
  { brand: "Lattafa", items: [
    ["Khamrah", "Khamrah", "assets/img/productos/khamrah.jpg"]
  ]},
  { brand: "Maison Francis Kurkdjian", items: [
    ["Baccarat", "Baccarat Rouge 540", "assets/img/productos/baccarat.jpg"]
  ]},
  { brand: "Xerjoff", items: [
    ["Erba Pura", "Erba Pura"]
  ]}
];
