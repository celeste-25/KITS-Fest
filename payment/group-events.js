const sheetName = 'Sheet1'; 
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getUserLock();
  lock.waitLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    const nextRow = sheet.getLastRow() + 1;

    const playerNames = e.parameter.playerNames || '';
    const email = e.parameter.email || '';
    const year = e.parameter.year || '';
    const branch = e.parameter.branch || '';
    const registrationNumber = e.parameter.registrationNumber || '';
    const event = e.parameter.event || '';

    sheet.appendRow([new Date(), playerNames, email, year, branch, registrationNumber, event]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
