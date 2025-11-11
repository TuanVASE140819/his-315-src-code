# Script to rename JS/JSX files to TS/TSX
# This script will be used to batch convert remaining files

$files = @(
    # Redux sagas
    "src/redux/sagas/userSaga.js",
    "src/redux/sagas/categorySaga.js",
    "src/redux/sagas/teamSaga.js",
    "src/redux/sagas/leagueSaga.js",
    "src/redux/sagas/gameSaga.js",
    "src/redux/sagas/customerSaga.js",
    
    # Utils
    "src/utils/formattedNumber.js",
    
    # Schemas  
    "src/schemas/categorySchemas.js",
    "src/schemas/leagueSchemas.js",
    "src/schemas/teamSchemas.js",
    "src/schemas/userSchemas.js"
)

foreach ($file in $files) {
    $fullPath = "d:\0_315\frontend-his-phusan315v2\$file"
    if (Test-Path $fullPath) {
        $newPath = $fullPath -replace "\.js$", ".ts"
        Copy-Item $fullPath $newPath
        Write-Host "Copied: $file -> $newPath"
    }
}
