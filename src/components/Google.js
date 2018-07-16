// 1) Regularly try to get google's script until it's loaded.

const googleService = {};
const GoogleLoadTimer = setInterval(() => {
   if (window.google) {
     googleService.google = window.google;
     clearInterval(GoogleLoadTimer);
   }
}, 100);

export default googleService;
