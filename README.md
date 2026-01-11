# Nova Pulse モダンUIデモ

このリポジトリは、モダンなUI表現とインタラクションを備えたシングルページのデモサイトです。
`index.html` に HTML・CSS・JavaScript をまとめ、以下の要素を実装しています。

## 収録内容
- ガラスモーフィズム風のレイアウトと配色
- レスポンシブなヒーロー / 機能 / ロードマップセクション
- ダークモード切り替え（Theme Toggle）
- スムーススクロールCTA
- 数値カウンターのアニメーション
- スクロール時のフェードアップ演出
- Canvas を使った波形アニメーション

## 使い方
ブラウザで `index.html` を開くだけで表示できます。ローカルサーバーで確認する場合は以下を実行してください。

```bash
python -m http.server 8000
```

起動後に `http://localhost:8000/index.html` にアクセスします。

## ファイル構成
- `index.html` : サイト本体（HTML / CSS / JavaScript を内包）
- `README.md` : この説明
