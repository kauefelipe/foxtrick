/**
 * teamStats.js
 * Foxtrick team overview
 * @author OBarros, spambot, convinced, ryanli
 */
////////////////////////////////////////////////////////////////////////////////
Foxtrick.TeamStats = {

	MODULE_NAME : "TeamStats",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array("players", "YouthPlayers"),
	NEW_AFTER_VERSION : "0.5.2.1",
	LATEST_CHANGE : "Added rows for leadership and personalities.",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	OPTIONS : new Array("General","Speciality","Personality","Status","Current_league"),

	run : function(page, doc) {
		var totalTSI = 0;
		var totalAge = 0;
		var olderThanNineteen = 0;
		var totalExperience = 0;
		var totalLeadership = 0;
		var transferListed = 0;
		var redCards = 0;
		var yellowCards = 0;
		var twoYellowCards = 0;
		var injured = 0;
		var injuredWeeks = 0;
		var bruised = 0;
		var totalAgreeability = 0;
		var totalAggressiveness = 0;
		var totalHonesty = 0;
		var hasSpecialities = false;
		var specialities = {};

		// we don't need to load XML data here
		var playerList = Foxtrick.Pages.Players.getPlayerList(doc);
		if (playerList.length === 0) {
			return;
		}
		for (var i = 0; i < playerList.length; ++i) {
			var current = playerList[i];
			if (current.tsi) {
				totalTSI += current.tsi;
			}
			if (current.age) {
				totalAge += current.age.years * 112 + current.age.days;
			}
			if (current.experience) {
				totalExperience += current.experience;
			}
			if (current.leadership) {
				totalLeadership += current.leadership;
			}
			if (current.age.years >= 19) {
				++olderThanNineteen;
			}
			if (current.speciality) {
				if (!specialities[current.speciality]) {
					hasSpecialities = true;
					specialities[current.speciality] = 0;
				}
				++specialities[current.speciality];
			}
			if (current.transferListed) {
				++transferListed;
			}
			if (current.yellowCard === 1) {
				++yellowCards;
			}
			if (current.yellowCard === 2) {
				++twoYellowCards;
			}
			if (current.redCard) {
				++redCards;
			}
			if (current.injured) {
				++injured;
				injuredWeeks += current.injured;
			}
			if (current.bruised) {
				++bruised;
			}
			if (current.agreeability !== undefined) {
				totalAgreeability += current.agreeability;
			}
			if (current.aggressiveness !== undefined) {
				totalAggressiveness += current.aggressiveness;
			}
			if (current.honesty !== undefined) {
				totalHonesty += current.honesty;
			}
		}

		var table = doc.createElement("table");
		var addHeader = function(label) {
			var row = doc.createElement("tr");
			var header = doc.createElement("th");
			header.setAttribute("colspan", "2");
			header.textContent = label;
			row.appendChild(header);
			table.appendChild(row);
			return row;
		}
		// label and data could either be strings or document nodes
		var addRow = function(label, data) {
			var row = doc.createElement("tr");

			var labelCell = doc.createElement("td");
			labelCell.className = "ch";
			if (typeof(label) === "object") {
				labelCell.appendChild(label);
			}
			else {
				labelCell.textContent = label;
			}
			row.appendChild(labelCell);

			var dataCell = doc.createElement("td");
			if (typeof(data) === "object") {
				dataCell.appendChild(data);
			}
			else {
				dataCell.textContent = data;
			}
			row.appendChild(dataCell);

			table.appendChild(row);
			return row;
		}

		if (Foxtrick.isModuleFeatureEnabled( this, "General")) {
			addHeader(Foxtrickl10n.getString("General"));
			if (totalTSI) {
				var avgTSI = Math.round(totalTSI / playerList.length);
				var data = doc.createElement("span");
				var total = doc.createElement("span");
				total.className = "nowrap";
				total.textContent = Foxtrick.formatNumber(totalTSI, " ");
				var avg = doc.createElement("span");
				avg.className = "nowrap";
				avg.textContent = Foxtrick.formatNumber(avgTSI, " ");
				data.appendChild(total);
				data.appendChild(doc.createTextNode(" / "));
				data.appendChild(avg);
				addRow(Foxtrickl10n.getString("TSI.abbr"), data);
			}
			if (totalAge) {
				var avgAge = Math.round(totalAge / playerList.length);
				var avgYears = Math.floor(avgAge / 112);
				var avgDays = avgAge % 112;
				addRow(Foxtrickl10n.getString("Age"), avgYears + "." + avgDays);
			}
			if (Foxtrick.Pages.Players.isYouthPlayersPage(doc)) {
				var youngerThanNineteen = playerList.length - olderThanNineteen;
				var row = addRow(Foxtrickl10n.getString("foxtrick.TeamStats.PlayerNotToOld.label"), youngerThanNineteen);
				if (youngerThanNineteen < 9) {
					row.className = "red";
				}
				if (olderThanNineteen) {
					var row = addRow(Foxtrickl10n.getString("foxtrick.TeamStats.PlayerToOld.label"), olderThanNineteen);
					row.className = "red";
				}
			}
			if (Foxtrick.Pages.Players.isPropertyInList(playerList, "experience")) {
				var avgExperience = Math.round(totalExperience / playerList.length);
				addRow(Foxtrickl10n.getString("Experience"), Foxtrickl10n.getLevelByTypeAndValue("levels", avgExperience));
			}
			if (Foxtrick.Pages.Players.isPropertyInList(playerList, "leadership")) {
				var avgLeadership = Math.round(totalLeadership / playerList.length);
				addRow(Foxtrickl10n.getString("Leadership"), Foxtrickl10n.getLevelByTypeAndValue("levels", avgLeadership));
			}
		}
		if (Foxtrick.isModuleFeatureEnabled( this, "Speciality")) {
			if (hasSpecialities) {
				addHeader(Foxtrickl10n.getString("Speciality"));
				var specSummary = [];
				for (var speciality in specialities) {
					specSummary.push({ type: speciality, count: specialities[speciality] });
					specSummary.sort(function (a, b) { return a.type.localeCompare(b.type) });
					specSummary.sort(function (a, b) { return b.count - a.count } );
				}
				for (var i in specSummary) {
					addRow(specSummary[i].type, specSummary[i].count);
				}
			}
		}
		if (Foxtrick.isModuleFeatureEnabled( this, "Personality")) {
			if (Foxtrick.Pages.Players.isPropertyInList(playerList, "aggressiveness")
				&& Foxtrick.Pages.Players.isPropertyInList(playerList, "agreeability")
				&& Foxtrick.Pages.Players.isPropertyInList(playerList, "honesty")) {
				addHeader(Foxtrickl10n.getString("Personality"));
				var avgAggressiveness = Math.round(totalAggressiveness / playerList.length);
				var avgAgreeability = Math.round(totalAgreeability / playerList.length);
				var avgHonesty = Math.round(totalHonesty / playerList.length);
				addRow(Foxtrickl10n.getString("Aggressiveness"), Foxtrickl10n.getLevelByTypeAndValue("aggressiveness", avgAggressiveness));
				addRow(Foxtrickl10n.getString("Agreeability"), Foxtrickl10n.getLevelByTypeAndValue("agreeability", avgAgreeability));
				addRow(Foxtrickl10n.getString("Honesty"), Foxtrickl10n.getLevelByTypeAndValue("honesty", avgHonesty));
			}
		}
		if (Foxtrick.isModuleFeatureEnabled( this, "Status")) {
			if (transferListed || yellowCards || twoYellowCards || redCards || bruised || injured) {
				addHeader(Foxtrickl10n.getString("Status"));
			}
			if (transferListed > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/dollar.gif";
				img.className = "transferListed";
				addRow(img, transferListed);
			}
			if (yellowCards > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/yellow_card.gif";
				img.className = "cardsOne";
				addRow(img, yellowCards);
			}
			if (twoYellowCards > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/dual_yellow_card.gif";
				img.className = "cardsTwo";
				addRow(img, twoYellowCards);
			}
			if (redCards > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/red_card.gif";
				img.className = "cardsOne";
				addRow(img, redCards);
			}
			if (bruised > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/bruised.gif";
				img.className = "injuryBruised";
				addRow(img, bruised);
			}
			if (injured > 0) {
				var img = doc.createElement("img");
				img.src = "/Img/Icons/injured.gif";
				img.className = "injuryInjured";

				var data = doc.createElement("span");
				data.textContent = injured;
				data.appendChild(doc.createTextNode(" ("));
				var weeks = doc.createElement("strong");
				weeks.textContent = injuredWeeks;
				data.appendChild(weeks);
				data.appendChild(doc.createTextNode(")"));

				addRow(img, data);
			}
		}
		if (Foxtrick.isModuleFeatureEnabled( this, "Current_league")) {
			if (Foxtrick.Pages.Players.isPropertyInList(playerList, "currentLeagueId")) {
				addHeader(Foxtrickl10n.getString("Current_league"));
				var leagues = [];
				for (var i in playerList) {
					var id = playerList[i].currentLeagueId;
					if (id !== undefined) {
						if (leagues[id] === undefined) {
							leagues[id] = 1;
						}
						else {
							++leagues[id];
						}
					}
				}
				var leagueSummary = [];
				for (var i in leagues) {
					leagueSummary.push({ name: Foxtrick.XMLData.League[i].LeagueName, count: leagues[i] });
				}
				leagueSummary.sort(function (a,b) { return a.name.localeCompare(b.name) });
				leagueSummary.sort(function (a,b) { return b.count - a.count });
				for (var i in leagueSummary) {
					addRow(leagueSummary[i].name, leagueSummary[i].count);
				}
			}
		}
		var ownBoxId = "foxtrick_TeamStats_box";
		var	ownBoxBody = doc.createElement("div");
		ownBoxBody.id = "foxtrick_TeamStats_content";
		ownBoxBody.appendChild(table);
		var header = Foxtrickl10n.getString("foxtrick.TeamStats.label");
		Foxtrick.addBoxToSidebar(doc, header, ownBoxBody, ownBoxId, "last", "");
	}
};
