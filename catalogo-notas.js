/**
 * catalogo-notas.js
 * Proyeccion, duracion y notas olfativas de cada fragancia, generadas
 * a partir de la planilla del proveedor. Clave: el mismo data-item-id
 * que ya arma catalogo-app.js (`${brand}::${name}`), asi este archivo
 * no necesita conocer la estructura de femenino/masculino/unisex.
 *
 * proyeccion/duracion van de 1 a 3 (Normal/Buena/Fuerte) o null cuando
 * la planilla no trae ese dato para esa fragancia en particular.
 *
 * 7 fragancias del catalogo quedaron afuera de este archivo a proposito
 * (no hay una fila de la planilla que corresponda con confianza):
 * Red Door, CH Men, 212 Heroes, 212 Original Men, Boss Bottled,
 * Scandal Homme, Hypnose Homme. catalogo-preview.js oculta el boton
 * "Ver notas" para esas en vez de mostrar informacion inventada.
 */

const catalogoNotas = {
  "Cacharel::AneAne": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Notas atalcadas, flor de azahar, bergamota, azucenas, jazmín, muguet, sándalo, ámbar, patchouli, cedro, almizcles."
  },
  "Calvin Klein::Euphor CK": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Florales, notas verdes, frambuesas, duraznos, violetas, caramelo, patchouli, vainilla, almizcles, ámbar."
  },
  "Carolina Herrera::CH": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: bergamota, pomelo, limón. Corazón: flor de azahar, rosa, jazmín. Fondo: cuero, praliné, pachulí, sándalo, cedro, almizcle."
  },
  "Carolina Herrera::GG Blush Elixir": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida cítrica, bergamota, mandarina. Cuerpo floral blanco. Fondo: almizcles, vainilla, patchouli."
  },
  "Carolina Herrera::Good G Ch": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Apertura: almendra, café, bergamota, limón. Corazón: nardos, jazmín, flor de azahar, raíz de lirio, rosa búlgara. Fondo: haba tonka, cacao, vainilla, praliné, sándalo, almizcle, ámbar, madera de cachemira, canela, pachulí, cedro."
  },
  "Carolina Herrera::Good G Léger": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: ylang-ylang, mandarina, bergamota, limón. Corazón: nardos, jazmín, flor de azahar, rosa búlgara. Fondo: dulce de leche, praliné, haba tonka, canela, madera de cachemira, sándalo, almizcle, ámbar, pachulí, cedro."
  },
  "Carolina Herrera::Good G Supremo": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Frutos del bosque, jazmín egipcio, haba tonka, vetiver, madera."
  },
  "Carolina Herrera::Good Girl Blush": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: bergamota, almendra. Corazón: peonía, ylang-ylang. Fondo: vainilla, cumarina."
  },
  "Carolina Herrera::Heroes": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Peras, hierbas, geranio, jengibre. Fondo: cuero, almizcles."
  },
  "Carolina Herrera::Manhattan 212": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Mandarina, bergamota; jazmines, peonías, lirios, fresias; sándalo, almizcles."
  },
  "Carolina Herrera::212 Sexy": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Bergamota, naranja, flores blancas, haba tonka, vainilla, sándalo, patchouli, almizcles blancos."
  },
  "Carolina Herrera::Very Glam Good Girl": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Cerezas, almendra amarga; rosas, azucenas; vainilla, vetiver."
  },
  "Carolina Herrera::Very Good Girl": {
    "proyeccion": null,
    "duracion": 2,
    "notas": "Lichi, grosella roja; rosa; vainilla, vetiver, haba tonka."
  },
  "Carolina Herrera::212 VIP Rosé": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Champagne rosé, pimienta rosa; flor del duraznero, rosa; almizcle blanco, maderas."
  },
  "Davidoff::Echo": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Violeta, iris, peonía, frutales suaves, maderas, almizcles blancos."
  },
  "Dior::J'adore": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Magnolia, rosas, ciruelas, melón, violetas, fresias, sándalo, almizcles."
  },
  "Dior::M Cher": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Bergamota, té verde, fresias, almizcles blancos."
  },
  "DKNY::Delicius DK": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Pomelo, cassis, melón, pepino, lirios, rosas, madera de sándalo, almizcles."
  },
  "Dolce & Gabbana::Light Blue": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Frutales, rosas, bambú, jazmín, ambergris, almizcle, cedro."
  },
  "Giorgio Armani::ADG": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas de salida cítricas y frutales; notas florales de fresia, jazmín, jacintos, lirios, ylang-ylang; notas balsámicas, madera de sándalo, ámbar y almizcles."
  },
  "Giorgio Armani::Amarig": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Flor de azahar, nerolí, mimosa, bayas rojas, jazmín, ylang-ylang, rosas, madera de sándalo, cedro, ámbar, notas balsámicas, almizcles blancos."
  },
  "Giorgio Armani::My Way": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Flor de azahar, bergamota; nardos, jazmín; vainilla, almizcle blanco, cedro de Virginia."
  },
  "Giorgio Armani::Sì": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Cassis; fresia, rosa de mayo, jazmín, neroli, flor de azahar; vainilla, maderas rubias, pachulí."
  },
  "Giorgio Armani::Sì Passione": {
    "proyeccion": null,
    "duracion": 3,
    "notas": "Grosella negra, pera; rosa, jazmín; vainilla, madera de cedro."
  },
  "Givenchy::L'Interdit": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Pera, bergamota; nardos, flor de azahar, jazmín; pachulí, vainilla, ambroxan, vetiver."
  },
  "Issey Miyake::Issey": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Claveles, tuberosas, rosas, peonías, nardos; notas acuáticas; maderas, ámbar, almizcles."
  },
  "Issey Miyake::Issey Florale": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Floral, estilo minimalista (sin notas específicas detalladas en la ficha)."
  },
  "Jean Paul Gaultier::Scandal": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Mandarina, salvia; caramelo, haba tonka; vetiver, bergamota."
  },
  "Jean Paul Gaultier::Scandal Paris": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Pera; jazmín; miel."
  },
  "Jean Paul Gaultier::So Scandal": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Frambuesa, frutas rojas, naranjas sanguinas; bouquet floral, champagne; azahar, jazmín, maderas."
  },
  "Jesus del Pozo::Halloween": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Magnolias, violetas, lirios, tuberosa, muguet, banana, piña, notas marinas, sándalo, almizcles."
  },
  "Kenzo::KZO Flower": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Vainilla, rosa búlgara, jazmín, heliotropo, cítricos, almizcles blancos."
  },
  "Lancôme::Hypnos": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Mandarina, cardamomo, lavanda, bergamota, menta. Fondo: ámbar, musgo, patchouli, almizcles."
  },
  "Lancôme::Vida Bella": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Caramelo, vainilla, haba tonka, rosas, patchouli, ámbar."
  },
  "Lattafa::Yara Candy": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Caramelo, mandarina, gardenias; vainilla, almizcle, ámbar, sándalo."
  },
  "Lattafa::Yara Rosa": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Naranja, mandarina, orquídeas; frutales y dulces; vainilla, almizcles, sándalo."
  },
  "Moschino::Cheap & Chic Love": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Salida: bergamota, petit grain, yuzu, palo de rosa de Brasil, grosella, pomelo, limón. Corazón: rosas, nenúfar, peonía, violeta, jazmín, muguet. Fondo: almizcle, vainilla, haba tonka, orquídea, sándalo, vetiver, iris, ámbar gris."
  },
  "Moschino::Toy 2": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Notas frescas; jazmín, peonías; almizcladas y amaderadas."
  },
  "Mugler::Angel Nova": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: frambuesa y rosa. Corazón: amaderadas. Fondo: ámbar."
  },
  "Nina Ricci::Nina": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Praliné, manzanas, notas cítricas, frutales rojos, peonías; azúcar, cedro, almizcles."
  },
  "Nina Ricci::Nina Bella": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Ruibarbo, mandarina, limón; fresia, rosa; vainilla, almizcle blanco."
  },
  "Nina Ricci::Nina Fleur": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Limón italiano, manzana; flor de azahar, neroli; almizcle blanco, cedro."
  },
  "Nina Ricci::Nina Luna": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Bayas silvestres, flor de azahar, naranja, lima; caramelo, siempreviva, pera, jazmín; vainilla, regaliz, sándalo, almizcle blanco."
  },
  "Paco Rabanne::Fame": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Mango, bergamota; jazmín, incienso; vainilla, sándalo, patchouli."
  },
  "Paco Rabanne::Lady Fabulous": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Cítricos; flores blancas; vainilla, maderas."
  },
  "Paco Rabanne::Lady Mill": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Cítricas, miel, jazmín, maderas, almizcles."
  },
  "Paco Rabanne::Olimpia Clásico": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Jazmín, mandarina, flor de jengibre; vainilla, sal; ámbar gris, madera de cachemira, sándalo."
  },
  "Paco Rabanne::Olympéa Flora": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Rosa, peonías; patchouli, vainilla."
  },
  "Paco Rabanne::Olympéa Parfum": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Notas frescas; flor de azahar, rosas, jazmines; vainilla, almizcles."
  },
  "Paco Rabanne::Olympéa Solar": {
    "proyeccion": null,
    "duracion": 2,
    "notas": "Flor de azahar, cáscara de naranja, mandarina; flor de tiaré, notas solares, flores blancas, musgo de roble; ylang-ylang, benjuí."
  },
  "Paco Rabanne::XS Puro": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Ylang-ylang, flor de azahar, durazno; pochoclo, coco, amberwood; vainilla."
  },
  "Tommy Hilfiger::Tommy Girl": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Grosella negra, mandarina, flor de manzano; madreselva, lirio, violeta, menta, pomelo, limón, rosa; magnolia, cuero, sándalo, jazmín, cedro."
  },
  "Versace::Crystal Noire": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Pimienta, jengibre, cardamomo; coco, gardenia, flor de azahar, peonía; sándalo, almizcle, ámbar; tuberosa, vainilla, higo, jazmín, heliotropo."
  },
  "Abercrombie & Fitch::Spice Breeze Fierce": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Cardamomo, abeto, romero; notas marinas; jazmín, rosa, salvia, muguet; almizcle, musgo de roble, maderas."
  },
  "Armaf::Club de Nuit Intense": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: lima, bergamota, lavanda. Medio: floral. Fondo: ámbar gris, musgo, patchouli, vainilla."
  },
  "Burberry::Weekend": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Limón, mandarinas, pomelos; madera de sándalo, almizcles, ámbar."
  },
  "Calvin Klein::CK One Shock": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Lavanda, clementina, pepino; cardamomo, pimienta, albahaca, osmanto; tabaco, ámbar, pachulí, maderas, almizcle."
  },
  "Carolina Herrera::Bad Boy": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: pimienta blanca, bergamota, pimienta rosa. Corazón: cedro, esclarea. Fondo: haba tonka, cacao."
  },
  "Carolina Herrera::Bad Boy Cobalt": {
    "proyeccion": null,
    "duracion": 2,
    "notas": "Salida: lavanda, pimienta rosa. Corazón: ciruela, geranio. Fondo: vetiver, trufa, cedro, roble."
  },
  "Carolina Herrera::212 Sexy Men": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Mandarina, bergamota; florales, notas especiadas; sándalo, guaiac, vainilla, ámbar."
  },
  "Carolina Herrera::212 VIP Men": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Maracuyá, lima, pimienta, jengibre; vodka, ginebra, menta, especias; ámbar, cuero, maderas."
  },
  "Carolina Herrera::212 VIP Black Men": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Absenta, anís, hinojo; lavanda; vainilla negra, almizcle."
  },
  "Davidoff::Cool Water": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas acuáticas, aromáticas; jazmín, flor de nerolí, geranio; almizcles, musgo de roble."
  },
  "Davidoff::Echo Homme": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Hierbas frescas, maderas de cedro, almizcles blancos, ámbar."
  },
  "Davidoff::Cool Water Deep": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Notas acuáticas, aromáticas, amaderadas; notas cítricas suaves, notas verdes; madera de guaiac, cedro; notas marítimas; almizcles, musgo de roble."
  },
  "Dior::Sauvage D Masc": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Mandarina, bergamota; sándalo, cedro; vainilla, haba tonka."
  },
  "Dolce & Gabbana::D&G King": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: naranja sanguina, bayas de enebro, pimiento morrón, limón, cardamomo. Corazón: néctar de higo, lavanda, geranio, salvia. Fondo: cedro, pachulí, vetiver, bergamota."
  },
  "Dolce & Gabbana::Light Blue Forever": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Pomelo, bergamota; notas ozónicas, hojas de violeta; vetiver, almizcle blanco, pachulí."
  },
  "Giorgio Armani::Aquatic Breeze ADG": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas acuáticas; cítricas de mandarina, bergamota, limón; florales de fresias, jazmines, rosas, jacintos; cedro, patchouli, sándalo; almizcles, musgo de roble."
  },
  "Giorgio Armani::Arm Code": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Cítricas de bergamota y limón; anís estrellado. Fondo: haba tonka, cuero, tabaco."
  },
  "Givenchy::Gentleman Only": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida fresca y especiada; vetiver, cedro, patchouli; incienso, almizcles."
  },
  "Issey Miyake::Issey Homme": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Mandarina, estragón, ciprés, verbena, bergamota, salvia; notas marinas; geranios, lirios; almizcles, sándalo, cedro, ámbar."
  },
  "Jean Paul Gaultier::Le Beau Le Parfum": {
    "proyeccion": 3,
    "duracion": 2,
    "notas": "Piña, iris, ciprés, jengibre; coco, maderas nobles; sándalo, haba tonka, ámbar gris."
  },
  "Jean Paul Gaultier::Scandal Homme Le Parfum": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Geranio; haba tonka; sándalo; jazmín, limón, albahaca, lavanda."
  },
  "Kenzo::Kenzo Homme": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas marinas, florales; maderas ambaradas, patchouli, sándalo."
  },
  "Lattafa::Assad": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: canela, nuez moscada, pimienta negra. Medio: patchouli, café. Fondo: ámbar."
  },
  "Mugler::Angel Men": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: cilantro, lavanda, notas verdes, frutas, menta, bergamota. Corazón: miel, pachulí, jazmín, leche, caramelo, lirio de los valles, cedro. Fondo: sándalo, haba tonka, ámbar, pachulí, almizcle, benjuí, vainilla, café."
  },
  "Paco Rabanne::Black XS": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: limón, salvia. Corazón: praliné, canela, bálsamo de Tolú, cardamomo negro. Fondo: palo de rosa de Brasil, pachulí, ámbar negro."
  },
  "Paco Rabanne::Invictus": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Acordes marinos; pomelo rosado, mandarinas; cedro, patchouli; cuero suave; ambergris."
  },
  "Paco Rabanne::Invictus Platinum": {
    "proyeccion": null,
    "duracion": 3,
    "notas": "Absenta, pomelo; menta, lavanda; ciprés, pachulí."
  },
  "Paco Rabanne::Invictus Victory Elixir": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Lavanda, cardamomo, pimienta negra; incienso, pachulí; vainilla, haba tonka, ámbar, madera."
  },
  "Paco Rabanne::One Million": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas especiadas y cítricas; vainilla, cuero, ámbar; almizcles."
  },
  "Paco Rabanne::Phantom": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Lavanda, limón, limón de Amalfi; notas terrosas, humo, manzana, pachulí; vainilla, lavanda, vetiver."
  },
  "Paco Rabanne::Invictus Victory": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Nuez moscada, pimienta, lima, bergamota, mandarina; incienso, lavanda; haba tonka, vainilla, ámbar."
  },
  "Ralph Lauren::Polo Black": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Salida cítrica y verde; mango, salvia, mandarina, lima; sándalo, patchouli; ámbar, almizcles."
  },
  "Ralph Lauren::Big Pony": {
    "proyeccion": 1,
    "duracion": 2,
    "notas": "Peras, damascos, flores silvestres."
  },
  "Ralph Lauren::Polo Verde Clásico": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Cilantro, albahaca, bergamota, clavel, jazmines, rosas, agujas de pino, cuero, pimienta, patchouli, musgo de roble, cedro, tabaco."
  },
  "Ralph Lauren::Polo Blue": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Melón, mandarina, pepino; albahaca, salvia, geranio; almizcle, notas amaderadas."
  },
  "Ralph Lauren::Ralph Blue": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Jazmines, rosas, gardenias, peonías; azahar, verbena; maderas, musgo de roble, almizcles."
  },
  "Ralph Lauren::Ralph Style": {
    "proyeccion": 2,
    "duracion": 3,
    "notas": "Notas verdes; jazmín, muguet, rosas; patchouli, vainilla, almizcles."
  },
  "Ralph Lauren::Ralph Cool": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Notas marinas; melón, kiwi, pepino; almizcles."
  },
  "Tommy Hilfiger::Tommy": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Menta, bergamota, pomelo, lavanda; manzana, arándano, rosa; flor del algodonero, cactus, ámbar."
  },
  "Viktor & Rolf::Spicebomb": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Notas cítricas y especiadas; madera de cedro, sándalo; almizcles, cuero, tabaco."
  },
  "Yves Saint Laurent::Jazz": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Lavanda, albahaca, bergamota; notas florales; cuero, maderas."
  },
  "Yves Saint Laurent::Y": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Manzana, jengibre, bergamota; salvia, bayas de enebro, geranio; amberwood, haba tonka, cedro, vetiver, incienso."
  },
  "Calvin Klein::CK Be": {
    "proyeccion": 2,
    "duracion": 2,
    "notas": "Salida: lavanda, notas verdes, menta, mandarina, enebro de Virginia, bergamota. Corazón: hierba verde, magnolia, orquídea, fresia, durazno, jazmín. Fondo: sándalo, ámbar, opopónaco, almizcle, cedro, vainilla."
  },
  "Calvin Klein::CK One": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Cítrica; notas aromáticas verdes; lirios, rosas, jazmines; nuez moscada; maderas, almizcles."
  },
  "Donna Karan New York::DKN": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Hierbas cítricas; notas florales suaves; maderas terrosas, vetiver, cedro, sándalo; cuero, musgo de roble."
  },
  "Lattafa::Khamrah": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Canela, nuez moscada; bergamota; fondo ambarado."
  },
  "Maison Francis Kurkdjian::Baccarat": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Azafrán, jazmín, ámbar gris, madera de ámbar, resina de abeto, cedro, ambroxan, azúcar."
  },
  "Xerjoff::Erba Pura": {
    "proyeccion": 3,
    "duracion": 3,
    "notas": "Salida cítrica. Corazón: frutas tropicales. Fondo: vainilla, ambargris."
  }
};
