$(document).ready(function() {
	$('.content a').fancybox();

	// Layout masonry (CSS columns) xep anh theo COT, nen thu tu trong DOM
	// la tren->duoi tung cot. Muon hieu ung hien ra theo HANG NGANG
	// (trai->phai, roi xuong hang duoi) thi phai sap xep lai phan tu
	// theo VI TRI THUC TE tren man hinh truoc khi chay stagger.
	var ROW_TOLERANCE = 40; // px: lech duoi muc nay coi nhu cung 1 hang
	var STAGGER = 0.06;     // giay: do tre giua moi anh
	var DURATION = 0.6;     // giay: thoi gian chuyen dong cua 1 anh

	function sortByRow(items) {
		return items.sort(function(a, b) {
			var ra = a.getBoundingClientRect();
			var rb = b.getBoundingClientRect();
			// Cung hang -> so sanh trai/phai; khac hang -> hang tren truoc
			if (Math.abs(ra.top - rb.top) > ROW_TOLERANCE) {
				return ra.top - rb.top;
			}
			return ra.left - rb.left;
		});
	}

	// Chi chay hieu ung cho anh DANG NAM TRONG/GAN khung nhin.
	// Anh o duoi xa van hien binh thuong khi cuon toi (khong bi an mat),
	// nho vay loading="lazy" moi phat huy tac dung tren dien thoai.
	function animateVisible() {
		var vh = window.innerHeight || 800;
		var inView = $('.content a').toArray().filter(function(el) {
			var r = el.getBoundingClientRect();
			return r.top < vh * 1.2 && r.bottom > 0;
		});

		if (!inView.length || typeof TweenMax === 'undefined') {
			return;
		}
		TweenMax.staggerFrom(sortByRow(inView), DURATION,
			{top: 60, opacity: 0}, STAGGER);
	}

	// Cho anh load xong moi do vi tri, neu khong masonry chua xep xong
	// thi getBoundingClientRect() tra ve vi tri sai -> thu tu bi lech.
	if (document.readyState === 'complete') {
		animateVisible();
	} else {
		$(window).on('load', animateVisible);
	}
});
