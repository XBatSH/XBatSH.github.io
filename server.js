const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save-post', (req, res) => {
    const { title, content, imageUrl } = req.body;
    const fileName = `post_${Date.now()}.html`;
    const filePath = path.join(__dirname, fileName);
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <p>${content}</p>
    ${imageUrl ? `<img src="${imageUrl}" alt="博客图片">` : ''}
</body>
</html>
    `;

    fs.writeFile(filePath, htmlContent, (err) => {
        if (err) {
            res.json({ success: false, error: err.message });
        } else {
            res.json({ success: true, filePath: fileName });
        }
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});   
