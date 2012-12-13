"use strict";
/**
 * matches.js
 * adds att vs def bars on matches page
 * @author taised, Jestar
 */

Foxtrick.modules["AttVsDef"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.MATCHES,
	PAGES : new Array('match', 'matchOld'),
	NICE : -1, // before Ratings
	RADIO_OPTIONS : new Array("newstyle", "oldstyle", "oldstyleifkseparated"),

	run : function(doc) {
		if (Foxtrick.Pages.Match.isPrematch(doc))
			return;

		var ratingstable = Foxtrick.Pages.Match.getRatingsTable(doc);
		if (ratingstable == null) return;
		if (Foxtrick.Pages.Match.isWalkOver(ratingstable)) return;

		var header = Foxtrickl10n.getString("matches.attackdefensebars" );

		var bodydiv=Foxtrick.createFeaturedElement(doc, this, 'div');
		var bodydivid = "foxtrick_attvsdefbars_content";
		bodydiv.setAttribute( "id", bodydivid );

		if (Foxtrick.Pages.Match.isCorrectLanguage(ratingstable)) {
			if (FoxtrickPrefs.getInt("module." + this.MODULE_NAME + ".value") >= 1) {
				this._oldStyleBars(doc, ratingstable, bodydiv);
			}
			else {
				this._newStyleBars(doc, ratingstable, bodydiv);
			}
		} else {
			bodydiv.textContent = Foxtrickl10n.getString("matches.wronglang");
		}
		if(!Foxtrick.Pages.Match.hasNewRatings(doc))
			Foxtrick.addBoxToSidebar(doc, header, bodydiv, 1);
		else Foxtrick.Pages.Match.addBoxToSidebar(doc, header, bodydiv, 1);

		if (Foxtrick.util.layout.isStandard(doc) && FoxtrickPrefs.getInt("module." + this.MODULE_NAME + ".value") == 0) bodydiv.parentNode.style.padding='8px 6px 15px';
	},

	_oldStyleBars: function (doc, ratingstable, bodydiv) {
		var ratingsArray = new Array();
		var ratingsTextArray = new Array();
		for (var i = 2; i <= 7; i++) { // normal ratings in rows 2 to 7
			ratingsArray.push(new Array(Foxtrick.Pages.Match.getStatFromCell(ratingstable.rows[i].cells[1]), Foxtrick.Pages.Match.getStatFromCell(ratingstable.rows[i].cells[2])));
			ratingsTextArray.push(new Array(ratingstable.rows[i].cells[1], ratingstable.rows[i].cells[2]));
		}

		if ( Foxtrick.Pages.Match.hasIndSetPieces(ratingstable) ) { 
			// if there are ratings for indirect free kicks, they are in rows 10 and 11
			for (var i = 10; i <= 11; i++) {
				ratingsArray.push(new Array(Foxtrick.Pages.Match.getStatFromCell(ratingstable.rows[i].cells[1]), Foxtrick.Pages.Match.getStatFromCell(ratingstable.rows[i].cells[2])));
				ratingsTextArray.push(new Array(ratingstable.rows[i].cells[1], ratingstable.rows[i].cells[2]));
			}
		}

		Foxtrick.util.inject.cssLink(doc, Foxtrick.InternalPath+"resources/css/matchgraphs.css");

		var rText = Foxtrickl10n.getString( "match.ratings.rightshort" );
		var cText = Foxtrickl10n.getString( "match.ratings.centershort" );
		var lText = Foxtrickl10n.getString( "match.ratings.leftshort" );
		var iText = Foxtrickl10n.getString( "match.ratings.ifkshort" );

		var barsdiv = doc.createElement("div");
		barsdiv.className = "foxtrick-showgraphs";

		var tablediv = doc.createElement("div");
		tablediv.className = "foxtrick-graphs-table";
		var p = doc.createElement('div');
		p.className = "foxtrick-graphs-header";
		p.textContent = Foxtrickl10n.getString( "matches.defense" ) + " - " + Foxtrickl10n.getString( "matches.attack" );
		barsdiv.appendChild(p);
		this._createGraphRow(doc, tablediv, ratingsArray[0][0], ratingsArray[5][1], rText, lText, ratingsTextArray[0][0], ratingsTextArray[5][1]);
		this._createGraphRow(doc, tablediv, ratingsArray[1][0], ratingsArray[4][1], cText, cText, ratingsTextArray[1][0], ratingsTextArray[4][1]);
		this._createGraphRow(doc, tablediv, ratingsArray[2][0], ratingsArray[3][1], lText, rText, ratingsTextArray[2][0], ratingsTextArray[3][1]);
		if ((ratingsArray.length > 6) && (FoxtrickPrefs.getInt("module." + this.MODULE_NAME + ".value") == 1)) {
			tablediv.appendChild(doc.createElement('br'));
			this._createGraphRow(doc, tablediv, ratingsArray[6][0], ratingsArray[7][1], iText, iText, ratingsTextArray[6][0], ratingsTextArray[7][1]);
		}
		barsdiv.appendChild(tablediv);
		barsdiv.appendChild(doc.createElement('br'));

		var tablediv = doc.createElement("div");
		tablediv.className = "foxtrick-graphs-table";
		var p = doc.createElement('div');
		p.className = "foxtrick-graphs-header";
		p.textContent = Foxtrickl10n.getString( "matches.attack" ) + " - " + Foxtrickl10n.getString( "matches.defense" );
		barsdiv.appendChild(p);
		this._createGraphRow(doc, tablediv, ratingsArray[3][0], ratingsArray[2][1], rText, lText, ratingsTextArray[3][0], ratingsTextArray[2][1]);
		this._createGraphRow(doc, tablediv, ratingsArray[4][0], ratingsArray[1][1], cText, cText, ratingsTextArray[4][0], ratingsTextArray[1][1]);
		this._createGraphRow(doc, tablediv, ratingsArray[5][0], ratingsArray[0][1], lText, rText, ratingsTextArray[5][0], ratingsTextArray[0][1]);
		if ((ratingsArray.length > 6) && (FoxtrickPrefs.getInt("module." + this.MODULE_NAME + ".value") == 1)) {
			tablediv.appendChild(doc.createElement('br'));
			this._createGraphRow(doc, tablediv, ratingsArray[7][0], ratingsArray[6][1], iText, iText, ratingsTextArray[7][0], ratingsTextArray[6][1]);
		}
		barsdiv.appendChild(tablediv);
		barsdiv.appendChild(doc.createElement('br'));

		if ((ratingsArray.length > 6) && (FoxtrickPrefs.getInt("module." + this.MODULE_NAME + ".value") == 2)) {
			var tablediv = doc.createElement("div");
			tablediv.className = "foxtrick-graphs-table";
			var p = doc.createElement('div');
			p.className = "foxtrick-graphs-header";
			p.textContent = Foxtrickl10n.getString( "matches.indfreekick" );
			barsdiv.appendChild(p);
			this._createGraphRow(doc, tablediv, ratingsArray[6][0], ratingsArray[7][1], iText, iText, ratingsTextArray[6][0], ratingsTextArray[7][1]);
			this._createGraphRow(doc, tablediv, ratingsArray[7][0], ratingsArray[6][1], iText, iText, ratingsTextArray[7][0], ratingsTextArray[6][1]);
			barsdiv.appendChild(tablediv);
			barsdiv.appendChild(doc.createElement('br'));
		}

		bodydiv.appendChild(barsdiv);
	},

	_newStyleBars: function (doc, ratingstable, bodydiv) {
		var sidebar = doc.getElementById("sidebar");
		var percentArray=this._getPercentArray(doc, ratingstable);
		var balldivnumber=7;
		if (Foxtrick.util.id.findIsYouthMatch(doc.location.href)) {
			balldivnumber=5; //youth haven't the kit div
		}

		 var strangediv = doc.createElement('div');
		 strangediv.setAttribute('style','clear: both;')

		var rdefText = Foxtrickl10n.getString( "matches.right" )+' '+Foxtrickl10n.getString( "matches.defense" );
		var lattText = Foxtrickl10n.getString( "matches.left" )+' '+Foxtrickl10n.getString( "matches.attack" );
		var cdefText = Foxtrickl10n.getString( "matches.center" )+' '+Foxtrickl10n.getString( "matches.defense" );
		var cattText = Foxtrickl10n.getString( "matches.center" )+' '+Foxtrickl10n.getString( "matches.attack" );
		var rattText = Foxtrickl10n.getString( "matches.right" )+' '+Foxtrickl10n.getString( "matches.attack" );
		var ldefText = Foxtrickl10n.getString( "matches.left" )+' '+Foxtrickl10n.getString( "matches.defense" );
		var ifkdefText = Foxtrickl10n.getString( "matches.indfreekick" )+' '+Foxtrickl10n.getString( "matches.defense" );
		var ifkattText = Foxtrickl10n.getString( "matches.indfreekick" )+' '+Foxtrickl10n.getString( "matches.attack" );

		var labelArray=new Array(	rdefText+' - '+lattText,
									cdefText+' - '+cattText,
									ldefText+' - '+rattText,
									rattText+' - '+ldefText,
									cattText+' - '+cdefText,
									lattText+' - '+rdefText,
									ifkdefText+' - '+Foxtrickl10n.getString( "matches.attack" ),
									ifkattText+' - '+Foxtrickl10n.getString( "matches.defense" ));

		for (var i=0; i<percentArray.length; i++) {
			bodydiv.appendChild( doc.createTextNode(labelArray[i]) );
			bodydiv.appendChild( doc.createElement("br") );
			bodydiv.appendChild( this._createTextBox(doc, percentArray[i]) );
			var bardiv=doc.createElement('div');
			bardiv.className="possesionbar";
			var img1 = doc.createElement('img');
			img1.src = "/Img/Matches/filler.gif";
			img1.width = percentArray[i];
			img1.height = 10;
			bardiv.appendChild(img1);
			var img2 = doc.createElement('img');
			img2.src = "/Img/Matches/possesiontracker.gif";
			bardiv.appendChild(img2);
			bodydiv.appendChild(bardiv);
			bodydiv.appendChild(this._createTextBox(doc, 100-percentArray[i]));

			bodydiv.appendChild(strangediv.cloneNode(true));
		}
	},

	_createTextBox: function(doc, percentage) {
		var textdiv=doc.createElement('div');
		textdiv.className='float_left shy smallText';

		var inner;
		if (percentage > 50) {
			var strong = doc.createElement("strong");
			textdiv.appendChild(strong);
			inner = strong;
		}
		else {
			inner = textdiv;
		}
		inner.textContent = percentage + "%"

		return textdiv;
	},

	_displayableRatingLevel: function(val) {
		val = new String(val);
		if (val.search(/\./i) == -1) return val + "--";
		val = val.replace(/\.75/i, "++");
		val = val.replace(/\.5/i, "+");
		val = val.replace(/\.25/i, "-");

		return val;
	},

	_createGraphRow: function (doc, div, val1, val2, text1, text2, tooltip1, tooltip2) {

			var color1 = "#FFFFFF";
			var color2 = "#849D84";
			var fgcolor1 = "#000000";
			var fgcolor2 = "#000000";

			var pt1 = Math.round(100 * val1 / (val1 + val2));
			var pt2 = 100 - pt1;

		 var cellwidth = 50;

		 var row = doc.createElement("div");
		 row.className = "foxtrick-graphs-row";
		 div.appendChild(row);

		 var cell = doc.createElement("div");
		 cell.className = "foxtrick-graphs-cell";
		 cell.textContent = pt1 + "%";
		 row.appendChild(cell);

		 cell = doc.createElement("div");
		 row.appendChild(cell);
		 cell.className = "foxtrick-graphs-left-bar";

		 var innercellA = doc.createElement("div");
		 innercellA.className = "foxtrick-graphs-bar-container";
		 innercellA.style.backgroundColor = color1;
		 cell.appendChild(innercellA);

		 var innercellB = doc.createElement("div");
		 innercellB.className = "foxtrick-graphs-bar-inner";
		 innercellB.style.backgroundColor = color2;
		 innercellA.appendChild(innercellB);

		 var span = doc.createElement("span");
		 span.textContent = "\u00a0";
		 innercellA.appendChild(span);

		 var innercellC = doc.createElement("div");
		 innercellC.className = "foxtrick-graphs-bar-values";
		 innercellA.appendChild(innercellC);
		 innercellC.textContent = text1 + " " + this._displayableRatingLevel(val1+1);
		 innercellC.style.color = fgcolor1;
		 innercellC.style.paddingLeft = "2px";

		 var val = Math.round((pt1/50)*cellwidth);

		 innercellB.style.left = val + "px";
		 innercellB.style.width = ((50-val > 0) ? 50-val  : 0) + "px";

		 cell.title = tooltip1.textContent;

		 cell = doc.createElement("div");
		 row.appendChild(cell);
		 cell.className = "foxtrick-graphs-right-bar";
		 cell.style.backgroundColor = color2;
		 val = Math.round((pt2/50)*cellwidth);
		 val = (cellwidth-val);

		 innercellA = doc.createElement("div");
		 innercellA.className = "foxtrick-graphs-bar-container";
		 innercellA.style.backgroundColor = color2;
		 cell.appendChild(innercellA);

		 innercellB = doc.createElement("div");
		 innercellB.className = "foxtrick-graphs-bar-inner";
		 innercellB.style.backgroundColor = color1;
		 innercellB.style.width = (val > 0 ? val : 0) + "px";
		 innercellA.appendChild(innercellB);

		 span = doc.createElement("span");
		 span.textContent = "\u00a0";
		 innercellA.appendChild(span);

		 innercellC = doc.createElement("div");
		 innercellC.className = "foxtrick-graphs-bar-values";
		 innercellA.appendChild(innercellC);
		 innercellC.textContent = this._displayableRatingLevel(val2+1) + " " + text2;
		 innercellC.style.textAlign = "right";
		 innercellC.style.color = fgcolor2;
		 innercellC.style.paddingRight = "2px";

		 cell.title = tooltip2.textContent;

		 cell = doc.createElement("div");
		 cell.className = "foxtrick-graphs-cell";
		 cell.textContent = pt2 + "%";
		 row.appendChild(cell);
	},

	_getPercentArray: function(doc, table) {
		var values=new Array();

		for (var j=2;j<8;j++)
		{
			var val1=Foxtrick.Pages.Match.getStatFromCell(table.rows[j].cells[1]);
			var val2=Foxtrick.Pages.Match.getStatFromCell(table.rows[9-j].cells[2]);
			var percentage=(val1/(val1+val2))*100;
			values.push(Math.round(percentage));
		}
		if ( Foxtrick.Pages.Match.hasIndSetPieces(table) ) {
			// if there are ratings for indirect free kicks, they are in rows 10 and 11
			val1=Foxtrick.Pages.Match.getStatFromCell(table.rows[10].cells[1]);
			val2=Foxtrick.Pages.Match.getStatFromCell(table.rows[11].cells[2]);
			percentage=(val1/(val1+val2))*100;
			values.push(Math.round(percentage));
			val1=Foxtrick.Pages.Match.getStatFromCell(table.rows[11].cells[1]);
			val2=Foxtrick.Pages.Match.getStatFromCell(table.rows[10].cells[2]);
			percentage=(val1/(val1+val2))*100;
			values.push(Math.round(percentage));
		}

		return values;
	}
};