/**
 * tables.js
 * adds goal difference to tables
 * @author spambot
 */

'use strict';

Foxtrick.modules.GoalDifferenceToTables = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES: ['oldSeries', 'marathon', 'seriesHistoryNew'],

	CSS: Foxtrick.InternalPath + 'resources/css/goal-diff.css',

	/** @param {document} doc */
	run: function(doc) {
		const module = this;
		const TBL_CLS = 'goal-diff';

		let div = doc.getElementById('mainBody');
		for (let tblPromo of div.querySelectorAll('table')) {
			if (tblPromo.classList.contains(TBL_CLS))
				continue;

			tblPromo.classList.add(TBL_CLS);

			let newTh = Foxtrick.createFeaturedElement(doc, module, 'th');
			Foxtrick.addClass(newTh, 'right');
			let [header] = tblPromo.rows;
			header.appendChild(newTh);
			newTh.textContent = Foxtrick.L10n.getString('seasonstats.goaldiff');

			// eslint-disable-next-line no-magic-numbers
			let goalIdx = 3;
			let [tblBodyObj] = tblPromo.tBodies;
			if (tblBodyObj.querySelector('.series-table-logo'))
				goalIdx += 1;

			for (let row of [...tblBodyObj.rows].slice(1)) {
				if (!row.cells[goalIdx])
					continue;

				let newCell = Foxtrick.insertFeaturedCell(row, module, -1);
				Foxtrick.addClass(newCell, 'right');
				let goals = row.cells[goalIdx].textContent.trim().split('-');
				let [goalsFor, goalsAgainst] = goals.map(g => g.trim());
				if (goalsFor === '') {
					goalsFor = row.cells[goalIdx - 1].textContent.trim();
					goalsAgainst = row.cells[goalIdx + 1].textContent.trim();
				}
				else if (goals.length == 1) {
					[goalsAgainst] =
						row.cells[goalIdx + 1].textContent.trim().split('-').filter(Boolean);
				}

				let result = parseInt(goalsFor, 10) - parseInt(goalsAgainst, 10);
				newCell.textContent = String(result);

				if (result > 0)
					Foxtrick.addClass(newCell, 'ft-gd-positive');
				else if (result == 0)
					Foxtrick.addClass(newCell, 'ft-gd-zero');
				else // result < 0
					Foxtrick.addClass(newCell, 'ft-gd-negative');
			}
		}
	},

	/** @param {document} doc */
	change: function(doc) {
		const module = this;
		module.run(doc);
	},
};
