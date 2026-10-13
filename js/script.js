$(document).ready(function() {
	$('.content a').fancybox();

	// Luoi grid xep anh theo HANG (trai->phai) dung bang thu tu trong DOM,
	// nen khong can sap xep lai nhu hoi dung masonry theo cot.
	var STAGGER = 0.05;  // giay: do tre giua moi anh
	var DURATION = 0.5;  // giay: thoi gian chuyen dong cua 1 anh

	// Chi chay hieu ung cho anh DANG NAM TRONG/GAN khung nhin.
	// Anh o duoi xa van hien binh thuong khi cuon toi (khong bi an mat),
	// nho vay loading="lazy" moi phat huy tac dung tren dien thoai.
	function animateVisible() {
		if (typeof TweenMax === 'undefined') {
			return;
		}
		var vh = window.innerHeight || 800;
		var inView = $('.content a').toArray().filter(function(el) {
			var r = el.getBoundingClientRect();
			return r.top < vh * 1.2 && r.bottom > 0;
		});
		if (!inView.length) {
			return;
		}
		TweenMax.staggerFrom(inView, DURATION, {top: 50, opacity: 0}, STAGGER);
	}

	if (document.readyState === 'complete') {
		animateVisible();
	} else {
		$(window).on('load', animateVisible);
	}
});
