(function() {
	// Création des Articles
	var boisson_sucree = new Article('boisson sucrée', 1217, 1.54);
	var boisson = new Article('boisson', 1316, 1.18);
	var eau = new Article('eau', 1415, .59);
	
	var aperitif = new Article('apéritif', 1514, 2.13);
	var crepes = new Article('crèpes', 1613, 3.21);
	var pain = new Article('pain', 1712, .87);
	
	// On met les articles dans une liste
	var products = [boisson_sucree, boisson, eau, aperitif, crepes, pain];
	
	// Création du Panier
	var panier = new Panier();
	
	function addToPanierHTML(lot) {
		var container = document.createElement('li');
		var div = document.createElement('div');
		var a = document.createElement('a');
		var i = document.createElement('i');
		var name = document.createTextNode(lot.article.getName() + ' ');
		var quantity = document.createTextNode('(' + lot.quantity + ')');
		var icon = document.createTextNode('clear');
		
		container.setAttribute('class', 'collection-item');
		container.setAttribute('id', 'lot-' + lot.article.getBarcode());
		
		a.setAttribute('href', '#');
		a.setAttribute('class', 'secondary-content');
		a.dataset.barcode = lot.article.getBarcode();
		
		a.addEventListener(
			'click',
			function(e) {
				e.preventDefault();
				
				var barcode = Number.parseInt(this.dataset.barcode, 10);
				var item = 0;
				var article, lot;
				
				for (; item < panier.list.length; item ++) {
					lot = panier.list[item];
					article = lot.article;
					
					if (barcode === article.getBarcode()) {
						lot.removeFrom(panier);
						
						document.querySelector('#panier-list').removeChild(document.querySelector('#lot-' + barcode));
						document.querySelector('#sum').innerHTML = panier.sum.toFixed(2) + ' €';
						
						if (panier.sum == 0) viderPanierHTML();
						
						return;
					}
				}
			}
		);
		
		i.setAttribute('class', 'material-icons');
		
		i.appendChild(icon);
		a.appendChild(i);
		
		div.appendChild(name);
		div.appendChild(quantity);
		div.appendChild(a);
		
		container.appendChild(div);
		
		if (document.querySelector('#empty-panier') != null) document.querySelector('#panier-list').removeChild(document.querySelector('#empty-panier'));
		
		document.querySelector('#panier-list').appendChild(container);
		document.querySelector('#sum').innerHTML = panier.sum.toFixed(2) + ' €';
	}
	
	// On affiche les Articles sur la page
	function articlesHTML() {
		var item = 0;
		var article, container, div, input, a, i, name, price, icon;
		
		for (; item < products.length; item ++) {
			article = products[item];
			
			container = document.createElement('li');
			div = document.createElement('div');
			input = document.createElement('input');
			a = document.createElement('a');
			i = document.createElement('i');
			name = document.createTextNode(article.getName() + ' ');
			price = document.createTextNode(article.getPrice() + ' € ');
			icon = document.createTextNode('shopping_cart');
			
			container.setAttribute('class', 'collection-item');
			container.setAttribute('id', 'article-' + article.getBarcode());
			
			input.setAttribute('type', 'number');
			input.setAttribute('id', 'quantity-' + article.getBarcode());
			input.setAttribute('class', 'browser-default');
			input.value = 1;
			
			a.setAttribute('href', '#');
			a.setAttribute('class', 'secondary-content');
			a.dataset.barcode = article.getBarcode();
			
			a.addEventListener(
				'click',
				function(e) {
					e.preventDefault();
					
					var barcode = Number.parseInt(this.dataset.barcode, 10);
					var quantity = document.querySelector('#quantity-' + barcode).value;
					var item = 0;
					var article, lot;
					
					for (; item < products.length; item ++) {
						article = products[item];
						
						if (barcode === article.getBarcode()) {
							lot = new Lot(article, quantity);
							
							lot.addTo(panier);
							
							addToPanierHTML(lot);
							
							return;
						}
					}
				}
			);
			
			i.setAttribute('class', 'material-icons');
			
			i.appendChild(icon);
			a.appendChild(i);
			
			div.appendChild(name);
			div.appendChild(price);
			div.appendChild(input);
			div.appendChild(a);
			
			container.appendChild(div);
			
			document.querySelector('#product-list').appendChild(container);
		}
	} articlesHTML();
	
	// On affiche le Panier sur la page
	function initPanierHTML() {
		var container = document.createElement('li');
		var defaultText = document.createTextNode('Le panier est vide.');
		
		container.setAttribute('class', 'collection-item center-align');
		container.setAttribute('id', 'empty-panier');
		
		if (panier.sum == 0) container.appendChild(defaultText);
		
		if (document.querySelector('#empty-panier') == null) document.querySelector('#panier-list').appendChild(container);
		document.querySelector('#sum').innerHTML = panier.sum.toFixed(2) + ' €';
	} initPanierHTML();
	
	function viderPanierHTML() {
		while (document.querySelector('#panier-list').children.length > 1) {
			document.querySelector('#panier-list').removeChild(document.querySelector('#panier-list').lastElementChild);
		}
		
		initPanierHTML();
	}
	
	document.querySelector('#btn-empty-panier').addEventListener(
		'click',
		function(e) {
			e.preventDefault();
			
			panier.emptyList();
			viderPanierHTML();
		}
	);
}) ();

