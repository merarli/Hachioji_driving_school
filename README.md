# Hachioji_driving_school
 八王子中央自動車学校のWeb予約システムで予約状況が変化したらSlack通知するシステム

## 実行方法
 - Google Apps Scriptを使います。
 - Googleスプレッドシートから[ツール]→[スクリプトエディタ]を開き,
コード.gsにソースコードを貼り付ける

 - ``SSID``にスプレッドシートのIDを入力してください
 - ``payload``のheader情報がわからない場合は、手動でログインする際にブラウザの開発者モードから確認できます。(Chromeならページを右クリックで[検証]→[Network])

## トリガー設定
 - スクリプトエディタの[編集]→[現在のプロジェクトのトリガー]から[トリガーを追加]
 - 実行する関数を選択 : main
 - 実行するデプロイを選択 : header
 - イベントのソースを選択 : 時間主導型
 - 時間ベースのトリガータイプを選択 : 分
 - 時間の感覚を選択(分) : 15分おき


 **トリガーの間隔はサーバに負担がかからないようにしてください**

 **一般的なスクレイピングのルールの範囲で使用してください**


## ライブラリ
 **Parser** ライブラリを追加してください。 リソース→ライブラリ→ライブラリを追加

ライブラリのプロジェクトキー
 ```
 1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw
 ```
