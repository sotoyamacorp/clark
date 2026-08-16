## X Articles専用ヘッダー画像 生成プロンプト

### 仕様
- アスペクト比: 横長 5:2(例: 2000x800px または 2500x1000px)
- 主要要素は中央の安全領域に配置(左右端がトリミングされても崩れないように)
- ロゴ・透かし・読めない生成文字(装飾的なグラフの軸ラベル程度なら可、長文は不可)は入れない
- ブランドカラー: ネイビー(濃紺、#0a1e3f系のグラデーション)+ ゴールドアクセント(#d4a53d系)

### プロンプト本文

A wide, professional business/finance editorial header image in 5:2 aspect ratio. Deep navy blue gradient background (dark navy to slightly lighter navy), evoking a modern financial/economic report aesthetic. In the center-safe area, a clean, minimalist upward-trending bar chart or ascending bar graph rendered in gold/amber accent color, symbolizing rising investment approvals. Subtle geometric line patterns suggestive of a world map or trade routes faintly visible in the background, very subtle and low-opacity, not distracting. No readable text, no logos, no watermarks, no specific flags. A subtle golden upward arrow or growth line overlays the bar chart. The overall mood is corporate, credible, data-driven, and optimistic but measured — appropriate for a business publication covering foreign direct investment trends in Southeast Asia. High-quality, clean vector-illustration style, plenty of negative space in the center-safe zone for potential text overlay by the platform. Avoid clutter; keep composition simple and elegant.

### 補足
- 通貨記号(₱やペソマーク)や国旗などの具体的な図像は誤読・誤情報リスクがあるため避ける。抽象的な棒グラフ・成長曲線モチーフに留める。
- 生成後は`x-article-cover.png`として本フォルダに保存する。
