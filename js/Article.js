/* ** Un Article représente un produit présent dans la liste des produits disponibles à la vente.
* */

/* ** Le constructeur prend trois (3) paramètres : Le nom de l'article, son code barre et son prix.
* 
* @param String name Le nom de l'article.
* @param Integer barcode Le code barre de l'article.
* @param Float price Le prix de l'article.
* */
function Article(name, barcode, price) {
	this.setName(name)
	this.setBarcode(barcode)
	this.setPrice(price)
}

Article.prototype.name = null // Stocke le nom de l'article
Article.prototype.barcode = null // Stocke le code barre de l'article
Article.prototype.price = null // Stocke le prix de l'article

/* ** Retourne le nom de l'article.
* 
* @return String Le nom de l'article.
* */
Article.prototype.getName = function() {
	return this.name
}

/* ** Modifie le nom de l'article.
* 
* @param String name Le nouveau nom de l'article.
* */
Article.prototype.setName = function(name) {
	this.name = name
}

/* ** Retourne le code barre de l'article.
* 
* @return Integer Le code barre de l'article.
* */
Article.prototype.getBarcode = function() {
	return this.barcode
}

/* ** Modifie le code barre de l'article.
* 
* @param Integer barcode Le nouveau code barre de l'article.
* */
Article.prototype.setBarcode = function(barcode) {
	this.barcode = barcode
}

/* ** Retourne le prix de l'article.
* 
* @return Float Le prix de l'article.
* */
Article.prototype.getPrice = function() {
	return this.price
}

/* ** Modifie le prix de l'article.
* 
* @param Float price Le nouveau prix de l'article.
* */
Article.prototype.setPrice = function(price) {
	this.price = price
}
