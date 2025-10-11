# Fix page.tsx field names for Django API
$content = Get-Content "src\app\(public)\page.tsx" -Raw

# Replace field names
$content = $content -replace '\.imageUrl', '.image'
$content = $content -replace '\.publishedAt', '.publish_date'
$content = $content -replace '\.startDate', '.publish_date'

# Remove non-existent fields
$content = $content -replace 'item\.description', 'item.title'
$content = $content -replace 'event\.description', 'event.title'
$content = $content -replace 'news\.description', 'news.title'
$content = $content -replace 'upcomingEvents\[0\]\.description', 'upcomingEvents[0].title'

# Remove slug references
$content = $content -replace '(\$\{[^}]+)\.slug \|\| ([^}]+\.id\})', '$1$2'

# Remove status/level checks - replace with simple text
$content = $content -replace '\{item\.level === [^}]+\}', '{item.tags?.[0] || "عمومی"}'
$content = $content -replace '\{event\.status === [^}]+\}', '{"جدید"}'
$content = $content -replace '\{upcomingEvents\[0\]\.status === [^}]+\}', '{"آینده"}'

# Remove viewCount
$content = $content -replace '\{[^}]*\.viewCount \|\| 0\}', '{0}'

$content | Set-Content "src\app\(public)\page.tsx"

Write-Host "Fixed page.tsx successfully!"
