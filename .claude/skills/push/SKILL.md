---
name: push
description: |
  現在の変更内容を分析してアトミックなコミットに分割し、リモートリポジトリにプッシュする。
  PRが存在する場合はdescriptionとの整合性も確認する。main/develop/releaseへの直接pushは必ず確認する。
  使用場面:
  (1) /push で明示的に実行
  (2) 「コミットしてpushして」「リモートに反映して」等の依頼時
  (3) 実装完了後にブランチを更新したい時
  トリガー例: 「pushして」「commit & push」「リモートに上げて」
---

<!--
このファイルは自動生成されます。編集しないでください。
編集する場合は .ai-context/skills/push/SKILL.md を編集してください。
変更は `pnpm ai-context:generate` で反映されます。
-->

# コミット＆プッシュ

現在の変更内容を分析してコミットを作成し、リモートリポジトリにプッシュしてください。

以下の手順で実行してください：

1. `git status`と`git diff --stat`で変更内容の規模を確認
2. 大きな変更の場合は、以下の基準で複数のコミットに分割：
   - 異なるパッケージ/アプリへの変更は別々にコミット
   - 機能追加とそのテストは別々にコミット
   - リファクタリングと新機能は別々にコミット
   - ドキュメント更新は独立したコミット
   - 10ファイル以上の変更は論理的な単位で分割を検討
3. 各コミットごとに：
   a. `git add -p`または`git add <specific files>`で段階的にステージング
   b. 新規作成・編集したファイルをフォーマット: `biome format --write .`
   c. 変更の種類を判断（feat, fix, chore, docs, style, refactor, test）
   d. 日本語で分かりやすいコミットメッセージを作成
   e. 以下の形式でコミット：

   ```
   <type>(<scope>): <subject>

   <body>
   ```

   例：

   ```bash
   git add packages/db/src/schema.ts
   git commit -m "feat(db): ユーザーテーブルに新しいカラムを追加"
   ```

4. すべての変更がコミットされるまで手順3を繰り返す
5. 現在のブランチを確認: `git branch --show-current`
6. **重要**: ブランチがmain、develop、releaseの場合は必ずユーザーに確認を取る
   - 「現在のブランチは[branch-name]です。直接プッシュしてもよろしいですか？」と確認
   - ユーザーの承認を得てから次に進む
7. プッシュ前のPR description確認:
   - `gh pr view --json number,body,baseRefName` でPRの存在とベースブランチを確認
   - PRが存在しない場合: このステップをスキップ
   - PRが存在する場合: `git diff origin/<baseRefName>...HEAD` でローカルの全変更（未プッシュ分含む）とdescriptionに齟齬がないか確認し、齟齬があれば `gh pr edit --body` で更新する（齟齬がなければスキップしたことを伝える）
8. リモートリポジトリにプッシュ:
   - 新しいブランチの場合: `git push -u origin <branch-name>`
   - 既存のブランチの場合: `git push`
   - 必要に応じて: `git push --force-with-lease`（履歴の書き換えがある場合）

注意事項：

- このプロジェクトのコミットメッセージは基本的に日本語で記述
- scopeには影響を受けるパッケージ名やアプリ名を含める（例: web, mobile, api, db）
- 変更内容を具体的に説明する
- 破壊的変更がある場合は明記する
- 各コミットは独立してビルド可能な状態を保つ
- 関連する変更はできるだけ同じコミットにまとめる
- **main、develop、releaseブランチへの直接プッシュは必ずユーザーの確認を取る**
- フォースプッシュは慎重に行う
- **重要**: `git push` コマンドを実行する際は、必ずサンドボックス外で実行すること
  - `required_permissions: ['git_write']` または `['all']` を指定して実行する
  - これにより GitHub への認証エラーを回避できる

$ARGUMENTS