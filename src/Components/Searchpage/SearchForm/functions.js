export function validateInn(inn) {
	let result = false;
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if ([10, 12].indexOf(inn.length) !== -1 && !(/[^0-9]/.test(inn))) {
		let checkDigit = function (inn, coefficients) {
			let n = 0;
			for (let i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
		switch (inn.length) {
			case 10:
				let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			case 12:
				let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}
				break;
            default: 
		}
	}
	return result;
}

export function validateCountDoc(countDoc) {
	return +countDoc > 0 && +countDoc < 1001
}

export function validateDate(startDate, endDate) {
	let now = new Date()
	return (endDate.getTime() >= startDate.getTime() && endDate.getTime() < now.getTime())
}