/**
 * catalogo-precios.js
 * Precio de cada fragancia (frasco de 60ml, el que se ve en la card de
 * previsualización). Clave: el mismo data-item-id que ya arma
 * catalogo-app.js (`${brand}::${name}`), mismo patrón que
 * catalogo-notas.js, así este archivo no necesita conocer la estructura
 * de femenino/masculino/unisex.
 *
 * Cálculo a partir de la planilla del proveedor (columna "Precio 20ml",
 * la única con datos reales — "Precio 100ml" viene vacía en toda la
 * planilla):
 *   1. precio_base = precio_20ml × 3
 *   2. si precio_base > 50000, no se fija un número: el valor queda en
 *      "Consultar" (son las fragancias más caras del proveedor, o filas
 *      con un valor que se sale por completo de la escala del resto —
 *      posible error de carga en la planilla original — y en ambos
 *      casos no tiene sentido mostrar un precio automático).
 *   3. si no, se redondea hacia arriba al millar más cercano, con un
 *      piso de $35.000 (nunca por debajo, aunque el cálculo dé menos).
 *
 * El precio solo se muestra en la card de previsualización (antes del
 * botón "Ver notas") y en el carrito — nunca en la grilla del catálogo.
 */

const catalogoPrecios = {
  "Cacharel::AneAne": 35000,
  "Calvin Klein::Euphor CK": "Consultar",
  "Carolina Herrera::CH": 35000,
  "Carolina Herrera::GG Blush Elixir": 35000,
  "Carolina Herrera::Good G Ch": 35000,
  "Carolina Herrera::Good G Léger": 39000,
  "Carolina Herrera::Good G Supremo": 38000,
  "Carolina Herrera::Good Girl Blush": 46000,
  "Carolina Herrera::Heroes": "Consultar",
  "Carolina Herrera::Manhattan 212": 35000,
  "Carolina Herrera::212 Sexy": 37000,
  "Carolina Herrera::Very Glam Good Girl": 44000,
  "Carolina Herrera::Very Good Girl": 35000,
  "Carolina Herrera::212 VIP Rosé": 39000,
  "Davidoff::Echo": 35000,
  "Dior::J'adore": 35000,
  "Dior::M Cher": 35000,
  "DKNY::Delicius DK": 35000,
  "Dolce & Gabbana::Light Blue": 42000,
  "Elizabeth Arden::Red Door": 35000,
  "Giorgio Armani::ADG": 35000,
  "Giorgio Armani::Amarig": 35000,
  "Giorgio Armani::My Way": "Consultar",
  "Giorgio Armani::Sì": 37000,
  "Giorgio Armani::Sì Passione": 48000,
  "Givenchy::L'Interdit": 35000,
  "Issey Miyake::Issey": 35000,
  "Issey Miyake::Issey Florale": "Consultar",
  "Jean Paul Gaultier::Scandal": 43000,
  "Jean Paul Gaultier::Scandal Paris": 35000,
  "Jean Paul Gaultier::So Scandal": "Consultar",
  "Jesus del Pozo::Halloween": 35000,
  "Kenzo::KZO Flower": "Consultar",
  "Lancôme::Hypnos": 45000,
  "Lancôme::Vida Bella": 35000,
  "Lattafa::Yara Candy": 35000,
  "Lattafa::Yara Rosa": 35000,
  "Moschino::Cheap & Chic Love": 35000,
  "Moschino::Toy 2": 35000,
  "Mugler::Angel Nova": 35000,
  "Nina Ricci::Nina": 35000,
  "Nina Ricci::Nina Bella": 35000,
  "Nina Ricci::Nina Fleur": 37000,
  "Nina Ricci::Nina Luna": 35000,
  "Paco Rabanne::Fame": 35000,
  "Paco Rabanne::Lady Fabulous": 35000,
  "Paco Rabanne::Lady Mill": 40000,
  "Paco Rabanne::Olimpia Clásico": 35000,
  "Paco Rabanne::Olympéa Flora": 35000,
  "Paco Rabanne::Olympéa Parfum": 35000,
  "Paco Rabanne::Olympéa Solar": 35000,
  "Paco Rabanne::XS Puro": 46000,
  "Tommy Hilfiger::Tommy Girl": 35000,
  "Versace::Crystal Noire": 39000,
  "Abercrombie & Fitch::Spice Breeze Fierce": 35000,
  "Armaf::Club de Nuit Intense": 35000,
  "Burberry::Weekend": 40000,
  "Calvin Klein::CK One Shock": 35000,
  "Carolina Herrera::Bad Boy": 35000,
  "Carolina Herrera::CH Men": 35000,
  "Carolina Herrera::Bad Boy Cobalt": 35000,
  "Carolina Herrera::212 Heroes": 42000,
  "Carolina Herrera::212 Original Men": "Consultar",
  "Carolina Herrera::212 Sexy Men": 35000,
  "Carolina Herrera::212 VIP Men": 35000,
  "Carolina Herrera::212 VIP Black Men": 35000,
  "Davidoff::Cool Water": 35000,
  "Davidoff::Echo Homme": 35000,
  "Davidoff::Cool Water Deep": 41000,
  "Dior::Sauvage D Masc": "Consultar",
  "Dolce & Gabbana::D&G King": 40000,
  "Dolce & Gabbana::Light Blue Forever": 35000,
  "Giorgio Armani::Aquatic Breeze ADG": 41000,
  "Giorgio Armani::Arm Code": 40000,
  "Givenchy::Gentleman Only": "Consultar",
  "Hugo Boss::Boss Bottled": 40000,
  "Issey Miyake::Issey Homme": 37000,
  "Jean Paul Gaultier::Le Beau Le Parfum": 36000,
  "Jean Paul Gaultier::Scandal Homme Le Parfum": 43000,
  "Jean Paul Gaultier::Scandal Homme": 35000,
  "Kenzo::Kenzo Homme": 35000,
  "Lancôme::Hypnos Homme": 35000,
  "Lattafa::Assad": 35000,
  "Mugler::Angel Men": 36000,
  "Paco Rabanne::Black XS": "Consultar",
  "Paco Rabanne::Invictus": 35000,
  "Paco Rabanne::Invictus Platinum": 35000,
  "Paco Rabanne::Invictus Victory Elixir": 37000,
  "Paco Rabanne::One Million": 42000,
  "Paco Rabanne::Phantom": 35000,
  "Paco Rabanne::Invictus Victory": "Consultar",
  "Ralph Lauren::Polo Black": 39000,
  "Ralph Lauren::Big Pony": 35000,
  "Ralph Lauren::Polo Verde Clásico": 39000,
  "Ralph Lauren::Polo Blue": 41000,
  "Ralph Lauren::Ralph Blue": 35000,
  "Ralph Lauren::Ralph Style": 38000,
  "Ralph Lauren::Ralph Cool": 35000,
  "Tommy Hilfiger::Tommy": 35000,
  "Viktor & Rolf::Spicebomb": 41000,
  "Yves Saint Laurent::Jazz": 45000,
  "Yves Saint Laurent::Y": "Consultar",
  "Calvin Klein::CK Be": 35000,
  "Calvin Klein::CK One": 35000,
  "Donna Karan New York::DKN": 35000,
  "Lattafa::Khamrah": 44000,
  "Maison Francis Kurkdjian::Baccarat": 35000,
  "Xerjoff::Erba Pura": 35000
};
