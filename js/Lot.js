/* ** Un Lot représente un (1) article dans le panier.
* Le Lot stocke la quantité d'article voulu pour un Article.
* */

/* ** Le constructeur prend deux (2) paramètres : L'Article et la quantité voulu.
* 
* @param Article product L'Article qu'on veut ajouté au Panier.
* @param Integer quantity La quantité qu'on veut acheter.
* */
function Lot(product, quantity) {
	this.article = product
	this.quantity = quantity
}

Lot.prototype.article = null // Un objet Article
Lot.prototype.quantity = null // La quantité d'Article qu'on souhaite

/* ** Ajoute le Lot au Panier donnée en paramètre.
* Appel la méthode calculateSum() du Panier pour mettre à jour la somme totale à payer.
* 
* @param Panier panier Le Panier ou doit être déposer le Lot.
* */
Lot.prototype.addTo = function(panier) {
	panier.list.push(this)
	
	panier.calculateSum()
}

/* ** Supprime le Lot actuel du Panier donnée en paramètre.
* Récupère l'index du Lot dans le Panier. Si le Lot existe dans le Panier, il est supprimé.
* 
* @param Panier panier Le Panier ou doit être retirer le Lot.
* */
Lot.prototype.removeFrom = function(panier) {
	var index = panier.list.indexOf(this)
	
	if (index > -1) {
		panier.list.splice(index, 1)
		
		panier.calculateSum()
	} else {
		console.log('L\'article n\'est pas présent dans ce panier.')
	}
}
