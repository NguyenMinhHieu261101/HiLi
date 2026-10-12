$(document).ready(function() {
	$('.content a').fancybox();

	// Layout masonry (CSS columns) xep anh theo COT, nen thu tu trong DOM
	// la tren->duoi tung cot. Muon hieu ung hien ra theo HANG NGANG
	// (trai->phai, roi xuong hang duoi) thi phai sap xep lai phan tu
	// theo VI TRI THUC TE tren man hinh truoc khi chay stagger.
	var ROW_TOLERANCE = 40; // px: lech duoi muc nay coi nhu cung 1 hang

	function sortByRow() {
		return $('.content a').toArray().sort(function(a, b) {
			var ra = a.getBoundingClientRect();
			var rb = b.getBoundingClientRect();
			// Cung hang -> so sanh trai/phai; khac hang -> hang tren truoc
			if (Math.abs(ra.top - rb.top) > ROW_TOLERANCE) {
				return ra.top - rb.top;
			}
			return ra.left - rb.left;
		});
	}

	function runAnimation() {
		TweenMax.staggerFrom(
			sortByRow(),  // thu tu theo hang ngang, khong phai thu tu DOM
			1,            // thoi gian chuyen dong
			{top: 100, opacity: 0},
			0.08          // thoi gian cach nhau giua moi hieu ung
		);
	}

	// Cho anh load xong moi do vi tri, neu khong masonry chua xep xong
	// thi getBoundingClientRect() tra ve vi tri sai -> thu tu bi lech.
	if (document.readyState === 'complete') {
		runAnimation();
	} else {
		$(window).on('load', runAnimation);
	}
});
