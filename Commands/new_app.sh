echo "App 名称: "
read appname
touch "Apps/${appname}.html"
echo "<!DOCTYPE html>
<html lang=\"en\">

<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>App</title>
    <link rel=\"stylesheet\" href=\"../StyleSheet/font.css\" />
</head>

<body>
</body>

</html>" > "Apps/${appname}.html"
