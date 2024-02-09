(function () {
   // console.log('reading parallax js');
   // Select all divs with class parallax
   const parallaxContainers = document.querySelectorAll('.parallax-container');

   // Create an Intersection Observer instance
   const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const parallaxImg = entry.target.querySelector('.parallax-image');
            animateParallax(entry.target, parallaxImg);
            parallaxImg.classList.remove('hidden');
            // Define your event handler function
            function onScrollHandler() {
               animateParallax(entry.target, parallaxImg);
            }

            if (entry.isIntersecting) {
               window.addEventListener('scroll', onScrollHandler);
            } else {
               window.removeEventListener('scroll', onScrollHandler);
            }
         };
      });
   })

   // Observe each parallax imgContainer
   parallaxContainers.forEach(imgContainer => {
      observer.observe(imgContainer);
   });

   // Function to animate the background image offset
   function animateParallax(imgContainer, parallaxImg) {
      // Calculate the scroll progress of the imgContainer
      const imgContainerTop = imgContainer.offsetTop;
      const imgContainerBottom = imgContainerTop + imgContainer.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      let scrollProgress = 0;

      if (scrollY > imgContainerBottom) {
         scrollProgress = 0;
      } else if (scrollY + windowHeight < imgContainerTop) {
         scrollProgress = 100;
      } else {
         scrollProgress = 100 - Math.round((imgContainerBottom - scrollY) / (windowHeight + imgContainer.offsetHeight) * 100);
      }
      // console.log(scrollProgress);
      // Apply the background image offset
      parallaxImg.style.bottom = `${-scrollProgress / 3}vh`;
   }
}())