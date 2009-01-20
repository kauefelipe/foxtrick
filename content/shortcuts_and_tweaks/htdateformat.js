/**
 * HTDateFormat displays week and season next to date
 * @author spambot
 */

FoxtrickHTDateFormat = {

    MODULE_NAME : "HTDateFormat",
    MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
    DEFAULT_ENABLED : true,

    init : function() {
        Foxtrick.registerPageHandler('transfersTeam', this);
        Foxtrick.registerPageHandler('TransfersPlayer', this);
        Foxtrick.registerPageHandler('TransferCompare', this);
        Foxtrick.registerPageHandler('matches', this);
        // Foxtrick.registerPageHandler('match', this);
        Foxtrick.registerPageHandler('matchesarchiv', this);
        Foxtrick.registerPageHandler('teamPageGeneral', this);
        Foxtrick.registerPageHandler('achievements', this);
        Foxtrick.registerPageHandler('teamevents', this);
        Foxtrick.registerPageHandler('history', this);
        Foxtrick.registerPageHandler('arena', this);
    },

    run : function(page, doc) {

        var httime = doc.getElementById( "time" ).innerHTML;

        HT_date = getDatefromCellHTML( httime );
        if (!HT_date) return;

        var mainBody = doc.getElementById( "mainBody" );
        if (!mainBody) return;
        
        switch ( page ) {

            case 'transfersTeam' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;

            case 'TransfersPlayer' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;
/*
            case 'match' :
                this._modifyDates ( mainBody, false, 'div', '&nbsp;' , '' );
                break;
*/                
            case 'matches' :
                modifyDates ( mainBody, false, 'td', '&nbsp;' , '' );
                break;

            case 'matchesarchiv' :
                modifyDates ( mainBody, false, 'span', '&nbsp;' , '' );
                break;
                
            case 'teamPageGeneral' :
                modifyDates ( mainBody, false, 'span', '&nbsp;', '' );
                modifyDates ( mainBody, false, 'td', '&nbsp;', '' );
                break;

            case 'TransferCompare' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;
                
            case 'achievements' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;
                
            case 'teamevents' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;
                
            case 'history' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;                

            case 'arena' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' );
                break;
        }
    },

	change : function( page, doc ) {

	}
};
