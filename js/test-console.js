(function() {
	// Création des Articles
	var boisson_sucree = new Article('boisson sucrée', 1217, 1.54)
	var boisson = new Article('boisson', 1316, 1.18)
	var eau = new Article('eau', 1415, .59)
	
	var aperitif = new Article('apéritif', 1514, 2.13)
	var crepes = new Article('crèpes', 1613, 3.21)
	var pain = new Article('pain', 1712, .87)
	
	// Création du Panier
	var panier = new Panier()
	
	// Création des Lots
	var lot1 = new Lot(boisson, 3)
	var lot2 = new Lot(crepes, 4)
	var lot3 = new Lot(aperitif, 4)
	
	// Affiche un récapitulatif du panier
	function recap(nb) {
		console.log('%cRÉCAP ' + nb + ' :', 'color:white;background:green;padding:5px;')
		
		// Affiche les Articles du Panier et la somme à payer
		panier.displayList()
		console.log('Total à payer : ' + panier.getSum().toFixed(2) + ' €')
	}
	
	recap(1)
	
	// Ajout des Lots dans le Panier
	lot1.addTo(panier)
	lot2.addTo(panier)
	
	recap(2)
	
	// Retrait du Lot contenant l'Article crepes
	lot2.removeFrom(panier)
	
	recap(3)
	
	// Ajout du Lot contenant l'Article aperitif
	lot3.addTo(panier)
	
	recap(4)
	
	// On vide le Panier
	panier.emptyList()
	
	recap(5)
}) ()
