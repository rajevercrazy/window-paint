((event) => {
    app.change = (event) => {
        switch (event.target.id) {
            case "stroke":
              canvasObj.ctx.strokeStyle = event.target.value;
              app.setColor(event.target.value);
              break;
          }
    }})();