# PowerShell script to batch convert JS/JSX files to TS/TSX
# Run this from the project root directory

Write-Host "Starting batch conversion from JS/JSX to TS/TSX..." -ForegroundColor Green

# Function to rename and update imports
function ConvertJSToTS {
    param(
        [string]$directory,
        [string]$oldExt,
        [string]$newExt
    )
    
    $files = Get-ChildItem -Path $directory -Filter "*$oldExt" -Recurse -File
    
    foreach ($file in $files) {
        $newName = $file.Name -replace [regex]::Escape($oldExt), $newExt
        $newPath = Join-Path $file.DirectoryName $newName
        
        Write-Host "Converting: $($file.FullName) -> $newPath" -ForegroundColor Yellow
        Rename-Item -Path $file.FullName -NewName $newName
    }
}

# Convert all remaining .js files to .ts
ConvertJSToTS -directory "src" -oldExt ".js" -newExt ".ts"

# Convert all remaining .jsx files to .tsx  
ConvertJSToTS -directory "src" -oldExt ".jsx" -newExt ".tsx"

Write-Host "`nConversion complete!" -ForegroundColor Green
Write-Host "Note: You may need to fix type errors manually." -ForegroundColor Cyan
