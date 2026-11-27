/**
 * SALIN KODE INI KE GOOGLE APPS SCRIPT (Extensions > Apps Script di Google Sheets Anda)
 * Buat header kolom pada baris 1 sheet bernama "RSVP":
 * Kolom A: Waktu | Kolom B: Nama | Kolom C: Jumlah Tamu | Kolom D: Status | Kolom E: Ucapan
 */
const SHEET_NAME = "RSVP";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nama || "",
      data.jumlah || "",
      data.status || "",
      data.ucapan || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const result = [];

  for (let i = rows.length - 1; i >= 1; i--) {
    result.push({
      waktu: rows[i][0],
      nama: rows[i][1],
      jumlah: rows[i][2],
      status: rows[i][3],
      ucapan: rows[i][4]
    });
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}