22//Dökümanların sadece price ve name bilgileri gelsin
db.electronics.find({},{"price":1,"name":1,"_id":0})

23//yukardaki soruyu price değerine göre sıralıyalım
db.electronics.find({},{"price":1, "name":1, "_id":0}).sort({"price":1})

veya
db.electronics.find({},{"price":1, "name":1, "_id":0}).sort({"price":})
 tersten sıralamak için 
 db.electronics.find({},{"price":1, "name":1, "_id":0}).sort({"price":-1})

 24//ilk dokümanı okumak istersek
 db.electronics.findOne()

 25// TV leri azalan fiyata göre getirelim
db.electronics.find({"name":"TV"},{"name":1,"_id":0, "price":1}).sort({"price":-1})

NOTE:
Comparison Operators
    Eşitlik     ==> $eq
    Küçüktür    ==> $lt
    Büyüktür    ==> $gt
    Küçük eşit  ==> $lte
    Büyük eşit  ==> $gte
    Eşit değil  ==> $ne
    Dizi içinde ==> $in
    Dizi değil  ==> $nin

26//price 'ı 230 olan tv yi getirin'
db.electronics.find({$and:[{"price":230},{"name":"TV"}]})

27// fiyatı 95 olan dökümanı bulun
db.electronics.find({"price":{$eq:95}})

28// fiyatı 300 den az veya eşit olan dökümanları bulun
db.electronics.find({"price" :{$lte:240}})

29// yukardaki soruda id çıktıda gözükmesin
db.electronics.find({"price" :{$lte:240}},{"_id":0})

30// price ı 100den büyük veya eşit olan dokümanları getirin
db.electronics.find({"price" :{$gte:100}})

31//price ı 240, 75 120 den biri olna dokümanları getririn 
db.electronics.find({"price": {$nin:[120,230,75]}})

32// price değeri 230, 75, 120 olmayan dökümanları getirin
db.electronics.find({"price" : {$nin:[230, 75, 120]}})

/=================================================================
//            findOneAndUpdate - findOneAndReplace
//=================================================================
// A - findOneAndReplace()
//----------------------------
//   1-) belirtilen koşullara uyan ilk sorguyu bulur ve degistirir.
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan
//       alanlari kaldirir. (API'lerdeki PUT metoduna benzetilebilir).
//   3-) Islem sonunda ilgili dokumanin guncellenmemiş halini gosterir.yani ben bunu değiştirdim diye haber veriyor
//
// B - findOneAndUpdate()
//----------------------------
///  1-) Belirtilen koşullara uyan ilk sorguyu bulur ve degistirir.
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan
//       alanlari modifiye etmez  (API'lerdeki PATCH metoduna benzetilebilir).
//   3-) komutun kosul kismindan sonra degislikileri gerceklestirmek icin bir
//       atomic operator kullanilir. ($set (direk değer verilirse), $inc(arttırma azaltma), $mul (çarpma)vb.)
//   4)  Islem sonunda ilgili dokumanin guncellenMEmiş halini gosterir.
//=================================================================
// ÖNEMLİ : !!!  bu 2 kod çalıştığında dökümanın update olmamış hali ekrana gelir.



33// price ı 200 den az olan fokümanı bulup  name bilgisini  "Car " olarak price ını 
//2000 olarak değiştirin

db.electronics.findOneAndReplace({"price":{$lt:200}},{"name":"Car","price":200})

34// price ı 100 den büyük olan dokümanlar içinde price bilgisi en
// düşük olanın ismini "En Ucuz" olarak değiştirin

({sorgu}{update }{opsiyonel sortlama})

db.electronics.findOneAndReplace({"price":{$gt:100}},{"name":"En Ucuz"},{sort:{"price":1}})

// price ı en yüksek deseydi
db.electronics.findOneAndReplace({"price":{$gt:100}},{"name":"En Ucuz"},{sort:{"price":-1}})

35//price bilgisi 100 den büyük olan dökümanlar içinde fiyatı en 
//büyük olanın ismini "En Pahalı" olarak değiştirin


db.electronics.findOneAndUpdate({"price" : {$gt:100}} , {$set:{"name":"En Pahalı"}} , {sort:{"price":-1}})

36// Price bilgisi 100 en küçük olan dökümanın ismini "Güncellendi" 
//olarak değiştirin, diğer field lar silinmesin

db.electronics.findOneAndUpdate({"price" : {$lt:100}} , {$set:{"name":"güncellendi"}} )

37//price ı  100 debn küçük olan dokümanlar içinde fiyaıt en küçük olanın ismini "En ucuz" yapalım


db.electronics.findOneAndUpdate({"price":{$lt:100}},{$set:{"name":",En Ucuz"}},{sort:{"price":1}})

38// price ı 230 a eşit olan dokümanı bulup fiyatını 250 yapıp  ekran çıktısını güncel haliyle yapın

db.electronics.findOneAndUpdate({"price":{$eq:250}},{$set:{"price":250}},{returnNewDocument: true})


39//Fiyatı 230 olan dökümanı bulup name bilgisini "Gold", 
//fiyatını 250 yapıp konsol çıktısında update edilmiş sonucu gösterelim,
// eğer böyle bir döküman yoksa yeni oluşturalım

db.electronics.findOneAndUpdate({"price":{$eq:230}},{$set:{"name":"Gold"}},{returnNewDocument: true, upsert:true})

//Açıklama : çıktının güncel dökümanı göstermesi için returnNewDocument değerini true yaptık, filtre ile aranan döküman yoksa yeni oluşturulması için upsert değerini true yaptık

40//birden fazla fokümanı aynı anda değiştirmek istiyorsak 
//price ı 300 den füşük olan bütün dokümanları isimini "Woww" yapalım

db.electronics.update({"price":{$lt:300}},{$set:{"name":"Woww"}},{multi:true})
//güncel hali
db.electronics.updateMany({"price":{$lt:300}},{$set:{"name":"Wow"}})

// açıklama  updataMany() methodu güncel olduğu için ,depricated edilen update() methoddundaki gibi "multi:true yazmamıza gerek yoktur

// Bir dokümanı nasıl sileriz?
// deleteOne() / deleteMany() /remove()

41// ismi En ucuz  olan dokümanı siliniz

db.electronics.deleteOne({"name":"En Ucuz"})

42// olamayan bir dokuümanı sil meye çalışırsak 
db.electronics.deleteOne({"name":"XYZ"})
//{ acknowledged: true, deletedCount: 0 }
//sıfır değerini verir

43// bütün dökümanı silmek istersem
db.electronics.deleteMany({})
//2.yol :
db.electronics.delete()
//3.yol
db.electronics.remove({})


