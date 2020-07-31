# Product_app

画像投稿のデモアプリケーションです。

## How to use

このアプリケーションを動かす場合は、まずリポジトリを手元にクローンしてください。
次に以下のコマンドで、RubyGemsをインストールしてください。

```
$ bundle install --without production
```

その後、データベースのマイグレーションを実行します。

```
$ rails db:migrate
```

最後にテストを実行し、正常に動作しているか確認してください。

```
$ rails test
```

テストがパスしたらRailsサーバーを立ち上げる準備が整っているはずです。

``` 
$ rails server
```

ログインの必要はありません。