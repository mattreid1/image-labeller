var i = 0;
var labelStack = [];
const labels = ["Keep", "Reject"];

$(document).ready(function () {
	for (let i = 0; i < labels.length; i++) {
		const label = labels[i];
		$("#labelRow").append(`<button type="button" class="btn btn-primary" id="labelBtn${i}" style="margin-right:12px;">${label} (${i + 1})</button>`);
	}

	$.getJSON("/api/listImages", (imageArr) => {
		changeImage(imageArr[i]);
		$("#progress").html(`${i}/${imageArr.length} (${parseFloat((i / imageArr.length * 100).toFixed(2))}% done)`)

		$("body").keypress((eventData) => {
			const key = eventData.key.toLowerCase();
			if (isNumeric(key)) {
				if (parseInt(key) <= labels.length) handleLabel(parseInt(key));
			}

			if (key == "q") {
				undo();
			}
		});

		for (let j = 0; j < labels.length; j++) {
			$(`#labelBtn${j}`).on("click", () => handleLabel(j + 1));
		}

		$("#undoBtn").on("click", () => undo());

		function handleLabel(label) {
			const image = imageArr[i];
			$("#undoBtn").prop('disabled', false);
			i++;
			labelStack.push({ "image": image, "label": label });
			$.getJSON(`/api/label?image=${image}&label=${label}`); // Assume worked?
			changeImage(imageArr[i]);
			updateProgress();
			alertMsg("primary", `Marked '${image}' as '${labels[label - 1]}'`);
		}

		function undo() {
			if (i > 0) {
				const item = labelStack.pop();
				$.getJSON(`/api/undo?image=${item.image}&label=${item.label}`, () => {
					i--;
					changeImage(imageArr[i]);
					alertMsg("warning", `Undid '${item.image}'`);
					updateProgress();
					if (i == 0) {
						$("#undoBtn").prop('disabled', true);
					}
				});
			} else {
				alertMsg("danger", "Cannot undo any further!");
			}
		}

		function changeImage(image) {
			$("#image").attr("src", `/images/${image}`);
		}

		function updateProgress() {
			$("#progress").html(`${i}/${imageArr.length} (${parseFloat((i / imageArr.length * 100).toFixed(2))}% done)`);
		}
	});
});

function alertMsg(type, content) {
	$("#alerts").html(`<div class="alert alert-${type} alert-dismissible fade show" role="alert">${content}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
}

// https://stackoverflow.com/a/175787/3853668
function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}