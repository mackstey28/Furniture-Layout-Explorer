# Furniture-Layout-Explorer

## How to run:

You can run the software here: https://editor.p5js.org/maxwelltang28/full/

## If you want to copy the files and run it yourself:

Download the `Furniture-Layout-Explorer` file. Go to https://editor.p5js.org and create an account.

To access the file browser, you need to click here:

![image](https://media.discordapp.net/attachments/897486164527829103/970783238677200966/unknown.png)

I'm not sure if there is a way to input multiple files. You will probably have to manually copy and paste the sketch.js code, and create the furniture.js file and copy and paste into that one as well. 

To create a file or add a folder, you click on the small down arrow next to "Sketch Files":

![image](https://media.discordapp.net/attachments/897486164527829103/970785940396204092/unknown.png)

Don't forget to add  `<script src="furniture.js"></script>` in index.html like so:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
    </main>
    <script src="sketch.js"></script>
    <script src="furniture.js"></script>
  </body>
</html>
```

Lastly, you need to add the images I created for the thumbnails. You can just create a folder called `images` and use `Upload Files` from the arrow dropdown, then drag all images from `Furniture-Layout-Explorer/images` into this `images` folder you created in p5.js.

TO RUN IT, just click the giant run button:

![](https://media.discordapp.net/attachments/897486164527829103/970786974954844220/unknown.png)

And to stop it, click the stop button on the right.

