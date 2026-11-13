/**
 * Kini.Com.Bd visitor counter — Google Apps Script Web App.
 *
 * Setup (once):
 *   1. Open https://script.google.com → New project, and replace the default code with this file.
 *   2. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   3. Copy the Web app URL (it ends with /exec) and paste it into
 *      Admin Panel → "অ্যানালিটিক্স লিংক সেটআপ (Visitor Counter URL)" → "লিংক সেভ করুন".
 *
 * Endpoints (GET or POST, parameters in the query string):
 *   ?action=visit&sid=ID   count one visit and mark the session live
 *   ?action=ping&sid=ID    keep the session live
 *   ?action=leave&sid=ID   drop the session from the live count
 *   ?action=stats          -> { "ok": true, "live": 3, "total": 1280 }
 *
 * Only an anonymous random session id is stored; no personal data.
 */

var LIVE_TIMEOUT_SECONDS = 70;   // a session is "live" if it pinged within this window (the site pings every 25s)
var MAX_SESSIONS = 1500;         // keeps the cached list well under the 100 KB cache limit
var SESSIONS_KEY = 'kc_sessions';
var TOTAL_KEY = 'kc_total_visits';

function doGet(e) { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  var params = (e && e.parameter) || {};
  var action = String(params.action || 'stats');
  var sid = String(params.sid || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32);
  var result;
  try {
    if (action === 'stats') {
      result = stats(loadSessions());
    } else if (sid && (action === 'visit' || action === 'ping' || action === 'leave')) {
      result = update(action, sid);
    } else {
      result = { ok: false, error: 'Unknown action or missing sid' };
    }
  } catch (err) {
    result = { ok: false, error: String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function nowSeconds() { return Math.floor(Date.now() / 1000); }

// Returns { sid: lastSeenSeconds } with expired sessions removed.
function loadSessions() {
  var raw = CacheService.getScriptCache().get(SESSIONS_KEY);
  var sessions = {};
  if (raw) { try { sessions = JSON.parse(raw) || {}; } catch (err) { sessions = {}; } }
  var cutoff = nowSeconds() - LIVE_TIMEOUT_SECONDS;
  for (var id in sessions) { if (!(sessions[id] >= cutoff)) delete sessions[id]; }
  return sessions;
}

function totalVisits() {
  return Number(PropertiesService.getScriptProperties().getProperty(TOTAL_KEY)) || 0;
}

function stats(sessions) {
  return { ok: true, live: Object.keys(sessions).length, total: totalVisits() };
}

function update(action, sid) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);          // one writer at a time so counts are never lost
  try {
    var sessions = loadSessions();
    if (action === 'leave') {
      delete sessions[sid];
    } else if (sessions[sid] || Object.keys(sessions).length < MAX_SESSIONS) {
      sessions[sid] = nowSeconds();
    }
    CacheService.getScriptCache().put(SESSIONS_KEY, JSON.stringify(sessions), 21600);
    if (action === 'visit') {
      PropertiesService.getScriptProperties().setProperty(TOTAL_KEY, String(totalVisits() + 1));
    }
    return stats(sessions);
  } finally {
    lock.releaseLock();
  }
}
