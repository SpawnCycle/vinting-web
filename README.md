## Állapot, stuktúra

**Pages**

- [x] Welcome
- [x] Home
- [x] Upload
- [x] Search
- [x] Favorites
- [x] Profile
- [x] My listings
- [x] ProductPage
- [x] Edit Page
- [ ] ( Admin Page??? )

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
- [x] Logout popUp
- [x] Cat button ( home » search )
- [x] Toast
- [x] Loader

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
- [x] be/kijelentkezés lekezelése
- [x] whoami mock
- [x] navbar + search ikon
- [x] prod/id/edit - korlatozasa
- [x] logout popUp
- [x] mindenhol ahol használ usert, api-ra kötni
- [ ] prod api bekötése -> mock off
- [ ] favs api bekötése -> funkc lekezelése (lehet nem lesz)
- [x] loader
- [ ] loader bekötése

**Jegyzet**

- Auth bekötve, bejelentkezés nélkül csak welcome és prodpage, bejelentkezve minden, kivéve welcome. Felhasználó adatait használják az oldalak
- Van loader amit ki/be lehet kapcsolni bárhol - kérésekhez bekötni !
