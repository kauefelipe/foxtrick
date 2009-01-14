/**
 * module.js
 * @author Mod-PaV
 * Tools allowing modules to register and listen for events,
 * such as particular page loads.
 */
////////////////////////////////////////////////////////////////////////////////
/** Hattrick pages that modules can run on.
 * Those values are simply taken from the hattrick URL, so when the current
 * url contains e.g. "Forum/Read" AND we are on hattrick, all the modules
 * registered to listen to "forumViewThread" will have their run() functions
 * called.
 * You can add new values here, just remember to escape slashes with
 * backslashes (as you can see below).
 */
Foxtrick.ht_pages = { 
    'all'                       : '\/',
    'myhattrick'                : '\/MyHattrick\/',                        
    'forum'                     : '\/Forum\/',
    'forumViewThread'           : '\/Forum\/Read',
    'forumWritePost'            : '\/Forum\/Write',
    'forumSettings'             : '\/MyHattrick\/Preferences\/ForumSettings.aspx',
    'bookmarks'                 : '\/MyHattrick\/Bookmarks',
    'league'                    : '\/World\/Series\/Default\.aspx',
    'country'                   : '\/World\/Leagues\/League\.aspx',
    'challenges'                : '\/Club\/Challenges\/',
    'economy'                   : '\/Club\/Finances\/',
    'youthoverview'             : '\/Club\/Youth\/Default\.aspx',
    'arena'                     : '\/Club\/Arena\/Default\.aspx',
    'coach'                     : '\/Club\/Training\/ChangeCoach\.aspx',
    'transfer'                  : '\/Club\/Transfers',
    'TransferCompare'           : '\/Club\/Transfers\/TransferCompare',
    'match'                     : '\/Club\/Matches\/Match.aspx',
    'matchLineup'               : '\/Club\/Matches\/MatchLineup.aspx',
    'matchOrders'               : '\/MatchOrders\.aspx',
    'flagCollection'            : '\/Club\/Flags\/',
    'transferListSearchForm'    : '\/World\/Transfers\/',
    'transferListSearchResult'  : '\/World\/Transfers\/TransfersSearchResult.aspx',
    'teamPage'                  : '\/Club\/\\?TeamID',
    'teamPageGeneral'           : '\/Club\/|\/World\/Series\/',
    'players'                   : '\/Club\/Players\/|\/Club\/NationalTeam\/NTPlayers\.aspx',
    'playerdetail'              : '\/Club\/Players\/Player\.aspx',
    'YouthPlayers'              : 'YouthPlayers\.aspx',
    'YouthPlayer'               : 'YouthPlayer\.aspx',
    'training'                  : '\/Club\/Training\/',
    'managerRedir'              : '\/Club\/Manager\/|\/Forum\/Read|\/Club',
    'managerPage'               : '\/Club\/Manager\/',
    'finances'                  : '\/Club\/Finances/',
    'federation'                : '\/Community\/Federations\/Federation\.aspx',
    'national'                  : '\/Club\/NationalTeam\/NationalTeam\.aspx',
};
////////////////////////////////////////////////////////////////////////////////