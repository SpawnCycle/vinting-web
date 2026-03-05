## Állapot, stuktúra

**Pages**

- [x] Welcome
- [ ] Home
- [ ] Upload
- [x] Search
- [x] Favorites
- [ ] Profile
- [x] My listings
- [x] ProductPage
- [x] Edit Page

**Components**

- [x] Navbar
- [x] Product Card
- [x] Product Grid
- [x] Favorite Button
- [x] Edit Button
- [x] Delete Button
- [x] Back button
- [x] Image Carousel
- [x] Filters ??
- [x] Login PopUp
- [x] Reg popUp
- [ ] Logout popUp
- [x] Cat button ( home » search )

**Type: Product**

```
{
  id: number;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  gender: ProductGender;
  colors: ProductColor[];
  size: ProductSize;
  brand: string;
  price: number;
  images: string[];
  status: ProductStatus;
  sellerId: number;
  isFavorite?: boolean;
}
```

## Jegyzetek

ProductCard - kész
ProductGrid - kész
A productGrid kapja meg a terméket mint paraméter, majd az Map-pel végig járja és átadja az 1-1 terméket a produtCardnak.

MyListings-page - //alakulóban. Vissza nyíl, felső design hátra -> Kész

Navbar működik, design kell:
Szín változtatás
Nagy képernyős nézet!!!

Szűrők komponense...
Welcome page...
Home page...
New listing (popup) page...
ProductDetals (popup) page... -> ProductPage: routing megvan, productot kiolvassa, csak fel kell építeni -> Elkezdve

**JS-»TS**
**Laci repojába»»**

Megcsináltam a Jsont megint xd és hogy backend/json->szűrés->kész adatot vissza stb (saját verziómban)
»»Majd MINDENT bemásoltam ide, működik ugyan úgy

CSINÁLD MEG:

- [x] telón osszecsúszik két sorba a cím, eltérő méretű kártyák
- [x] navbár nagyképernyős elrendezését is -alakul, szinte jó
- [x] tableten nagyobb legyen a navbar
- [x] product page befejezni: teló nézet, tags&desc háttere, képek, like ha másé, szerk+törl ha saját
- [ ] be/kijelentkezés lekezelése
- [ ] be/kiszivezés lekezelése
- [x] navbar + search ikon
- [ ] prod/id/edit - korlatozasa
- [ ] logout popUp
