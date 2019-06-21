//スプレッドシートIDを入力
SSID = '';

//Parserライブラリを追加してください。 リソース→ライブラリ→ライブラリを追加
//↓ライブラリのプロジェクトキー
//1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw


function main() {
  // POSTデータ
  //八王子中央自動車学校のヘッダーは以下の通りです。
  //学校が違う場合はそのサイトでログインをし
  //ブラウザの開発者モードを開き Networkからheader情報を確認して payloadを入力
  var payload = {
    'b.studentId': '', //教習生ID
    'b.password': '', //パスワード
    'method:doLogin': '(unable to decode value)',
    'b.wordsStudentNo': '(unable to decode value)',
    'b.processCd': '',
    'b.kamokuCd': '',
    'b.schoolCd': 'rjQzPRpmRuY+brGQYS+1OA==',
    'index': '',
    'server': 'el25aspa'
  }
  // POSTオプション
  var options = {
    "method": "POST",
    "payload": payload
  }

  // アクセス先
  var url = "https://www.e-license.jp/el25/pc/p01a.action"
  // POSTリクエスト
  var response = UrlFetchApp.fetch(url, options);
  // HTML結果を取
  var content = response.getContentText("SHIFT-JIS");
  var main_html = Parser.data(content).from('<table class="set" cellspacing="1">').to('</table>').build();

  // Logger.log(content);

  var counter = function(str, seq) {
    return str.split(seq).length - 1;
  }

  var aki = counter(main_html,'<td class="status1">')

  if (getLog() == main_html) {
//    var today = new Date();
    Logger.log('前回と同じデータです');
//    slackPost(today + '\n【現在空き状況: ' + aki + '件】');
  } else {
    Logger.log('変更点が見つかりました');
    slackPost('【現在空き状況: '+aki+'件】\n予約状況に変化がありました！！\n https://www.e-license.jp/el25/pc/index.action?abc=rjQzPRpmRuY%2BbrGQYS%2B1OA%3D%3D&senisakiCd=4');
  }

  updateLog(main_html);
}
//予約状況のDOMを保存
function updateLog(value) {
  //スプレッドシートIDを入力
  var spreadsheet = SpreadsheetApp.openById(SSID);
  //
  var sheet = spreadsheet.getSheetByName('シート1');
  sheet.getRange("A1").setValue(value);
}

//保存した予約状況を取得
function getLog() {
  var spreadsheet = SpreadsheetApp.openById(SSID);
  var sheet = spreadsheet.getSheetByName('シート1');
  html = sheet.getRange("A1").getValue();

  Logger.log(html);

  return html;
}

function slackPost(msg) {

  var postUrl = ''; //https://hooks.slack.com/services/から始まる URL HOOKを入力
  var username = '教習BOT'; // 通知時に表示されるユーザー名
  var icon = ':hatching_chick:'; // 通知時に表示されるアイコン
  var message = msg;
  var jsonData = {
    "username": username,
    "icon_emoji": icon,
    "text": message
  };
  var payload = JSON.stringify(jsonData);

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": payload
  };

  UrlFetchApp.fetch(postUrl, options);
}
