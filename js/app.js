
(()=>{
	'use strict';

	const photoData = [];
	const galleryContainer = document.querySelector('#gallery-container');
	const body = document.querySelector('body');
	const lightboxPopup = document.querySelector('#lightbox-popup')
	// This function makes a fetch request and then returns a promise
	// Using this system to allow for data gallery to populate AFTER a valid
	// HTTP GET request
	function getPhotos() {
		return new Promise((resolve, reject) => {
			fetch(' https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=97c6b42d5eefc6430d81dc7371335004&user_id=131519498%40N07&extras=url_l&format=json&nojsoncallback=1') // Return Promise if works, throw exception otherwise
				 .then(data=>data.json()) // Creates native json from response promise
				 .then(photos=>{ // Maps photo array to photData arrray
					let photoData = [];
					photos.photos.photo.map(el=>{
						let elData = {
							url: el.url_l,
							title: el.title	
						};
						photoData.push(elData);
					});
					resolve(photoData);
					// console.log(photoData[0].url_l);
				})
				 .catch(err=>{
					console.log(`%cError: ${err}`, 'color:red;');
					reject(err); 
					return;
				});	
		});
	}
	
	function handleImgClick(e) {
		let photo = e.currentTarget;
		// Creating the image that will be passed into dialog box
		let lightboxImage = document.createElement('IMG'),
			 lightboxTitle = lightboxPopup.querySelector('#lightbox-title');
		lightboxImage.id = "lightbox-image";
		
		// Passing the values from clicked image to the lightbox element
		lightboxImage.src = photo.src;
		lightboxTitle.innerHTML = photo.title;
	
		lightboxPopup.appendChild(lightboxImage);
		lightboxPopup.showModal ();
	
	}
	// This function helps close the lightbox image.  Dialog closes
	// and then dismount the image that is currently rendered oftherwise 
	// it just keeps adding images to the dialog box.
	function closeLightbox(e) {
		e.currentTarget.close();
		e.currentTarget.querySelector('img').remove();
	}
	
	function init() {
		// Using a promise, the gallery components will not render unit the photos
		// are ready
		getPhotos().then(photosData=>{
			photosData.map(el=>{
				let galleryImage = document.createElement("IMG");
				galleryImage.src = el.url;
				galleryImage.alt = el.title;
				galleryImage.title = el.title; // <3 html5
				galleryImage.className = "gallery-item";
				galleryImage.addEventListener('click', handleImgClick, false);
				// console.log(galleryContainer);
				galleryContainer.appendChild(galleryImage);
			});
		});
	}
	window.addEventListener("load", init, false);
	lightboxPopup.addEventListener("click", closeLightbox, false)
})();
	
	
	
	
	
	
	
	
	
	