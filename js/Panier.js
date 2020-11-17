/* ** Le Panier est composé de tous les Articles que l'on souhaite achetés.
* Il existe toujours et il est vide si on n'a encore rien choisi comme Article.
* */

/* ** Le constructeur initialise simplement la liste des Lots d'Article et la somme à payer.
* */
function Panier() {
	this.list = []
	this.sum = 0
}

Panier.prototype.list = null // La liste d'achat (liste de Lots d'Articles).
Panier.prototype.sum = null // Le prix total à payer.

/* ** Affiche pour chaque Lot d'Article : Le nom de l'Article, son prix unitaire et la quantité qu'on veut acheter.
* Indique si le Panier est vide.
* */
Panier.prototype.displayList = function() {
	var item = 0
	var article, price, quantity
	
	if (this.list.length > 0) {
		for (; item < this.list.length; item ++) {
			article = this.list[item].article.getName()
			price = this.list[item].article.getPrice()
			quantity = this.list[item].quantity
			
			console.log('Article : ' + article + ', prix unitaire : ' + price + ' €, quantité : ' + quantity)
		}
	} else {
		console.log('Le panier est vide.')
	}
}

/* ** Calcule la somme totale à payer.
* Parcourt la liste des Lots d'Article pour calculer le prix total à payer.
* */
Panier.prototype.calculateSum = function() {
	var item = 0
	var price, quantity
	var sum = 0
	
	for (; item < this.list.length; item ++) {
		price = this.list[item].article.getPrice()
		quantity = this.list[item].quantity
		
		sum += (price * quantity)
	}
	
	this.sum = sum
}

/* ** Retourne la somme totale à payer.
* 
* @return Float La somme totale à payer.
* */
Panier.prototype.getSum = function() {
	return this.sum
}

/* ** Vide le Panier.
* Remet le prix à payer à zéro (0).
* */
Panier.prototype.emptyList = function() {
	this.list = []
	this.sum = 0
}

/* ** Simule le paiement des Articles du Panier.
* Affiche un message dans le console.
* */
Panier.prototype.pay = function() {
	console.log('Payé !')
	console.log('Faire quelque chose ici.')
}
