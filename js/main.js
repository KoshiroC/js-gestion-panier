(function() {
	// Création des Articles
	var boisson_sucree = new Article('boisson sucrée', 1217, 1.54)
	var boisson = new Article('boisson', 1316, 1.18)
	var eau = new Article('eau', 1415, .59)
	
	var aperitif = new Article('apéritif', 1514, 2.13)
	var crepes = new Article('crèpes', 1613, 3.21)
	var pain = new Article('pain', 1712, .87)
	
	// On met les Articles dans une liste. Utile pour la fonction fillStock().
	var products = [boisson_sucree, boisson, eau, aperitif, crepes, pain]
	
	// Création du Panier
	var panier = new Panier()
	
	/* ** Ajoute un Lot au Panier.
	* 
	* @param Integer barcode Le code-barre d'un Article.
	* */
	function action_add(barcode) {
		var barcode = Number.parseInt(barcode, 10)
		var quantity = document.querySelector('#quantity-' + barcode).value
		var item = 0
		var article, lot
		
		for (; item < products.length; item ++) {
			article = products[item]
			
			if (barcode === article.getBarcode()) {
				lot = new Lot(article, quantity)
				
				lot.addTo(panier)
				
				createElementList(article, quantity, true)
				
				return
			}
		}
	}
	
	/* ** Retire un Lot du Panier.
	* 
	* @param Integer barcode Le code-barre d'un Article.
	* */
	function action_remove(barcode) {
		var barcode = Number.parseInt(barcode, 10)
		var item = 0
		var lot, article
		
		for (; item < panier.list.length; item ++) {
			lot = panier.list[item]
			article = lot.article
			
			if (barcode === article.getBarcode()) {
				lot.removeFrom(panier)
				
				document.querySelector('#panier-list').removeChild(document.querySelector('#lot-' + barcode))
				document.querySelector('#sum').innerHTML = panier.sum.toFixed(2) + ' €'
				
				if (panier.sum == 0) initPanier()
				
				return
			}
		}
	}
	
	/* ** On affiche le Panier vide.
	* Crée un élément HTML avec le texte "Le panier est vide.".
	* */
	function initPanier() {
		var container = document.createElement('li')
		var defaultText = document.createTextNode('Le panier est vide.')
		
		container.setAttribute('class', 'collection-item center-align')
		container.setAttribute('id', 'empty-panier')
		
		if (panier.sum == 0) container.appendChild(defaultText)
		
		if (document.querySelector('#empty-panier') == null) document.querySelector('#panier-list').appendChild(container)
		document.querySelector('#sum').innerHTML = panier.sum.toFixed(2) + ' €'
	}
	
	/* ** Ajoute un élément, soit à la liste des produits, soit au Panier.
	* 
	* @param Article article Un objet Article.
	* @param Integer info La quantité d'Article si ajout au Panier, null sinon.
	* @param Boolean in_panier Vaut true si l'Article est à ajouter au Panier, false sinon.
	* */
	function createElementList(article, info, in_panier) {
		var container = document.createElement('li')
		var div = document.createElement('div')
		var input = document.createElement('input')
		var a = document.createElement('a')
		var i = document.createElement('i')
		var name = document.createTextNode(article.getName() + ' ')
		var infos = (in_panier)?document.createTextNode('(' + info + ')'):document.createTextNode(article.getPrice() + ' € ')
		var icon = (in_panier)?document.createTextNode('clear'):document.createTextNode('shopping_cart')
		
		container.setAttribute('class', 'collection-item')
		
		if (in_panier) {
			container.setAttribute('id', 'lot-' + article.getBarcode())
		} else {
			container.setAttribute('id', 'article-' + article.getBarcode())
		}
		
		input.setAttribute('type', 'number')
		input.setAttribute('id', 'quantity-' + article.getBarcode())
		input.setAttribute('class', 'browser-default')
		input.value = 1
		
		a.setAttribute('href', '#')
		a.setAttribute('class', 'secondary-content')
		a.dataset.barcode = article.getBarcode()
		
		/* ** Gestion du clic sur le lien liée a l'Article.
		* Dans le Panier, supprime l'Article du Panier, dans le stock ajoute l'Article au Panier.
		* */
		a.addEventListener(
			'click',
			function(e) {
				e.preventDefault()
				
				if (in_panier) {
					action_remove(this.dataset.barcode)
				} else {
					action_add(this.dataset.barcode)
				}
			}
		)
		
		i.setAttribute('class', 'material-icons')
		
		i.appendChild(icon)
		a.appendChild(i)
		
		div.appendChild(name)
		div.appendChild(infos)
		if (!in_panier) div.appendChild(input)
		div.appendChild(a)
		
		container.appendChild(div)
		
		if (document.querySelector('#empty-panier') != null) document.querySelector('#panier-list').removeChild(document.querySelector('#empty-panier'))
		
		if (in_panier) {
			document.querySelector('#panier-list').appendChild(container)
		} else {
			document.querySelector('#product-list').appendChild(container)
		}
		
		document.querySelector('#sum').innerHTML = panier.getSum().toFixed(2) + ' €'
	}
	
	/* ** Initialise le stock d'Articles disponibles à l'achat.
	* */
	function fillStock() {
		var item = 0
		var article
		
		for (; item < products.length; item ++) {
			article = products[item]
			
			createElementList(article, null, false)
		}
	}
	
	/* ** Retire tous les éléments du Panier HTML.
	* */
	function viderPanier() {
		while (document.querySelector('#panier-list').children.length > 1) {
			document.querySelector('#panier-list').removeChild(document.querySelector('#panier-list').lastElementChild)
		}
		
		initPanier()
	}
	
	/* ** Gestion du clic sur le bouton "Vider le panier".
	* */
	document.querySelector('#btn-empty-panier').addEventListener(
		'click',
		function(e) {
			e.preventDefault()
			
			panier.emptyList()
			viderPanier()
		}
	)
	
	fillStock()
	initPanier()
}) ()

