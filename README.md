<p align="center"><img src="https://drive.google.com/uc?export=view&id=1opNSBnjSbndNOivdS60mFwLdeWXdEtM5" height="400px" width="400px"></p>

# Javascript-TopScroller-Module
An icon that appears on the corner of the screen as the user starts scrolling and allow them to scroll back to the top

## How to use

In your HTML simply import the script and use it.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <script src="TopScroller.js"></script>
  </head>
  <body>
    <header></header>
    <footer></footer>
    <script type="text/javascript">
      (function() {
        TopScroller.init({
          after: '300px',
          background: 'rgba(0, 0, 0, 0.5)',
          backgroundHover: 'red',
          position: {
            distance: '20px',
            corner: ['top', 'left'],
          }
        });	
      })();
      </script>
  </body>
</html>
```


## Options
```javascript
TopScroller.init({
    after: '300px', // the offset position of the window that the scroll element should appear.
    background: 'rgba(0, 0, 0, 0.5)', // background color of that element.
    backgroundHover: 'red', // hover state color of that element.
    position: {
      distance: '20px', // the distance from the left top corner the element should be positioned.
      corner: ['top', 'left'],
    }
});	
```

If you see something that can be imporved, let me know or send me a pull request, cheers ! :)
