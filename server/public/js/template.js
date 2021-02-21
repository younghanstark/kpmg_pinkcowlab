module.exports = {
  HTML: function (content) {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>MaGam: Mask Detection Project</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
    <link href="static/css/cover.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.1/socket.io.js"
      integrity="sha512-oFOCo2/3DtjrJG4N27BjSLQWoiBv171sK6a+JiWjp/7agxC2nCUP358AqzxkBUb5jX8g6CYLPdSKQTbC0weCwA=="
      crossorigin="anonymous"
    ></script>
  </head>
  <body class="text-center">
  <div class="flex-column" style="width: 100%;">
   <div class="cover-container d-flex p-3 mx-auto flex-column " style="width: 100%;>
    <header class="masthead mb-auto">
        <div class="inner">
          <h3 class="masthead-brand">
            <a
              href="/"
              style="font-weight: bold; text-decoration: none"
              >MaGam</a>
          </h3>
          <nav id="main-nav" class="nav nav-masthead justify-content-center">
            <a
              class="nav-link"
              href="./?content=home"
              >Home</a
            >
            <a
              class="nav-link"
              href="./?content=features"
              >Features</a
            >
            <a
              class="nav-link"
              href="./?content=demo"
              >Demo</a
            >
            <a
              class="nav-link"
              href="./?content=signin"
              >Sign In</a
            >
          </nav>
        </div>
      </header></div>
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
     

      <main role="main" class="inner cover">
      ${content}
      </main>

      <footer class="mastfoot mt-auto">
        <div class="inner">
          <p>
          Project for KPMG Ideathon 2021, PinkCow Lab. &nbsp;
          <a href="https://github.com/ziinxed/kpmg_pinkcowlab"><i class="bi bi-github" style="font-size: 20px;"></i></a>
          </p>
        </div>
      </footer>
    </div>
    </div>
  </body>
  <script src="/static/js/basic.js"></script>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js"
    integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
    integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
    crossorigin="anonymous"
  ></script>
</html>
        `;
  },
};
